<script lang="ts" module>
	export type RadioProps = {
		value: string;
		/** Visible label; in the swatch variant it names the colour for assistive tech and as title. */
		label: string;
		/** Extra line under the label (default variant only), part of the accessible description. */
		hint?: string;
		disabled?: boolean;
		/** Swatch variant: the colour of the disc, any CSS colour. Without it the disc is outlined. */
		swatch?: string;
		/** Swatch variant: one or two characters on the disc, e.g. "A" on the outlined "automatic" disc. */
		glyph?: string;
	};
</script>

<script lang="ts">
	import { RadioGroup } from 'bits-ui';
	import { getContext } from 'svelte';
	import { RADIO_CONTEXT, type RadioContext } from './RadioGroup.svelte';

	let { value, label, hint, disabled = false, swatch, glyph }: RadioProps = $props();

	const group = getContext<RadioContext | undefined>(RADIO_CONTEXT);
	const variant = $derived(group?.variant ?? 'default');

	const uid = $props.id();
	const id = `cui-radio-${uid}`;
	const hintId = `${id}-hint`;
</script>

{#if variant === 'swatch'}
	<RadioGroup.Item
		{id}
		{value}
		{disabled}
		class="cui-radio-swatch"
		data-outlined={swatch ? undefined : true}
		aria-label={label}
		title={label}
		style={swatch ? `--_swatch: ${swatch}` : undefined}
	>
		{#if glyph}<span class="glyph" aria-hidden="true">{glyph}</span>{/if}
	</RadioGroup.Item>
{:else}
	<div class="cui-radio" data-disabled={disabled || undefined}>
		<RadioGroup.Item
			{id}
			{value}
			{disabled}
			class="cui-radio-circle"
			aria-describedby={hint ? hintId : undefined}
		/>
		<div class="text">
			<label for={id}>{label}</label>
			{#if hint}<span class="hint" id={hintId}>{hint}</span>{/if}
		</div>
	</div>
{/if}

<style>
	@layer calliope.components {
		.cui-radio {
			display: flex;
			align-items: flex-start;
			gap: var(--cui-space-3);
		}

		.text {
			display: flex;
			flex-direction: column;
			padding-top: calc((var(--cui-size-checkbox) - 1.4em) / 2);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			line-height: var(--cui-typography-label-line-height);
		}

		label {
			color: var(--cui-text-default);
			font-weight: var(--cui-typography-label-font-weight);
			cursor: pointer;
		}

		.hint {
			color: var(--cui-text-muted);
		}

		/* 24px circle, 2px control boundary; checked: control.on ring and a 12px dot (D2). */
		:global(.cui-radio-circle) {
			position: relative;
			flex: none;
			box-sizing: border-box;
			width: var(--cui-size-checkbox);
			height: var(--cui-size-checkbox);
			margin: 0;
			padding: 0;
			border: var(--cui-border-width-control) solid var(--cui-border-control);
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-surface-default);
			cursor: pointer;
			transition: border-color var(--cui-duration-fast) var(--cui-easing-standard);
		}

		:global(.cui-radio-circle[data-state='checked']) {
			border-color: var(--cui-control-on);
		}

		:global(.cui-radio-circle[data-state='checked'])::after {
			content: '';
			position: absolute;
			inset: 4px;
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-control-on);
		}

		:global([data-invalid]) :global(.cui-radio-circle) {
			border-color: var(--cui-status-error-fill);
		}

		/* 32px colour disc. Selected: a 2px control.on ring outside a 2px surface gap, so it
		   reads on any fill. Focus ring sits outside that. */
		:global(.cui-radio-swatch) {
			display: inline-grid;
			flex: none;
			place-items: center;
			box-sizing: border-box;
			width: var(--cui-size-control-s);
			height: var(--cui-size-control-s);
			margin: 0;
			padding: 0;
			border: 0;
			border-radius: var(--cui-radius-full);
			background-color: var(--_swatch);
			color: var(--cui-text-default);
			cursor: pointer;
			transition: box-shadow var(--cui-duration-fast) var(--cui-easing-standard);
		}

		:global(.cui-radio-swatch[data-outlined]) {
			border: var(--cui-border-width-control) solid var(--cui-border-control);
			background-color: var(--cui-surface-default);
		}

		:global(.cui-radio-swatch[data-state='checked']) {
			box-shadow:
				0 0 0 2px var(--cui-surface-default),
				0 0 0 4px var(--cui-control-on);
		}

		:global(.cui-radio-swatch:focus-visible) {
			outline-offset: 6px;
		}

		.glyph {
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-font-weight-bold);
			line-height: 1;
		}

		@media (hover: hover) {
			:global(.cui-radio-circle:not([data-disabled]):hover) {
				box-shadow: 0 0 0 4px var(--cui-action-hover);
			}

			:global(.cui-radio-swatch:not([data-disabled], [data-state='checked']):hover) {
				box-shadow:
					0 0 0 2px var(--cui-surface-default),
					0 0 0 4px var(--cui-border-control);
			}
		}

		[data-disabled] label,
		:global(.cui-radio-circle[data-disabled]),
		:global(.cui-radio-swatch[data-disabled]) {
			cursor: not-allowed;
		}

		/* A single disabled option inside an enabled group. */
		:global(.cui-radio-group:not([data-disabled])) .cui-radio[data-disabled],
		:global(.cui-radio-group:not([data-disabled]) .cui-radio-swatch[data-disabled]) {
			opacity: 0.4;
		}
	}
</style>
