import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { text } from '../../../test/snippets.js';
import AppHeader from './AppHeader.svelte';

describe('AppHeader', () => {
	it('is the banner landmark, a dark band, with the app name linking home', () => {
		render(AppHeader, { title: 'Calliope Campus', end: text('Konto') });
		const banner = screen.getByRole('banner');
		expect(banner).toHaveAttribute('data-theme', 'dark');
		expect(screen.getByRole('link', { name: 'Calliope Campus' })).toHaveAttribute('href', '/');
		expect(screen.getByText('Konto')).toBeInTheDocument();
	});

	it('does not make the app name a heading', () => {
		render(AppHeader, { title: 'Calliope Campus' });
		expect(screen.queryByRole('heading')).toBeNull();
	});

	it('shows the brand without a link when href is null', () => {
		render(AppHeader, { title: 'Calliope Campus', href: null });
		expect(screen.queryByRole('link')).toBeNull();
		expect(screen.getByText('Calliope Campus')).toBeInTheDocument();
	});

	it('puts the skip link first', () => {
		render(AppHeader, {
			title: 'Calliope Campus',
			skipLink: { href: '#inhalt', label: 'Zum Inhalt springen' }
		});
		const links = screen.getAllByRole('link');
		expect(links[0]).toHaveAccessibleName('Zum Inhalt springen');
		expect(links[0]).toHaveAttribute('href', '#inhalt');
	});

	it('marks a centre slot for the three-column layout', () => {
		render(AppHeader, { title: 'Calliope Campus', center: text('Ansicht') });
		expect(screen.getByRole('banner')).toHaveAttribute('data-has-center');
	});
});
