<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type ToolbarOrientation = 'horizontal' | 'vertical';

	export type ToolbarProps = {
		/** Required accessible name ("Programm", "Formatierung"). */
		label: string;
		orientation?: ToolbarOrientation;
		/** Buttons, IconButtons, Menu triggers, a SegmentedControl, ToolbarSeparator. */
		children: Snippet;
	} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role'>;

	const FOCUSABLE = 'button, a[href], input, select, textarea, [tabindex]';
	/** Composite widgets inside (a SegmentedControl) keep their own tab stop and arrow keys. */
	const COMPOSITE = '[role="radiogroup"], [role="tablist"], [role="listbox"], [role="grid"]';
	/** Text entry keeps its own arrow keys (WAI-ARIA toolbar pattern). */
	const TEXT_ENTRY =
		'input:not([type="checkbox"], [type="radio"], [type="button"]), textarea, select';
</script>

<script lang="ts">
	let {
		label,
		orientation = 'horizontal',
		children,
		onkeydown,
		onfocusin,
		...rest
	}: ToolbarProps = $props();

	let root = $state<HTMLDivElement | null>(null);
	let active: HTMLElement | null = null;

	/** Tab stops of this toolbar, without nested toolbars, composites and disabled controls. */
	function items(): HTMLElement[] {
		if (!root) return [];
		return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
			(node) =>
				node.closest('[role="toolbar"]') === root &&
				!node.closest(COMPOSITE) &&
				!node.matches(':disabled') &&
				!node.closest('[hidden], [inert]')
		);
	}

	/** Roving tabindex: one item is in the tab order, Tab leaves the toolbar. */
	function sync() {
		const all = items();
		if (!active || !all.includes(active)) active = all[0] ?? null;
		for (const node of all) node.tabIndex = node === active ? 0 : -1;
	}

	$effect(() => {
		if (!root) return;
		sync();
		const observer = new MutationObserver(sync);
		observer.observe(root, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['disabled', 'hidden']
		});
		return () => observer.disconnect();
	});

	function handleFocusIn(event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		onfocusin?.(event);
		const target = event.target as HTMLElement;
		if (items().includes(target)) {
			active = target;
			sync();
		}
	}

	function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		onkeydown?.(event);
		if (event.defaultPrevented) return;
		const target = event.target as HTMLElement;
		const all = items();
		const index = all.indexOf(target);
		if (index === -1) return;
		const [prev, next] =
			orientation === 'vertical' ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
		const textEntry = target.matches(TEXT_ENTRY);
		let to: number;
		if (event.key === next && !textEntry) to = (index + 1) % all.length;
		else if (event.key === prev && !textEntry) to = (index - 1 + all.length) % all.length;
		else if (event.key === 'Home' && !textEntry) to = 0;
		else if (event.key === 'End' && !textEntry) to = all.length - 1;
		else return;
		event.preventDefault();
		active = all[to];
		sync();
		active.focus();
	}
</script>

<div
	bind:this={root}
	class="cui-toolbar"
	role="toolbar"
	aria-label={label}
	aria-orientation={orientation}
	data-orientation={orientation}
	{...rest}
	onkeydown={handleKeydown}
	onfocusin={handleFocusIn}
>
	{@render children()}
</div>

<style>
	@layer calliope.components {
		.cui-toolbar {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: var(--cui-space-1);
			min-width: 0;
		}

		.cui-toolbar[data-orientation='vertical'] {
			flex-direction: column;
			flex-wrap: nowrap;
			align-items: stretch;
		}
	}
</style>
