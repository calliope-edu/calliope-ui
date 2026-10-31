<script lang="ts" module>
	export type Politeness = 'polite' | 'assertive';
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		message = '',
		politeness = 'polite',
		visible = false,
		...rest
	}: {
		/** What to announce. Every change is announced; clear it first to repeat the same text. */
		message?: string;
		/** polite waits for a pause (status, saved, counts); assertive interrupts (errors that block). */
		politeness?: Politeness;
		/** Shows the text as well. By default the region is for assistive tech only. */
		visible?: boolean;
	} & Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'aria-live'> = $props();

	// The region stays in the DOM from the start: a region that appears together with its text
	// is often not announced. The text goes in one frame after the region empties, so screen
	// readers see a fresh insertion even when one message quickly replaces another.
	let shown = $state('');

	$effect(() => {
		const next = message;
		shown = '';
		if (!next) return;
		const frame = requestAnimationFrame(() => (shown = next));
		return () => cancelAnimationFrame(frame);
	});
</script>

<div
	class="cui-live-region"
	data-visible={visible || undefined}
	role={politeness === 'assertive' ? 'alert' : 'status'}
	aria-live={politeness}
	aria-atomic="true"
	{...rest}
>
	{shown}
</div>

<style>
	@layer calliope.components {
		.cui-live-region:not([data-visible]) {
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
