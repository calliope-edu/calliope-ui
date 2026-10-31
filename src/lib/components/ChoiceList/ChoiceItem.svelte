<script lang="ts" module>
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { IconName } from '../../icons/icons.js';

	export type ChoiceItemProps = {
		/** The way, as a short phrase ("Per USB-Kabel"); the accessible name of the tile. */
		title: string;
		/** One sentence on what it takes or when it fits; read as the description. */
		detail?: string;
		icon?: IconName;
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
	} & Omit<HTMLButtonAttributes, 'title' | 'type'>;
</script>

<script lang="ts">
	import Icon from '../Icon/Icon.svelte';

	let { title, detail, icon, disabled = false, onclick, ...rest }: ChoiceItemProps = $props();

	const uid = $props.id();
	const titleId = `cui-choice-${uid}-title`;
	const detailId = `cui-choice-${uid}-detail`;
</script>

<button
	type="button"
	class="cui-choice-item"
	aria-labelledby={titleId}
	aria-describedby={detail ? detailId : undefined}
	{disabled}
	{onclick}
	{...rest}
>
	{#if icon}<span class="icon" aria-hidden="true"><Icon name={icon} size="l" /></span>{/if}
	<span class="text">
		<span class="title" id={titleId}>{title}</span>
		{#if detail}<span class="detail" id={detailId}>{detail}</span>{/if}
	</span>
	<span class="go" aria-hidden="true"><Icon name="chevron-right" size="m" /></span>
</button>

<style>
	@layer calliope.components {
		/* A large action tile: the click is the choice, there is no confirm step. Rounded
		   rectangle with a control boundary (WCAG 1.4.11), neutral like every control (D2). */
		.cui-choice-item {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			gap: var(--cui-space-4);
			width: 100%;
			min-height: var(--cui-space-16);
			margin: 0;
			padding: var(--cui-space-3) var(--cui-space-4);
			border: var(--cui-border-width-hairline) solid var(--cui-border-control);
			border-radius: var(--cui-radius-lg);
			background-color: var(--cui-surface-default);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-body-font-family);
			text-align: left;
			cursor: pointer;
			-webkit-tap-highlight-color: transparent;
			transition:
				background-color var(--cui-duration-fast) var(--cui-easing-standard),
				border-color var(--cui-duration-fast) var(--cui-easing-standard);
		}

		.icon,
		.go {
			display: inline-grid;
			flex: none;
			place-items: center;
		}

		.go {
			color: var(--cui-text-muted);
		}

		.text {
			display: flex;
			flex: 1;
			flex-direction: column;
			gap: var(--cui-space-0-5);
			min-width: 0;
		}

		.title {
			font-size: var(--cui-typography-body-font-size);
			font-weight: var(--cui-font-weight-bold);
			line-height: var(--cui-typography-body-line-height);
		}

		.detail {
			color: var(--cui-text-muted);
			font-size: var(--cui-typography-label-font-size);
			line-height: var(--cui-typography-label-line-height);
		}

		@media (hover: hover) {
			.cui-choice-item:not(:disabled):hover {
				border-color: var(--cui-border-strong);
				background-color: var(--cui-action-hover);
			}
		}

		.cui-choice-item:not(:disabled):active {
			background-color: var(--cui-action-hover);
		}

		.cui-choice-item:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}
</style>
