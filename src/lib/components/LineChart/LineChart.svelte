<script lang="ts" module>
	import type { SeriesSlot } from './chart.js';

	export type LineChartPoint = { t: number | Date; v: number };

	export type LineChartSeries = {
		/** Stable key, typically the device serial. */
		id: string;
		/** Shown in the legend, the readout, the table and announcements. */
		name: string;
		points: LineChartPoint[];
		/** Colour and marker shape (1–6). Assign by serial (assignSeriesSlots); default: by order. */
		slot?: SeriesSlot;
	};

	export type LineChartSummary = {
		label: string;
		from: string;
		to: string;
		series: { name: string; min: string; max: string; last: string }[];
	};

	export type LineChartPointInfo = {
		series: string;
		time: string;
		value: string;
		index: number;
		count: number;
	};

	export type LineChartLabels = {
		/** Spoken instead of "application". */
		roleDescription: string;
		keyboardHint: string;
		empty: string;
		loading: string;
		/** Header of the time column of the hidden table. */
		time: string;
		table: (label: string) => string;
		summary: (info: LineChartSummary) => string;
		point: (info: LineChartPointInfo) => string;
	};

	export const lineChartLabels: LineChartLabels = {
		roleDescription: 'Diagramm',
		keyboardHint:
			'Pfeiltasten links und rechts gehen die Werte durch, oben und unten wechseln die Reihe, Pos1 und Ende springen an die Enden.',
		empty: 'Noch keine Werte',
		loading: 'Werte werden geladen',
		time: 'Zeit',
		table: (label) => `${label}: alle Werte`,
		summary: ({ from, to, series }) =>
			`Liniendiagramm mit ${series.length === 1 ? 'einer Reihe' : `${series.length} Reihen`}, ${from} bis ${to}. ` +
			series.map((s) => `${s.name}: ${s.min} bis ${s.max}, zuletzt ${s.last}.`).join(' '),
		point: ({ series, time, value, index, count }) =>
			`${series}, ${time}: ${value}. Punkt ${index} von ${count}.`
	};

	export type LineChartProps = {
		/** Accessible name of the chart, e.g. the feed ("Temperatur"). Not shown: the card titles it. */
		label: string;
		series?: LineChartSeries[];
		loading?: boolean;
		/** Height of the plot in px; the width follows the container. */
		height?: number;
		/** Appended to values by the default value format ("°C"). */
		unit?: string;
		/** Fix the ends of the value axis (a sensor's range); values outside are drawn at the edge. */
		yMin?: number;
		yMax?: number;
		locale?: string;
		formatValue?: (value: number) => string;
		formatTime?: (time: number) => string;
		/** Replaces the generated text summary (the chart's description). */
		summary?: string;
		/** Shows the summary under the plot too; by default it is for assistive tech only. */
		showSummary?: boolean;
		legend?: boolean;
		labels?: Partial<LineChartLabels>;
	};
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import LiveRegion from '../LiveRegion/LiveRegion.svelte';
	import Spinner from '../Spinner/Spinner.svelte';
	import {
		colourOf,
		shapeOf,
		shapePath,
		slotAt,
		timeTicks,
		typicalInterval,
		valueTicks
	} from './chart.js';

	let {
		label,
		series = [],
		loading = false,
		height = 240,
		unit,
		yMin,
		yMax,
		locale = 'de-DE',
		formatValue,
		formatTime,
		summary,
		showSummary = false,
		legend = true,
		labels: labelsProp = {},
		class: className,
		...rest
	}: LineChartProps & Omit<HTMLAttributes<HTMLDivElement>, 'children'> = $props();

	const uid = $props.id();
	let labels = $derived({ ...lineChartLabels, ...labelsProp });

	type Pt = { t: number; v: number };
	type Strand = { id: string; name: string; slot: SeriesSlot; pts: Pt[]; breaks: Set<number> };

	let strands = $derived<Strand[]>(
		series.map((s, i) => {
			const pts = s.points
				.filter((p) => Number.isFinite(p.v))
				.map((p) => ({ t: +p.t, v: p.v }))
				.sort((a, b) => a.t - b.t);
			// A device that skipped more than a few readings gets a break, not a bridge.
			const limit = typicalInterval(pts.map((p) => p.t)) * 2.5;
			const breaks = new Set<number>();
			if (limit > 0) pts.forEach((p, j) => j && p.t - pts[j - 1].t > limit && breaks.add(j));
			return { id: s.id, name: s.name, slot: s.slot ?? slotAt(i), pts, breaks };
		})
	);
	let all = $derived(strands.flatMap((s) => s.pts));
	let empty = $derived(all.length === 0);

	// ---------- formats ----------

	let xFrom = $derived(Math.min(...all.map((p) => p.t)));
	let xTo = $derived(Math.max(...all.map((p) => p.t)));

	let numberFormat = $derived(new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }));
	let timeFormat = $derived.by(() => {
		const span = xTo - xFrom;
		const options: Intl.DateTimeFormatOptions =
			span <= 2 * 60_000
				? { hour: '2-digit', minute: '2-digit', second: '2-digit' }
				: span < 86_400_000
					? { hour: '2-digit', minute: '2-digit' }
					: { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' };
		return new Intl.DateTimeFormat(locale, options);
	});
	const value = (v: number) =>
		formatValue ? formatValue(v) : `${numberFormat.format(v)}${unit ? ` ${unit}` : ''}`;
	const time = (t: number) => (formatTime ? formatTime(t) : timeFormat.format(t));

	// ---------- scales ----------

	let width = $state(0);
	const padRight = 12;
	const padTop = 12;
	const padBottom = 28;

	let yTicks = $derived.by(() => {
		const lo = yMin ?? Math.min(...all.map((p) => p.v));
		const hi = yMax ?? Math.max(...all.map((p) => p.v));
		const ticks = valueTicks(lo, hi);
		return ticks.filter(
			(v) => (yMin === undefined || v >= yMin) && (yMax === undefined || v <= yMax)
		);
	});
	let y0 = $derived(yMin ?? yTicks[0]);
	let y1 = $derived(yMax ?? yTicks[yTicks.length - 1]);

	/** Room for the longest tick label (digits are tabular, about 7px at 12px). */
	let padLeft = $derived(Math.max(...yTicks.map((v) => numberFormat.format(v).length)) * 7 + 14);
	let plotW = $derived(Math.max(10, width - padLeft - padRight));
	let plotH = $derived(Math.max(10, height - padTop - padBottom));
	let xSpan = $derived(xTo > xFrom ? [xFrom, xTo] : [xFrom - 60_000, xTo + 60_000]);

	const sx = (t: number) => padLeft + ((t - xSpan[0]) / (xSpan[1] - xSpan[0])) * plotW;
	const sy = (v: number) => {
		const c = Math.min(y1, Math.max(y0, v));
		return padTop + (1 - (c - y0) / (y1 - y0 || 1)) * plotH;
	};

	let xTicks = $derived(timeTicks(xSpan[0], xSpan[1], Math.max(2, Math.floor(plotW / 90))));

	function path(s: Strand) {
		return s.pts
			.map(
				(p, i) =>
					`${i === 0 || s.breaks.has(i) ? 'M' : 'L'}${sx(p.t).toFixed(1)},${sy(p.v).toFixed(1)}`
			)
			.join('');
	}

	/** Markers on about a dozen points per line, counted back from the newest; lone points always. */
	function marked(s: Strand) {
		const step = Math.max(1, Math.ceil(s.pts.length / 12));
		const last = s.pts.length - 1;
		return s.pts.filter((_, i) => {
			const alone = (i === 0 || s.breaks.has(i)) && (i === last || s.breaks.has(i + 1));
			return (last - i) % step === 0 || alone;
		});
	}

	// ---------- cursor ----------

	type Cursor = { id: string; index: number; from: 'keyboard' | 'pointer' };
	let cursorState = $state<Cursor | null>(null);
	let message = $state('');

	/** The cursor on the current data: it follows its series by id and stays within its points. */
	let cursor = $derived.by(() => {
		if (!cursorState) return null;
		const at = strands.findIndex((s) => s.id === cursorState!.id);
		const s = strands[at];
		if (!s || !s.pts.length) return null;
		const index = Math.min(cursorState.index, s.pts.length - 1);
		return { strand: s, at, index, point: s.pts[index], from: cursorState.from };
	});

	function describe(s: Strand, index: number) {
		const p = s.pts[index];
		return labels.point({
			series: s.name,
			time: time(p.t),
			value: value(p.v),
			index: index + 1,
			count: s.pts.length
		});
	}

	function nearest(s: Strand, t: number) {
		let best = 0;
		s.pts.forEach((p, i) => {
			if (Math.abs(p.t - t) < Math.abs(s.pts[best].t - t)) best = i;
		});
		return best;
	}

	function onkeydown(event: KeyboardEvent) {
		const lines = strands.filter((s) => s.pts.length);
		if (!lines.length) return;
		const current = cursor && cursor.from === 'keyboard' ? cursor : null;
		const s = current?.strand ?? lines[0];
		const i = current?.index ?? s.pts.length - 1;
		let next: { s: Strand; index: number } | null;
		switch (event.key) {
			case 'ArrowRight':
				next = { s, index: current ? Math.min(s.pts.length - 1, i + 1) : i };
				break;
			case 'ArrowLeft':
				next = { s, index: current ? Math.max(0, i - 1) : i };
				break;
			case 'PageUp':
				next = { s, index: Math.min(s.pts.length - 1, i + 10) };
				break;
			case 'PageDown':
				next = { s, index: Math.max(0, i - 10) };
				break;
			case 'Home':
				next = { s, index: 0 };
				break;
			case 'End':
				next = { s, index: s.pts.length - 1 };
				break;
			case 'ArrowDown':
			case 'ArrowUp': {
				const at = lines.indexOf(s);
				const step = event.key === 'ArrowDown' ? 1 : -1;
				const other = current ? lines[(at + step + lines.length) % lines.length] : s;
				next = { s: other, index: current ? nearest(other, s.pts[i].t) : i };
				break;
			}
			case 'Escape':
				if (!current) return;
				next = null;
				break;
			default:
				return;
		}
		event.preventDefault();
		cursorState = next ? { id: next.s.id, index: next.index, from: 'keyboard' } : null;
		message = next ? describe(next.s, next.index) : '';
	}

	/** The pointer picks the nearest point; distance across counts more than up and down. */
	function onpointermove(event: PointerEvent) {
		const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const x = event.clientX - box.left;
		const y = event.clientY - box.top;
		let best = { id: '', index: 0, d: Infinity };
		for (const s of strands) {
			for (let index = 0; index < s.pts.length; index++) {
				const p = s.pts[index];
				const d = Math.hypot(sx(p.t) - x, (sy(p.v) - y) * 0.5);
				if (d < best.d) best = { id: s.id, index, d };
			}
		}
		if (best.id) cursorState = { id: best.id, index: best.index, from: 'pointer' };
	}

	function clearPointer() {
		if (cursorState?.from === 'pointer') cursorState = null;
	}

	// ---------- text equivalents ----------

	let summaryText = $derived.by(() => {
		if (summary) return summary;
		if (empty) return labels.empty;
		return labels.summary({
			label,
			from: time(xFrom),
			to: time(xTo),
			series: strands
				.filter((s) => s.pts.length)
				.map((s) => {
					const vs = s.pts.map((p) => p.v);
					return {
						name: s.name,
						min: value(Math.min(...vs)),
						max: value(Math.max(...vs)),
						last: value(s.pts[s.pts.length - 1].v)
					};
				})
		});
	});

	let rows = $derived.by(() => {
		const times = [...new Set(all.map((p) => p.t))].sort((a, b) => a - b);
		const lookup = strands.map((s) => new Map(s.pts.map((p) => [p.t, p.v])));
		return times.map((t) => ({ t, cells: lookup.map((m) => m.get(t)) }));
	});
</script>

<div class={['cui-line-chart', className]} aria-busy={loading || undefined} {...rest}>
	{#if legend && strands.length > 0}
		<ul class="legend">
			{#each strands as s (s.id)}
				<li>
					<svg width="14" height="14" viewBox="-7 -7 14 14" aria-hidden="true" focusable="false">
						<path d={shapePath(shapeOf(s.slot), 4.5)} style:fill={colourOf(s.slot)} />
					</svg>
					{s.name}
				</li>
			{/each}
		</ul>
	{/if}

	{#if loading && empty}
		<div class="state" style:height="{height}px">
			<Spinner label="{label}: {labels.loading}" delay={300} />
		</div>
	{:else if empty}
		<div class="state" style:height="{height}px" role="img" aria-label="{label}: {labels.empty}">
			<p>{labels.empty}</p>
		</div>
	{:else}
		<!-- An application: arrow keys go to the chart, not to the screen reader's reading cursor. -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
		<div
			class="plot"
			role="application"
			aria-roledescription={labels.roleDescription}
			aria-label={label}
			aria-describedby="{uid}-summary {uid}-hint"
			tabindex="0"
			style:height="{height}px"
			bind:clientWidth={width}
			{onkeydown}
			onblur={() => (cursorState = null)}
			{onpointermove}
			onpointerdown={onpointermove}
			onpointerleave={clearPointer}
		>
			{#if width > 0}
				<svg {width} {height} aria-hidden="true" focusable="false">
					{#each yTicks as v (v)}
						<line class="grid" x1={padLeft} x2={width - padRight} y1={sy(v)} y2={sy(v)} />
						<text
							class="tick"
							x={padLeft - 8}
							y={sy(v)}
							text-anchor="end"
							dominant-baseline="middle"
						>
							{numberFormat.format(v)}
						</text>
					{/each}
					{#each xTicks as t (t)}
						<text class="tick" x={sx(t)} y={height - 8} text-anchor="middle">{time(t)}</text>
					{/each}
					{#each strands as s (s.id)}
						<path class="line" d={path(s)} style:stroke={colourOf(s.slot)} />
						{#each marked(s) as p (p.t)}
							<path
								d={shapePath(shapeOf(s.slot), 3.5)}
								transform="translate({sx(p.t)},{sy(p.v)})"
								style:fill={colourOf(s.slot)}
							/>
						{/each}
					{/each}
					{#if cursor}
						<g class="cursor" style:transform="translate({sx(cursor.point.t)}px, 0)">
							<line y1={padTop} y2={height - padBottom} />
						</g>
						<g
							class="cursor"
							style:transform="translate({sx(cursor.point.t)}px, {sy(cursor.point.v)}px)"
						>
							<path class="ring" d={shapePath(shapeOf(cursor.strand.slot), 8)} />
							<path
								d={shapePath(shapeOf(cursor.strand.slot), 5.5)}
								style:fill={colourOf(cursor.strand.slot)}
							/>
						</g>
					{/if}
				</svg>
				{#if cursor}
					{@const right = sx(cursor.point.t) > padLeft + plotW / 2}
					<div
						class="readout"
						aria-hidden="true"
						style:left={right ? undefined : `${sx(cursor.point.t) + 12}px`}
						style:right={right ? `${width - sx(cursor.point.t) + 12}px` : undefined}
					>
						<span class="readout-name">{cursor.strand.name}</span>
						<span class="readout-time">{time(cursor.point.t)}</span>
						<strong>{value(cursor.point.v)}</strong>
					</div>
				{/if}
			{/if}
		</div>
	{/if}

	<p id="{uid}-summary" class={['summary', !showSummary && 'hidden']}>{summaryText}</p>
	<p id="{uid}-hint" class="hidden">{labels.keyboardHint}</p>
	<LiveRegion {message} />

	{#if !empty}
		<div class="hidden">
			<table>
				<caption>{labels.table(label)}</caption>
				<thead>
					<tr>
						<th scope="col">{labels.time}</th>
						{#each strands as s (s.id)}<th scope="col">{s.name}</th>{/each}
					</tr>
				</thead>
				<tbody>
					{#each rows as row (row.t)}
						<tr>
							<th scope="row">{time(row.t)}</th>
							{#each row.cells as cell, i (i)}
								<td>{cell === undefined ? '' : value(cell)}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	@layer calliope.components {
		.cui-line-chart {
			position: relative;
			display: grid;
			gap: var(--cui-space-2);
			min-width: 0;
			color: var(--cui-text-default);
			font-family: var(--cui-font-family-sans);
		}

		.legend {
			display: flex;
			flex-wrap: wrap;
			gap: var(--cui-space-1) var(--cui-space-4);
			margin: 0;
			padding: 0;
			list-style: none;
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			line-height: var(--cui-typography-label-line-height);
		}

		.legend li {
			display: inline-flex;
			align-items: center;
			gap: var(--cui-space-2);
			min-width: 0;
			overflow-wrap: anywhere;
		}

		.legend svg {
			flex: none;
		}

		.state {
			display: grid;
			place-items: center;
			border: var(--cui-border-width-hairline) dashed var(--cui-border-subtle);
			border-radius: var(--cui-radius-md);
			color: var(--cui-text-muted);
			font-size: var(--cui-typography-label-font-size);
		}

		.state p {
			margin: 0;
		}

		.plot {
			position: relative;
			border-radius: var(--cui-radius-md);
			touch-action: pan-y;
		}

		.plot svg {
			display: block;
			overflow: visible;
		}

		.grid {
			stroke: var(--cui-border-subtle);
			stroke-width: 1;
		}

		.tick {
			fill: var(--cui-text-muted);
			font-size: var(--cui-typography-caption-font-size);
			font-weight: var(--cui-typography-caption-font-weight);
			font-variant-numeric: tabular-nums;
		}

		.line {
			fill: none;
			stroke-width: 2;
			stroke-linejoin: round;
			stroke-linecap: round;
		}

		.cursor {
			transition: transform var(--cui-duration-fast) var(--cui-easing-standard);
		}

		.cursor line {
			stroke: var(--cui-text-muted);
			stroke-dasharray: 3 3;
		}

		.ring {
			fill: var(--cui-surface-default);
			stroke: var(--cui-text-default);
			stroke-width: 2;
		}

		.readout {
			position: absolute;
			top: 0;
			display: grid;
			gap: 0 var(--cui-space-2);
			grid-template-columns: auto auto;
			padding: var(--cui-space-1) var(--cui-space-2);
			border-radius: var(--cui-radius-md);
			background-color: var(--cui-surface-raised);
			box-shadow: var(--cui-shadow-menu);
			font-size: var(--cui-typography-label-font-size);
			font-variant-numeric: tabular-nums;
			white-space: nowrap;
			pointer-events: none;
		}

		.readout-name {
			grid-column: 1 / -1;
			font-weight: var(--cui-font-weight-semibold);
		}

		.readout-time {
			color: var(--cui-text-muted);
		}

		.summary {
			margin: 0;
			color: var(--cui-text-muted);
			font-size: var(--cui-typography-label-font-size);
		}

		.hidden {
			position: absolute;
			width: 1px;
			height: 1px;
			margin: -1px;
			padding: 0;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
			border: 0;
		}
	}
</style>
