import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Slider from './Slider.svelte';

describe('Slider', () => {
	it('is a slider named by its label, with its range and value', () => {
		render(Slider, { label: 'Helligkeit', min: 0, max: 255, value: 128 });
		const slider = screen.getByRole('slider', { name: 'Helligkeit' });
		expect(slider).toHaveAttribute('aria-valuemin', '0');
		expect(slider).toHaveAttribute('aria-valuemax', '255');
		expect(slider).toHaveAttribute('aria-valuenow', '128');
		expect(slider).not.toHaveAttribute('aria-valuetext');
		expect(screen.getByText('128')).toBeInTheDocument();
	});

	it('formats the shown value and announces it as aria-valuetext', () => {
		render(Slider, {
			label: 'Aktualisierung',
			min: 1,
			max: 60,
			value: 5,
			formatValue: (v: number) => `${v} s`
		});
		expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '5 s');
		expect(screen.getByText('5 s')).toBeInTheDocument();
	});

	it('hides the value when showValue is false', () => {
		render(Slider, { label: 'Helligkeit', value: 40, showValue: false });
		expect(screen.queryByText('40')).toBeNull();
	});

	it('changes with the arrow keys, Home and End and reports each change', async () => {
		const onValueChange = vi.fn();
		const onValueCommit = vi.fn();
		render(Slider, { label: 'Helligkeit', value: 50, step: 5, onValueChange, onValueCommit });
		await userEvent.tab();
		const slider = screen.getByRole('slider');
		expect(slider).toHaveFocus();
		await userEvent.keyboard('{ArrowRight}');
		expect(slider).toHaveAttribute('aria-valuenow', '55');
		expect(onValueChange).toHaveBeenLastCalledWith(55);
		expect(onValueCommit).toHaveBeenLastCalledWith(55);
		await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
		expect(slider).toHaveAttribute('aria-valuenow', '45');
		await userEvent.keyboard('{End}');
		expect(slider).toHaveAttribute('aria-valuenow', '100');
		expect(onValueChange).toHaveBeenLastCalledWith(100);
		await userEvent.keyboard('{Home}');
		expect(slider).toHaveAttribute('aria-valuenow', '0');
	});

	it('is out of the tab order and ignores keys when disabled', async () => {
		const onValueChange = vi.fn();
		render(Slider, { label: 'Helligkeit', value: 50, disabled: true, onValueChange });
		const slider = screen.getByRole('slider');
		expect(slider).toHaveAttribute('aria-disabled', 'true');
		expect(slider).toHaveAttribute('tabindex', '-1');
		slider.focus();
		await userEvent.keyboard('{ArrowRight}');
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it('links the hint with aria-describedby', () => {
		render(Slider, { label: 'Helligkeit', hint: 'Gilt für alle LEDs.' });
		expect(screen.getByRole('slider')).toHaveAccessibleDescription('Gilt für alle LEDs.');
	});

	it('submits the value under its name', () => {
		const { container } = render(Slider, { label: 'Helligkeit', value: 30, name: 'brightness' });
		expect(container.querySelector('input[name="brightness"]')).toHaveValue('30');
	});
});
