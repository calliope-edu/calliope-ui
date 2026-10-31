import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Harness from './Harness.test.svelte';

describe('AccountMenu', () => {
	it('names the trigger after the signed-in person', () => {
		render(Harness, { name: 'Mia Schneider' });
		const trigger = screen.getByRole('button', { name: 'Konto: Mia Schneider' });
		expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
		expect(trigger).toHaveTextContent('MS');
	});

	it('is just "Konto" when signed out', () => {
		render(Harness);
		expect(screen.getByRole('button', { name: 'Konto' })).toBeInTheDocument();
	});

	it('opens the menu with the name on top and runs the items', async () => {
		const onSignOut = vi.fn();
		render(Harness, { name: 'Mia Schneider', onSignOut });
		await userEvent.click(screen.getByRole('button', { name: 'Konto: Mia Schneider' }));
		const menu = await screen.findByRole('menu');
		expect(menu).toHaveTextContent('Mia Schneider');
		await userEvent.click(screen.getByRole('menuitem', { name: 'Abmelden' }));
		expect(onSignOut).toHaveBeenCalledOnce();
	});
});
