import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Chip from './Chip.svelte';

describe('Chip', () => {
	it('works as a filter toggle with aria-pressed', async () => {
		const onSelectedChange = vi.fn();
		render(Chip, { label: 'Nur online', selected: false, onSelectedChange });
		const chip = screen.getByRole('button', { name: 'Nur online' });
		expect(chip).toHaveAttribute('aria-pressed', 'false');
		await userEvent.click(chip);
		expect(chip).toHaveAttribute('aria-pressed', 'true');
		expect(onSelectedChange).toHaveBeenCalledWith(true);
	});

	it('is a plain button without selected', () => {
		render(Chip, { label: 'Temperatur' });
		expect(screen.getByRole('button', { name: 'Temperatur' })).not.toHaveAttribute('aria-pressed');
	});

	it('names the remove button after the chip and calls onRemove', async () => {
		const onRemove = vi.fn();
		render(Chip, { label: 'Apfel', onRemove });
		await userEvent.click(screen.getByRole('button', { name: 'Apfel entfernen' }));
		expect(onRemove).toHaveBeenCalledOnce();
		expect(screen.getAllByRole('button')).toHaveLength(1);
	});
});
