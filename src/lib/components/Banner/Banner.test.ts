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
});
