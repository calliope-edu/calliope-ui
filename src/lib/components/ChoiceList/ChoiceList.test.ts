import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Harness from './Harness.test.svelte';

describe('ChoiceList', () => {
	it('is a named group of buttons, named by title and described by detail', () => {
		render(Harness, { onChoose: vi.fn() });
		expect(screen.getByRole('group', { name: 'Übertragungsweg' })).toBeInTheDocument();
		const usb = screen.getByRole('button', { name: 'Per USB-Kabel' });
		expect(usb).toHaveAccessibleDescription('Kabel an Calliope und Rechner anschließen.');
	});

	it('chooses on click and ignores a disabled item', async () => {
		const onChoose = vi.fn();
		render(Harness, { onChoose });
		await userEvent.click(screen.getByRole('button', { name: 'Per USB-Kabel' }));
		await userEvent.click(screen.getByRole('button', { name: 'Per Bluetooth' }));
		expect(onChoose).toHaveBeenCalledTimes(1);
		expect(onChoose).toHaveBeenCalledWith('usb');
	});
});
