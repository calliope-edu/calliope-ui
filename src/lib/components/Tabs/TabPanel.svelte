<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type TabPanelProps = {
		/** Matches the value of its Tab. */
		value: string;
		children: Snippet;
	};
</script>

<script lang="ts">
	import { Tabs } from 'bits-ui';

	let { value, children }: TabPanelProps = $props();
</script>

<!-- bits-ui names the panel by its tab and keeps it in the tab order (Tab from the tablist lands here). -->
<Tabs.Content class="cui-tab-panel" {value}>
	{@render children()}
</Tabs.Content>
