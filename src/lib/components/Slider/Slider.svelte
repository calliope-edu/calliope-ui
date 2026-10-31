<script lang="ts" module>
	export type SliderProps = {
		/** Visible label; also the accessible name of the thumb (aria-labelledby). */
		label: string;
		value?: number;
		/** Every change while dragging or with the keyboard. */
		onValueChange?: (value: number) => void;
		/** When a drag ends or after a key press: the moment to save or send. */
		onValueCommit?: (value: number) => void;
		min?: number;
		max?: number;
		step?: number;
		/** Help text under the slider, linked with aria-describedby. */
		hint?: string;
		disabled?: boolean;
		/** Shows the current value at the end of the label row. */
		showValue?: boolean;
		/** Formats the shown value and the announced one (aria-valuetext), e.g. `(v) => \`${v} s\``. */
		formatValue?: (value: number) => string;
		/** Form field name; a hidden input submits the value. */
		name?: string;
		id?: string;
	};
</script>

<script lang="ts">
	import { Slider } from 'bits-ui';
	import FieldHint from '../TextField/FieldHint.svelte';
	import Label from '../TextField/Label.svelte';

	let {
		label,
		min = 0,
		max = 100,
		value = $bindable(min),
		onValueChange,
		onValueCommit,
		step = 1,
		hint,
		disabled = false,
		showValue = true,
		formatValue,
		name,
		id: idProp
	}: SliderProps = $props();

	const uid = $props.id();
	const id = $derived(idProp ?? `cui-slider-${uid}`);
	const labelId = $derived(`${id}-label`);
	const hintId = $derived(`${id}-hint`);
	const valueText = $derived(formatValue ? formatValue(value) : String(value));
</script>

<div class="cui-slider" data-disabled={disabled || undefined}>
	<div class="head">
		<Label id={labelId}>{label}</Label>
		<!-- A visual echo only: the thumb announces the value itself. -->
		{#if showValue}<span class="value" aria-hidden="true">{valueText}</span>{/if}
	</div>
	<Slider.Root
		type="single"
		class="cui-slider-root"
		bind:value
		{onValueChange}
		{onValueCommit}
		{min}
		{max}
		{step}
		{disabled}
	>
		<span class="cui-slider-track"><Slider.Range class="cui-slider-range" /></span>
		<Slider.Thumb
			index={0}
			{id}
			class="cui-slider-thumb"
			aria-labelledby={labelId}
			aria-valuetext={formatValue ? valueText : undefined}
			aria-describedby={hint ? hintId : undefined}
		/>
	</Slider.Root>
	{#if name}<input type="hidden" {name} {value} {disabled} />{/if}
	{#if hint}<FieldHint id={hintId}>{hint}</FieldHint>{/if}
</div>

<style>
	@layer calliope.components {
		.cui-slider {
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

		.value {
			flex: none;
			color: var(--cui-text-default);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			line-height: var(--cui-typography-label-line-height);
			font-variant-numeric: tabular-nums;
		}

		/* The root is the 24px hit area (WCAG 2.5.8): a press anywhere on it moves the thumb. */
		:global(.cui-slider-root) {
			position: relative;
			display: block;
			height: var(--cui-size-touch-min);
			cursor: pointer;
		}

		:global(.cui-slider-track) {
			position: absolute;
			top: 50%;
			right: 0;
			left: 0;
			height: 4px;
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-border-control);
			transform: translateY(-50%);
		}

		/* bits-ui sets left/right inline; the fill ends under the thumb's centre. */
		:global(.cui-slider-range) {
			height: 100%;
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-control-on);
		}

		/* 20px control.on disc with a 2px surface ring, so it stands off the range in both
		   themes; the global focus ring at its 2px offset lands just outside that ring.
		   bits-ui sets left and translate inline; top is ours. */
		:global(.cui-slider-thumb) {
			top: calc(50% - 10px);
			display: block;
			box-sizing: border-box;
			width: 20px;
			height: 20px;
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-control-on);
			box-shadow: 0 0 0 2px var(--cui-surface-default);
			cursor: grab;
			transition: box-shadow var(--cui-duration-fast) var(--cui-easing-standard);
		}

		/* Hit area of the thumb itself: 24px around the 20px disc. */
		:global(.cui-slider-thumb)::before {
			content: '';
			position: absolute;
			inset: -2px;
			border-radius: var(--cui-radius-full);
		}

		:global(.cui-slider-thumb[data-active]) {
			cursor: grabbing;
		}

		/* Hover: the 4px halo of the Switch, outside the surface ring. */
		@media (hover: hover) {
			:global(.cui-slider-root:not([data-disabled]):hover .cui-slider-thumb) {
				box-shadow:
					0 0 0 2px var(--cui-surface-default),
					0 0 0 6px var(--cui-action-hover);
			}
		}

		.cui-slider[data-disabled] {
			opacity: 0.4;
		}

		.cui-slider[data-disabled] :global(.cui-slider-root),
		.cui-slider[data-disabled] :global(.cui-slider-thumb) {
			cursor: not-allowed;
		}
	}
</style>
