import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import LocaleSwitcher from './LocaleSwitcher.svelte';

const locales = [
	{ code: 'de', name: 'Deutsch' },
	{ code: 'en', name: 'English' }
];

describe('LocaleSwitcher', () => {
	it('names the trigger with label, language and the visible code', () => {
		render(LocaleSwitcher, { locales, value: 'de', label: 'Sprache' });
		const trigger = screen.getByRole('button', { name: /Sprache: Deutsch/ });
		expect(trigger).toHaveTextContent('de');
		expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
	});

	it('lists the languages with their lang and checks the current one', async () => {
		render(LocaleSwitcher, { locales, value: 'de', label: 'Sprache' });
		await userEvent.click(screen.getByRole('button', { name: /Sprache/ }));
		const english = await screen.findByRole('menuitemradio', { name: 'English' });
		expect(english.querySelector('[lang="en"]')).not.toBeNull();
		expect(screen.getByRole('menuitemradio', { name: 'Deutsch' })).toHaveAttribute(
			'aria-checked',
			'true'
		);
	});

	it('reports the chosen language', async () => {
		const onValueChange = vi.fn();
		render(LocaleSwitcher, { locales, value: 'de', label: 'Sprache', onValueChange });
		await userEvent.click(screen.getByRole('button', { name: /Sprache/ }));
		await userEvent.click(await screen.findByRole('menuitemradio', { name: 'English' }));
		expect(onValueChange).toHaveBeenCalledWith('en');
	});
});
