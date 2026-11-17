import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { text } from '../../../test/snippets.js';
import Button from './Button.svelte';

describe('Button', () => {
	it('is a native button with type="button" by default', () => {
		render(Button, { children: text('Speichern') });
		const button = screen.getByRole('button', { name: 'Speichern' });
		expect(button).toHaveAttribute('type', 'button');
	});

	it('keeps the HTML type attribute for forms', () => {
		render(Button, { children: text('Senden'), type: 'submit' });
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
	});

	it('calls onclick', async () => {
		const onclick = vi.fn();
		render(Button, { children: text('Speichern'), onclick });
		await userEvent.click(screen.getByRole('button'));
		expect(onclick).toHaveBeenCalledOnce();
	});

	it('exposes a toggle state with aria-pressed', () => {
		render(Button, { children: text('Raum pausieren'), pressed: true });
		expect(screen.getByRole('button', { name: 'Raum pausieren' })).toHaveAttribute(
			'aria-pressed',
			'true'
		);
	});

	it('sets aria-busy and ignores clicks while loading', async () => {
		const onclick = vi.fn();
		render(Button, { children: text('Übertragen'), loading: true, onclick });
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('aria-busy', 'true');
		await userEvent.click(button);
		expect(onclick).not.toHaveBeenCalled();
	});

	it('uses the native disabled attribute', () => {
		render(Button, { children: text('Übertragen'), disabled: true });
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('stays focusable with aria-disabled when focusableWhenDisabled is set', async () => {
		const onclick = vi.fn();
		render(Button, {
			children: text('Übertragen'),
			disabled: true,
			focusableWhenDisabled: true,
			onclick
		});
		const button = screen.getByRole('button');
		expect(button).not.toBeDisabled();
		expect(button).toHaveAttribute('aria-disabled', 'true');
		await userEvent.tab();
		expect(button).toHaveFocus();
		await userEvent.click(button);
		expect(onclick).not.toHaveBeenCalled();
	});

	it('renders a link when href is given', () => {
		render(Button, { children: text('Zur Anleitung'), href: '/hilfe' });
		expect(screen.getByRole('link', { name: 'Zur Anleitung' })).toHaveAttribute('href', '/hilfe');
	});

	it('only colours primary buttons with a tone', () => {
		const { container } = render(Button, {
			children: text('Löschen'),
			variant: 'secondary',
			tone: 'negative'
		});
		expect(container.querySelector('.cui-button')).not.toHaveAttribute('data-tone');
	});

	// Layout itself is checked in Storybook (Button › Breite); happy-dom has no layout.
	it('keeps its content width unless fullWidth asks it to fill the row', () => {
		const { container, rerender } = render(Button, { children: text('Einstellungen') });
		const button = container.querySelector('.cui-button');
		expect(button).not.toHaveAttribute('data-full-width');
		rerender({ children: text('Einstellungen'), fullWidth: true });
		expect(button).toHaveAttribute('data-full-width');
	});
});
