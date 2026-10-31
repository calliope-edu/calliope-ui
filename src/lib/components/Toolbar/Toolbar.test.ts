import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Harness from './Harness.test.svelte';

const button = (name: string) => screen.getByRole('button', { name });

describe('Toolbar', () => {
	it('is a named toolbar with a separator', () => {
		render(Harness);
		expect(screen.getByRole('toolbar', { name: 'Programm' })).toHaveAttribute(
			'aria-orientation',
			'horizontal'
		);
		expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
	});

	it('is one tab stop: Tab enters on the first item and leaves after it', async () => {
		render(Harness);
		button('Davor').focus();
		await userEvent.tab();
		expect(button('Starten')).toHaveFocus();
		await userEvent.tab();
		expect(button('Danach')).toHaveFocus();
	});

	it('moves with the arrow keys, skips disabled items and wraps', async () => {
		render(Harness);
		button('Starten').focus();
		await userEvent.keyboard('{ArrowRight}');
		expect(button('Herunterladen')).toHaveFocus();
		await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
		expect(button('Teilen')).toHaveFocus();
		await userEvent.keyboard('{Home}');
		expect(button('Starten')).toHaveFocus();
		await userEvent.keyboard('{End}');
		expect(button('Teilen')).toHaveFocus();
	});

	it('leaves the arrow keys to a text field', async () => {
		render(Harness);
		const field = screen.getByRole('textbox', { name: 'Name' });
		field.focus();
		await userEvent.keyboard('{ArrowRight}');
		expect(field).toHaveFocus();
	});

	it('remembers the last item as the tab stop', async () => {
		render(Harness);
		button('Starten').focus();
		await userEvent.keyboard('{ArrowRight}');
		await userEvent.tab();
		expect(button('Danach')).toHaveFocus();
		await userEvent.tab({ shift: true });
		expect(button('Herunterladen')).toHaveFocus();
	});

	it('uses up and down when vertical', async () => {
		render(Harness, { orientation: 'vertical' });
		button('Starten').focus();
		await userEvent.keyboard('{ArrowDown}');
		expect(button('Herunterladen')).toHaveFocus();
		await userEvent.keyboard('{ArrowRight}');
		expect(button('Herunterladen')).toHaveFocus();
	});
});
