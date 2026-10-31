<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type DialogSize = 's' | 'm' | 'l';

	export type DialogProps = {
		open?: boolean;
		/** Called with false when the dialog closes (Escape, scrim, close button). */
		onOpenChange?: (open: boolean) => void;
		/** Visible heading; names the dialog (aria-labelledby). */
		title: string;
		/** Optional lead text under the title (aria-describedby). */
		description?: string;
		/** 400 / 600 / 800px wide. */
		size?: DialogSize;
		/** Accessible name of the close button (no built-in text: pass the app's translation). */
		closeLabel?: string;
		/** Show the close button in the header. */
		showClose?: boolean;
		/** Escape and a click on the scrim close it. Turn off only when a choice is required. */
		dismissible?: boolean;
		/** Element to focus on open. Default: the first form field in the body, else the first focusable element. */
		initialFocus?: () => HTMLElement | null | undefined;
		/** Optional trigger; spread `props` onto your own button. Without it, control `open`. */
		trigger?: Snippet<[{ props: Record<string, unknown> }]>;
		children?: Snippet;
		/** Footer, usually the buttons. Primary action last. */
		actions?: Snippet;
	};
</script>

<script lang="ts">
	import { Dialog } from 'bits-ui';
	import IconButton from '../IconButton/IconButton.svelte';
	import './dialog.css';

	let {
		open = $bindable(false),
		onOpenChange,
		title,
		description,
		size = 'm',
		closeLabel = 'Schließen',
		showClose = true,
		dismissible = true,
		initialFocus,
		trigger,
		children,
		actions
	}: DialogProps = $props();

	let body = $state<HTMLElement | null>(null);

	const FIELD = 'input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

	// Focus goes to initialFocus, else the first form field of the body, else bits-ui's
	// default (the first focusable element, usually the close button).
	function handleOpenAutoFocus(event: Event) {
		const target = initialFocus?.() ?? body?.querySelector<HTMLElement>(FIELD);
		if (target) {
			event.preventDefault();
			target.focus();
		}
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	{#if trigger}
		<Dialog.Trigger>
			{#snippet child({ props })}
				{@render trigger({ props })}
			{/snippet}
		</Dialog.Trigger>
	{/if}
	<Dialog.Portal>
		<Dialog.Overlay class="cui-dialog-scrim" />
		<Dialog.Content
			class="cui-dialog"
			data-size={size}
			escapeKeydownBehavior={dismissible ? 'close' : 'ignore'}
			interactOutsideBehavior={dismissible ? 'close' : 'ignore'}
			onOpenAutoFocus={handleOpenAutoFocus}
		>
			<header class="cui-dialog-header">
				<Dialog.Title class="cui-dialog-title">{title}</Dialog.Title>
				{#if showClose}
					<Dialog.Close>
						{#snippet child({ props })}
							<IconButton {...props} icon="close" label={closeLabel} tooltip={false} />
						{/snippet}
					</Dialog.Close>
				{/if}
			</header>
			{#if description}
				<Dialog.Description class="cui-dialog-description">{description}</Dialog.Description>
			{/if}
			{#if children}
				<div class="cui-dialog-body" bind:this={body}>{@render children()}</div>
			{/if}
			{#if actions}
				<footer class="cui-dialog-actions">{@render actions()}</footer>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

<style>
	@layer calliope.components {
		.cui-dialog-header {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: var(--cui-space-4);
		}

		/* The close button sits on the title's line without adding height. */
		.cui-dialog-header > :global(.cui-icon-button) {
			margin: calc(-1 * var(--cui-space-1)) calc(-1 * var(--cui-space-2)) 0 0;
		}
	}
</style>
