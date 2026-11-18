<script lang="ts">
	/*
	 * The banner of mini-connection-widget (src/ui/ConnectionBanner.svelte), without its stores.
	 * The heading row holds an optional status icon (a disc in the status colour, or a spinner while
	 * busy), the headline and the X; the row below holds the text with its buttons centred on it.
	 * No side stripe and no tinted background: the status lives in the icon. In the widget it floats
	 * top centre over the page; here it sits in the flow.
	 */
	import type { Snippet } from 'svelte';
	import type { IconName } from '../../../lib/icons/icons.js';
	import Icon from '../../../lib/components/Icon/Icon.svelte';
	import IconButton from '../../../lib/components/IconButton/IconButton.svelte';
	import Spinner from '../../../lib/components/Spinner/Spinner.svelte';

	type Tone = 'success' | 'warning' | 'error';

	type Props = {
		title: string;
		/** A status disc for success, warning, error; none for plain information. */
		tone?: Tone;
		/** A spinner in place of the status icon while something is under way. */
		busy?: boolean;
		/** Message under the headline (text, or a ProgressBar). */
		children?: Snippet;
		/** Buttons centred on the message. */
		actions?: Snippet;
	};

	let { title, tone, busy = false, children, actions }: Props = $props();

	const icons: Record<Tone, IconName> = { success: 'check', warning: 'warning', error: 'error' };
</script>

<div class="toast" data-tone={tone} role="status">
	<div class="head">
		{#if busy}
			<span class="lead" aria-hidden="true"><Spinner size="s" /></span>
		{:else if tone}
			<span class="lead disc" aria-hidden="true"><Icon name={icons[tone]} size="s" /></span>
		{/if}
		<strong class="title">{title}</strong>
		<IconButton icon="close" label="Ausblenden" size="s" />
	</div>

	{#if children || actions}
		<div class="row">
			<div class="text">{@render children?.()}</div>
			{#if actions}<div class="actions">{@render actions()}</div>{/if}
		</div>
	{/if}
</div>

<style>
	.toast {
		--_fill: var(--cui-status-info-fill);
		--_on: var(--cui-status-info-on);

		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-1);
		width: max-content;
		max-width: min(45rem, 100%);
		padding: var(--cui-space-2) var(--cui-space-2) var(--cui-space-3) var(--cui-space-4);
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-lg);
		background-color: var(--cui-surface-raised);
		box-shadow: var(--cui-shadow-menu);
		color: var(--cui-text-default);
		font-family: var(--cui-typography-body-font-family);
		font-size: var(--cui-typography-label-font-size);
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

	.head {
		display: flex;
		align-items: center;
		gap: var(--cui-space-2);
		min-height: var(--cui-size-control-s);
	}

	.title {
		flex: 1;
		min-width: 0;
		font-weight: var(--cui-font-weight-semibold);
	}

	.lead {
		display: inline-grid;
		flex: none;
		place-items: center;
	}

	/* 20px disc with the paired mark colour. */
	.disc {
		width: var(--cui-size-icon-m);
		height: var(--cui-size-icon-m);
		border-radius: var(--cui-radius-full);
		background-color: var(--_fill);
		color: var(--_on);
	}

	.row {
		display: flex;
		align-items: center;
		gap: var(--cui-space-3);
		padding-right: var(--cui-space-2);
	}

	.text {
		flex: 1;
		min-width: 0;
		color: var(--cui-text-muted);
	}

	.text :global(.cui-progress-bar) {
		min-width: 18rem;
	}

	.actions {
		display: flex;
		flex: none;
		flex-wrap: wrap;
		gap: var(--cui-space-2);
	}

	@media (max-width: 520px) {
		.row {
			flex-direction: column;
			align-items: flex-start;
		}

		.actions {
			align-self: stretch;
		}
	}
</style>
