import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { text } from '../../../test/snippets.js';
import Banner from './Banner.svelte';

describe('Banner', () => {
	it('is an alert for errors and a status otherwise', () => {
		render(Banner, { tone: 'error', title: 'Keine Verbindung' });
		expect(screen.getByRole('alert')).toHaveTextContent('Keine Verbindung');
		render(Banner, { tone: 'info', title: 'Neuer Feed', children: text('temp ist da.') });
		expect(screen.getByRole('status')).toHaveTextContent('temp ist da.');
	});

	it('can opt out of the live role', () => {
		render(Banner, { tone: 'warning', title: 'Pausiert', live: 'none' });
		expect(screen.queryByRole('status')).toBeNull();
		expect(screen.queryByRole('alert')).toBeNull();
	});

	it('has a named dismiss button that calls onDismiss', async () => {
		const onDismiss = vi.fn();
		render(Banner, { title: 'Hinweis', onDismiss, dismissLabel: 'Hinweis schließen' });
		await userEvent.click(screen.getByRole('button', { name: 'Hinweis schließen' }));
		expect(onDismiss).toHaveBeenCalledOnce();
	});

	it('shows a status disc for success, warning and error, but none for info', () => {
		const { container, unmount } = render(Banner, { tone: 'info', title: 'Neuer Feed' });
		expect(container.querySelector('.disc')).toBeNull();
		unmount();
		for (const tone of ['success', 'warning', 'error'] as const) {
			const view = render(Banner, { tone, title: 'Hinweis' });
			expect(view.container.querySelector('.disc')).not.toBeNull();
			view.unmount();
		}
	});

	it('marks itself busy and shows a decorative spinner in place of the icon', () => {
		const { container } = render(Banner, { tone: 'warning', title: 'Verbinde…', busy: true });
		const banner = screen.getByRole('status');
		expect(banner).toHaveAttribute('aria-busy', 'true');
		expect(container.querySelector('.cui-spinner')).toHaveAttribute('aria-hidden', 'true');
		expect(container.querySelector('.disc')).toBeNull();
	});

	it('is not busy by default', () => {
		render(Banner, { title: 'Hinweis' });
		expect(screen.getByRole('status')).not.toHaveAttribute('aria-busy');
	});

	it('keeps a message without a headline', () => {
		render(Banner, { tone: 'error', children: text('Der Feed konnte nicht gelöscht werden.') });
		expect(screen.getByRole('alert')).toHaveTextContent('Der Feed konnte nicht gelöscht werden.');
	});
});
