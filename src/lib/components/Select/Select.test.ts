import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Harness from './Harness.test.svelte';
import Select from './Select.svelte';

const items = [
	{ value: 'temp', label: 'Temperatur' },
	{ value: 'light', label: 'Helligkeit' }
];
const trigger = () => screen.getByRole('combobox', { name: 'Zeitraum' });

describe('Select', () => {
	it('is named by its visible label and shows the placeholder', () => {
		render(Harness);
		expect(trigger()).toHaveAttribute('aria-haspopup', 'listbox');
		expect(trigger()).toHaveAttribute('aria-expanded', 'false');
		expect(trigger()).toHaveTextContent('Zeitraum wählen');
	});

	it('shows the label of the chosen item', () => {
		render(Select, { label: 'Messwert', items, value: 'light' });
		expect(screen.getByRole('combobox', { name: 'Messwert' })).toHaveTextContent('Helligkeit');
	});

	it('chooses an option by pointer and calls onValueChange', async () => {
		const onValueChange = vi.fn();
		render(Harness, { onValueChange });
		await userEvent.click(trigger());
		await userEvent.click(await screen.findByRole('option', { name: 'Letzter Tag' }));
		expect(onValueChange).toHaveBeenCalledWith('day');
		expect(screen.getByTestId('value')).toHaveTextContent('day');
		await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
		expect(trigger()).toHaveTextContent('Letzter Tag');
	});

	it('marks the chosen option as selected', async () => {
		render(Harness, { value: 'month' });
		await userEvent.click(trigger());
		expect(await screen.findByRole('option', { name: 'Letzter Monat' })).toHaveAttribute(
			'aria-selected',
			'true'
		);
		expect(screen.getByRole('option', { name: 'Letzte Woche' })).toHaveAttribute('data-disabled');
	});

	it('chooses with the arrow keys and Enter, skipping disabled options', async () => {
		const onValueChange = vi.fn();
		render(Harness, { onValueChange, value: 'day' });
		trigger().focus();
		await userEvent.keyboard('{Enter}');
		await screen.findByRole('listbox');
		await waitFor(() =>
			expect(screen.getByRole('option', { name: 'Letzter Tag' })).toHaveAttribute(
				'data-highlighted'
			)
		);
		await userEvent.keyboard('{ArrowDown}');
		await userEvent.keyboard('{Enter}');
		expect(onValueChange).toHaveBeenCalledWith('month');
		await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
	});

	it('links hint and error and marks the error as invalid', () => {
		render(Select, {
			label: 'Gerät',
			items,
			hint: 'Nur verbundene Geräte.',
			error: 'Wähle ein Gerät.'
		});
		const button = screen.getByRole('combobox', { name: 'Gerät' });
		expect(button).toHaveAttribute('aria-invalid', 'true');
		expect(button).toHaveAccessibleDescription('Nur verbundene Geräte. Wähle ein Gerät.');
	});

	it('disables the trigger and marks it required', () => {
		render(Select, { label: 'Gerät', items, disabled: true, required: true });
		const button = screen.getByRole('combobox', { name: 'Gerät' });
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('aria-required', 'true');
	});

	it('submits the value through a hidden input', () => {
		const { container } = render(Select, { label: 'Gerät', items, value: 'temp', name: 'metric' });
		expect(container.querySelector('input[name="metric"]')).toHaveValue('temp');
	});
});
