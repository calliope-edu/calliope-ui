<script lang="ts" module>
	import type { SelectItem } from '../Select/Select.svelte';

	export type ComboboxItem = SelectItem;

	export type ComboboxProps = {
		/** Visible label. Required: a placeholder is never the label. */
		label: string;
		items: ComboboxItem[];
		/** value of the chosen item; undefined while nothing is chosen. */
		value?: string;
		onValueChange?: (value: string | undefined) => void;
		/** What is typed. Shows the label of the chosen item once one is chosen. */
		inputValue?: string;
		placeholder?: string;
		/** Help text under the field, linked with aria-describedby. */
		hint?: string;
		/** Error message. Sets aria-invalid and is announced politely. */
		error?: string;
		disabled?: boolean;
		required?: boolean;
		/** Submits the value with a form through a hidden input. */
		name?: string;
		/** id of the input; the label points at it. */
		id?: string;
		/** Shown, and announced, when nothing matches what is typed. */
		emptyLabel?: string;
		/** Whether an item matches the query. Default: the label contains it, ignoring case. */
		filter?: (item: ComboboxItem, query: string) => boolean;
	};
</script>

<script lang="ts">
	import { Combobox } from 'bits-ui';
	import { untrack } from 'svelte';
	import Icon from '../Icon/Icon.svelte';
	import '../Menu/menu.css';
	import '../Select/select.css';
	import FieldHint from '../TextField/FieldHint.svelte';
	import Label from '../TextField/Label.svelte';

	let {
		label,
		items,
		value = $bindable(),
		onValueChange,
		inputValue = $bindable(''),
		placeholder,
		hint,
		error,
		disabled = false,
		required = false,
		name,
		id: idProp,
		emptyLabel = 'Keine Treffer',
		filter
	}: ComboboxProps = $props();

	const uid = $props.id();
	const id = $derived(idProp ?? `cui-combobox-${uid}`);
	const hintId = $derived(`${id}-hint`);
	const errorId = $derived(`${id}-error`);
	const describedBy = $derived(
		[hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
	);

	let open = $state(false);
	let input = $state<HTMLInputElement | null>(null);
	let keyboard = $state(false);

	const labelOf = (itemValue: string | undefined) =>
		items.find((item) => item.value === itemValue)?.label ?? '';

	// While the input still shows the chosen label, the whole list is offered.
	const query = $derived(inputValue === labelOf(value) ? '' : inputValue.trim());
	const filtered = $derived.by(() => {
		if (!query) return items;
		if (filter) return items.filter((item) => filter(item, query));
		const q = query.toLowerCase();
		// Words that start with the query come first; the first one is highlighted.
		const starts: ComboboxItem[] = [];
		const contains: ComboboxItem[] = [];
		for (const item of items) {
			const text = item.label.toLowerCase();
			if (text.startsWith(q)) starts.push(item);
			else if (text.includes(q)) contains.push(item);
		}
		return [...starts, ...contains];
	});
	const empty = $derived(open && filtered.length === 0);
	// The list is portalled to <body>; it takes the theme of a dark band along.
	const theme = $derived(
		open ? (input?.closest('[data-theme]')?.getAttribute('data-theme') ?? undefined) : undefined
	);

	// A value set from outside shows its label in the input.
	let shownValue = untrack(() => value);
	if (shownValue !== undefined) inputValue = untrack(() => labelOf(shownValue));
	$effect.pre(() => {
		const current = value;
		if (current === shownValue) return;
		shownValue = current;
		untrack(() => (inputValue = labelOf(current)));
	});

	// bits-ui uses '' for "nothing chosen"; the public value is undefined then.
	function getValue() {
		return value ?? '';
	}

	function setValue(next: string) {
		value = next || undefined;
		onValueChange?.(value);
	}

	function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
		inputValue = event.currentTarget.value;
		// Clearing the text clears the choice.
		if (inputValue === '' && value !== undefined) setValue('');
	}

	// On leaving the list: a typed word that is exactly an item picks it; otherwise the input
	// goes back to the chosen label. Typed text without a choice stays, so nothing is lost.
	function handleOpenChange(isOpen: boolean) {
		if (isOpen) return;
		const typed = inputValue.trim().toLowerCase();
		const match = items.find((item) => !item.disabled && item.label.toLowerCase() === typed);
		if (match) {
			if (match.value !== value) setValue(match.value);
			inputValue = match.label;
		} else if (value !== undefined) {
			inputValue = labelOf(value);
		}
	}
</script>

<div
	class="cui-combobox"
	data-invalid={error ? true : undefined}
	data-disabled={disabled || undefined}
>
	<Label for={id} {required}>{label}</Label>
	<Combobox.Root
		type="single"
		bind:value={getValue, setValue}
		bind:open
		onOpenChange={handleOpenChange}
		{inputValue}
		{items}
		{disabled}
		{required}
		{name}
		allowDeselect={false}
	>
		<div class="control">
			<span class="search"><Icon name="search" /></span>
			<Combobox.Input
				{id}
				bind:ref={input}
				{placeholder}
				{required}
				autocomplete="off"
				aria-invalid={error ? 'true' : undefined}
				aria-describedby={describedBy}
				oninput={handleInput}
				onkeydown={() => (keyboard = true)}
			>
				{#snippet child({ props })}<input {...props} />{/snippet}
			</Combobox.Input>
		</div>
		<Combobox.Portal>
			<Combobox.Content
				class="cui-menu cui-listbox"
				data-kind="combobox"
				data-theme={theme}
				data-keyboard={keyboard || undefined}
				sideOffset={4}
				collisionPadding={8}
				onpointermove={() => (keyboard = false)}
			>
				<Combobox.Viewport class="cui-listbox-viewport">
					{#each filtered as item (item.value)}
						<Combobox.Item
							class="cui-menu-item"
							value={item.value}
							label={item.label}
							disabled={item.disabled}
						>
							{#snippet children({ selected })}
								<span class="cui-menu-item-icon">
									{#if selected}<Icon name="check" />{/if}
								</span>
								<span class="cui-menu-item-label">{item.label}</span>
							{/snippet}
						</Combobox.Item>
					{/each}
				</Combobox.Viewport>
				<!-- A listbox may only own options; the live region below speaks this text. -->
				{#if filtered.length === 0}
					<div class="cui-listbox-empty" aria-hidden="true">{emptyLabel}</div>
				{/if}
			</Combobox.Content>
		</Combobox.Portal>
	</Combobox.Root>
	{#if hint}<FieldHint id={hintId}>{hint}</FieldHint>{/if}
	<!-- Always present, so a message that appears later is announced. -->
	<div class="message" aria-live="polite">
		{#if error}<FieldHint id={errorId} tone="error">{error}</FieldHint>{/if}
	</div>
	<div class="visually-hidden" aria-live="polite">{empty ? emptyLabel : ''}</div>
</div>

<style>
	@layer calliope.components {
		.cui-combobox {
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

		.search {
			position: absolute;
			left: var(--cui-space-3);
			display: inline-grid;
			place-items: center;
			color: var(--cui-text-muted);
			pointer-events: none;
		}

		/* Looks like the TextField input, with room for the search icon. */
		input {
			box-sizing: border-box;
			width: 100%;
			height: var(--cui-size-field);
			margin: 0;
			padding: 0 var(--cui-space-3) 0
				calc(var(--cui-space-3) + var(--cui-size-icon-m) + var(--cui-space-2));
			border: var(--cui-border-width-hairline) solid var(--cui-border-control);
			border-radius: var(--cui-radius-md);
			background-color: var(--cui-surface-default);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-body-font-family);
			font-size: var(--cui-typography-body-font-size);
			line-height: var(--cui-typography-body-line-height);
			transition: border-color var(--cui-duration-fast) var(--cui-easing-standard);
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

		[data-disabled] .search {
			opacity: 0.4;
		}

		/* Stays rendered (a live region that was display: none may not announce); it only
		   gives back the flex gap while empty. */
		.message:empty {
			margin-top: calc(-1 * var(--cui-space-1));
		}

		.visually-hidden {
			position: absolute;
			width: 1px;
			height: 1px;
			margin: -1px;
			padding: 0;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
		}
	}
</style>
