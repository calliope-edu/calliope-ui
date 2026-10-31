<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		value = $bindable(''),
		onValueChange,
		label,
		children
	}: {
		value?: string;
		onValueChange?: (value: string) => void;
		/** Visible group heading, e.g. "Sortieren nach". */
		label?: string;
		/** MenuRadioItem children. */
		children: Snippet;
	} = $props();
</script>

<DropdownMenu.RadioGroup class="cui-menu-group" bind:value {onValueChange}>
	{#if label}
		<DropdownMenu.GroupHeading class="cui-menu-heading">{label}</DropdownMenu.GroupHeading>
	{/if}
	{@render children()}
</DropdownMenu.RadioGroup>
