import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Harness from './Harness.test.svelte';

const trigger = () => screen.getByRole('button', { name: 'Token zeigen' });

describe('Popover', () => {
	it('opens a dialog named by its title', async () => {
		render(Harness);
		expect(trigger()).toHaveAttribute('aria-expanded', 'false');
		await userEvent.click(trigger());
		expect(await screen.findByRole('dialog', { name: 'Token' })).toBeInTheDocument();
		expect(trigger()).toHaveAttribute('aria-expanded', 'true');
	});

	it('closes with Escape and returns focus to the trigger', async () => {
		render(Harness);
		await userEvent.click(trigger());
		await screen.findByRole('dialog');
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
		await waitFor(() => expect(trigger()).toHaveFocus());
	});

	it('closes with its close button', async () => {
		render(Harness);
		await userEvent.click(trigger());
		await userEvent.click(await screen.findByRole('button', { name: 'Schließen' }));
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
	});
});
