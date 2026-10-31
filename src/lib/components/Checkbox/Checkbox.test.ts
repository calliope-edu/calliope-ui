import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Checkbox from './Checkbox.svelte';

describe('Checkbox', () => {
	it('is a checkbox named by its label', () => {
		render(Checkbox, { label: 'Zeit anzeigen' });
		expect(screen.getByRole('checkbox', { name: 'Zeit anzeigen' })).toHaveAttribute(
			'aria-checked',
			'false'
		);
	});

	it('toggles on click of box or label and reports the change', async () => {
		const onCheckedChange = vi.fn();
		render(Checkbox, { label: 'Zeit anzeigen', onCheckedChange });
		const box = screen.getByRole('checkbox');
		await userEvent.click(box);
		expect(box).toHaveAttribute('aria-checked', 'true');
		await userEvent.click(screen.getByText('Zeit anzeigen'));
		expect(box).toHaveAttribute('aria-checked', 'false');
		expect(onCheckedChange).toHaveBeenNthCalledWith(1, true);
		expect(onCheckedChange).toHaveBeenNthCalledWith(2, false);
	});

	it('toggles with Space', async () => {
		render(Checkbox, { label: 'Zeit anzeigen' });
		await userEvent.tab();
		await userEvent.keyboard(' ');
		expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
	});

	it('announces the indeterminate state as mixed', () => {
		render(Checkbox, { label: 'Alle Spalten', indeterminate: true });
		expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
	});

	it('links hint and error and marks the error', () => {
		render(Checkbox, {
			label: 'Nutzungsbedingungen akzeptieren',
			hint: 'Gilt für diesen Raum.',
			error: 'Bitte bestätigen.'
		});
		const box = screen.getByRole('checkbox');
		expect(box).toHaveAccessibleDescription('Gilt für diesen Raum. Bitte bestätigen.');
		expect(box).toHaveAttribute('aria-invalid', 'true');
	});
});
