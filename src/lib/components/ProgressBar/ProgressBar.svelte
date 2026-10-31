<script lang="ts" module>
	export type ProgressBarProps = {
		/** Visible label; also the accessible name of the progressbar (aria-labelledby). */
		label: string;
		/** Progress from 0 to `max`; null when the amount is unknown (indeterminate). */
		value: number | null;
		max?: number;
		/** Shows the formatted value at the end of the label row (never while indeterminate). */
		showValue?: boolean;
		/** Formats the shown and the announced value (aria-valuetext). Default "42 %". */
		formatValue?: (value: number, max: number) => string;
		/** Help text under the bar, linked with aria-describedby. */
		hint?: string;
		id?: string;
	};

	/** German style: number, no-break space, percent sign ("42 %"). */
	export const formatPercent = (value: number, max: number) =>
		`${Math.round((value / max) * 100)}\u00a0%`;
</script>

<script lang="ts">
	import { Progress } from 'bits-ui';
	import FieldHint from '../TextField/FieldHint.svelte';

	let {
		label,
		value,
		max = 100,
		showValue = true,
		formatValue = formatPercent,
		hint,
		id: idProp
	}: ProgressBarProps = $props();

	const uid = $props.id();
	const id = $derived(idProp ?? `cui-progress-${uid}`);
	const labelId = $derived(`${id}-label`);
	const hintId = $derived(`${id}-hint`);
	const clamped = $derived(value === null ? null : Math.min(Math.max(value, 0), max));
	const valueText = $derived(clamped === null ? undefined : formatValue(clamped, max));
	const percent = $derived(clamped === null ? 0 : (clamped / max) * 100);
</script>

<div class="cui-progress-bar">
	<div class="head">
		<span class="label" id={labelId}>{label}</span>
		<!-- A visual echo only: the progressbar announces the value itself. -->
		{#if showValue && valueText}<span class="value" aria-hidden="true">{valueText}</span>{/if}
	</div>
	<!-- Indeterminate: bits-ui drops aria-valuenow, which assistive tech reads as "busy". -->
	<Progress.Root
		{id}
		class="cui-progress-track"
		value={clamped}
		{max}
		aria-labelledby={labelId}
		aria-valuetext={valueText}
		aria-describedby={hint ? hintId : undefined}
	>
		<span class="cui-progress-fill" style:width={clamped === null ? undefined : `${percent}%`}
		></span>
	</Progress.Root>
	{#if hint}<FieldHint id={hintId}>{hint}</FieldHint>{/if}
</div>

<style>
	@layer calliope.components {
		.cui-progress-bar {
			display: flex;
			flex-direction: column;
			gap: var(--cui-space-1);
			min-width: 0;
		}

		.head {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			gap: var(--cui-space-3);
		}

		.label,
		.value {
			color: var(--cui-text-default);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			line-height: var(--cui-typography-label-line-height);
		}

		.value {
			flex: none;
			font-variant-numeric: tabular-nums;
		}

		/* 8px track in the subtle surface, no outline; the fill is control.on (D2). */
		:global(.cui-progress-track) {
			position: relative;
			height: var(--cui-space-2);
			overflow: hidden;
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-surface-subtle);
		}

		.cui-progress-fill {
			display: block;
			height: 100%;
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-control-on);
			transition: width var(--cui-duration-base) var(--cui-easing-standard);
		}

		/* Indeterminate: a 30% segment slides across, one pass per 1.5s. */
		:global(.cui-progress-track[data-indeterminate]) .cui-progress-fill {
			width: 30%;
			animation: cui-progress-slide calc(var(--cui-duration-slow) * 5) var(--cui-easing-standard)
				infinite;
		}

		/* Reduced motion zeroes the durations, so the segment would stand still and read as 30%.
		   Instead the whole track shows a static dashed fill: present, but no amount. */
		@media (prefers-reduced-motion: reduce) {
			:global(.cui-progress-track[data-indeterminate]) .cui-progress-fill {
				width: 100%;
				border-radius: 0;
				background: repeating-linear-gradient(
					90deg,
					var(--cui-control-on) 0 var(--cui-space-3),
					transparent var(--cui-space-3) var(--cui-space-5)
				);
				animation: none;
			}
		}

		/* From fully left of the track to fully right of it (the segment is 30% wide). */
		@keyframes cui-progress-slide {
			from {
				transform: translateX(-100%);
			}
			to {
				transform: translateX(calc(100% / 0.3));
			}
		}
	}
</style>
