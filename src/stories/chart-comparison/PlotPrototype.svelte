<script lang="ts">
	// Prototype A: the same line chart on svelteplot.
	import { AxisX, AxisY, Dot, GridY, Line, Plot, RuleX } from 'svelteplot';
	import ChartFrame from './ChartFrame.svelte';
	import {
		colourOf,
		formatTime,
		shapeOf,
		valueFormat,
		type Cursor,
		type Point,
		type Series
	} from './shared.js';

	let { title, series }: { title: string; series: Series[] } = $props();

	// svelteplot's own symbol names for our six shapes (its "cross" is a plus).
	const symbolOf = (slot: number) => {
		const s = shapeOf(slot);
		return s === 'cross' ? 'plus' : s;
	};

	/** Breaks the line where a device skipped more than two intervals (svelteplot: null value). */
	const withGaps = (points: Point[]) =>
		points.flatMap((p, i) =>
			i > 0 && p.t - points[i - 1].t > 2.5 * 5 * 60_000 ? [{ t: p.t - 1, v: null }, p] : [p]
		);
</script>

<ChartFrame {title} {series}>
	{#snippet plot({ cursor }: { cursor: Cursor; width: number })}
		{#if series.some((s) => s.points.length)}
			<div class="plot-host">
				<Plot
					height={240}
					marginLeft={44}
					x={{ type: 'time', label: '' }}
					y={{ nice: true, zero: false, label: '' }}
				>
					<GridY />
					<AxisY tickFormat={(v: number) => valueFormat.format(v)} />
					<AxisX tickFormat={(t: Date) => formatTime(t.getTime())} ticks={5} />
					{#each series as s (s.id)}
						<Line
							data={withGaps(s.points)}
							x={(d: { t: number }) => new Date(d.t)}
							y="v"
							stroke={colourOf(s.slot)}
							strokeWidth={2}
						/>
						<Dot
							data={s.points.filter((_, i) => i % 4 === 3 || i === s.points.length - 1)}
							x={(d: Point) => new Date(d.t)}
							y="v"
							symbol={symbolOf(s.slot)}
							fill={colourOf(s.slot)}
							r={3.5}
						/>
					{/each}
					{#if cursor}
						{@const s = series[cursor.series]}
						{@const p = s.points[cursor.point]}
						<RuleX data={[new Date(p.t)]} stroke="currentColor" strokeDasharray="3 3" />
						<Dot
							data={[p]}
							x={(d: Point) => new Date(d.t)}
							y="v"
							symbol={symbolOf(s.slot)}
							fill={colourOf(s.slot)}
							stroke="currentColor"
							strokeWidth={2}
							r={7}
						/>
					{/if}
				</Plot>
			</div>
		{/if}
	{/snippet}
</ChartFrame>

<style>
	/* Axis text and grid follow the theme through currentColor; the rest is svelteplot's. */
	.plot-host {
		color: var(--cui-text-muted);
		font-size: var(--cui-typography-caption-font-size);
	}

	.plot-host :global(.grid-y line) {
		stroke: var(--cui-border-subtle);
		stroke-opacity: 1;
	}
</style>
