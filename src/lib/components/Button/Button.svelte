<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { IconName } from '../../icons/icons.js';

	export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
	export type ButtonTone = 'neutral' | 'positive' | 'negative' | 'identity';
	export type ButtonSize = 's' | 'm' | 'l';
	export type Identity =
		'ki-training' | 'teachable' | 'iot' | 'robotik' | 'makecode' | 'python' | 'blocks' | 'markdown';

	type CommonProps = {
		/** primary = ink fill · secondary = 2px outline · ghost = no border · link = text link. */
		variant?: ButtonVariant;
		/** Colours the fill of a primary button only; other variants stay neutral (no coloured text). */
		tone?: ButtonTone;
		/** Which identity fill `tone="identity"` uses. */
		identity?: Identity;
		/** s / m / l = 32 / 36 / 40px. Pupil-facing views use l (D6). */
		size?: ButtonSize;
		/** Icon before the label. */
		icon?: IconName;
		/** Icon after the label, e.g. chevron-down for a menu trigger. */
		iconEnd?: IconName;
		/** Shows the spinner, keeps the width, sets aria-busy and ignores clicks. */
		loading?: boolean;
		/** Makes it a toggle button (aria-pressed). Keep the label stable; the state is the pressed look. */
		pressed?: boolean;
		/** Stays focusable and announces as disabled (aria-disabled), so a Tooltip can explain why. */
		focusableWhenDisabled?: boolean;
		fullWidth?: boolean;
		children?: Snippet;
		ref?: HTMLElement | null;
	};

	export type ButtonProps = CommonProps &
		(
			| ({ href?: undefined } & Omit<HTMLButtonAttributes, 'children'>)
			| ({ href: string } & Omit<HTMLAnchorAttributes, 'children'> & { disabled?: boolean })
		);
</script>

<script lang="ts">
	import Icon from '../Icon/Icon.svelte';
	import Spinner from '../Spinner/Spinner.svelte';

	let {
		variant = 'primary',
		tone = 'neutral',
		identity = 'makecode',
		size = 'm',
		icon,
		iconEnd,
		loading = false,
		pressed,
		focusableWhenDisabled = false,
		fullWidth = false,
		disabled = false,
		children,
		ref = $bindable(null),
		onclick,
		...rest
	}: ButtonProps = $props();

	const iconSize = $derived(size === 'l' ? 'l' : size === 's' ? 's' : 'm');
	const softDisabled = $derived(disabled && focusableWhenDisabled);
	const inert = $derived(loading || softDisabled);

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) {
		if (inert) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}
		(onclick as ((e: typeof event) => void) | undefined)?.(event);
	}
</script>

{#snippet content()}
	{#if icon}<Icon name={icon} size={iconSize} />{/if}
	{#if children}<span class="label">{@render children()}</span>{/if}
	{#if iconEnd}<Icon name={iconEnd} size={iconSize} />{/if}
	{#if loading}<span class="busy"><Spinner size={iconSize} /></span>{/if}
{/snippet}

{#if rest.href !== undefined}
	<a
		bind:this={ref}
		class="cui-button"
		data-variant={variant}
		data-tone={variant === 'primary' ? tone : undefined}
		data-identity={variant === 'primary' && tone === 'identity' ? identity : undefined}
		data-size={size}
		data-loading={loading || undefined}
		data-full-width={fullWidth || undefined}
		aria-disabled={disabled || undefined}
		aria-busy={loading || undefined}
		{...rest as HTMLAnchorAttributes}
		href={disabled ? undefined : rest.href}
		role={disabled ? 'link' : undefined}
		tabindex={disabled && !focusableWhenDisabled ? -1 : rest.tabindex}
		onclick={handleClick}
	>
		{@render content()}
	</a>
{:else}
	<button
		bind:this={ref}
		type="button"
		class="cui-button"
		data-variant={variant}
		data-tone={variant === 'primary' ? tone : undefined}
		data-identity={variant === 'primary' && tone === 'identity' ? identity : undefined}
		data-size={size}
		data-loading={loading || undefined}
		data-full-width={fullWidth || undefined}
		aria-pressed={pressed}
		aria-busy={loading || undefined}
		aria-disabled={softDisabled || undefined}
		disabled={disabled && !focusableWhenDisabled}
		{...rest as HTMLButtonAttributes}
		onclick={handleClick}
	>
		{@render content()}
	</button>
{/if}

<style>
	@layer calliope.components {
		.cui-button {
			--_height: var(--cui-size-control-m);
			--_pad: var(--cui-space-4);
			--_font-size: var(--cui-font-size-sm);
			/* Outline width per size; Storybook's D3 comparison overrides these three. */
			--_border: var(--cui-button-border-width-m, var(--cui-border-width-button));
			--_bg: transparent;
			--_fg: var(--cui-text-default);
			--_line: transparent;
			--_hover: var(--cui-action-hover);

			position: relative;
			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: var(--cui-space-2);
			min-width: var(--cui-size-touch-min);
			max-width: 100%;
			height: var(--_height);
			margin: 0;
			padding: 0 var(--_pad);
			border: var(--_border) solid var(--_line);
			border-radius: var(--cui-radius-full);
			background-color: var(--_bg);
			color: var(--_fg);
			font-family: var(--cui-typography-action-font-family);
			font-size: var(--_font-size);
			font-weight: var(--cui-typography-action-font-weight);
			line-height: var(--cui-typography-action-line-height);
			letter-spacing: var(--cui-typography-action-letter-spacing);
			text-transform: uppercase;
			text-decoration: none;
			white-space: nowrap;
			cursor: pointer;
			user-select: none;
			-webkit-tap-highlight-color: transparent;
			transition:
				background-color var(--cui-duration-fast) var(--cui-easing-standard),
				border-color var(--cui-duration-fast) var(--cui-easing-standard),
				color var(--cui-duration-fast) var(--cui-easing-standard),
				opacity var(--cui-duration-fast) var(--cui-easing-standard);
		}

		.label {
			overflow: hidden;
			text-overflow: ellipsis;
		}

		/* Sizes: 32 / 36 / 40px, action text 12 / 14 / 16. */
		.cui-button[data-size='s'] {
			--_height: var(--cui-size-control-s);
			--_pad: var(--cui-space-3);
			--_font-size: var(--cui-font-size-xs);
			--_border: var(--cui-button-border-width-s, var(--cui-border-width-button));
			gap: var(--cui-space-1);
		}

		.cui-button[data-size='l'] {
			--_height: var(--cui-size-control-l);
			--_pad: var(--cui-space-5);
			--_font-size: var(--cui-font-size-md);
			--_border: var(--cui-button-border-width-l, var(--cui-border-width-button));
		}

		.cui-button[data-full-width] {
			display: flex;
			width: 100%;
		}

		/* Variants */
		.cui-button[data-variant='primary'] {
			--_bg: var(--cui-action-primary-bg);
			--_fg: var(--cui-action-primary-fg);
			--_line: var(--_bg);
		}

		.cui-button[data-variant='secondary'] {
			--_line: var(--cui-border-strong);
		}

		.cui-button[data-variant='link'] {
			--_fg: var(--cui-text-link);
			--_pad: 0;
			--_height: auto;
			min-height: var(--cui-size-touch-min);
			border: 0;
			border-radius: var(--cui-radius-sm);
			font-family: var(--cui-typography-label-font-family);
			font-weight: var(--cui-font-weight-medium);
			letter-spacing: normal;
			text-transform: none;
		}

		/* Tones fill a primary button with the paired text colour; nothing else is coloured. */
		.cui-button[data-tone='positive'] {
			--_bg: var(--cui-status-success-fill);
			--_fg: var(--cui-status-success-on);
		}

		.cui-button[data-tone='negative'] {
			--_bg: var(--cui-status-error-fill);
			--_fg: var(--cui-status-error-on);
		}

		.cui-button[data-identity='ki-training'] {
			--_bg: var(--cui-identity-ki-training-fill);
			--_fg: var(--cui-identity-ki-training-on);
		}
		.cui-button[data-identity='teachable'] {
			--_bg: var(--cui-identity-teachable-fill);
			--_fg: var(--cui-identity-teachable-on);
		}
		.cui-button[data-identity='iot'] {
			--_bg: var(--cui-identity-iot-fill);
			--_fg: var(--cui-identity-iot-on);
		}
		.cui-button[data-identity='robotik'] {
			--_bg: var(--cui-identity-robotik-fill);
			--_fg: var(--cui-identity-robotik-on);
		}
		.cui-button[data-identity='makecode'] {
			--_bg: var(--cui-identity-makecode-fill);
			--_fg: var(--cui-identity-makecode-on);
		}
		.cui-button[data-identity='python'] {
			--_bg: var(--cui-identity-python-fill);
			--_fg: var(--cui-identity-python-on);
		}
		.cui-button[data-identity='blocks'] {
			--_bg: var(--cui-identity-blocks-fill);
			--_fg: var(--cui-identity-blocks-on);
		}
		.cui-button[data-identity='markdown'] {
			--_bg: var(--cui-identity-markdown-fill);
			--_fg: var(--cui-identity-markdown-on);
		}

		/* Hover: the inverse-hover fill on primary, the fixed hover tint everywhere else.
		   Tone fills get the tint layered on top, never a lighter shade. */
		@media (hover: hover) {
			.cui-button:not([aria-disabled='true'], :disabled, [data-loading]):hover {
				background-image: linear-gradient(var(--_hover), var(--_hover));
			}

			.cui-button[data-variant='primary'][data-tone='neutral']:not(
					[aria-disabled='true'],
					:disabled,
					[data-loading]
				):hover {
				--_bg: var(--cui-action-primary-bg-hover);
				background-image: none;
			}

			.cui-button[data-variant='link']:not([aria-disabled='true']):hover {
				background-image: none;
				text-decoration: underline;
				text-underline-offset: 0.2em;
			}
		}

		.cui-button[data-variant='link']:focus-visible {
			text-decoration: underline;
			text-underline-offset: 0.2em;
		}

		/* Pressed toggle: secondary and ghost flip to the inverse fill. */
		.cui-button[aria-pressed='true']:not([data-variant='primary']) {
			--_bg: var(--cui-surface-inverse);
			--_fg: var(--cui-text-inverse);
			--_line: var(--cui-surface-inverse);
			--_hover: transparent;
		}

		.cui-button:disabled,
		.cui-button[aria-disabled='true'] {
			opacity: 0.4;
			cursor: not-allowed;
		}

		/* Loading keeps the width: the content stays in place, invisible, under the spinner. */
		.cui-button[data-loading] {
			cursor: progress;
		}

		.cui-button[data-loading] > :not(.busy) {
			visibility: hidden;
		}

		.busy {
			position: absolute;
			inset: 0;
			display: grid;
			place-items: center;
		}
	}
</style>
