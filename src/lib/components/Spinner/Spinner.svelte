<script lang="ts" module>
	export type SpinnerSize = 's' | 'm' | 'l';
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		label,
		size = 'm',
		delay = 0,
		...rest
	}: {
		/** Announced via role="status". Without it the spinner is decorative (e.g. inside a busy button). */
		label?: string;
		/** 16 / 20 / 24px, matching the icon sizes. */
		size?: SpinnerSize;
		/** Milliseconds before it appears, so fast operations do not flash (DESIGN.md suggests 300). */
		delay?: number;
	} & HTMLAttributes<HTMLSpanElement> = $props();

	let visible = $state(false);

	onMount(() => {
		if (delay <= 0) {
			visible = true;
			return;
		}
		const timer = setTimeout(() => (visible = true), delay);
		return () => clearTimeout(timer);
	});
</script>

<span
	class="cui-spinner"
	data-size={size}
	role={label ? 'status' : undefined}
	aria-hidden={label ? undefined : 'true'}
	{...rest}
>
	{#if visible}
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<circle class="arc" cx="12" cy="12" r="9" />
		</svg>
	{/if}
	{#if label}<span class="label">{label}</span>{/if}
</span>

<style>
	@layer calliope.components {
		.cui-spinner {
			flex: none;
			display: inline-flex;
			width: var(--cui-size-icon-m);
			height: var(--cui-size-icon-m);
			vertical-align: middle;
			color: inherit;
		}

		.cui-spinner[data-size='s'] {
			width: var(--cui-size-icon-s);
			height: var(--cui-size-icon-s);
		}

		.cui-spinner[data-size='l'] {
			width: var(--cui-size-icon-l);
			height: var(--cui-size-icon-l);
		}

		svg {
			width: 100%;
			height: 100%;
			/* One shared keyframe; reduced motion slows it down via --cui-duration-spin. */
			animation: cui-spin var(--cui-duration-spin) linear infinite;
		}

		circle {
			fill: none;
			stroke: currentColor;
			stroke-width: 3;
		}

		/* No track ring: a lighter track would be a new shade (DESIGN.md, Pairs, not shades). */
		.arc {
			stroke-linecap: round;
			stroke-dasharray: 40 100;
		}

		.label {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
		}

		@keyframes cui-spin {
			to {
				transform: rotate(360deg);
			}
		}
	}
</style>
