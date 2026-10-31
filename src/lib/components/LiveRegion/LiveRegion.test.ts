import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import LiveRegion from './LiveRegion.svelte';

describe('LiveRegion', () => {
	it('is a polite status region that gets the message after it exists', async () => {
		const { rerender } = render(LiveRegion, { message: '' });
		const region = screen.getByRole('status');
		expect(region).toHaveAttribute('aria-live', 'polite');
		expect(region.textContent).toBe('');
		await rerender({ message: '3 Geräte verbunden' });
		await waitFor(() => expect(region).toHaveTextContent('3 Geräte verbunden'));
	});

	it('is an alert when assertive', () => {
		render(LiveRegion, { message: 'Verbindung verloren', politeness: 'assertive' });
		expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
	});
});
