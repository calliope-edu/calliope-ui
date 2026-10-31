import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import IconButton from '../IconButton/IconButton.svelte';

describe('Tooltip', () => {
	it('opens on keyboard focus and closes with Escape', async () => {
		render(IconButton, { icon: 'settings', label: 'Einstellungen' });
		await userEvent.tab();
		expect(screen.getByRole('button', { name: 'Einstellungen' })).toHaveFocus();
		await waitFor(() =>
			expect(document.querySelector('.cui-tooltip')).toHaveTextContent('Einstellungen')
		);
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(document.querySelector('.cui-tooltip')).toBeNull());
	});
});
