import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Harness from './Harness.test.svelte';

const row = (name: string) => screen.getByText(name);
const rightClick = (el: Element) => fireEvent.contextMenu(el, { clientX: 120, clientY: 80 });

describe('ContextMenu', () => {
	it('opens on right click with the shared menu items', async () => {
		render(Harness);
		expect(screen.queryByRole('menu')).toBeNull();
		await rightClick(row('Grace'));
		await screen.findByRole('menu');
		expect(screen.getByRole('menuitem', { name: 'Grace sperren' })).toBeInTheDocument();
		expect(screen.getByRole('menuitem', { name: 'Passwort setzen' })).toHaveAttribute(
			'aria-disabled',
			'true'
		);
	});

	it('keeps the browser menu from opening on top', async () => {
		render(Harness);
		const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
		row('Ada').dispatchEvent(event);
		expect(event.defaultPrevented).toBe(true);
	});

	it('runs onSelect for the row that was clicked and closes', async () => {
		const onBlock = vi.fn();
		render(Harness, { onBlock });
		await rightClick(row('Ada'));
		await userEvent.click(await screen.findByRole('menuitem', { name: 'Ada sperren' }));
		expect(onBlock).toHaveBeenCalledWith('Ada');
		await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
	});

	it('moves through items with the arrow keys and closes with Escape', async () => {
		render(Harness);
		await rightClick(row('Ada'));
		await screen.findByRole('menu');
		await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
		await userEvent.keyboard('{ArrowDown}');
		expect(screen.getByRole('menuitem', { name: 'Ada sperren' })).toHaveFocus();
		// The disabled item is skipped.
		await userEvent.keyboard('{ArrowDown}');
		expect(screen.getByRole('menuitem', { name: 'Entfernen' })).toHaveFocus();
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
	});

	it('leaves the browser menu alone when disabled', async () => {
		render(Harness, { disabled: true });
		const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
		row('Ada').dispatchEvent(event);
		expect(event.defaultPrevented).toBe(false);
		expect(screen.queryByRole('menu')).toBeNull();
	});
});
