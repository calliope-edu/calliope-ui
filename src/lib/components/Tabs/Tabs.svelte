<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type TabsProps = {
		/** Value of the selected tab. Set it to the first tab: without it no panel shows. */
		value: string;
		onValueChange?: (value: string) => void;
		/** One TabList, then a TabPanel per Tab. */
		children: Snippet;
	};
</script>

<script lang="ts">
	import { Tabs } from 'bits-ui';
	import './tabs.css';

	let { value = $bindable(), onValueChange, children }: TabsProps = $props();
</script>

<!-- Automatic activation: arrow keys, Home and End move focus and select the tab at once. -->
<Tabs.Root class="cui-tabs" bind:value {onValueChange} activationMode="automatic">
	{@render children()}
</Tabs.Root>
