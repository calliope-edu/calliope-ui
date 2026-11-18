<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type BannerTone = 'info' | 'success' | 'warning' | 'error';

	export type BannerProps = {
		/** Success, warning and error show a status disc; info shows no icon. */
		tone?: BannerTone;
		/** Short headline in bold; the children follow as the message. */
		title?: string;
		/** A spinner in place of the status icon while something is under way (sets aria-busy). */
		busy?: boolean;
		/** Message under the headline (text, or a ProgressBar). */
		children?: Snippet;
		/** Buttons centred on the message, e.g. Button size s secondary. */
		actions?: Snippet;
		/** Shows a close button; the banner itself does not hide, the app removes it. */
		onDismiss?: () => void;
		dismissLabel?: string;
		/**
		 * Raised surface with the menu shadow and content width, for a banner that floats over the
		 * page (the app positions it). Default: flat, full width, in the page flow.
		 */
		floating?: boolean;
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
	import Spinner from '../Spinner/Spinner.svelte';

	let {
		tone = 'info',
		title,
		busy = false,
		children,
		actions,
		onDismiss,
		dismissLabel = 'Schließen',
		floating = false,
		live,
		...rest
	}: BannerProps = $props();

	const icons: Record<Exclude<BannerTone, 'info'>, IconName> = {
		success: 'check',
		warning: 'warning',
		error: 'error'
	};

	const liveRole = $derived(live ?? (tone === 'error' ? 'alert' : 'status'));
	const role = $derived(liveRole === 'none' ? undefined : liveRole);
	const hasBody = $derived(!!children || !!actions);
</script>

{#snippet body()}
	<div class="body">
		{#if children}<div class="message">{@render children()}</div>{/if}
		{#if actions}<div class="actions">{@render actions()}</div>{/if}
	</div>
{/snippet}

<div
	class="cui-banner"
	data-tone={tone}
	data-floating={floating || undefined}
	data-titled={title ? '' : undefined}
	{role}
	aria-busy={busy || undefined}
	{...rest}
>
	<!-- The status colour lives in the icon alone: no stripe, no tinted background. -->
	<div class="head">
		{#if busy}
			<span class="lead" aria-hidden="true"><Spinner size="s" /></span>
		{:else if tone !== 'info'}
			<span class="lead disc" aria-hidden="true"><Icon name={icons[tone]} size="s" /></span>
		{/if}
		{#if title}
			<p class="title">{title}</p>
		{:else if hasBody}
			<!-- Without a headline the message takes its place in the heading row. -->
			{@render body()}
		{/if}
		{#if onDismiss}
			<div class="dismiss">
				<IconButton
					icon="close"
					label={dismissLabel}
					size="s"
					tooltip={false}
					onclick={onDismiss}
				/>
			</div>
		{/if}
	</div>
	{#if title && hasBody}{@render body()}{/if}
</div>

<style>
	@layer calliope.components {
		.cui-banner {
			--_fill: var(--cui-status-info-fill);
			--_on: var(--cui-status-info-on);

			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			gap: var(--cui-space-1);
			padding: var(--cui-space-2) var(--cui-space-2) var(--cui-space-2) var(--cui-space-4);
			border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
			border-radius: var(--cui-radius-lg);
			background-color: var(--cui-surface-default);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-body-font-family);
			font-size: var(--cui-typography-label-font-size);
			line-height: var(--cui-typography-body-line-height);
		}

		/* A message row under the headline needs a little more room at the bottom. */
		.cui-banner[data-titled]:has(> .body) {
			padding-bottom: var(--cui-space-3);
		}

		/* Without the X the right edge gets the same room as the left. */
		.cui-banner:not(:has(.dismiss)) {
			padding-right: var(--cui-space-4);
		}

		.cui-banner[data-floating] {
			width: max-content;
			max-width: min(45rem, 100%);
			background-color: var(--cui-surface-raised);
			box-shadow: var(--cui-shadow-menu);
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

		/* Icon, headline and X on one row, as tall as the X. */
		.head {
			display: flex;
			align-items: center;
			gap: var(--cui-space-2);
			min-height: var(--cui-size-control-s);
		}

		.lead {
			display: inline-grid;
			flex: none;
			place-items: center;
			width: var(--cui-size-icon-m);
			height: var(--cui-size-icon-m);
		}

		/* 20px disc with the paired mark colour. */
		.disc {
			border-radius: var(--cui-radius-full);
			background-color: var(--_fill);
			color: var(--_on);
		}

		.title {
			flex: 1;
			min-width: 0;
			margin: 0;
			font-weight: var(--cui-font-weight-semibold);
		}

		.dismiss {
			flex: none;
			margin-left: auto;
		}

		/* Message and buttons, the buttons centred on the text; they wrap below when narrow. */
		.body {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: var(--cui-space-2) var(--cui-space-3);
		}

		.cui-banner:has(.dismiss) > .body {
			padding-right: var(--cui-space-2);
		}

		.head > .body {
			flex: 1;
			min-width: 0;
		}

		/*
		 * Grows from nothing, so long text shrinks beside the buttons; below 12rem they wrap. The
		 * floor is in rem and vw, not %, so it also counts when a floating banner sizes to its content.
		 */
		.message {
			flex: 1 1 0;
			min-width: min(12rem, 50vw);
		}

		/* Under a headline the message is secondary; alone it is the content. */
		[data-titled] .message {
			color: var(--cui-text-muted);
		}

		.message :global(p) {
			margin: 0;
		}

		.message :global(.cui-progress-bar) {
			width: 18rem;
			max-width: 100%;
		}

		.actions {
			display: flex;
			flex: none;
			flex-wrap: wrap;
			align-items: center;
			gap: var(--cui-space-2);
		}
	}
</style>
