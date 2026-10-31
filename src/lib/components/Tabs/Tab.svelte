<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { IconName } from '../../icons/icons.js';

	export type TabProps = {
		/** Matches the value of its TabPanel. */
		value: string;
		/** Icon before the label; decorative, the label names the tab. */
		icon?: IconName;
		/** Skipped by the arrow keys and not clickable. */
		disabled?: boolean;
		/** The tab label. */
		children: Snippet;
	};
</script>

<script lang="ts">
	import { Tabs } from 'bits-ui';
	import Icon from '../Icon/Icon.svelte';

	let { value, icon, disabled = false, children }: TabProps = $props();
</script>

<Tabs.Trigger class="cui-tab" {value} {disabled}>
	{#if icon}<Icon name={icon} />{/if}
	<span class="cui-tab-label">{@render children()}</span>
</Tabs.Trigger>
