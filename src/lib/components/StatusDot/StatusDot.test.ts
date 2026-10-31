import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import StatusDot from './StatusDot.svelte';

describe('StatusDot', () => {
	it('shows the word next to the dot', () => {
		render(StatusDot, { status: 'success', label: 'Online' });
		expect(screen.getByText('Online')).toBeVisible();
	});

	it('keeps the word for assistive tech when the label is hidden', () => {
		const { container } = render(StatusDot, { status: 'error', label: 'Offline', hideLabel: true });
		expect(container.querySelector('.cui-status-dot')).toHaveTextContent('Offline');
		expect(screen.getByText('Offline')).toHaveClass('cui-visually-hidden');
	});
});
