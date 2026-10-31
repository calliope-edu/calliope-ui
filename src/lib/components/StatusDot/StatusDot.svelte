<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type Status = 'success' | 'warning' | 'error' | 'info' | 'neutral';
	export type StatusDotSize = 's' | 'm' | 'l';

	export type StatusDotProps = {
		/** success = online, connected · warning = paused · error = offline, blocked · neutral = idle. */
		status: Status;
		/** The word for the state ("Online"). Required: a dot is never the only signal. */
		label: string;
		/** Keeps the word for assistive tech only; the shape still differs per status. Tables only. */
		hideLabel?: boolean;
		/** Text 12 / 14 / 16px: s for metadata, m on teacher views, l on projected surfaces. */
		size?: StatusDotSize;
	} & HTMLAttributes<HTMLSpanElement>;
</script>

<script lang="ts">
	import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.svelte';

	let { status, label, hideLabel = false, size = 'm', ...rest }: StatusDotProps = $props();
</script>

<span class="cui-status-dot" data-status={status} data-size={size} {...rest}>
	<!-- Shape as well as colour: circle, diamond, square, ring. -->
	<span class="dot" aria-hidden="true"></span>
	{#if hideLabel}
		<VisuallyHidden>{label}</VisuallyHidden>
	{:else}
		<span class="label">{label}</span>
	{/if}
</span>

<style>
	@layer calliope.components {
		.cui-status-dot {
			--_dot: 0.5rem;
			--_fill: var(--cui-text-muted);

			position: relative;
			display: inline-flex;
			align-items: center;
			gap: var(--cui-space-2);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			line-height: var(--cui-typography-label-line-height);
			white-space: nowrap;
		}

		[data-size='s'] {
			gap: var(--cui-space-1);
			font-size: var(--cui-typography-caption-font-size);
		}

		[data-size='l'] {
			--_dot: 0.625rem;
			font-size: var(--cui-typography-body-font-size);
		}

		.dot {
			flex: none;
			box-sizing: border-box;
			width: var(--_dot);
			height: var(--_dot);
			border-radius: var(--cui-radius-full);
			background-color: var(--_fill);
		}

		[data-status='success'] {
			--_fill: var(--cui-status-success-fill);
		}

		[data-status='info'] {
			--_fill: var(--cui-status-info-fill);
		}

		[data-status='warning'] {
			--_fill: var(--cui-status-warning-fill);
		}

		[data-status='warning'] .dot {
			border-radius: 1px;
			transform: rotate(45deg) scale(0.9);
		}

		[data-status='error'] {
			--_fill: var(--cui-status-error-fill);
		}

		[data-status='error'] .dot {
			border-radius: 1px;
		}

		[data-status='neutral'] .dot {
			border: var(--cui-border-width-control) solid var(--cui-border-control);
			background-color: transparent;
		}
	}
</style>
