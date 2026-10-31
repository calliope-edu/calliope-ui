<script lang="ts" module>
	export type SelectItem = { value: string; label: string; disabled?: boolean };

	export type SelectProps = {
		/** Visible label. Required: a placeholder is never the label. */
		label: string;
		items: SelectItem[];
		/** value of the chosen item; undefined while nothing is chosen. */
		value?: string;
		onValueChange?: (value: string | undefined) => void;
		/** Shown in muted text while nothing is chosen. */
		placeholder?: string;
		/** Help text under the field, linked with aria-describedby. */
		hint?: string;
		/** Error message. Sets aria-invalid and is announced politely. */
		error?: string;
		disabled?: boolean;
		required?: boolean;
		/** Submits the value with a form through a hidden input. */
		name?: string;
		/** id of the trigger button; the label points at it. */
		id?: string;
	};
</script>

<script lang="ts">
	import { Select } from 'bits-ui';
	import Icon from '../Icon/Icon.svelte';
	import '../Menu/menu.css';
	import FieldHint from '../TextField/FieldHint.svelte';
	import Label from '../TextField/Label.svelte';
	import './select.css';

	let {
		label,
		items,
		value = $bindable(),
		onValueChange,
		placeholder,
		hint,
		error,
		disabled = false,
		required = false,
		name,
		id: idProp
	}: SelectProps = $props();

	const uid = $props.id();
	const id = $derived(idProp ?? `cui-select-${uid}`);
	const hintId = $derived(`${id}-hint`);
	const errorId = $derived(`${id}-error`);
	const describedBy = $derived(
		[hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
	);

	let open = $state(false);
	let trigger = $state<HTMLElement | null>(null);
	let keyboard = $state(false);

	const selected = $derived(items.find((item) => item.value === value));
	// The list is portalled to <body>; it takes the theme of a dark band along.
	const theme = $derived(
		open ? (trigger?.closest('[data-theme]')?.getAttribute('data-theme') ?? undefined) : undefined
	);

	// bits-ui uses '' for "nothing chosen"; the public value is undefined then.
	function getValue() {
		return value ?? '';
	}

	function setValue(next: string) {
		value = next || undefined;
		onValueChange?.(value);
	}
</script>

<div
	class="cui-select"
	data-invalid={error ? true : undefined}
	data-disabled={disabled || undefined}
>
	<Label for={id} {required}>{label}</Label>
	<Select.Root
		type="single"
		bind:value={getValue, setValue}
		bind:open
		{items}
		{disabled}
		{required}
		{name}
	>
		<Select.Trigger
			{id}
			bind:ref={trigger}
			aria-invalid={error ? 'true' : undefined}
			aria-required={required ? 'true' : undefined}
			aria-describedby={describedBy}
			onkeydown={() => (keyboard = true)}
		>
			{#snippet child({ props })}
				<button {...props} class="trigger">
					<span class="value" data-placeholder={selected ? undefined : ''}>
						{selected?.label ?? placeholder ?? ''}
					</span>
					<span class="chevron"><Icon name="chevron-down" /></span>
				</button>
			{/snippet}
		</Select.Trigger>
		<Select.Portal>
			<Select.Content
				class="cui-menu cui-listbox"
				data-kind="select"
				data-theme={theme}
				data-keyboard={keyboard || undefined}
				sideOffset={4}
				collisionPadding={8}
				onpointermove={() => (keyboard = false)}
			>
				<Select.Viewport class="cui-listbox-viewport">
					{#each items as item (item.value)}
						<Select.Item
							class="cui-menu-item"
							value={item.value}
							label={item.label}
							disabled={item.disabled}
						>
							{#snippet children({ selected: isSelected })}
								<span class="cui-menu-item-icon">
									{#if isSelected}<Icon name="check" />{/if}
								</span>
								<span class="cui-menu-item-label">{item.label}</span>
							{/snippet}
						</Select.Item>
					{/each}
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
	{#if hint}<FieldHint id={hintId}>{hint}</FieldHint>{/if}
	<!-- Always present, so a message that appears later is announced. -->
	<div class="message" aria-live="polite">
		{#if error}<FieldHint id={errorId} tone="error">{error}</FieldHint>{/if}
	</div>
</div>

<style>
	@layer calliope.components {
		.cui-select {
			display: flex;
			flex-direction: column;
			gap: var(--cui-space-1);
			min-width: 0;
		}

		/* Looks like the TextField input. */
		.trigger {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			gap: var(--cui-space-2);
			width: 100%;
			height: var(--cui-size-field);
			margin: 0;
			padding: 0 var(--cui-space-2) 0 var(--cui-space-3);
			border: var(--cui-border-width-hairline) solid var(--cui-border-control);
			border-radius: var(--cui-radius-md);
			background-color: var(--cui-surface-default);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-body-font-family);
			font-size: var(--cui-typography-body-font-size);
			line-height: var(--cui-typography-body-line-height);
			text-align: start;
			cursor: pointer;
			transition: border-color var(--cui-duration-fast) var(--cui-easing-standard);
		}

		.value {
			flex: 1;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.value[data-placeholder] {
			color: var(--cui-text-muted);
		}

		.chevron {
			display: inline-grid;
			flex: none;
			place-items: center;
			transition: transform var(--cui-duration-fast) var(--cui-easing-standard);
		}

		.trigger[data-state='open'] .chevron {
			transform: rotate(180deg);
		}

		@media (hover: hover) {
			.trigger:not(:disabled, :focus):hover {
				border-color: var(--cui-border-strong);
			}
		}

		/* The global focus ring applies; the offset hugs the field. */
		.trigger:focus-visible {
			outline-offset: 1px;
		}

		/* Error: red 2px boundary (non-text contrast 4.08:1 on white), message beside a red disc. */
		[data-invalid] .trigger {
			border-color: var(--cui-status-error-fill);
			box-shadow: inset 0 0 0 1px var(--cui-status-error-fill);
		}

		.trigger:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}

		/* Stays rendered (a live region that was display: none may not announce); it only
		   gives back the flex gap while empty. */
		.message:empty {
			margin-top: calc(-1 * var(--cui-space-1));
		}
	}
</style>
