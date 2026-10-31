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

/** @internal Read by ConfirmDialogHost. */
export const confirmQueue = {
	get current(): Request | undefined {
		return queue[0];
	},
	settle(confirmed: boolean) {
		queue.shift()?.resolve(confirmed);
	}
};
