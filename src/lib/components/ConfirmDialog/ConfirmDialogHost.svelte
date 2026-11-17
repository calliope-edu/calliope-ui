<script lang="ts" module>
	import type { ConfirmTone } from './ConfirmDialog.svelte';

	export type ConfirmOptions = {
		title: string;
		description?: string;
		/** A verb that says what happens ("Löschen"), never "OK". */
		confirmLabel: string;
		/** null shows a notice with one button (window.alert). Default "Abbrechen". */
		cancelLabel?: string | null;
		tone?: ConfirmTone;
	};

	type Request = ConfirmOptions & { id: number; resolve: (confirmed: boolean) => void };

	let nextId = 0;
	const queue = $state<Request[]>([]);

	/**
	 * Promise-based replacement for window.confirm and window.alert. Resolves true on confirm,
	 * false on cancel or Escape. Needs one <ConfirmDialogHost /> mounted in the app's layout;
	 * requests made while a dialog is open wait in line.
	 */
	export function confirmDialog(options: ConfirmOptions): Promise<boolean> {
		return new Promise((resolve) => {
			queue.push({ ...options, id: nextId++, resolve });
		});
	}

	// Module-private: only this component's own instance script below reads it. Kept out of a
	// separate confirm.svelte.ts file because Vite's dependency scanner (triggered by any
	// @calliope-edu/ui import, since index.ts's barrel re-exports everything) parses a standalone
	// .svelte.ts/.svelte.js module file without stripping TypeScript during that scan, crashing on
	// this file's own type-only syntax. A <script module> block inside a real .svelte component
	// goes through the normal component transform instead, which has no such issue.
	const confirmQueue = {
		get current(): Request | undefined {
			return queue[0];
		},
		settle(confirmed: boolean) {
			queue.shift()?.resolve(confirmed);
		}
	};
</script>

<script lang="ts">
	import ConfirmDialog from './ConfirmDialog.svelte';

	// Mount once in the app layout; it shows the requests made with confirmDialog().
	const current = $derived(confirmQueue.current);
</script>

{#if current}
	{#key current.id}
		<ConfirmDialog
			open={true}
			title={current.title}
			description={current.description}
			confirmLabel={current.confirmLabel}
			cancelLabel={current.cancelLabel}
			tone={current.tone}
			onConfirm={() => confirmQueue.settle(true)}
			onCancel={() => confirmQueue.settle(false)}
		/>
	{/key}
{/if}
