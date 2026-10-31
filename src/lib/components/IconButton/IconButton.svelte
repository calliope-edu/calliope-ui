<script lang="ts" module>
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { IconName } from '../../icons/icons.js';
	import type { ButtonSize } from '../Button/Button.svelte';

	export type IconButtonVariant = 'primary' | 'secondary' | 'ghost';

	export type IconButtonProps = {
		icon: IconName;
		/** Required accessible name (aria-label); also the tooltip text. */
		label: string;
		/** ghost (default) · secondary (2px outline) · primary (ink fill). */
		variant?: IconButtonVariant;
		/** s / m / l = 32 / 36 / 40px circle. The hit area never drops below 24px. */
		size?: ButtonSize;
		/** Show the label as a tooltip on hover and focus. The aria-label names the button either way. */
		tooltip?: boolean;
		pressed?: boolean;
		loading?: boolean;
		ref?: HTMLButtonElement | null;
	} & Omit<HTMLButtonAttributes, 'children' | 'aria-label'>;
</script>

<script lang="ts">
	import Icon from '../Icon/Icon.svelte';
	import Spinner from '../Spinner/Spinner.svelte';
	import Tooltip from '../Tooltip/Tooltip.svelte';

	let {
		icon,
		label,
		variant = 'ghost',
		size = 'm',
		tooltip = true,
		pressed,
		loading = false,
		ref = $bindable(null),
		onclick,
		...rest
	}: IconButtonProps = $props();

	const iconSize = $derived(size === 'l' ? 'l' : size === 's' ? 's' : 'm');

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (loading) {
			event.preventDefault();
			return;
		}
		onclick?.(event);
	}
</script>

{#snippet button(props: Record<string, unknown> = {})}
	<button
		bind:this={ref}
		type="button"
		class="cui-icon-button"
		data-variant={variant}
		data-size={size}
		aria-label={label}
		aria-pressed={pressed}
		aria-busy={loading || undefined}
		{...props}
		{...rest}
		onclick={(event) => {
			(props.onclick as ((e: MouseEvent) => void) | undefined)?.(event);
			handleClick(event);
		}}
	>
		{#if loading}<Spinner size={iconSize} />{:else}<Icon name={icon} size={iconSize} />{/if}
	</button>
{/snippet}

{#if tooltip}
	<Tooltip text={label}>
		{#snippet trigger({ props })}
			{@render button(props)}
		{/snippet}
	</Tooltip>
{:else}
	{@render button()}
{/if}

<style>
	@layer calliope.components {
		.cui-icon-button {
			--_size: var(--cui-size-control-m);
			--_bg: transparent;
			--_fg: var(--cui-text-default);
			--_line: transparent;

			box-sizing: border-box;
			display: inline-grid;
			flex: none;
			place-items: center;
			width: var(--_size);
			height: var(--_size);
			min-width: var(--cui-size-touch-min);
			min-height: var(--cui-size-touch-min);
			margin: 0;
			padding: 0;
			border: var(--cui-border-width-button) solid var(--_line);
			border-radius: var(--cui-radius-full);
			background-color: var(--_bg);
			color: var(--_fg);
			cursor: pointer;
			-webkit-tap-highlight-color: transparent;
			transition:
				background-color var(--cui-duration-fast) var(--cui-easing-standard),
				color var(--cui-duration-fast) var(--cui-easing-standard);
		}

		.cui-icon-button[data-size='s'] {
			--_size: var(--cui-size-control-s);
		}

		.cui-icon-button[data-size='l'] {
			--_size: var(--cui-size-control-l);
		}

		.cui-icon-button[data-variant='primary'] {
			--_bg: var(--cui-action-primary-bg);
			--_fg: var(--cui-action-primary-fg);
			--_line: var(--_bg);
		}

		.cui-icon-button[data-variant='secondary'] {
			--_line: var(--cui-border-strong);
		}

		@media (hover: hover) {
			.cui-icon-button:not(:disabled, [aria-busy='true']):hover {
				background-image: linear-gradient(var(--cui-action-hover), var(--cui-action-hover));
			}

			.cui-icon-button[data-variant='primary']:not(:disabled, [aria-busy='true']):hover {
				--_bg: var(--cui-action-primary-bg-hover);
				background-image: none;
			}
		}

		.cui-icon-button[aria-pressed='true']:not([data-variant='primary']) {
			--_bg: var(--cui-surface-inverse);
			--_fg: var(--cui-text-inverse);
			--_line: var(--cui-surface-inverse);
			background-image: none;
		}

		.cui-icon-button:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}

		.cui-icon-button[aria-busy='true'] {
			cursor: progress;
		}
	}
</style>
