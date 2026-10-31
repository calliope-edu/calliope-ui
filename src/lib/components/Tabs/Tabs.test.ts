import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Harness from './Harness.test.svelte';

const tab = (name: string) => screen.getByRole('tab', { name });

describe('Tabs', () => {
	it('is a named tablist of tabs, the selected one controls its panel', () => {
		render(Harness);
		expect(screen.getByRole('tablist', { name: 'Projektansicht' })).toBeInTheDocument();
		expect(screen.getAllByRole('tab')).toHaveLength(4);
		expect(tab('Dashboard')).toHaveAttribute('aria-selected', 'true');
		expect(tab('Feeds')).toHaveAttribute('aria-selected', 'false');
		const panel = screen.getByRole('tabpanel', { name: 'Dashboard' });
		expect(panel).toHaveTextContent('Widgets der Klasse');
		expect(tab('Dashboard')).toHaveAttribute('aria-controls', panel.id);
	});

	it('shows only the selected panel', () => {
		render(Harness);
		expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
		expect(screen.queryByText('Messwerte der Geräte')).not.toBeVisible();
	});

	it('keeps one tab stop: the selected tab', () => {
		render(Harness);
		expect(tab('Dashboard')).toHaveAttribute('tabindex', '0');
		expect(tab('Feeds')).toHaveAttribute('tabindex', '-1');
	});

	it('selects on click and reports the change', async () => {
		const onValueChange = vi.fn();
		render(Harness, { onValueChange });
		await userEvent.click(tab('Feeds'));
		expect(tab('Feeds')).toHaveAttribute('aria-selected', 'true');
		expect(onValueChange).toHaveBeenCalledWith('feeds');
		expect(screen.getByText('Selected: feeds')).toBeInTheDocument();
		expect(screen.getByRole('tabpanel', { name: 'Feeds' })).toBeInTheDocument();
	});

	it('moves and selects with the arrow keys, skipping the disabled tab', async () => {
		render(Harness);
		await userEvent.tab();
		expect(tab('Dashboard')).toHaveFocus();
		await userEvent.keyboard('{ArrowRight}');
		expect(tab('Feeds')).toHaveFocus();
		expect(tab('Feeds')).toHaveAttribute('aria-selected', 'true');
		await userEvent.keyboard('{ArrowRight}');
		expect(tab('Einstellungen')).toHaveFocus();
		expect(tab('Einstellungen')).toHaveAttribute('aria-selected', 'true');
	});

	it('jumps to the first and last tab with Home and End', async () => {
		render(Harness);
		await userEvent.tab();
		await userEvent.keyboard('{End}');
		expect(tab('Einstellungen')).toHaveFocus();
		expect(tab('Einstellungen')).toHaveAttribute('aria-selected', 'true');
		await userEvent.keyboard('{Home}');
		expect(tab('Dashboard')).toHaveFocus();
	});

	it('marks the disabled tab as disabled', () => {
		render(Harness);
		expect(tab('Export')).toBeDisabled();
	});

	it('puts the panel next in the tab order', async () => {
		render(Harness);
		await userEvent.tab();
		await userEvent.tab();
		expect(screen.getByRole('tabpanel')).toHaveFocus();
	});
});
