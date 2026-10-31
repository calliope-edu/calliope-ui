import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import TextField from './TextField.svelte';

describe('TextField', () => {
	it('is named by its visible label', () => {
		render(TextField, { label: 'Name des Raums' });
		expect(screen.getByRole('textbox', { name: 'Name des Raums' })).toBeInTheDocument();
	});

	it('links the hint with aria-describedby', () => {
		render(TextField, { label: 'Name des Raums', hint: 'Sehen alle im Raum.' });
		expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Sehen alle im Raum.');
	});

	it('marks an error as invalid and describes it', () => {
		render(TextField, {
			label: 'Raumcode',
			hint: 'Drei Wörter.',
			error: 'Diesen Raum gibt es nicht.'
		});
		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAccessibleDescription('Drei Wörter. Diesen Raum gibt es nicht.');
	});

	it('announces errors in a polite live region', () => {
		const { container } = render(TextField, { label: 'Raumcode', error: 'Falsch.' });
		expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('Falsch.');
	});

	it('passes required to the input', () => {
		render(TextField, { label: 'Name', required: true });
		expect(screen.getByRole('textbox')).toBeRequired();
	});

	it('takes typed input', async () => {
		render(TextField, { label: 'Name' });
		const input = screen.getByRole('textbox');
		await userEvent.type(input, 'Klasse 6b');
		expect(input).toHaveValue('Klasse 6b');
	});
});
