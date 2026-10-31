import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Avatar, { initials } from './Avatar.svelte';

describe('initials', () => {
	it('takes first and last word, or two letters of a single word', () => {
		expect(initials('Lena Marie von Berg')).toBe('LB');
		expect(initials('ada')).toBe('AD');
		expect(initials('  Özlem   Çelik ')).toBe('ÖÇ');
		expect(initials('')).toBe('');
	});
});

describe('Avatar', () => {
	it('shows initials and is named after the person', () => {
		render(Avatar, { name: 'Mia Schneider' });
		const avatar = screen.getByRole('img', { name: 'Mia Schneider' });
		expect(avatar).toHaveTextContent('MS');
	});

	it('uses the picture with the name as alt text', () => {
		render(Avatar, { name: 'Mia Schneider', src: '/mia.png' });
		expect(screen.getByRole('img', { name: 'Mia Schneider' })).toHaveAttribute('src', '/mia.png');
	});

	it('falls back to the initials when the picture fails', async () => {
		const { container } = render(Avatar, { name: 'Mia Schneider', src: '/broken.png' });
		await fireEvent.error(container.querySelector('img')!);
		expect(container.querySelector('img')).toBeNull();
		expect(screen.getByRole('img', { name: 'Mia Schneider' })).toHaveTextContent('MS');
	});

	it('is hidden from assistive tech when decorative', () => {
		const { container } = render(Avatar, { name: 'Mia Schneider', decorative: true });
		expect(container.querySelector('.cui-avatar')).toHaveAttribute('aria-hidden', 'true');
		expect(screen.queryByRole('img')).toBeNull();
	});
});
