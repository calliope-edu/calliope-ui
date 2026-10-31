<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

	export type TooltipProps = {
		/** Short, plain text. A tooltip never holds interactive content. */
		text: string;
		/** The consumer's own focusable element; spread `props` onto it. */
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
		side?: TooltipSide;
		/** Milliseconds of hover before it opens. Keyboard focus opens it at once. */
		delay?: number;
		open?: boolean;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	import { Tooltip } from 'bits-ui';

	let {
		text,
		trigger,
		side = 'top',
		delay = 400,
		open = $bindable(false),
		disabled = false
	}: TooltipProps = $props();
</script>

<Tooltip.Provider delayDuration={delay} {disabled}>
	<Tooltip.Root bind:open>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				{@render trigger({ props })}
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Portal>
			<Tooltip.Content class="cui-tooltip" {side} sideOffset={6} collisionPadding={8}>
				{text}
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
</Tooltip.Provider>

<style>
	@layer calliope.components {
		:global(.cui-tooltip) {
			z-index: var(--cui-z-index-tooltip);
			box-sizing: border-box;
			max-width: 18rem;
			padding: var(--cui-space-1) var(--cui-space-2);
			border-radius: var(--cui-radius-md);
			background-color: var(--cui-surface-inverse);
			box-shadow: var(--cui-shadow-menu);
			color: var(--cui-text-inverse);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			line-height: var(--cui-typography-label-line-height);
			animation: cui-tooltip-in var(--cui-duration-fast) var(--cui-easing-enter);
		}

		@keyframes -global-cui-tooltip-in {
			from {
				opacity: 0;
			}
		}
	}
</style>
