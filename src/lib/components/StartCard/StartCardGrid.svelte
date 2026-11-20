<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type StartCardGridProps = {
		/** Names the group for assistive tech, e.g. "So geht es los". */
		label?: string;
		/** StartCard elements, the most likely start first. */
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
	let { label, children, ...rest }: StartCardGridProps = $props();
</script>

<div class="cui-start-card-grid" role="group" aria-label={label} {...rest}>
	{@render children()}
</div>

<style>
	@layer calliope.components {
		/* Side by side while each card keeps 20rem, stacked below that. */
		.cui-start-card-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
			gap: var(--cui-space-5);
		}
	}
</style>
