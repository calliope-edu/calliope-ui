<script lang="ts">
	import type { Snippet } from 'svelte';

	let { label, children }: { label: string; children: Snippet } = $props();
</script>

<!-- One labelled line of a states grid. -->
<div class="row">
	<span class="label">{label}</span>
	<div class="items">{@render children()}</div>
</div>

<style>
	.row {
		display: grid;
		grid-template-columns: 10rem 1fr;
		align-items: center;
		gap: var(--cui-space-4);
		padding: var(--cui-space-3) 0;
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
	}

	.label {
		color: var(--cui-text-muted);
		font-size: var(--cui-font-size-sm);
		font-weight: var(--cui-font-weight-medium);
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--cui-space-3);
	}

	@media (max-width: 40rem) {
		.row {
			grid-template-columns: 1fr;
			gap: var(--cui-space-2);
		}
	}
</style>
