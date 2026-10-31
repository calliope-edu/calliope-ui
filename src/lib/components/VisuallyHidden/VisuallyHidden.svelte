<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		children,
		...rest
	}: {
		/** Text for assistive tech only; it still takes part in names and descriptions. */
		children: Snippet;
	} & HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span class="cui-visually-hidden" {...rest}>{@render children()}</span>

<style>
	@layer calliope.components {
		/* Off-screen but in the accessibility tree; display: none would hide it from both. */
		.cui-visually-hidden {
			position: absolute;
			width: 1px;
			height: 1px;
			margin: -1px;
			padding: 0;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
			border: 0;
		}
	}
</style>
