<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { IconName } from '../../icons/icons.js';

	export type EmptyStateProps = {
		/** What is missing, as a statement ("Noch keine Feeds"). */
		title: string;
		/** Heading level of the title, to fit the page outline. */
		level?: 2 | 3 | 4;
		/** What it is for and how to start, in one or two sentences. */
		description?: string;
		icon?: IconName;
		/** One primary Button that starts the first step; optionally a secondary one. */
		actions?: Snippet;
		/** Extra content between text and actions, e.g. a short list of suggestions. */
		children?: Snippet;
		/** compact: left-aligned and tight, for a table body or a small panel. */
		compact?: boolean;
	} & HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
	import Icon from '../Icon/Icon.svelte';

	let {
		title,
		level = 3,
		description,
		icon,
		actions,
		children,
		compact = false,
		...rest
	}: EmptyStateProps = $props();
</script>

<div class="cui-empty-state" data-compact={compact || undefined} {...rest}>
	{#if icon}<span class="icon" aria-hidden="true"><Icon name={icon} size="l" /></span>{/if}
	<svelte:element this={`h${level}`} class="title">{title}</svelte:element>
	{#if description}<p class="description">{description}</p>{/if}
	{#if children}<div class="extra">{@render children()}</div>{/if}
	{#if actions}<div class="actions">{@render actions()}</div>{/if}
</div>

<style>
	@layer calliope.components {
		.cui-empty-state {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--cui-space-2);
			max-width: 32rem;
			margin: 0 auto;
			padding: var(--cui-space-8) var(--cui-space-4);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-body-font-family);
			text-align: center;
		}

		[data-compact] {
			align-items: flex-start;
			max-width: none;
			margin: 0;
			padding: var(--cui-space-4) 0;
			text-align: left;
		}

		/* A neutral disc: an empty state is calm, it is not a status. */
		.icon {
			display: inline-grid;
			place-items: center;
			width: var(--cui-space-12);
			height: var(--cui-space-12);
			margin-bottom: var(--cui-space-2);
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-surface-subtle);
		}

		[data-compact] .icon {
			display: none;
		}

		.title {
			margin: 0;
			font-family: var(--cui-typography-h3-font-family);
			font-size: var(--cui-typography-h3-font-size);
			font-weight: var(--cui-typography-h3-font-weight);
			line-height: var(--cui-typography-h3-line-height);
		}

		.description {
			margin: 0;
			color: var(--cui-text-muted);
			font-size: var(--cui-typography-body-font-size);
			line-height: var(--cui-typography-prose-line-height);
		}

		.extra {
			width: 100%;
		}

		.actions {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: var(--cui-space-2);
			margin-top: var(--cui-space-2);
		}

		[data-compact] .actions {
			justify-content: flex-start;
		}
	}
</style>
