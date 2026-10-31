<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		eyebrow,
		title,
		lead,
		children
	}: { eyebrow: string; title: string; lead: Snippet; children: Snippet } = $props();
</script>

<!-- Shared frame of the component overview stories: intro, then sections of states and rules. -->
<article class="page">
	<header class="intro">
		<p class="eyebrow">{eyebrow}</p>
		<h1>{title}</h1>
		<p class="lead">{@render lead()}</p>
	</header>
	{@render children()}
</article>

<style>
	.page {
		max-width: 72rem;
		margin: 0 auto;
		padding: var(--cui-space-10) var(--cui-space-8) var(--cui-space-16);
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
		margin: var(--cui-space-1) 0 var(--cui-space-3);
		font-family: var(--cui-typography-h1-font-family);
		font-size: var(--cui-font-size-3xl);
		font-weight: var(--cui-font-weight-bold);
		line-height: var(--cui-font-line-height-tight);
	}

	.lead {
		max-width: 46rem;
		margin: 0;
		font-size: var(--cui-font-size-lg);
		line-height: var(--cui-font-line-height-relaxed);
	}

	.page :global(section) {
		margin-top: var(--cui-space-12);
	}

	.page :global(h2) {
		margin: 0 0 var(--cui-space-4);
		padding-bottom: var(--cui-space-2);
		border-bottom: var(--cui-border-width-accent) solid var(--cui-brand-strong);
		font-family: var(--cui-typography-h2-font-family);
		font-size: var(--cui-typography-h2-font-size);
		font-weight: var(--cui-typography-h2-font-weight);
		line-height: var(--cui-typography-h2-line-height);
	}

	.page :global(.section-intro) {
		max-width: 46rem;
		margin: calc(-1 * var(--cui-space-2)) 0 var(--cui-space-4);
		line-height: var(--cui-font-line-height-relaxed);
	}

	.page :global(code) {
		font-family: var(--cui-font-family-mono);
		font-size: 0.8125rem;
	}

	.page :global(.muted) {
		color: var(--cui-text-muted);
	}
</style>
