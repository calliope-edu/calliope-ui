<script lang="ts">
	/** Runs across the toolbar: vertical in a horizontal toolbar, horizontal in a vertical one. */
	let { orientation = 'vertical' }: { orientation?: 'horizontal' | 'vertical' } = $props();
</script>

<div class="cui-toolbar-separator" role="separator" aria-orientation={orientation}></div>

<style>
	@layer calliope.components {
		.cui-toolbar-separator {
			flex: none;
			align-self: stretch;
			width: var(--cui-border-width-hairline);
			margin: var(--cui-space-1) var(--cui-space-1);
			background-color: var(--cui-border-subtle);
		}

		.cui-toolbar-separator[aria-orientation='horizontal'] {
			width: auto;
			height: var(--cui-border-width-hairline);
		}
	}
</style>
