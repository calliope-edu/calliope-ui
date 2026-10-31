import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Switch from './Switch.svelte';

describe('Switch', () => {
	it('is a switch named by its label', () => {
		render(Switch, { label: 'Chat erlauben' });
		expect(screen.getByRole('switch', { name: 'Chat erlauben' })).toHaveAttribute(
			'aria-checked',
			'false'
		);
	});

	it('toggles on click and reports the change', async () => {
		const onCheckedChange = vi.fn();
		render(Switch, { label: 'Chat erlauben', onCheckedChange });
		const control = screen.getByRole('switch');
		await userEvent.click(control);
		expect(control).toHaveAttribute('aria-checked', 'true');
		expect(onCheckedChange).toHaveBeenCalledWith(true);
	});

	it('toggles with the keyboard', async () => {
		render(Switch, { label: 'Chat erlauben', checked: true });
		await userEvent.tab();
		await userEvent.keyboard(' ');
		expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
	});

	it('links the hint with aria-describedby', () => {
		render(Switch, { label: 'IoT-Projekt', hint: 'Geräte im WLAN.' });
		expect(screen.getByRole('switch')).toHaveAccessibleDescription('Geräte im WLAN.');
	});
});
