<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		label,
		children
	}: {
		/** Visible group heading; also names the group for screen readers. */
		label: string;
		children: Snippet;
	} = $props();
</script>

<DropdownMenu.Group class="cui-menu-group">
	<DropdownMenu.GroupHeading class="cui-menu-heading">{label}</DropdownMenu.GroupHeading>
	{@render children()}
</DropdownMenu.Group>
