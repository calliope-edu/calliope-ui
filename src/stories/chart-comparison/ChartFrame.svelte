<script lang="ts">
	// The accessible chart pattern, the same around both prototypes: summary as description,
	// a focusable plot with a keyboard cursor announced via LiveRegion, a hidden data table.
	import type { Snippet } from 'svelte';
	import LiveRegion from '../../lib/components/LiveRegion/LiveRegion.svelte';
	import {
		colourOf,
		formatTime,
		formatValue,
		shapeOf,
		shapePath,
		type Cursor,
		type Series
	} from './shared.js';

	let {
		title,
		series,
		plot
	}: {
		title: string;
		series: Series[];
		plot: Snippet<[{ cursor: Cursor; width: number }]>;
	} = $props();

	const uid = $props.id();
	let cursor = $state<Cursor>(null);
	let width = $state(0);

	let times = $derived(
		[...new Set(series.flatMap((s) => s.points.map((p) => p.t)))].sort((a, b) => a - b)
	);

	let summary = $derived.by(() => {
		if (!times.length) return 'Noch keine Werte.';
		const parts = series.map((s) => {
			const vs = s.points.map((p) => p.v);
			const last = s.points[s.points.length - 1];
			return `${s.name}: ${formatValue(Math.min(...vs))} bis ${formatValue(Math.max(...vs))}, zuletzt ${formatValue(last.v)}`;
		});
		return `Liniendiagramm, ${series.length} Geräte, ${formatTime(times[0])} bis ${formatTime(times[times.length - 1])} Uhr. ${parts.join('. ')}.`;
	});

	let message = $derived.by(() => {
		if (!cursor) return '';
		const s = series[cursor.series];
		const p = s.points[cursor.point];
		return `${s.name}, ${formatTime(p.t)} Uhr: ${formatValue(p.v)}. Punkt ${cursor.point + 1} von ${s.points.length}.`;
	});

	/** The point of another series nearest in time, so up/down keeps the moment. */
	function nearest(s: Series, t: number) {
		let best = 0;
		s.points.forEach((p, i) => {
			if (Math.abs(p.t - t) < Math.abs(s.points[best].t - t)) best = i;
		});
		return best;
	}

	function onkeydown(event: KeyboardEvent) {
		if (!series.length) return;
		const c = cursor ?? { series: 0, point: series[0].points.length - 1 };
		const s = series[c.series];
		const t = s.points[c.point].t;
		let next: Cursor = c;
		switch (event.key) {
			case 'ArrowRight':
				next = { ...c, point: Math.min(s.points.length - 1, c.point + 1) };
				break;
			case 'ArrowLeft':
				next = { ...c, point: Math.max(0, c.point - 1) };
				break;
			case 'Home':
				next = { ...c, point: 0 };
				break;
			case 'End':
				next = { ...c, point: s.points.length - 1 };
				break;
			case 'ArrowDown':
			case 'ArrowUp': {
				const step = event.key === 'ArrowDown' ? 1 : -1;
				const i = (c.series + step + series.length) % series.length;
				next = { series: i, point: nearest(series[i], t) };
				break;
			}
			case 'Escape':
				next = null;
				break;
			default:
				return;
		}
		event.preventDefault();
		cursor = next;
	}
</script>

<figure class="frame" aria-labelledby="{uid}-title">
	<figcaption class="title" id="{uid}-title">{title}</figcaption>
	<ul class="legend">
		{#each series as s (s.id)}
			<li>
				<svg width="14" height="14" viewBox="-7 -7 14 14" aria-hidden="true">
					<path d={shapePath(shapeOf(s.slot), 4.5)} style:fill={colourOf(s.slot)} />
				</svg>
				{s.name}
			</li>
		{/each}
	</ul>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="plot"
		role="application"
		aria-roledescription="Diagramm"
		aria-label="{title}. Pfeiltasten links und rechts gehen die Werte durch, oben und unten wechseln das Gerät."
		aria-describedby="{uid}-summary"
		tabindex="0"
		bind:clientWidth={width}
		{onkeydown}
		onblur={() => (cursor = null)}
	>
		<div aria-hidden="true">{@render plot({ cursor, width })}</div>
	</div>
	<p class="summary" id="{uid}-summary">{summary}</p>
	<LiveRegion {message} />
	<table class="hidden-table">
		<caption>{title}: alle Werte</caption>
		<thead>
			<tr>
				<th scope="col">Zeit</th>
				{#each series as s (s.id)}<th scope="col">{s.name}</th>{/each}
			</tr>
		</thead>
		<tbody>
			{#each times as t (t)}
				<tr>
					<th scope="row">{formatTime(t)}</th>
					{#each series as s (s.id)}
						{@const p = s.points.find((p) => p.t === t)}
						<td>{p ? formatValue(p.v) : ''}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</figure>

<style>
	.frame {
		margin: 0;
		display: grid;
		gap: var(--cui-space-2);
		color: var(--cui-text-default);
	}

	.title {
		font-family: var(--cui-typography-h3-font-family);
		font-size: var(--cui-typography-h3-font-size);
		font-weight: var(--cui-typography-h3-font-weight);
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: var(--cui-space-1) var(--cui-space-4);
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--cui-typography-label-font-size);
	}

	.legend li {
		display: inline-flex;
		align-items: center;
		gap: var(--cui-space-2);
	}

	.plot {
		border-radius: var(--cui-radius-md);
	}

	.summary {
		margin: 0;
		color: var(--cui-text-muted);
		font-size: var(--cui-typography-caption-font-size);
	}

	.hidden-table {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>
