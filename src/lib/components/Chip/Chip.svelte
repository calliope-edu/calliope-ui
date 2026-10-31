<script lang="ts" module>
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { IconName } from '../../icons/icons.js';

	export type ChipProps = {
		/** Short text. Also names the remove button ("Apfel entfernen"). */
		label: string;
		/** Makes it a filter toggle (aria-pressed). Leave undefined for a removable chip. */
		selected?: boolean;
		onSelectedChange?: (selected: boolean) => void;
		/** Shows a remove button; the chip becomes a value with an action, not a toggle. */
		onRemove?: () => void;
		/** Accessible name of the remove button; the label is put in front ("Apfel entfernen"). */
		removeLabel?: string;
		/** Colour marker before the label (device colour, data series): any CSS colour. */
		swatch?: string;
		icon?: IconName;
		disabled?: boolean;
	} & Omit<HTMLButtonAttributes, 'children' | 'type'>;
</script>

<script lang="ts">
	import Icon from '../Icon/Icon.svelte';

	let {
		label,
		selected = $bindable(),
		onSelectedChange,
		onRemove,
		removeLabel = 'entfernen',
		swatch,
		icon,
		disabled = false,
		onclick,
		...rest
	}: ChipProps = $props();

	const toggle = $derived(selected !== undefined);

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		onclick?.(event);
		if (event.defaultPrevented || !toggle) return;
		selected = !selected;
		onSelectedChange?.(selected);
	}
</script>

{#snippet content()}
	{#if toggle && selected}<Icon name="check" size="s" />{:else if icon}<Icon
			name={icon}
			size="s"
		/>{/if}
	{#if swatch}<span class="swatch" style:background-color={swatch} aria-hidden="true"></span>{/if}
	<span class="label">{label}</span>
{/snippet}

{#if onRemove}
	<!-- A value with an action: the text is static, the remove button is the target. -->
	<span class="cui-chip" data-removable data-disabled={disabled || undefined}>
		{@render content()}
		<button
			type="button"
			class="remove"
			aria-label="{label} {removeLabel}"
			{disabled}
			onclick={() => onRemove?.()}
		>
			<Icon name="close" size="s" />
		</button>
	</span>
{:else}
	<button
		type="button"
		class="cui-chip"
		data-selected={selected || undefined}
		aria-pressed={toggle ? selected : undefined}
		{disabled}
		{...rest}
		onclick={handleClick}
	>
		{@render content()}
	</button>
{/if}

<style>
	@layer calliope.components {
		/* Press me: a pill. */
		.cui-chip {
			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			gap: var(--cui-space-1);
			max-width: 100%;
			height: var(--cui-size-control-s);
			margin: 0;
			padding: 0 var(--cui-space-3);
			border: var(--cui-border-width-hairline) solid var(--cui-border-control);
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-surface-default);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			line-height: 1;
			white-space: nowrap;
			vertical-align: middle;
			-webkit-tap-highlight-color: transparent;
			transition:
				background-color var(--cui-duration-fast) var(--cui-easing-standard),
				color var(--cui-duration-fast) var(--cui-easing-standard);
		}

		button.cui-chip {
			cursor: pointer;
		}

		.label {
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.swatch {
			flex: none;
			width: 0.625rem;
			height: 0.625rem;
			border-radius: var(--cui-radius-full);
		}

		/* Selected filter: control.on fill with its mark colour (D2), plus the check. */
		.cui-chip[data-selected] {
			border-color: var(--cui-control-on);
			background-color: var(--cui-control-on);
			color: var(--cui-control-on-mark);
		}

		@media (hover: hover) {
			button.cui-chip:not(:disabled, [data-selected]):hover {
				background-image: linear-gradient(var(--cui-action-hover), var(--cui-action-hover));
			}

			.remove:not(:disabled):hover {
				background-color: var(--cui-action-hover);
			}
		}

		[data-removable] {
			padding-right: var(--cui-space-1);
		}

		/* 24px target, inside the 32px pill. */
		.remove {
			display: inline-grid;
			flex: none;
			place-items: center;
			width: var(--cui-size-touch-min);
			height: var(--cui-size-touch-min);
			margin: 0;
			padding: 0;
			border: 0;
			border-radius: var(--cui-radius-full);
			background: none;
			color: inherit;
			cursor: pointer;
		}

		.remove:focus-visible {
			outline-offset: 0;
		}

		.cui-chip:disabled,
		[data-disabled] {
			opacity: 0.4;
			cursor: not-allowed;
		}

		.remove:disabled {
			cursor: not-allowed;
		}
	}
</style>
