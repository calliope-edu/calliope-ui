<script lang="ts">
	// Prototype B: the same line chart drawn by hand in SVG (no dependency).
	import ChartFrame from './ChartFrame.svelte';
	import {
		colourOf,
		formatTime,
		shapeOf,
		shapePath,
		valueFormat,
		type Cursor,
		type Series
	} from './shared.js';

	let { title, series }: { title: string; series: Series[] } = $props();

	const height = 240;
	const pad = { top: 12, right: 12, bottom: 28, left: 44 };

	let all = $derived(series.flatMap((s) => s.points));
	let x0 = $derived(Math.min(...all.map((p) => p.t)));
	let x1 = $derived(Math.max(...all.map((p) => p.t)));

	function niceStep(raw: number) {
		const mag = 10 ** Math.floor(Math.log10(raw));
		const n = raw / mag;
		return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * mag;
	}

	let yTicks = $derived.by(() => {
		const lo = Math.min(...all.map((p) => p.v));
		const hi = Math.max(...all.map((p) => p.v));
		const step = niceStep((hi - lo) / 4 || 1);
		const ticks: number[] = [];
		for (let v = Math.floor(lo / step) * step; v <= Math.ceil(hi / step) * step + 1e-9; v += step)
			ticks.push(Math.round(v * 1e6) / 1e6);
		return ticks;
	});
	let y0 = $derived(yTicks[0]);
	let y1 = $derived(yTicks[yTicks.length - 1]);

	const sx = (t: number, w: number) =>
		pad.left + ((t - x0) / (x1 - x0 || 1)) * (w - pad.left - pad.right);
	const sy = (v: number) =>
		pad.top + (1 - (v - y0) / (y1 - y0 || 1)) * (height - pad.top - pad.bottom);

	/** Breaks the line where a device skipped more than two intervals. */
	function path(s: Series, w: number) {
		return s.points
			.map((p, i) => {
				const gap = i > 0 && p.t - s.points[i - 1].t > 2.5 * 5 * 60_000;
				return `${i === 0 || gap ? 'M' : 'L'}${sx(p.t, w).toFixed(1)},${sy(p.v).toFixed(1)}`;
			})
			.join('');
	}

	/** Full half hours inside the range. */
	let xTicks = $derived.by(() => {
		const step = 30 * 60_000;
		const ticks: number[] = [];
		for (let t = Math.ceil(x0 / step) * step; t <= x1; t += step) ticks.push(t);
		return ticks;
	});
</script>

<ChartFrame {title} {series}>
	{#snippet plot({ cursor, width }: { cursor: Cursor; width: number })}
		{#if width > 0 && all.length}
			<svg {width} {height} class="chart">
				{#each yTicks as v (v)}
					<line class="grid" x1={pad.left} x2={width - pad.right} y1={sy(v)} y2={sy(v)} />
					<text class="tick" x={pad.left - 8} y={sy(v)} text-anchor="end" dominant-baseline="middle"
						>{valueFormat.format(v)}</text
					>
				{/each}
				{#each xTicks as t, i (i)}
					<text class="tick" x={sx(t, width)} y={height - 8} text-anchor="middle"
						>{formatTime(t)}</text
					>
				{/each}
				{#each series as s (s.id)}
					<path class="line" d={path(s, width)} style:stroke={colourOf(s.slot)} />
					{#each s.points as p, i (i)}
						{#if i % 4 === 3 || i === s.points.length - 1}
							<path
								d={shapePath(shapeOf(s.slot), 3.5)}
								transform="translate({sx(p.t, width)},{sy(p.v)})"
								style:fill={colourOf(s.slot)}
							/>
						{/if}
					{/each}
				{/each}
				{#if cursor}
					{@const s = series[cursor.series]}
					{@const p = s.points[cursor.point]}
					<g class="cursor" style:transform="translate({sx(p.t, width)}px, 0)">
						<line y1={pad.top} y2={height - pad.bottom} />
					</g>
					<g class="cursor" style:transform="translate({sx(p.t, width)}px, {sy(p.v)}px)">
						<path class="ring" d={shapePath(shapeOf(s.slot), 8)} />
						<path d={shapePath(shapeOf(s.slot), 5.5)} style:fill={colourOf(s.slot)} />
					</g>
				{/if}
			</svg>
		{/if}
	{/snippet}
</ChartFrame>

<style>
	.chart {
		display: block;
		overflow: visible;
	}

	.grid {
		stroke: var(--cui-border-subtle);
	}

	.tick {
		fill: var(--cui-text-muted);
		font-size: var(--cui-typography-caption-font-size);
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
</style>
