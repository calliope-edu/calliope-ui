<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	export type TextFieldProps = {
		/** Visible label. Required: a placeholder is never the label. */
		label: string;
		value?: string | number | null;
		type?: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel' | 'number';
		/** Help text under the field, linked with aria-describedby. */
		hint?: string;
		/** Error message. Sets aria-invalid and is announced politely. */
		error?: string;
		/** Content at the end of the field, e.g. an IconButton that shows a password. */
		end?: Snippet;
		ref?: HTMLInputElement | null;
	} & Omit<HTMLInputAttributes, 'type' | 'value' | 'children'>;
</script>

<script lang="ts">
	import FieldHint from './FieldHint.svelte';
	import Label from './Label.svelte';

	let {
		label,
		value = $bindable(''),
		type = 'text',
		hint,
		error,
		end,
		id: idProp,
		required = false,
		disabled = false,
		ref = $bindable(null),
		'aria-describedby': describedByProp,
		...rest
	}: TextFieldProps = $props();

	const uid = $props.id();
	const id = $derived(idProp ?? `cui-field-${uid}`);
	const hintId = $derived(`${id}-hint`);
	const errorId = $derived(`${id}-error`);
	const describedBy = $derived(
		[describedByProp, hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
	);
</script>

<div
	class="cui-text-field"
	data-invalid={error ? true : undefined}
	data-disabled={disabled || undefined}
>
	<Label for={id} required={required === true}>{label}</Label>
	<div class="control">
		<input
			bind:this={ref}
			bind:value
			{id}
			{type}
			{required}
			{disabled}
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={describedBy}
			{...rest}
		/>
		{#if end}<div class="end">{@render end()}</div>{/if}
	</div>
	{#if hint}<FieldHint id={hintId}>{hint}</FieldHint>{/if}
	<!-- Always present, so a message that appears later is announced. -->
	<div class="message" aria-live="polite">
		{#if error}<FieldHint id={errorId} tone="error">{error}</FieldHint>{/if}
	</div>
</div>

<style>
	@layer calliope.components {
		.cui-text-field {
			display: flex;
			flex-direction: column;
			gap: var(--cui-space-1);
			min-width: 0;
		}

		.control {
			position: relative;
			display: flex;
			align-items: center;
		}

		input {
			box-sizing: border-box;
			width: 100%;
			height: var(--cui-size-field);
			margin: 0;
			padding: 0 var(--cui-space-3);
			border: var(--cui-border-width-hairline) solid var(--cui-border-control);
			border-radius: var(--cui-radius-md);
			background-color: var(--cui-surface-default);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-body-font-family);
			font-size: var(--cui-typography-body-font-size);
			line-height: var(--cui-typography-body-line-height);
			transition: border-color var(--cui-duration-fast) var(--cui-easing-standard);
		}

		.control:has(.end) input {
			padding-right: calc(var(--cui-size-control-s) + var(--cui-space-3));
		}

		input::placeholder {
			color: var(--cui-text-muted);
			opacity: 1;
		}

		@media (hover: hover) {
			input:not(:disabled, :focus):hover {
				border-color: var(--cui-border-strong);
			}
		}

		/* The global focus ring applies; the offset hugs the field. */
		input:focus-visible {
			outline-offset: 1px;
		}

		/* Error: red 2px boundary (non-text contrast 4.08:1 on white), message beside a red disc. */
		[data-invalid] input {
			border-color: var(--cui-status-error-fill);
			box-shadow: inset 0 0 0 1px var(--cui-status-error-fill);
		}

		input:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}

		.end {
			position: absolute;
			right: var(--cui-space-1);
			display: flex;
			align-items: center;
		}

		/* Stays rendered (a live region that was display: none may not announce); it only
		   gives back the flex gap while empty. */
		.message:empty {
			margin-top: calc(-1 * var(--cui-space-1));
		}
	}
</style>
