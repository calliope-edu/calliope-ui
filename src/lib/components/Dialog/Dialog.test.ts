import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Harness from './Harness.test.svelte';

async function openDialog() {
	await userEvent.click(screen.getByRole('button', { name: 'Öffnen' }));
	return screen.findByRole('dialog');
}

describe('Dialog', () => {
	it('is named by its title and described by its description', async () => {
		render(Harness);
		const dialog = await openDialog();
		expect(dialog).toHaveAccessibleName('Raum erstellen');
		expect(dialog).toHaveAccessibleDescription('Mit Raumcode');
	});

	it('moves focus to the first form field', async () => {
		render(Harness);
		await openDialog();
		await waitFor(() =>
			expect(screen.getByRole('textbox', { name: 'Name des Raums' })).toHaveFocus()
		);
	});

	it('moves focus into the dialog when there is no field', async () => {
		render(Harness, { withField: false });
		const dialog = await openDialog();
		await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
	});

	it('closes with Escape and returns focus to the trigger', async () => {
		const onOpenChange = vi.fn();
		render(Harness, { onOpenChange });
		await openDialog();
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
		expect(onOpenChange).toHaveBeenCalledWith(false);
		await waitFor(() => expect(screen.getByRole('button', { name: 'Öffnen' })).toHaveFocus());
	});

	it('closes with the close button', async () => {
		render(Harness);
		await openDialog();
		await userEvent.click(screen.getByRole('button', { name: 'Schließen' }));
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
	});

	it('ignores Escape when not dismissible', async () => {
		render(Harness, { dismissible: false });
		await openDialog();
		await userEvent.keyboard('{Escape}');
		expect(screen.getByRole('dialog')).toBeInTheDocument();
	});
});
