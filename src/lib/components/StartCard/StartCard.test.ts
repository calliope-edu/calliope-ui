import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Harness from './Harness.test.svelte';
import StartCard from './StartCard.svelte';

describe('StartCard', () => {
	it('is one button, named by its title and described by its description', () => {
		render(StartCard, { title: 'Neues Programm', description: 'Startet leer.' });
		const button = screen.getByRole('button', { name: 'Neues Programm' });
		expect(button).toHaveAttribute('type', 'button');
		expect(button).toHaveAccessibleDescription('Startet leer.');
		expect(screen.getAllByRole('button')).toHaveLength(1);
	});

	it('colours the field and keeps the plus decorative', () => {
		const { container } = render(StartCard, { title: 'Programmierung', color: 'makecode' });
		expect(container.querySelector('.cui-start-card')).toHaveAttribute('data-color', 'makecode');
		expect(container.querySelector('.field')).toHaveAttribute('aria-hidden', 'true');
		expect(container.querySelector('.plus')).not.toBeNull();
	});

	it('is neutral by default and shows an icon instead of the plus when given', () => {
		const { container } = render(StartCard, { title: 'Öffnen', icon: 'chevron-right' });
		expect(container.querySelector('.cui-start-card')).toHaveAttribute('data-color', 'neutral');
		expect(container.querySelector('.plus')).toBeNull();
		expect(container.querySelector('.field .cui-icon')).not.toBeNull();
	});
});

describe('StartCardGrid', () => {
	it('is a named group whose cards start on click, a disabled one not', async () => {
		const onStart = vi.fn();
		render(Harness, { onStart });
		expect(screen.getByRole('group', { name: 'So geht es los' })).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: 'Programmierung' }));
		await userEvent.click(screen.getByRole('button', { name: 'Feed anlegen' }));
		await userEvent.click(screen.getByRole('button', { name: 'Weiter' }));
		expect(onStart).toHaveBeenCalledTimes(2);
		expect(onStart).toHaveBeenNthCalledWith(1, 'program');
		expect(onStart).toHaveBeenNthCalledWith(2, 'continue');
	});
});
