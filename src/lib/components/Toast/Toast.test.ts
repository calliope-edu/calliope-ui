import { render, screen, within } from '@testing-library/svelte';
import { toast } from 'svelte-sonner';
import { afterEach, describe, expect, it } from 'vitest';
import Toaster from './Toaster.svelte';

async function shown(title: string) {
	const text = await screen.findByText(title);
	const element = text.closest<HTMLElement>('.cui-toast');
	if (!element) throw new Error(`no toast around "${title}"`);
	return element;
}

describe('Toaster', () => {
	afterEach(() => {
		toast.dismiss();
	});

	it('shows a toast in a named, polite region', async () => {
		render(Toaster, { label: 'Benachrichtigungen' });
		toast.success('Gespeichert', { description: 'Das Dashboard ist gesichert.' });
		expect(await screen.findByText('Gespeichert')).toBeInTheDocument();
		const region = screen.getByRole('region', { name: /Benachrichtigungen/ });
		expect(region).toHaveAttribute('aria-live', 'polite');
		expect(document.querySelector('.cui-toast')).toHaveAttribute('data-type', 'success');
	});

	it('shows a status disc for success, warning and error, as the Banner does', async () => {
		render(Toaster);
		toast.success('Gespeichert');
		toast.warning('Pausiert');
		toast.error('Fehlgeschlagen');
		for (const title of ['Gespeichert', 'Pausiert', 'Fehlgeschlagen']) {
			expect((await shown(title)).querySelector('.cui-toast-disc')).not.toBeNull();
		}
	});

	it('shows no icon for info and neutral toasts', async () => {
		render(Toaster);
		toast.info('Neues Gerät');
		toast('Feed gelöscht');
		for (const title of ['Neues Gerät', 'Feed gelöscht']) {
			const element = await shown(title);
			expect(element.querySelector('.cui-toast-disc')).toBeNull();
			expect(element.querySelector('.cui-toast-icon svg')).toBeNull();
		}
	});

	it('shows a decorative spinner while loading', async () => {
		render(Toaster);
		toast.loading('Wird gespeichert');
		const element = await shown('Wird gespeichert');
		expect(element.querySelector('.cui-spinner')).toHaveAttribute('aria-hidden', 'true');
		expect(element.querySelector('.cui-toast-disc')).toBeNull();
	});

	it('names the close button', async () => {
		render(Toaster, { closeLabel: 'Hinweis schließen' });
		toast('Feed gelöscht');
		const element = await shown('Feed gelöscht');
		expect(within(element).getByRole('button', { name: 'Hinweis schließen' })).toBeInTheDocument();
	});
});
