<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		id,
		tone = 'default',
		children,
		...rest
	}: {
		/** Reference it from the control's aria-describedby. */
		id?: string;
		/** error: red icon disc with a black mark beside ink text (red text would be 4.08:1). */
		tone?: 'default' | 'error';
		children: Snippet;
	} & HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p class="cui-field-hint" data-tone={tone} {id} {...rest}>
	{#if tone === 'error'}
		<svg class="disc" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
			<circle cx="8" cy="8" r="8" />
			<rect x="7" y="3.5" width="2" height="6" rx="1" />
			<circle cx="8" cy="12" r="1.1" />
		</svg>
	{/if}
	<span>{@render children()}</span>
</p>

<style>
	@layer calliope.components {
		.cui-field-hint {
			display: flex;
			align-items: flex-start;
			gap: var(--cui-space-1);
			margin: 0;
			color: var(--cui-text-muted);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-font-weight-regular);
			line-height: var(--cui-typography-label-line-height);
		}

		.cui-field-hint[data-tone='error'] {
			color: var(--cui-text-error);
			font-weight: var(--cui-typography-label-font-weight);
		}

		.disc {
			flex: none;
			width: var(--cui-size-icon-s);
			height: var(--cui-size-icon-s);
			/* Optically centred on the first line of 14px text. */
			margin-top: 0.1em;
		}

		.disc :first-child {
			fill: var(--cui-status-error-fill);
		}

		.disc :not(:first-child) {
			fill: var(--cui-status-error-on);
		}
	}
</style>
