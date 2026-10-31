import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { icons } from '../../icons/icons.js';
import Icon from './Icon.svelte';

describe('Icon', () => {
	it('is decorative without a label', () => {
		const { container } = render(Icon, { name: 'download' });
		expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
	});

	it('is an image with a label', () => {
		render(Icon, { name: 'warning', label: 'Warnung' });
		expect(screen.getByRole('img', { name: 'Warnung' })).toBeInTheDocument();
	});

	it('covers the 28 icons of the design draft plus the Wave 1 needs', () => {
		expect(Object.keys(icons).length).toBeGreaterThanOrEqual(28);
	});
});
