import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { text } from '../../../test/snippets.js';
import Badge from './Badge.svelte';

describe('Badge', () => {
	it('renders its text with the tone, and its icon hidden', () => {
		const { container } = render(Badge, {
			tone: 'warning',
			icon: 'pause',
			children: text('Pausiert')
		});
		expect(screen.getByText('Pausiert')).toBeInTheDocument();
		expect(container.querySelector('.cui-badge')).toHaveAttribute('data-tone', 'warning');
		expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
	});

	it('sets the identity only for tone="identity"', () => {
		const { container } = render(Badge, {
			tone: 'identity',
			identity: 'python',
			children: text('Python')
		});
		expect(container.querySelector('.cui-badge')).toHaveAttribute('data-identity', 'python');
	});
});
