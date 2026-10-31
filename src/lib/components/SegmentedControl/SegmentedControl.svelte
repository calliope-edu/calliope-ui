<script lang="ts" module>
	import type { IconName } from '../../icons/icons.js';

	export type SegmentedOption = {
		value: string;
		label: string;
		/** Icon before the label; decorative, the label names the option. */
		icon?: IconName;
		disabled?: boolean;
	};

	export type SegmentedControlSize = 's' | 'm' | 'l';

	export type SegmentedControlProps = {
		/** Accessible name of the radiogroup ("Ansicht"). Hidden unless `labelVisible`. */
		label: string;
		/** Shows the label above the control. */
		labelVisible?: boolean;
		/** Two to four options; more belong in a Select. */
		options: SegmentedOption[];
		value?: string;
		onValueChange?: (value: string) => void;
		/** s / m / l = 32 / 36 / 40px. Pupil-facing views use l (D6). */
		size?: SegmentedControlSize;
		/** Stretches the control and shares the width equally between the segments. */
		fullWidth?: boolean;
		disabled?: boolean;
		/** Form field name; submits the selected value. */
		name?: string;
		id?: string;
	};
</script>

<script lang="ts">
	import { RadioGroup } from 'bits-ui';
	import Icon from '../Icon/Icon.svelte';
	import Label from '../TextField/Label.svelte';

	let {
		label,
		labelVisible = false,
		options,
		value = $bindable(''),
		onValueChange,
		size = 'l',
		fullWidth = false,
		disabled = false,
		name,
		id: idProp
	}: SegmentedControlProps = $props();

	const uid = $props.id();
	const id = $derived(idProp ?? `cui-segmented-${uid}`);
	const labelId = $derived(`${id}-label`);
	const iconSize = $derived(size === 's' ? 's' : 'm');
</script>

<div
	class="cui-segmented-control"
	data-size={size}
	data-full-width={fullWidth || undefined}
	data-disabled={disabled || undefined}
>
	{#if labelVisible}<Label id={labelId}>{label}</Label>{/if}
	<!-- A radiogroup: one tab stop, arrow keys move and select (roving focus from bits-ui). -->
	<RadioGroup.Root
		{id}
		class="cui-segmented-group"
		orientation="horizontal"
		bind:value
		{onValueChange}
		{disabled}
		{name}
		aria-label={labelVisible ? undefined : label}
		aria-labelledby={labelVisible ? labelId : undefined}
	>
		{#each options as option (option.value)}
			<RadioGroup.Item class="cui-segment" value={option.value} disabled={option.disabled}>
				{#if option.icon}<Icon name={option.icon} size={iconSize} />{/if}
				<span class="cui-segment-label">{option.label}</span>
			</RadioGroup.Item>
		{/each}
	</RadioGroup.Root>
</div>

<style>
	@layer calliope.components {
		.cui-segmented-control {
			--_height: var(--cui-size-control-l);
			--_pad: var(--cui-space-4);

			display: inline-flex;
			flex-direction: column;
			align-items: flex-start;
			gap: var(--cui-space-1);
			max-width: 100%;
		}

		.cui-segmented-control[data-size='s'] {
			--_height: var(--cui-size-control-s);
			--_pad: var(--cui-space-3);
		}

		.cui-segmented-control[data-size='m'] {
			--_height: var(--cui-size-control-m);
			--_pad: var(--cui-space-3);
		}

		/* Hug the options, also inside a stretching flex column, unless asked to fill. */
		.cui-segmented-control[data-full-width] {
			display: flex;
			align-items: stretch;
		}

		/* Rounded rectangle, not a pill: it shows a value as much as it takes a press.
		   1px boundary + 2px inset; the height is the whole control's. */
		:global(.cui-segmented-group) {
			box-sizing: border-box;
			display: inline-flex;
			gap: 0;
			height: var(--_height);
			padding: var(--cui-space-0-5);
			border: var(--cui-border-width-hairline) solid var(--cui-border-control);
			border-radius: var(--cui-radius-md);
			background-color: var(--cui-surface-default);
		}

		[data-full-width] :global(.cui-segmented-group) {
			display: flex;
			width: 100%;
		}

		:global(.cui-segment) {
			box-sizing: border-box;
			display: inline-flex;
			flex: none;
			align-items: center;
			justify-content: center;
			gap: var(--cui-space-2);
			min-width: 0;
			margin: 0;
			padding: 0 var(--_pad);
			border: 0;
			border-radius: var(--cui-radius-sm);
			background-color: transparent;
			color: var(--cui-text-default);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			line-height: var(--cui-typography-label-line-height);
			white-space: nowrap;
			cursor: pointer;
			user-select: none;
			-webkit-tap-highlight-color: transparent;
			transition:
				background-color var(--cui-duration-fast) var(--cui-easing-standard),
				color var(--cui-duration-fast) var(--cui-easing-standard);
		}

		[data-full-width] :global(.cui-segment) {
			flex: 1 1 0;
		}

		:global(.cui-segment-label) {
			overflow: hidden;
			text-overflow: ellipsis;
		}

		/* Selected: control.on fill with the mark colour on it (D2), like a checked switch. */
		:global(.cui-segment[data-state='checked']) {
			background-color: var(--cui-control-on);
			color: var(--cui-control-on-mark);
		}

		@media (hover: hover) {
			:global(.cui-segment[data-state='unchecked']:not([data-disabled]):hover) {
				background-color: var(--cui-action-hover);
			}
		}

		/* The ring fills the 2px inset around the segment, on the control's own surface. */
		:global(.cui-segment:focus-visible) {
			outline-offset: 0;
		}

		:global(.cui-segment[data-disabled]) {
			cursor: not-allowed;
		}

		/* A disabled option fades on its own; a disabled control fades as a whole. */
		.cui-segmented-control:not([data-disabled]) :global(.cui-segment[data-disabled]),
		.cui-segmented-control[data-disabled] :global(.cui-segmented-group) {
			opacity: 0.4;
		}
	}
</style>
