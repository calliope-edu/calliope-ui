import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SegmentedControl, { type SegmentedOption } from './SegmentedControl.svelte';

const options: SegmentedOption[] = [
	{ value: 'train', label: 'Trainieren' },
	{ value: 'apply', label: 'Anwenden', disabled: true },
	{ value: 'code', label: 'Programmieren' }
];

const radio = (name: string) => screen.getByRole('radio', { name });

describe('SegmentedControl', () => {
	it('is a radiogroup named by its label, with a radio per option', () => {
		render(SegmentedControl, { label: 'Modus', options, value: 'train' });
		expect(screen.getByRole('radiogroup', { name: 'Modus' })).toBeInTheDocument();
		expect(screen.getAllByRole('radio')).toHaveLength(3);
		expect(radio('Trainieren')).toHaveAttribute('aria-checked', 'true');
		expect(radio('Programmieren')).toHaveAttribute('aria-checked', 'false');
		expect(screen.queryByText('Modus')).toBeNull();
	});

	it('names the group by the visible label when labelVisible', () => {
		render(SegmentedControl, { label: 'Modus', labelVisible: true, options, value: 'train' });
		expect(screen.getByText('Modus')).toBeInTheDocument();
		expect(screen.getByRole('radiogroup', { name: 'Modus' })).not.toHaveAttribute('aria-label');
	});

	it('selects on click and reports the change', async () => {
		const onValueChange = vi.fn();
		render(SegmentedControl, { label: 'Modus', options, value: 'train', onValueChange });
		await userEvent.click(radio('Programmieren'));
		expect(radio('Programmieren')).toHaveAttribute('aria-checked', 'true');
		expect(onValueChange).toHaveBeenCalledWith('code');
	});

	it('is one tab stop; arrow keys move and select, skipping disabled options', async () => {
		const onValueChange = vi.fn();
		render(SegmentedControl, { label: 'Modus', options, value: 'train', onValueChange });
		await userEvent.tab();
		expect(radio('Trainieren')).toHaveFocus();
		expect(radio('Programmieren')).toHaveAttribute('tabindex', '-1');
		await userEvent.keyboard('{ArrowRight}');
		expect(radio('Programmieren')).toHaveFocus();
		expect(radio('Programmieren')).toHaveAttribute('aria-checked', 'true');
		expect(onValueChange).toHaveBeenLastCalledWith('code');
		await userEvent.keyboard('{ArrowLeft}');
		expect(radio('Trainieren')).toHaveFocus();
		expect(radio('Trainieren')).toHaveAttribute('aria-checked', 'true');
	});

	it('marks a disabled option as disabled', () => {
		render(SegmentedControl, { label: 'Modus', options, value: 'train' });
		expect(radio('Anwenden')).toBeDisabled();
	});

	it('disables every option when disabled', () => {
		render(SegmentedControl, { label: 'Modus', options, value: 'train', disabled: true });
		for (const item of screen.getAllByRole('radio')) expect(item).toBeDisabled();
	});

	it('submits the selected value under its name', () => {
		const { container } = render(SegmentedControl, {
			label: 'Modus',
			options,
			value: 'code',
			name: 'mode'
		});
		expect(container.querySelector('input[name="mode"]')).toHaveValue('code');
	});
});
