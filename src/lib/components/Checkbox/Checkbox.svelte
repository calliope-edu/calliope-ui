<script lang="ts" module>
	export type CheckboxProps = {
		checked?: boolean;
		onCheckedChange?: (checked: boolean) => void;
		/** "Some of them": shown as a bar, announced as mixed. Cleared by the next click. */
		indeterminate?: boolean;
		/** Visible label; says what is chosen ("Zeit anzeigen"). */
		label: string;
		/** Help text, linked with aria-describedby. */
		hint?: string;
		/** Error message, e.g. a required consent that is missing. Sets aria-invalid. */
		error?: string;
		disabled?: boolean;
		required?: boolean;
		/** Form field name; the checkbox submits `value` (default "on") when checked. */
		name?: string;
		value?: string;
		id?: string;
	};
</script>

<script lang="ts">
	import { Checkbox } from 'bits-ui';
	import FieldHint from '../TextField/FieldHint.svelte';

	let {
		checked = $bindable(false),
		onCheckedChange,
		indeterminate = $bindable(false),
		label,
		hint,
		error,
		disabled = false,
		required = false,
		name,
		value,
		id: idProp
	}: CheckboxProps = $props();

	const uid = $props.id();
	const id = $derived(idProp ?? `cui-checkbox-${uid}`);
	const hintId = $derived(`${id}-hint`);
	const errorId = $derived(`${id}-error`);
	const describedBy = $derived(
		[hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
	);
</script>

<div
	class="cui-checkbox"
	data-disabled={disabled || undefined}
	data-invalid={error ? true : undefined}
>
	<div class="row">
		<Checkbox.Root
			{id}
			bind:checked
			bind:indeterminate
			{onCheckedChange}
			{disabled}
			{required}
			{name}
			{value}
			class="cui-checkbox-box"
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={describedBy}
		>
			{#snippet children({ checked, indeterminate })}
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					{#if indeterminate}
						<rect x="6" y="11" width="12" height="2.5" rx="1.25" />
					{:else if checked}
						<path d="M9.55 17.2 4.6 12.25l1.75-1.75 3.2 3.2 8.1-8.1 1.75 1.75z" />
					{/if}
				</svg>
			{/snippet}
		</Checkbox.Root>
		<label for={id}>{label}</label>
	</div>
	{#if hint}<FieldHint id={hintId}>{hint}</FieldHint>{/if}
	<div class="message" aria-live="polite">
		{#if error}<FieldHint id={errorId} tone="error">{error}</FieldHint>{/if}
	</div>
</div>

<style>
	@layer calliope.components {
		.cui-checkbox {
			display: flex;
			flex-direction: column;
			gap: var(--cui-space-1);
		}

		.row {
			display: flex;
			align-items: flex-start;
			gap: var(--cui-space-3);
		}

		/* Hint and error line up with the label, not with the box. */
		.cui-checkbox > :global(.cui-field-hint),
		.message {
			padding-left: calc(var(--cui-size-checkbox) + var(--cui-space-3));
		}

		.message:empty {
			display: contents;
		}

		label {
			/* Centres a one-line label on the 24px box and lets longer ones wrap below it. */
			padding-top: calc((var(--cui-size-checkbox) - 1.4em) / 2);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			line-height: var(--cui-typography-label-line-height);
			cursor: pointer;
		}

		/* 24px box, 2px control boundary, radius.sm; checked fills with control.on (D2). */
		:global(.cui-checkbox-box) {
			display: inline-grid;
			flex: none;
			place-items: center;
			box-sizing: border-box;
			width: var(--cui-size-checkbox);
			height: var(--cui-size-checkbox);
			margin: 0;
			padding: 0;
			border: var(--cui-border-width-control) solid var(--cui-border-control);
			border-radius: var(--cui-radius-sm);
			background-color: var(--cui-surface-default);
			color: var(--cui-control-on-mark);
			cursor: pointer;
			transition:
				background-color var(--cui-duration-fast) var(--cui-easing-standard),
				border-color var(--cui-duration-fast) var(--cui-easing-standard);
		}

		:global(.cui-checkbox-box svg) {
			width: 20px;
			height: 20px;
			fill: currentColor;
		}

		:global(.cui-checkbox-box[data-state='checked']),
		:global(.cui-checkbox-box[data-state='indeterminate']) {
			border-color: var(--cui-control-on);
			background-color: var(--cui-control-on);
		}

		[data-invalid] :global(.cui-checkbox-box:not([data-state='checked'])) {
			border-color: var(--cui-status-error-fill);
		}

		@media (hover: hover) {
			:global(.cui-checkbox-box:not([data-disabled]):hover) {
				box-shadow: 0 0 0 4px var(--cui-action-hover);
			}
		}

		.cui-checkbox[data-disabled] {
			opacity: 0.4;
		}

		[data-disabled] label,
		:global(.cui-checkbox-box[data-disabled]) {
			cursor: not-allowed;
		}
	}
</style>
