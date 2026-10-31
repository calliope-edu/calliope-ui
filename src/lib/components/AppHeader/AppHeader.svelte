<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type AppHeaderProps = {
		/** Name of the app ("Calliope Campus"). Not the page title: that is the page's own h1. */
		title: string;
		/** Where the brand links to. `null` shows it without a link. */
		href?: string | null;
		/** Own mark instead of the Calliope figure; drawn at 24px height in the text colour. */
		logo?: Snippet;
		/** After the brand: room name, breadcrumb, a back link. */
		start?: Snippet;
		/** Centred whatever the sides hold, usually a SegmentedControl. Drops to its own row below 640px. */
		center?: Snippet;
		/** Actions, LocaleSwitcher, the user menu. */
		end?: Snippet;
		/** Stick to the top of the scrolling page (z-index header). */
		sticky?: boolean;
		/** First tab stop, visible on focus: jumps past the header to the main content. */
		skipLink?: { href: string; label: string };
	} & Omit<HTMLAttributes<HTMLElement>, 'title'>;
</script>

<script lang="ts">
	let {
		title,
		href = '/',
		logo,
		start,
		center,
		end,
		sticky = false,
		skipLink,
		...rest
	}: AppHeaderProps = $props();
</script>

{#snippet brand()}
	<span class="mark" aria-hidden="true">
		{#if logo}
			{@render logo()}
		{:else}
			<svg viewBox="0 0 27 26" fill="currentColor">
				<path
					d="M24.83.52h-4.62c-.69 0-1.26.56-1.26 1.26v3.48A5.26 5.26 0 0 0 13.69 0c-2.9 0-5.26 2.36-5.26 5.26v5.78L2.19 15.72c-4.21 3.21-1.94 9.93 3.36 9.93H6.8c.53-3.87 1.74-8.66 4.19-11.56h5.71c2.49 2.94 3.55 7.67 4.06 11.56h1.77c1.96 0 3.56-1.59 3.56-3.56V1.78c0-.69-.56-1.26-1.26-1.26M11.67 3.37h4.34V6.3c0 .95-.77 1.71-1.71 1.71h-.91c-.95 0-1.71-.77-1.71-1.71V3.37zm-1.03 8.49 1.97-3.76 1.17 3.76zm3.24 0 1.18-3.79 1.96 3.79zm11.25-3.25h-5.22V2.18h5.22zM11.13 14.09v11.56h6.91c-2.79-2-5.07-7.24-6.91-11.56"
				/>
			</svg>
		{/if}
	</span>
	<span class="title">{title}</span>
{/snippet}

<!-- Always a dark band. Menus open in a portal, so they keep the page theme. -->
<header
	class="cui-app-header"
	data-theme="dark"
	data-sticky={sticky || undefined}
	data-has-center={center ? '' : undefined}
	{...rest}
>
	{#if skipLink}<a class="skip" href={skipLink.href}>{skipLink.label}</a>{/if}
	<div class="bar">
		<div class="start">
			{#if href === null}
				<span class="brand">{@render brand()}</span>
			{:else}
				<a class="brand" {href}>{@render brand()}</a>
			{/if}
			{@render start?.()}
		</div>
		{#if center}<div class="center">{@render center()}</div>{/if}
		<div class="end">{@render end?.()}</div>
	</div>
</header>

<style>
	@layer calliope.components {
		.cui-app-header {
			position: relative;
			box-sizing: border-box;
			padding: var(--cui-space-2) var(--cui-space-8);
			background-color: var(--cui-surface-default);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-body-font-family);
			container: cui-app-header / inline-size;
		}

		.bar {
			display: grid;
			grid-template-columns: minmax(0, 1fr) auto;
			grid-template-areas: 'start end';
			align-items: center;
			gap: var(--cui-space-2) var(--cui-space-4);
			min-height: calc(var(--cui-size-header) - 2 * var(--cui-space-2));
		}

		/* Two equal side columns keep the centre in the middle whatever the sides hold. */
		[data-has-center] .bar {
			grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
			grid-template-areas: 'start center end';
		}

		.cui-app-header[data-sticky] {
			position: sticky;
			top: 0;
			z-index: var(--cui-z-index-header);
		}

		.start,
		.end {
			display: flex;
			align-items: center;
			gap: var(--cui-space-4);
			min-width: 0;
		}

		.start {
			grid-area: start;
		}

		.center {
			grid-area: center;
			display: flex;
			justify-content: center;
		}

		.end {
			grid-area: end;
			justify-content: flex-end;
			gap: var(--cui-space-2);
		}

		.brand {
			display: inline-flex;
			flex: none;
			align-items: center;
			gap: var(--cui-space-3);
			min-height: var(--cui-size-touch-min);
			border-radius: var(--cui-radius-sm);
			color: inherit;
			text-decoration: none;
		}

		a.brand:hover .title {
			text-decoration: underline;
			text-underline-offset: 0.2em;
		}

		.mark {
			display: inline-flex;
			height: var(--cui-size-icon-l);
		}

		.mark :global(svg),
		.mark :global(img) {
			width: auto;
			height: 100%;
		}

		.title {
			font-family: var(--cui-typography-h3-font-family);
			font-size: var(--cui-font-size-md);
			font-weight: var(--cui-font-weight-semibold);
			line-height: var(--cui-font-line-height-tight);
			white-space: nowrap;
		}

		/* Off-screen until focused, then a pill at the start of the band. */
		.skip {
			position: absolute;
			top: var(--cui-space-2);
			left: var(--cui-space-2);
			z-index: 1;
			padding: var(--cui-space-2) var(--cui-space-4);
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-surface-inverse);
			color: var(--cui-text-inverse);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			text-decoration: none;
			transform: translateY(-200%);
		}

		.skip:focus-visible {
			transform: none;
		}

		@container cui-app-header (max-width: 640px) {
			[data-has-center] .bar {
				grid-template-columns: minmax(0, 1fr) auto;
				grid-template-areas:
					'start end'
					'center center';
			}
		}

		@container cui-app-header (max-width: 480px) {
			/* The mark alone links home; the name stays as its accessible name. */
			.title {
				position: absolute;
				width: 1px;
				height: 1px;
				overflow: hidden;
				clip-path: inset(50%);
				white-space: nowrap;
			}
		}

		@media (max-width: 768px) {
			.cui-app-header {
				padding-inline: var(--cui-space-4);
			}
		}
	}
</style>
