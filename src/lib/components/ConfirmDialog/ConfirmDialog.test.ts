import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ConfirmDialog from './ConfirmDialog.svelte';
import ConfirmDialogHost from './ConfirmDialogHost.svelte';
import { confirmDialog } from './confirm.svelte.js';

const base = {
	open: true,
	title: 'Programm löschen?',
	description: 'Das lässt sich nicht rückgängig machen.',
	confirmLabel: 'Löschen'
};

describe('ConfirmDialog', () => {
	it('is an alertdialog named by its question', async () => {
		render(ConfirmDialog, base);
		const dialog = await screen.findByRole('alertdialog');
		expect(dialog).toHaveAccessibleName('Programm löschen?');
		expect(dialog).toHaveAccessibleDescription('Das lässt sich nicht rückgängig machen.');
	});

	it('calls onConfirm and closes', async () => {
		const onConfirm = vi.fn();
		const onCancel = vi.fn();
		render(ConfirmDialog, { ...base, onConfirm, onCancel });
		await userEvent.click(await screen.findByRole('button', { name: 'Löschen' }));
		expect(onConfirm).toHaveBeenCalledOnce();
		expect(onCancel).not.toHaveBeenCalled();
		await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
	});

	it('calls onCancel from the cancel button', async () => {
		const onCancel = vi.fn();
		render(ConfirmDialog, { ...base, onCancel });
		await userEvent.click(await screen.findByRole('button', { name: 'Abbrechen' }));
		expect(onCancel).toHaveBeenCalledOnce();
		await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
	});

	it('starts on cancel when the action is destructive', async () => {
		render(ConfirmDialog, { ...base, tone: 'negative' });
		const cancel = await screen.findByRole('button', { name: 'Abbrechen' });
		await waitFor(() => expect(cancel).toHaveFocus());
	});

	it('shows only one button as a notice', async () => {
		render(ConfirmDialog, { ...base, confirmLabel: 'Verstanden', cancelLabel: null });
		await screen.findByRole('alertdialog');
		expect(screen.getAllByRole('button')).toHaveLength(1);
	});

	it('stays open and busy while onConfirm runs', async () => {
		let finish = () => {};
		const onConfirm = () => new Promise<void>((resolve) => (finish = resolve));
		render(ConfirmDialog, { ...base, onConfirm });
		const confirm = await screen.findByRole('button', { name: 'Löschen' });
		await userEvent.click(confirm);
		expect(confirm).toHaveAttribute('aria-busy', 'true');
		expect(screen.getByRole('alertdialog')).toBeInTheDocument();
		finish();
		await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
	});
});

describe('confirmDialog()', () => {
	it('resolves true on confirm and false on cancel', async () => {
		render(ConfirmDialogHost);

		const first = confirmDialog({ title: 'Raum schließen?', confirmLabel: 'Raum schließen' });
		await userEvent.click(await screen.findByRole('button', { name: 'Raum schließen' }));
		await expect(first).resolves.toBe(true);

		const second = confirmDialog({ title: 'Abmelden?', confirmLabel: 'Abmelden' });
		await userEvent.click(await screen.findByRole('button', { name: 'Abbrechen' }));
		await expect(second).resolves.toBe(false);
	});
});
