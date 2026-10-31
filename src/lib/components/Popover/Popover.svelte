<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
	export type PopoverAlign = 'start' | 'center' | 'end';

	export type PopoverProps = {
		/** The consumer's own button; spread `props` onto it (Button and IconButton accept them). */
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
		/** Heading of the panel; also its accessible name. */
		title?: string;
		/** The panel content. May be interactive (fields, buttons), unlike a Tooltip. */
		children: Snippet;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		side?: PopoverSide;
		align?: PopoverAlign;
		/** Close button in the corner. Escape and a click outside close it either way. */
		showClose?: boolean;
		closeLabel?: string;
		/** Width of the panel: s = 16rem, m = 20rem, l = 24rem. */
		size?: 's' | 'm' | 'l';
	};
</script>

<script lang="ts">
	import { Popover } from 'bits-ui';
	import IconButton from '../IconButton/IconButton.svelte';

	let {
		trigger,
		title,
		children,
		open = $bindable(false),
		onOpenChange,
		side = 'bottom',
		align = 'start',
		showClose = false,
		closeLabel = 'Schließen',
		size = 'm'
	}: PopoverProps = $props();

	const uid = $props.id();
	const titleId = `cui-popover-${uid}-title`;
</script>

<Popover.Root bind:open {onOpenChange}>
	<Popover.Trigger>
		{#snippet child({ props })}
			{@render trigger({ props })}
		{/snippet}
	</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content
			class="cui-popover"
			data-size={size}
			{side}
			{align}
			sideOffset={6}
			collisionPadding={8}
			role="dialog"
			aria-labelledby={title ? titleId : undefined}
		>
			{#if title || showClose}
				<div class="cui-popover-header">
					{#if title}<h2 id={titleId} class="cui-popover-title">{title}</h2>{/if}
					{#if showClose}
						<Popover.Close>
							{#snippet child({ props })}
								<IconButton {...props} icon="close" label={closeLabel} size="s" tooltip={false} />
							{/snippet}
						</Popover.Close>
					{/if}
				</div>
			{/if}
			{@render children()}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>

<style>
	@layer calliope.components {
		:global(.cui-popover) {
			z-index: var(--cui-z-index-dropdown);
			box-sizing: border-box;
			width: 20rem;
			max-width: calc(100vw - 2 * var(--cui-space-2));
			padding: var(--cui-space-4);
			border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
			border-radius: var(--cui-radius-lg);
			background-color: var(--cui-surface-raised);
			box-shadow: var(--cui-shadow-menu);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-body-font-family);
			font-size: var(--cui-typography-body-font-size);
			line-height: var(--cui-typography-body-line-height);
			animation: cui-popover-in var(--cui-duration-fast) var(--cui-easing-enter);
		}

		:global(.cui-popover[data-size='s']) {
			width: 16rem;
		}

		:global(.cui-popover[data-size='l']) {
			width: 24rem;
		}

		:global(.cui-popover-header) {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: var(--cui-space-2);
			min-height: var(--cui-size-control-s);
			margin: calc(-1 * var(--cui-space-1)) calc(-1 * var(--cui-space-2)) var(--cui-space-2) 0;
		}

		:global(.cui-popover-title) {
			margin: 0;
			font-family: var(--cui-typography-h3-font-family);
			font-size: var(--cui-typography-h3-font-size);
			font-weight: var(--cui-typography-h3-font-weight);
			line-height: var(--cui-typography-h3-line-height);
		}

		:global(.cui-popover-header:not(:has(.cui-popover-title))) {
			justify-content: flex-end;
		}

		@keyframes -global-cui-popover-in {
			from {
				opacity: 0;
			}
		}
	}
</style>
