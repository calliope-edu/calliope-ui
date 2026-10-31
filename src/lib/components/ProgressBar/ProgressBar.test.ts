import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ProgressBar from './ProgressBar.svelte';

describe('ProgressBar', () => {
	it('is a progressbar named by its label, with its value', () => {
		const { container } = render(ProgressBar, { label: 'Firmware wird übertragen', value: 42 });
		const bar = screen.getByRole('progressbar', { name: 'Firmware wird übertragen' });
		expect(bar).toHaveAttribute('aria-valuemin', '0');
		expect(bar).toHaveAttribute('aria-valuemax', '100');
		expect(bar).toHaveAttribute('aria-valuenow', '42');
		expect(bar).toHaveAttribute('aria-valuetext', '42\u00a0%');
		expect(container.querySelector('.value')?.textContent).toBe('42\u00a0%');
	});

	it('shows the share of max and accepts a custom format', () => {
		render(ProgressBar, {
			label: 'Hochladen',
			value: 3,
			max: 12,
			formatValue: (value: number, max: number) => `${value} von ${max} Dateien`
		});
		expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', '3 von 12 Dateien');
		expect(screen.getByText('3 von 12 Dateien')).toBeInTheDocument();
	});

	it('clamps values outside 0…max', () => {
		render(ProgressBar, { label: 'Hochladen', value: 140 });
		expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
	});

	it('is indeterminate without a value: no aria-valuenow, no shown value', () => {
		const { container } = render(ProgressBar, { label: 'Firmware wird übertragen', value: null });
		const bar = screen.getByRole('progressbar', { name: 'Firmware wird übertragen' });
		expect(bar).not.toHaveAttribute('aria-valuenow');
		expect(bar).not.toHaveAttribute('aria-valuetext');
		expect(bar).toHaveAttribute('data-state', 'indeterminate');
		expect(container.querySelector('.value')).toBeNull();
	});

	it('hides the value when showValue is false', () => {
		render(ProgressBar, { label: 'Hochladen', value: 50, showValue: false });
		expect(screen.queryByText(/50/)).toBeNull();
	});

	it('links the hint with aria-describedby', () => {
		render(ProgressBar, { label: 'Hochladen', value: 10, hint: 'Calliope mini nicht trennen.' });
		expect(screen.getByRole('progressbar')).toHaveAccessibleDescription(
			'Calliope mini nicht trennen.'
		);
	});
});
