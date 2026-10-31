<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type TabListProps = {
		/** Accessible name of the tablist (aria-label), e.g. "Projektansicht". */
		label: string;
		/** Tab children. */
		children: Snippet;
	};
</script>

<script lang="ts">
	import { Tabs } from 'bits-ui';

	let { label, children }: TabListProps = $props();
</script>

<Tabs.List class="cui-tab-list" aria-label={label}>
	{@render children()}
</Tabs.List>
