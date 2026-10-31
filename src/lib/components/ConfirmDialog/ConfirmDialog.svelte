<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type ConfirmTone = 'neutral' | 'negative';

	export type ConfirmDialogProps = {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		title: string;
		description?: string;
		/** A verb that says what happens ("Löschen", "Raum schließen"), never "OK". */
		confirmLabel: string;
		/** Pass null for a notice with a single button (replaces window.alert). */
		cancelLabel?: string | null;
		/** negative: red confirm button, and focus starts on cancel. */
		tone?: ConfirmTone;
		/** May return a promise: the confirm button shows a spinner and the dialog closes when it resolves. It stays open if it rejects. */
		onConfirm?: () => void | Promise<void>;
		/** Cancel button, Escape. */
		onCancel?: () => void;
		/** Extra content between description and buttons, e.g. a TextField (replaces window.prompt). */
		children?: Snippet;
	};
</script>

<script lang="ts">
	import { AlertDialog } from 'bits-ui';
	import Button from '../Button/Button.svelte';
	import '../Dialog/dialog.css';

	let {
		open = $bindable(false),
		onOpenChange,
		title,
		description,
		confirmLabel,
		cancelLabel = 'Abbrechen',
		tone = 'neutral',
		onConfirm,
		onCancel,
		children
	}: ConfirmDialogProps = $props();

	let busy = $state(false);
	let cancelButton = $state<HTMLElement | null>(null);

	function setOpen(value: boolean) {
		open = value;
		onOpenChange?.(value);
	}

	function handleOpenChange(value: boolean) {
		// Escape or the cancel button.
		if (!value && busy) return;
		if (!value) onCancel?.();
		onOpenChange?.(value);
	}

	async function confirm() {
		if (busy) return;
		const result = onConfirm?.();
		if (result instanceof Promise) {
			busy = true;
			try {
				await result;
			} catch {
				busy = false;
				return;
			}
			busy = false;
		}
		setOpen(false);
	}

	function handleOpenAutoFocus(event: Event) {
		if (tone === 'negative' && cancelButton) {
			event.preventDefault();
			cancelButton.focus();
		}
	}
</script>

<AlertDialog.Root bind:open onOpenChange={handleOpenChange}>
	<AlertDialog.Portal>
		<AlertDialog.Overlay class="cui-dialog-scrim" />
		<AlertDialog.Content
			class="cui-dialog cui-confirm-dialog"
			data-size="s"
			onOpenAutoFocus={handleOpenAutoFocus}
			escapeKeydownBehavior={busy ? 'ignore' : 'close'}
		>
			<AlertDialog.Title class="cui-dialog-title">{title}</AlertDialog.Title>
			{#if description}
				<AlertDialog.Description class="cui-dialog-description"
					>{description}</AlertDialog.Description
				>
			{/if}
			{#if children}
				<div class="cui-dialog-body">{@render children()}</div>
			{/if}
			<footer class="cui-dialog-actions">
				{#if cancelLabel !== null}
					<AlertDialog.Cancel>
						{#snippet child({ props })}
							<Button {...props} bind:ref={cancelButton} variant="secondary" disabled={busy}>
								{cancelLabel}
							</Button>
						{/snippet}
					</AlertDialog.Cancel>
				{/if}
				<Button
					tone={tone === 'negative' ? 'negative' : 'neutral'}
					loading={busy}
					onclick={confirm}
				>
					{confirmLabel}
				</Button>
			</footer>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
