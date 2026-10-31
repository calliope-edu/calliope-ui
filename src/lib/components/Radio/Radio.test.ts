import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Harness from './Harness.test.svelte';

describe('RadioGroup', () => {
	it('is a radiogroup named by its label, with the value checked', () => {
		render(Harness);
		expect(screen.getByRole('radiogroup', { name: 'Darstellung' })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: 'Linie' })).toHaveAttribute('aria-checked', 'true');
		expect(screen.getByRole('radio', { name: 'Balken' })).toHaveAttribute('aria-checked', 'false');
	});

	it('selects on click and reports the change', async () => {
		const onValueChange = vi.fn();
		render(Harness, { onValueChange });
		await userEvent.click(screen.getByRole('radio', { name: 'Text' }));
		expect(screen.getByRole('radio', { name: 'Text' })).toHaveAttribute('aria-checked', 'true');
		expect(onValueChange).toHaveBeenCalledWith('text');
	});

	it('moves and selects with the arrow keys, skipping disabled options', async () => {
		render(Harness, { value: 'bars' });
		screen.getByRole('radio', { name: 'Balken' }).focus();
		await userEvent.keyboard('{ArrowDown}');
		const text = screen.getByRole('radio', { name: 'Text' });
		expect(text).toHaveFocus();
		expect(text).toHaveAttribute('aria-checked', 'true');
	});

	it('describes an option by its hint and the group by hint and error', () => {
		render(Harness, { hint: 'Wie die Werte erscheinen.', error: 'Bitte wählen.' });
		expect(screen.getByRole('radio', { name: 'Balken' })).toHaveAccessibleDescription(
			'Ein Balken je Gerät'
		);
		const group = screen.getByRole('radiogroup');
		expect(group).toHaveAccessibleDescription('Wie die Werte erscheinen. Bitte wählen.');
		expect(group).toHaveAttribute('aria-invalid', 'true');
	});

	it('names colour swatches by their label', async () => {
		render(Harness, { variant: 'swatch', value: 'auto' });
		expect(screen.getByRole('radiogroup', { name: 'Farbe' })).toBeInTheDocument();
		await userEvent.click(screen.getByRole('radio', { name: 'Magenta' }));
		expect(screen.getByRole('radio', { name: 'Magenta' })).toHaveAttribute('aria-checked', 'true');
		expect(screen.getByRole('radio', { name: 'Automatisch (Gerätefarbe)' })).toHaveAttribute(
			'aria-checked',
			'false'
		);
	});
});
