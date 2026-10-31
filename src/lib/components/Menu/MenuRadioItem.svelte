<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import Icon from '../Icon/Icon.svelte';

	let {
		value,
		disabled = false,
		closeOnSelect = true,
		children
	}: {
		value: string;
		disabled?: boolean;
		closeOnSelect?: boolean;
		children: Snippet;
	} = $props();
</script>

<!-- Selection is a check mark (menuitemradio), never the disabled look. -->
<DropdownMenu.RadioItem class="cui-menu-item" {value} {disabled} {closeOnSelect}>
	{#snippet child({ props, checked })}
		<div {...props}>
			<span class="cui-menu-item-icon">
				{#if checked}<Icon name="check" />{/if}
			</span>
			<span class="cui-menu-item-label">{@render children()}</span>
		</div>
	{/snippet}
</DropdownMenu.RadioItem>
