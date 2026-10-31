import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import EmptyState from './EmptyState.svelte';

describe('EmptyState', () => {
	it('renders the title as a heading of the given level', () => {
		render(EmptyState, { title: 'Noch keine Feeds', level: 2, description: 'Sende Werte.' });
		expect(screen.getByRole('heading', { level: 2, name: 'Noch keine Feeds' })).toBeInTheDocument();
		expect(screen.getByText('Sende Werte.')).toBeInTheDocument();
	});
});
