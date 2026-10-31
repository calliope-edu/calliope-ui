import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Harness from './Harness.test.svelte';

const trigger = () => screen.getByRole('button', { name: 'Aktionen' });

describe('Menu', () => {
	it('announces the popup on its trigger', () => {
		render(Harness);
		expect(trigger()).toHaveAttribute('aria-haspopup', 'menu');
		expect(trigger()).toHaveAttribute('aria-expanded', 'false');
	});

	it('opens from the keyboard and moves through items with the arrow keys', async () => {
		render(Harness);
		trigger().focus();
		await userEvent.keyboard('{Enter}');
		await screen.findByRole('menu');
		expect(trigger()).toHaveAttribute('aria-expanded', 'true');
		await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Umbenennen' })).toHaveFocus());
		// The disabled item is skipped.
		await userEvent.keyboard('{ArrowDown}');
		expect(screen.getByRole('menuitem', { name: 'Löschen' })).toHaveFocus();
	});

	it('runs onSelect and closes', async () => {
		const onDelete = vi.fn();
		render(Harness, { onDelete });
		await userEvent.click(trigger());
		await userEvent.click(await screen.findByRole('menuitem', { name: 'Löschen' }));
		expect(onDelete).toHaveBeenCalledOnce();
		await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
	});

	it('marks disabled items as disabled', async () => {
		render(Harness);
		await userEvent.click(trigger());
		expect(await screen.findByRole('menuitem', { name: 'Hochladen' })).toHaveAttribute(
			'aria-disabled',
			'true'
		);
	});

	it('shows the selection as a checked menuitemradio', async () => {
		render(Harness);
		await userEvent.click(trigger());
		expect(await screen.findByRole('menuitemradio', { name: 'Name' })).toHaveAttribute(
			'aria-checked',
			'true'
		);
		await userEvent.click(screen.getByRole('menuitemradio', { name: 'Zuletzt geändert' }));
		await userEvent.click(trigger());
		expect(await screen.findByRole('menuitemradio', { name: 'Zuletzt geändert' })).toHaveAttribute(
			'aria-checked',
			'true'
		);
	});

	it('closes with Escape and returns focus to the trigger', async () => {
		render(Harness);
		await userEvent.click(trigger());
		await screen.findByRole('menu');
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
		await waitFor(() => expect(trigger()).toHaveFocus());
	});
});
