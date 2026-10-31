import { render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Spinner from './Spinner.svelte';

describe('Spinner', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it('is a status with its label', () => {
		render(Spinner, { label: 'Wird geladen' });
		expect(screen.getByRole('status')).toHaveTextContent('Wird geladen');
	});

	it('is hidden from assistive tech without a label', () => {
		const { container } = render(Spinner);
		expect(container.querySelector('.cui-spinner')).toHaveAttribute('aria-hidden', 'true');
	});

	it('appears only after the delay', async () => {
		vi.useFakeTimers();
		const { container } = render(Spinner, { label: 'Wird geladen', delay: 300 });
		expect(container.querySelector('svg')).toBeNull();
		await vi.advanceTimersByTimeAsync(300);
		expect(container.querySelector('svg')).not.toBeNull();
	});
});
