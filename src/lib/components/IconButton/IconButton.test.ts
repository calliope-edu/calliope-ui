import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import IconButton from './IconButton.svelte';

describe('IconButton', () => {
	it('is named by its label, the icon is hidden', () => {
		render(IconButton, { icon: 'settings', label: 'Einstellungen', tooltip: false });
		const button = screen.getByRole('button', { name: 'Einstellungen' });
		expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
	});

	it('keeps the aria-label when it shows a tooltip', () => {
		render(IconButton, { icon: 'settings', label: 'Einstellungen' });
		expect(screen.getByRole('button', { name: 'Einstellungen' })).toBeInTheDocument();
	});

	it('supports aria-pressed', () => {
		render(IconButton, {
			icon: 'show',
			label: 'Passwort anzeigen',
			pressed: false,
			tooltip: false
		});
		expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
	});
});
