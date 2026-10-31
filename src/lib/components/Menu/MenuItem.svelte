<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import type { IconName } from '../../icons/icons.js';
	import Icon from '../Icon/Icon.svelte';

	let {
		icon,
		tone = 'neutral',
		disabled = false,
		closeOnSelect = true,
		onSelect,
		textValue,
		children
	}: {
		icon?: IconName;
		/** negative marks a destructive item with a red icon; the text stays ink (red text fails contrast). */
		tone?: 'neutral' | 'negative';
		disabled?: boolean;
		closeOnSelect?: boolean;
		onSelect?: (event: Event) => void;
		/** Typeahead text when the label is not plain text. */
		textValue?: string;
		children: Snippet;
	} = $props();
</script>

<DropdownMenu.Item
	class="cui-menu-item"
	data-tone={tone}
	{disabled}
	{closeOnSelect}
	{onSelect}
	{textValue}
>
	<span class="cui-menu-item-icon">
		{#if icon}<Icon name={icon} />{/if}
	</span>
	<span class="cui-menu-item-label">{@render children()}</span>
</DropdownMenu.Item>
