import { render, screen } from '@testing-library/svelte';
import { toast } from 'svelte-sonner';
import { describe, expect, it } from 'vitest';
import Toaster from './Toaster.svelte';

describe('Toaster', () => {
	it('shows a toast in a named, polite region', async () => {
		render(Toaster, { label: 'Benachrichtigungen' });
		toast.success('Gespeichert', { description: 'Das Dashboard ist gesichert.' });
		expect(await screen.findByText('Gespeichert')).toBeInTheDocument();
		const region = screen.getByRole('region', { name: /Benachrichtigungen/ });
		expect(region).toHaveAttribute('aria-live', 'polite');
		expect(document.querySelector('.cui-toast')).toHaveAttribute('data-type', 'success');
	});
});
