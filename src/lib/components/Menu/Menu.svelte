<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type MenuSide = 'top' | 'right' | 'bottom' | 'left';
	export type MenuAlign = 'start' | 'center' | 'end';

	export type MenuProps = {
		/** The consumer's own button; spread `props` onto it (Button and IconButton accept them). */
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		side?: MenuSide;
		align?: MenuAlign;
		/** MenuItem, MenuRadioGroup, MenuGroup, MenuSeparator. */
		children: Snippet;
	};
</script>

<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import './menu.css';

	let {
		trigger,
		open = $bindable(false),
		onOpenChange,
		side = 'bottom',
		align = 'start',
		children
	}: MenuProps = $props();
</script>

<DropdownMenu.Root bind:open {onOpenChange}>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			{@render trigger({ props })}
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content class="cui-menu" {side} {align} sideOffset={4} collisionPadding={8}>
			{@render children()}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
