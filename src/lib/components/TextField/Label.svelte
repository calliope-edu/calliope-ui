<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	let {
		for: htmlFor,
		required = false,
		children,
		...rest
	}: {
		/** id of the control it names. */
		for?: string;
		/** Adds a visual asterisk. Set `required` on the control too; that is what assistive tech reads. */
		required?: boolean;
		children: Snippet;
	} & Omit<HTMLLabelAttributes, 'for'> = $props();
</script>

<label class="cui-label" for={htmlFor} {...rest}>
	{@render children()}{#if required}<span class="required" aria-hidden="true"> *</span>{/if}
</label>

<style>
	@layer calliope.components {
		.cui-label {
			display: block;
			color: var(--cui-text-default);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			line-height: var(--cui-typography-label-line-height);
		}
	}
</style>
