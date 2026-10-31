import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { text } from '../../../test/snippets.js';
import VisuallyHidden from './VisuallyHidden.svelte';

describe('VisuallyHidden', () => {
	it('keeps its text in the document', () => {
		render(VisuallyHidden, { children: text('Offline') });
		expect(screen.getByText('Offline').parentElement).toHaveClass('cui-visually-hidden');
	});
});
