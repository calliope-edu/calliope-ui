<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, lead, children }: { title: string; lead: Snippet; children: Snippet } = $props();
</script>

<!-- Shared frame of the Foundations pages: intro header plus section typography. -->
<article class="page">
	<header class="intro">
		<p class="eyebrow">Foundations</p>
		<h1>{title}</h1>
		<p class="lead">{@render lead()}</p>
	</header>
	{@render children()}
</article>

<style>
	.page {
		max-width: 72rem;
		margin: 0 auto;
		padding: var(--cui-space-12) var(--cui-space-8) var(--cui-space-16);
		font-family: var(--cui-font-family-sans);
		color: var(--cui-text-default);
	}

	.eyebrow {
		margin: 0;
		font-size: var(--cui-font-size-sm);
		font-weight: var(--cui-font-weight-semibold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	h1 {
		margin: var(--cui-space-1) 0 var(--cui-space-4);
		font-size: var(--cui-typography-display-font-size);
		font-weight: var(--cui-typography-display-font-weight);
		line-height: var(--cui-typography-display-line-height);
		letter-spacing: var(--cui-typography-display-letter-spacing);
	}

	.lead {
		max-width: 46rem;
		margin: 0;
		font-size: var(--cui-font-size-lg);
		line-height: var(--cui-font-line-height-relaxed);
	}

	.page :global(section) {
		margin-top: var(--cui-space-16);
	}

	.page :global(h2) {
		margin: 0 0 var(--cui-space-2);
		padding-bottom: var(--cui-space-2);
		border-bottom: var(--cui-border-width-accent) solid var(--cui-brand-strong);
		font-size: var(--cui-typography-h1-font-size);
		font-weight: var(--cui-typography-h1-font-weight);
		line-height: var(--cui-typography-h1-line-height);
	}

	.page :global(h3) {
		margin: var(--cui-space-10) 0 var(--cui-space-1);
		font-size: var(--cui-typography-h2-font-size);
		font-weight: var(--cui-typography-h2-font-weight);
		line-height: var(--cui-typography-h2-line-height);
	}

	.page :global(.section-intro) {
		max-width: 46rem;
		margin: 0 0 var(--cui-space-4);
		line-height: var(--cui-font-line-height-relaxed);
	}

	.page :global(code) {
		font-family: var(--cui-font-family-mono);
		font-size: 0.8125rem;
	}

	.page :global(.numbers) {
		font-variant-numeric: tabular-nums;
	}

	.page :global(.muted) {
		color: var(--cui-text-muted);
	}

	.page :global(.comparison) {
		display: inline-block;
		margin-left: var(--cui-space-2);
		padding: var(--cui-space-0-5) var(--cui-space-2);
		border-radius: var(--cui-radius-md);
		background: var(--cui-surface-subtle);
		font-size: var(--cui-typography-caption-font-size);
		font-weight: var(--cui-typography-caption-font-weight);
		vertical-align: middle;
	}
</style>
