<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Identity } from '../Button/Button.svelte';

	export type CardPadding = 'm' | 'l';

	export type CardProps = {
		/** Name of the thing the card stands for. Required when the card is a link. */
		title?: string;
		/** Heading level of the title, to fit the page outline. */
		level?: 2 | 3 | 4;
		/** Short line above the title: the kind of thing ("MakeCode-Programm"). */
		eyebrow?: string;
		/** One or two sentences under the title. */
		description?: string;
		/** Makes the whole card a link: the title is the link, its hit area covers the card. */
		href?: string;
		/** A 4px line in an identity colour along the top edge, for a product or editor. */
		identity?: Identity;
		/** Full-bleed image or preview above the text. Decorative: give images alt="". */
		media?: Snippet;
		/** Footer row (Buttons, a Menu). Stays clickable above the card's link. */
		actions?: Snippet;
		/** Free content under the description. */
		children?: Snippet;
		/** m = 16px (default), l = 24px. */
		padding?: CardPadding;
	} & HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
	let {
		title,
		level = 3,
		eyebrow,
		description,
		href,
		identity,
		media,
		actions,
		children,
		padding = 'm',
		...rest
	}: CardProps = $props();
</script>

<div
	class="cui-card"
	data-padding={padding}
	data-identity={identity}
	data-interactive={href !== undefined || undefined}
	{...rest}
>
	{#if media}<div class="media">{@render media()}</div>{/if}
	<div class="body">
		{#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
		{#if title}
			<svelte:element this={`h${level}`} class="title">
				{#if href !== undefined}<a class="link" {href}>{title}</a>{:else}{title}{/if}
			</svelte:element>
		{/if}
		{#if description}<p class="description">{description}</p>{/if}
		{#if children}<div class="content">{@render children()}</div>{/if}
	</div>
	{#if actions}<div class="actions">{@render actions()}</div>{/if}
</div>

<style>
	@layer calliope.components {
		/* Flat: a 1px border at rest, never a shadow or a hover lift (DESIGN.md, elevation). */
		.cui-card {
			--_pad: var(--cui-space-4);

			position: relative;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			min-width: 0;
			overflow: hidden;
			border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
			border-radius: var(--cui-radius-lg);
			background-color: var(--cui-surface-default);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-body-font-family);
			transition: border-color var(--cui-duration-fast) var(--cui-easing-standard);
		}

		.cui-card[data-padding='l'] {
			--_pad: var(--cui-space-6);
		}

		/* Drawn inside the border box, so the rounded corners clip it and media sit under it. */
		.cui-card[data-identity]::before {
			content: '';
			position: absolute;
			z-index: 1;
			inset: 0 0 auto;
			height: 4px;
			background-color: var(--_identity);
		}

		.cui-card[data-identity='ki-training'] {
			--_identity: var(--cui-identity-ki-training-fill);
		}
		.cui-card[data-identity='teachable'] {
			--_identity: var(--cui-identity-teachable-fill);
		}
		.cui-card[data-identity='iot'] {
			--_identity: var(--cui-identity-iot-fill);
		}
		.cui-card[data-identity='robotik'] {
			--_identity: var(--cui-identity-robotik-fill);
		}
		.cui-card[data-identity='makecode'] {
			--_identity: var(--cui-identity-makecode-fill);
		}
		.cui-card[data-identity='python'] {
			--_identity: var(--cui-identity-python-fill);
		}
		.cui-card[data-identity='blocks'] {
			--_identity: var(--cui-identity-blocks-fill);
		}
		.cui-card[data-identity='markdown'] {
			--_identity: var(--cui-identity-markdown-fill);
		}

		.media {
			display: block;
		}

		.media :global(img),
		.media :global(svg) {
			display: block;
			width: 100%;
			height: auto;
		}

		.body {
			display: flex;
			flex: 1;
			flex-direction: column;
			gap: var(--cui-space-1);
			padding: var(--_pad);
		}

		.eyebrow {
			margin: 0;
			color: var(--cui-text-muted);
			font-family: var(--cui-typography-caption-font-family);
			font-size: var(--cui-typography-caption-font-size);
			font-weight: var(--cui-typography-caption-font-weight);
			line-height: var(--cui-typography-caption-line-height);
		}

		.title {
			margin: 0;
			font-family: var(--cui-typography-h3-font-family);
			font-size: var(--cui-typography-h3-font-size);
			font-weight: var(--cui-typography-h3-font-weight);
			line-height: var(--cui-typography-h3-line-height);
			overflow-wrap: anywhere;
		}

		.description {
			margin: 0;
			color: var(--cui-text-muted);
			font-size: var(--cui-typography-body-font-size);
			line-height: var(--cui-typography-prose-line-height);
		}

		.content {
			margin-top: var(--cui-space-2);
		}

		.actions {
			position: relative;
			z-index: 1;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: var(--cui-space-2);
			padding: 0 var(--_pad) var(--_pad);
		}

		/* Link card: the title link stretches over the whole card, so there is one tab stop
		   and the accessible name is just the title. The ring goes around the card. */
		.link {
			color: inherit;
			text-decoration: none;
		}

		.link::after {
			content: '';
			position: absolute;
			inset: 0;
		}

		.link:focus-visible {
			outline: none;
		}

		.cui-card:has(.link:focus-visible) {
			outline: var(--cui-border-width-focus) solid var(--cui-focus-ring);
			outline-offset: var(--cui-focus-offset);
		}

		@media (hover: hover) {
			.cui-card[data-interactive]:hover {
				border-color: var(--cui-border-strong);
				background-image: linear-gradient(var(--cui-action-hover), var(--cui-action-hover));
			}

			.cui-card[data-interactive]:hover .link {
				text-decoration: underline;
				text-underline-offset: 0.2em;
			}
		}
	}
</style>
