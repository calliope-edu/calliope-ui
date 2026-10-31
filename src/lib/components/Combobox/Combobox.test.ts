import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Combobox from './Combobox.svelte';
import Harness from './Harness.test.svelte';

const input = () => screen.getByRole('combobox', { name: 'Erstes Wort' });
const optionNames = () => screen.getAllByRole('option').map((option) => option.textContent?.trim());

describe('Combobox', () => {
	it('is named by its visible label', () => {
		render(Harness);
		expect(input()).toHaveAttribute('aria-autocomplete', 'list');
		expect(input()).toHaveAttribute('aria-expanded', 'false');
	});

	it('filters the options by typing, words that start with the query first', async () => {
		render(Harness);
		await userEvent.type(input(), 'ap');
		await screen.findByRole('listbox');
		await waitFor(() => expect(optionNames()).toEqual(['Apfel', 'Kapelle', 'Papagei']));
	});

	it('chooses an option by pointer, shows its label and calls onValueChange', async () => {
		const onValueChange = vi.fn();
		render(Harness, { onValueChange });
		await userEvent.type(input(), 'bi');
		await userEvent.click(await screen.findByRole('option', { name: 'Biene' }));
		expect(onValueChange).toHaveBeenCalledWith('biene');
		expect(screen.getByTestId('value')).toHaveTextContent('biene');
		expect(input()).toHaveValue('Biene');
	});

	it('chooses with the arrow keys and Enter', async () => {
		const onValueChange = vi.fn();
		render(Harness, { onValueChange });
		await userEvent.type(input(), 'e');
		await screen.findByRole('listbox');
		// Eule starts with "e" and comes first; ArrowDown moves on to the next match.
		await waitFor(() =>
			expect(screen.getByRole('option', { name: 'Eule' })).toHaveAttribute('data-highlighted')
		);
		await userEvent.keyboard('{ArrowDown}{Enter}');
		expect(onValueChange).toHaveBeenCalledWith('apfel');
		expect(input()).toHaveValue('Apfel');
		await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
	});

	it('shows the empty label when nothing matches', async () => {
		render(Harness);
		await userEvent.type(input(), 'xyz');
		await screen.findByRole('listbox');
		expect(screen.queryAllByRole('option')).toHaveLength(0);
		const texts = screen.getAllByText('Keine Treffer');
		// Visible in the popup and spoken by the live region.
		expect(texts).toHaveLength(2);
		expect(texts.some((el) => el.closest('[aria-live="polite"]'))).toBe(true);
	});

	it('takes a fully typed word when leaving the field', async () => {
		const onValueChange = vi.fn();
		render(Harness, { onValueChange });
		await userEvent.type(input(), 'delfin');
		await userEvent.tab();
		expect(onValueChange).toHaveBeenCalledWith('delfin');
		expect(input()).toHaveValue('Delfin');
	});

	it('shows the label of a value set from outside', () => {
		render(Harness, { value: 'delfin' });
		expect(input()).toHaveValue('Delfin');
	});

	it('clears the value when the text is cleared', async () => {
		const onValueChange = vi.fn();
		render(Harness, { value: 'eule', onValueChange });
		await userEvent.clear(input());
		expect(onValueChange).toHaveBeenCalledWith(undefined);
		expect(screen.getByTestId('value')).toHaveTextContent('–');
	});

	it('links hint and error and marks the error as invalid', () => {
		render(Combobox, {
			label: 'Raumcode',
			items: [],
			hint: 'Drei Wörter.',
			error: 'Diesen Raum gibt es nicht.'
		});
		const field = screen.getByRole('combobox', { name: 'Raumcode' });
		expect(field).toHaveAttribute('aria-invalid', 'true');
		expect(field).toHaveAccessibleDescription('Drei Wörter. Diesen Raum gibt es nicht.');
	});

	it('passes disabled and required to the input', () => {
		render(Combobox, { label: 'Raumcode', items: [], disabled: true, required: true });
		const field = screen.getByRole('combobox', { name: 'Raumcode' });
		expect(field).toBeDisabled();
		expect(field).toBeRequired();
	});
});
