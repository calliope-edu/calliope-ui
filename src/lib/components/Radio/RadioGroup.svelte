<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type RadioVariant = 'default' | 'swatch';

	export type RadioGroupProps = {
		/** Visible group label: the question the options answer ("Farbe"). */
		label: string;
		value?: string;
		onValueChange?: (value: string) => void;
		/** default = circles with labels · swatch = colour discs, labels for assistive tech. */
		variant?: RadioVariant;
		/** Vertical by default; swatches line up horizontally. */
		orientation?: 'vertical' | 'horizontal';
		hint?: string;
		error?: string;
		disabled?: boolean;
		required?: boolean;
		name?: string;
		/** Radio items. */
		children: Snippet;
	};

	export const RADIO_CONTEXT = Symbol('cui-radio-group');
	export type RadioContext = { readonly variant: RadioVariant };
</script>

<script lang="ts">
	import { RadioGroup } from 'bits-ui';
	import { setContext } from 'svelte';
	import FieldHint from '../TextField/FieldHint.svelte';

	let {
		label,
		value = $bindable(''),
		onValueChange,
		variant = 'default',
		orientation,
		hint,
		error,
		disabled = false,
		required = false,
		name,
		children
	}: RadioGroupProps = $props();

	setContext<RadioContext>(RADIO_CONTEXT, {
		get variant() {
			return variant;
		}
	});

	const uid = $props.id();
	const labelId = `cui-radio-group-${uid}-label`;
	const hintId = `cui-radio-group-${uid}-hint`;
	const errorId = `cui-radio-group-${uid}-error`;
	const describedBy = $derived(
		[hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
	);
	const direction = $derived(orientation ?? (variant === 'swatch' ? 'horizontal' : 'vertical'));
</script>

<div
	class="cui-radio-group"
	data-variant={variant}
	data-invalid={error ? true : undefined}
	data-disabled={disabled || undefined}
>
	<span class="group-label" id={labelId}>
		{label}{#if required}<span aria-hidden="true"> *</span>{/if}
	</span>
	{#if hint}<FieldHint id={hintId}>{hint}</FieldHint>{/if}
	<RadioGroup.Root
		bind:value
		{onValueChange}
		{disabled}
		{required}
		{name}
		orientation={direction}
		class="cui-radio-options"
		data-orientation={direction}
		aria-labelledby={labelId}
		aria-describedby={describedBy}
		aria-invalid={error ? 'true' : undefined}
	>
		{@render children()}
	</RadioGroup.Root>
	<div class="message" aria-live="polite">
		{#if error}<FieldHint id={errorId} tone="error">{error}</FieldHint>{/if}
	</div>
</div>

<style>
	@layer calliope.components {
		.cui-radio-group {
			display: flex;
			flex-direction: column;
			gap: var(--cui-space-1);
			min-width: 0;
		}

		.group-label {
			color: var(--cui-text-default);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-font-weight-semibold);
			line-height: var(--cui-typography-label-line-height);
		}

		:global(.cui-radio-options) {
			display: flex;
			flex-direction: column;
			gap: var(--cui-space-2);
			margin-top: var(--cui-space-1);
		}

		:global(.cui-radio-options[data-orientation='horizontal']) {
			flex-direction: row;
			flex-wrap: wrap;
			gap: var(--cui-space-2) var(--cui-space-5);
		}

		/* Swatch discs carry a 4px selection ring; the gap leaves room for it. */
		[data-variant='swatch'] :global(.cui-radio-options) {
			gap: var(--cui-space-3);
			padding: var(--cui-space-1);
		}

		.message:empty {
			display: contents;
		}

		.cui-radio-group[data-disabled] {
			opacity: 0.4;
		}
	}
</style>
