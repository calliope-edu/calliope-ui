// Pure helpers of LineChart: series slots, marker shapes, ticks. Kept apart to be tested alone.

/** One of the six `data.series-*` tokens (D4). */
export type SeriesSlot = 1 | 2 | 3 | 4 | 5 | 6;

/** The marker shape of each slot, so a series never differs by colour alone. */
export const seriesShapes = ['circle', 'square', 'triangle', 'diamond', 'cross', 'star'] as const;
export type SeriesShape = (typeof seriesShapes)[number];

export const SERIES_COUNT = 6;

export const shapeOf = (slot: SeriesSlot): SeriesShape => seriesShapes[slot - 1];
export const colourOf = (slot: SeriesSlot) => `var(--cui-data-series-${slot})`;

/** Slot of the nth series (0-based) when the app gives none: in order, repeating after six. */
export const slotAt = (index: number) => ((index % SERIES_COUNT) + 1) as SeriesSlot;

/**
 * Gives every serial a slot that stays its own: serials already in `previous` keep theirs, new
 * ones take the next free slot in the order they come, so a device joining later changes no one
 * else's colour. Past six devices the slots repeat.
 */
export function assignSeriesSlots(
	serials: readonly string[],
	previous: ReadonlyMap<string, SeriesSlot> = new Map()
): Map<string, SeriesSlot> {
	const slots = new Map(previous);
	for (const serial of serials) {
		if (slots.has(serial)) continue;
		const used = new Set(slots.values());
		const free = ([1, 2, 3, 4, 5, 6] as const).find((s) => !used.has(s));
		slots.set(serial, free ?? slotAt(slots.size));
	}
	return slots;
}

/** SVG path data of a marker centred on 0,0 that fits a circle of radius r. */
export function shapePath(shape: SeriesShape, r: number): string {
	const n = (v: number) => Number(v.toFixed(2));
	switch (shape) {
		case 'circle':
			return `M${n(-r)},0a${n(r)},${n(r)} 0 1,0 ${n(2 * r)},0a${n(r)},${n(r)} 0 1,0 ${n(-2 * r)},0Z`;
		case 'square': {
			const s = r * 0.85;
			return `M${n(-s)},${n(-s)}H${n(s)}V${n(s)}H${n(-s)}Z`;
		}
		case 'triangle': {
			const h = r * 1.15;
			return `M0,${n(-h)}L${n(h)},${n(h * 0.8)}H${n(-h)}Z`;
		}
		case 'diamond': {
			const d = r * 1.25;
			return `M0,${n(-d)}L${n(d)},0L0,${n(d)}L${n(-d)},0Z`;
		}
		case 'cross': {
			const a = r * 1.1;
			const b = r * 0.38;
			return `M${n(-b)},${n(-a)}H${n(b)}V${n(-b)}H${n(a)}V${n(b)}H${n(b)}V${n(a)}H${n(-b)}V${n(b)}H${n(-a)}V${n(-b)}H${n(-b)}Z`;
		}
		case 'star': {
			const outer = r * 1.3;
			const inner = outer * 0.45;
			let d = '';
			for (let i = 0; i < 10; i++) {
				const radius = i % 2 ? inner : outer;
				const a = (Math.PI / 5) * i - Math.PI / 2;
				d += `${i ? 'L' : 'M'}${n(Math.cos(a) * radius)},${n(Math.sin(a) * radius)}`;
			}
			return `${d}Z`;
		}
	}
}

/** 1, 2 or 5 times a power of ten, the smallest not below `raw`. */
export function niceStep(raw: number): number {
	if (!(raw > 0)) return 1;
	const magnitude = 10 ** Math.floor(Math.log10(raw));
	const n = raw / magnitude;
	return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * magnitude;
}

/**
 * Value ticks for a range: about `count` round steps whose ends enclose lo and hi. A range of
 * zero width (one value, or all equal) is widened so the line sits in the middle.
 */
export function valueTicks(lo: number, hi: number, count = 4): number[] {
	if (!(hi > lo)) {
		const pad = Math.abs(lo) > 0 ? Math.abs(lo) * 0.1 : 1;
		lo -= pad;
		hi += pad;
	}
	const step = niceStep((hi - lo) / count);
	const ticks: number[] = [];
	const first = Math.floor(lo / step) * step;
	const last = Math.ceil(hi / step) * step;
	for (let v = first; v <= last + step / 2; v += step) ticks.push(Number(v.toPrecision(12)));
	return ticks;
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const timeSteps = [
	SECOND,
	5 * SECOND,
	10 * SECOND,
	30 * SECOND,
	MINUTE,
	5 * MINUTE,
	10 * MINUTE,
	15 * MINUTE,
	30 * MINUTE,
	HOUR,
	3 * HOUR,
	6 * HOUR,
	12 * HOUR,
	DAY
];

/** Time ticks on round steps (full minutes, quarter hours, …), at most `max` of them. */
export function timeTicks(from: number, to: number, max: number): number[] {
	if (!(to > from) || max < 1) return [from];
	const span = to - from;
	const step = timeSteps.find((s) => span / s <= max) ?? Math.ceil(span / max / DAY) * DAY;
	// Round in local time so "full hour" means the hour on the wall clock.
	const offset = new Date(from).getTimezoneOffset() * MINUTE;
	const ticks: number[] = [];
	for (let t = Math.ceil((from - offset) / step) * step + offset; t <= to; t += step) ticks.push(t);
	return ticks;
}

/** The typical distance between two points: a line breaks where a gap is far longer. */
export function typicalInterval(times: readonly number[]): number {
	const gaps = times
		.slice(1)
		.map((t, i) => t - times[i])
		.filter((d) => d > 0)
		.sort((a, b) => a - b);
	return gaps.length ? gaps[Math.floor(gaps.length / 2)] : 0;
}
