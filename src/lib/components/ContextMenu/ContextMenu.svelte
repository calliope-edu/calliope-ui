<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type ContextMenuProps = {
		/**
		 * The area that opens the menu on right click (and long press on touch). Spread `props`
		 * onto your own element; for a list, wrap the whole list and note in the row's own
		 * `oncontextmenu` which row was hit (it runs before the menu opens).
		 */
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		/** No menu opens; the browser's own context menu shows again. */
		disabled?: boolean;
		/** MenuItem, MenuRadioGroup, MenuGroup, MenuSeparator: the same items as Menu. */
		children: Snippet;
	};
</script>

<script lang="ts">
	import { ContextMenu } from 'bits-ui';
	import '../Menu/menu.css';

	let {
		trigger,
		open = $bindable(false),
		onOpenChange,
		disabled = false,
		children
	}: ContextMenuProps = $props();
</script>

<ContextMenu.Root bind:open {onOpenChange}>
	<ContextMenu.Trigger {disabled}>
		{#snippet child({ props })}
			{@render trigger({ props })}
		{/snippet}
	</ContextMenu.Trigger>
	<ContextMenu.Portal>
		<!-- Opens at the pointer, flips at the window edge like Menu. -->
		<ContextMenu.Content class="cui-menu" collisionPadding={8}>
			{@render children()}
		</ContextMenu.Content>
	</ContextMenu.Portal>
</ContextMenu.Root>
