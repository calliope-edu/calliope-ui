import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { text } from '../../../test/snippets.js';
import Card from './Card.svelte';

describe('Card', () => {
	it('renders title as a heading of the given level, with eyebrow and description', () => {
		render(Card, {
			title: 'Wetterstation',
			level: 2,
			eyebrow: 'MakeCode-Programm',
			description: 'Misst Temperatur.',
			children: text('Inhalt')
		});
		expect(screen.getByRole('heading', { level: 2, name: 'Wetterstation' })).toBeInTheDocument();
		expect(screen.getByText('MakeCode-Programm')).toBeInTheDocument();
		expect(screen.getByText('Misst Temperatur.')).toBeInTheDocument();
		expect(screen.getByText('Inhalt')).toBeInTheDocument();
		expect(screen.queryByRole('link')).toBeNull();
	});

	it('makes the title the one link of a link card', () => {
		render(Card, { title: 'Der erste Sensor', href: '/lernen/sensor', actions: text('Teilen') });
		const link = screen.getByRole('link', { name: 'Der erste Sensor' });
		expect(link).toHaveAttribute('href', '/lernen/sensor');
		expect(screen.getAllByRole('link')).toHaveLength(1);
		expect(link.closest('.cui-card')).toHaveAttribute('data-interactive');
	});

	it('marks the identity line', () => {
		const { container } = render(Card, { title: 'Lauflicht', identity: 'python' });
		expect(container.querySelector('.cui-card')).toHaveAttribute('data-identity', 'python');
	});
});
