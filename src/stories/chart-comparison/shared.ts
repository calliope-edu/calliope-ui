// Shared by both chart prototypes (comparison story only): sample data, marker shapes, formats.

export type Point = { t: number; v: number };
export type Series = { id: string; name: string; slot: number; points: Point[] };

/** Marker shape per series slot (D4: colour never alone). */
export const shapes = ['circle', 'square', 'triangle', 'diamond', 'cross', 'star'] as const;
export type Shape = (typeof shapes)[number];

export const shapeOf = (slot: number): Shape => shapes[(slot - 1) % shapes.length];
export const colourOf = (slot: number) => `var(--cui-data-series-${((slot - 1) % 6) + 1})`;

/** SVG path of a marker centred on 0,0 with radius r. */
export function shapePath(shape: Shape, r: number): string {
	const n = (v: number) => v.toFixed(2);
	switch (shape) {
		case 'circle':
			return `M${n(-r)},0a${n(r)},${n(r)} 0 1,0 ${n(2 * r)},0a${n(r)},${n(r)} 0 1,0 ${n(-2 * r)},0Z`;
		case 'square': {
			const s = r * 0.9;
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
				const rad = i % 2 ? inner : outer;
				const a = (Math.PI / 5) * i - Math.PI / 2;
				d += `${i ? 'L' : 'M'}${n(Math.cos(a) * rad)},${n(Math.sin(a) * rad)}`;
			}
			return `${d}Z`;
		}
	}
}

const start = Date.UTC(2026, 10, 2, 13, 0); // 14:00 in Berlin
const step = 5 * 60_000;

function wave(seed: number, base: number, amp: number, count: number, skip: number[] = []) {
	const points: Point[] = [];
	for (let i = 0; i < count; i++) {
		if (skip.includes(i)) continue;
		const v = base + amp * Math.sin((i + seed) / 3) + ((seed * 7 + i * 13) % 5) * 0.15;
		points.push({ t: start + i * step + seed * 20_000, v: Math.round(v * 10) / 10 });
	}
	return points;
}

/** Temperature feed of four devices, one value every five minutes, one device with a gap. */
export const sampleSeries: Series[] = [
	{ id: 'A1', name: 'Calliope 1', slot: 1, points: wave(0, 21, 1.2, 24) },
	{ id: 'B2', name: 'Calliope 2', slot: 2, points: wave(2, 19.5, 1.6, 24) },
	{ id: 'C3', name: 'Wetterstation', slot: 3, points: wave(5, 17, 2.4, 24, [9, 10, 11]) },
	{ id: 'D4', name: 'Calliope 4', slot: 4, points: wave(8, 23, 0.8, 24) }
];

export const timeFormat = new Intl.DateTimeFormat('de-DE', {
	hour: '2-digit',
	minute: '2-digit',
	timeZone: 'Europe/Berlin'
});
export const valueFormat = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });
export const formatValue = (v: number) => `${valueFormat.format(v)} °C`;
export const formatTime = (t: number) => timeFormat.format(t);

/** The point the keyboard cursor stands on: which series and which of its points. */
export type Cursor = { series: number; point: number } | null;
