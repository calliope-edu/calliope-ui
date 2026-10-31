<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type ChoiceListProps = {
		/** Names the group for assistive tech, e.g. "Übertragungsweg". Optional inside a Dialog whose title already asks the question. */
		label?: string;
		/** ChoiceItem elements, most likely way first. */
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
	let { label, children, ...rest }: ChoiceListProps = $props();
</script>

<div class="cui-choice-list" role="group" aria-label={label} {...rest}>
	{@render children()}
</div>

<style>
	@layer calliope.components {
		.cui-choice-list {
			display: flex;
			flex-direction: column;
			gap: var(--cui-space-2);
		}
	}
</style>
