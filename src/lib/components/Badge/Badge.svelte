<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { IconName } from '../../icons/icons.js';
	import type { Identity } from '../Button/Button.svelte';

	export type BadgeTone =
		'neutral' | 'success' | 'warning' | 'error' | 'info' | 'highlight' | 'identity';
	export type BadgeSize = 's' | 'm';

	export type BadgeProps = {
		/** neutral = subtle fill · status tones · highlight ("neu") · identity (product or editor). */
		tone?: BadgeTone;
		/** Which identity fill `tone="identity"` uses. */
		identity?: Identity;
		/** s = 12px caption (metadata) · m = 14px label (anything read from a distance). */
		size?: BadgeSize;
		/** Icon before the text; status badges should carry one so colour is never alone. */
		icon?: IconName;
		/** Colour marker before the text (device colour, data series): any CSS colour. */
		swatch?: string;
		children: Snippet;
	} & HTMLAttributes<HTMLSpanElement>;
</script>

<script lang="ts">
	import Icon from '../Icon/Icon.svelte';

	let {
		tone = 'neutral',
		identity = 'makecode',
		size = 's',
		icon,
		swatch,
		children,
		...rest
	}: BadgeProps = $props();
</script>

<span
	class="cui-badge"
	data-tone={tone}
	data-identity={tone === 'identity' ? identity : undefined}
	data-size={size}
	{...rest}
>
	{#if icon}<Icon name={icon} size="s" />{/if}
	{#if swatch}<span class="swatch" style:background-color={swatch} aria-hidden="true"></span>{/if}
	<span class="text">{@render children()}</span>
</span>

<style>
	@layer calliope.components {
		/* Read me, not press me: a rounded rectangle (radius.md), never a pill. */
		.cui-badge {
			--_bg: var(--cui-surface-subtle);
			--_fg: var(--cui-text-default);

			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			gap: var(--cui-space-1);
			max-width: 100%;
			height: 1.25rem;
			padding: 0 var(--cui-space-2);
			border-radius: var(--cui-radius-md);
			background-color: var(--_bg);
			color: var(--_fg);
			font-family: var(--cui-typography-caption-font-family);
			font-size: var(--cui-typography-caption-font-size);
			font-weight: var(--cui-font-weight-semibold);
			line-height: 1;
			white-space: nowrap;
			vertical-align: middle;
		}

		.cui-badge[data-size='m'] {
			height: var(--cui-size-checkbox);
			font-size: var(--cui-typography-label-font-size);
		}

		.swatch {
			flex: none;
			width: 0.5rem;
			height: 0.5rem;
			border-radius: var(--cui-radius-full);
		}

		.text {
			overflow: hidden;
			text-overflow: ellipsis;
		}

		/* Every fill with its paired text colour; nothing else goes on it. */
		[data-tone='success'] {
			--_bg: var(--cui-status-success-fill);
			--_fg: var(--cui-status-success-on);
		}
		[data-tone='warning'] {
			--_bg: var(--cui-status-warning-fill);
			--_fg: var(--cui-status-warning-on);
		}
		[data-tone='error'] {
			--_bg: var(--cui-status-error-fill);
			--_fg: var(--cui-status-error-on);
		}
		[data-tone='info'] {
			--_bg: var(--cui-status-info-fill);
			--_fg: var(--cui-status-info-on);
		}
		[data-tone='highlight'] {
			--_bg: var(--cui-accent-highlight);
			--_fg: var(--cui-accent-highlight-on);
		}
		[data-identity='ki-training'] {
			--_bg: var(--cui-identity-ki-training-fill);
			--_fg: var(--cui-identity-ki-training-on);
		}
		[data-identity='teachable'] {
			--_bg: var(--cui-identity-teachable-fill);
			--_fg: var(--cui-identity-teachable-on);
		}
		[data-identity='iot'] {
			--_bg: var(--cui-identity-iot-fill);
			--_fg: var(--cui-identity-iot-on);
		}
		[data-identity='robotik'] {
			--_bg: var(--cui-identity-robotik-fill);
			--_fg: var(--cui-identity-robotik-on);
		}
		[data-identity='makecode'] {
			--_bg: var(--cui-identity-makecode-fill);
			--_fg: var(--cui-identity-makecode-on);
		}
		[data-identity='python'] {
			--_bg: var(--cui-identity-python-fill);
			--_fg: var(--cui-identity-python-on);
		}
		[data-identity='blocks'] {
			--_bg: var(--cui-identity-blocks-fill);
			--_fg: var(--cui-identity-blocks-on);
		}
		[data-identity='markdown'] {
			--_bg: var(--cui-identity-markdown-fill);
			--_fg: var(--cui-identity-markdown-on);
		}
	}
</style>
