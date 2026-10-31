<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type BannerTone = 'info' | 'success' | 'warning' | 'error';

	export type BannerProps = {
		tone?: BannerTone;
		/** Short headline in bold; the children follow as the message. */
		title?: string;
		children?: Snippet;
		/** Buttons after the message, e.g. one secondary Button size s. */
		actions?: Snippet;
		/** Shows a close button; the banner itself does not hide, the app removes it. */
		onDismiss?: () => void;
		dismissLabel?: string;
		/**
		 * Override the live role. Default: alert for error, status for the rest. Use "none" for a
		 * banner that is on the page from the start and need not be announced.
		 */
		live?: 'status' | 'alert' | 'none';
	} & HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
	import type { IconName } from '../../icons/icons.js';
	import Icon from '../Icon/Icon.svelte';
	import IconButton from '../IconButton/IconButton.svelte';

	let {
		tone = 'info',
		title,
		children,
		actions,
		onDismiss,
		dismissLabel = 'Schließen',
		live,
		...rest
	}: BannerProps = $props();

	const icons: Record<BannerTone, IconName> = {
		info: 'info',
		success: 'check',
		warning: 'warning',
		error: 'error'
	};

	const liveRole = $derived(live ?? (tone === 'error' ? 'alert' : 'status'));
	const role = $derived(liveRole === 'none' ? undefined : liveRole);
</script>

<div class="cui-banner" data-tone={tone} {role} {...rest}>
	<!-- Status colour as stripe and icon disc, never as a tinted background. -->
	<span class="disc" aria-hidden="true"><Icon name={icons[tone]} size="s" /></span>
	<div class="body">
		{#if title}<p class="title">{title}</p>{/if}
		{#if children}<div class="message">{@render children()}</div>{/if}
	</div>
	{#if actions}<div class="actions">{@render actions()}</div>{/if}
	{#if onDismiss}
		<div class="dismiss">
			<IconButton icon="close" label={dismissLabel} size="s" tooltip={false} onclick={onDismiss} />
		</div>
	{/if}
</div>

<style>
	@layer calliope.components {
		.cui-banner {
			--_fill: var(--cui-status-info-fill);
			--_on: var(--cui-status-info-on);

			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			align-items: flex-start;
			gap: var(--cui-space-2) var(--cui-space-3);
			padding: var(--cui-space-3) var(--cui-space-3) var(--cui-space-3) var(--cui-space-4);
			border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
			border-left: 4px solid var(--_fill);
			border-radius: var(--cui-radius-lg);
			background-color: var(--cui-surface-default);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-body-font-family);
			font-size: var(--cui-typography-body-font-size);
			line-height: var(--cui-typography-body-line-height);
		}

		[data-tone='success'] {
			--_fill: var(--cui-status-success-fill);
			--_on: var(--cui-status-success-on);
		}
		[data-tone='warning'] {
			--_fill: var(--cui-status-warning-fill);
			--_on: var(--cui-status-warning-on);
		}
		[data-tone='error'] {
			--_fill: var(--cui-status-error-fill);
			--_on: var(--cui-status-error-on);
		}

		/* 24px disc with the paired mark colour, optically on the first line. */
		.disc {
			display: inline-grid;
			flex: none;
			place-items: center;
			width: var(--cui-size-icon-l);
			height: var(--cui-size-icon-l);
			margin-top: -0.0625rem;
			border-radius: var(--cui-radius-full);
			background-color: var(--_fill);
			color: var(--_on);
		}

		.body {
			flex: 1 1 16rem;
			min-width: 0;
		}

		.title {
			margin: 0;
			font-weight: var(--cui-font-weight-semibold);
		}

		.message :global(p) {
			margin: 0;
		}

		.title + .message {
			margin-top: var(--cui-space-1);
		}

		.actions {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: var(--cui-space-2);
		}

		.dismiss {
			margin: calc(-1 * var(--cui-space-1)) calc(-1 * var(--cui-space-1)) 0 0;
		}
	}
</style>
