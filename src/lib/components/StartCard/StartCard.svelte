<script lang="ts" module>
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { IconName } from '../../icons/icons.js';
	import type { Identity } from '../Button/Button.svelte';

	/**
	 * Fill of the square field: an identity (the product or editor the new thing belongs to),
	 * `highlight` (the accent magenta) or `neutral` (ink; white on dark areas).
	 */
	export type StartCardColor = Identity | 'highlight' | 'neutral';

	export type StartCardProps = {
		/** What gets started, as a short phrase ("Neues Programm"); the accessible name. */
		title: string;
		/** One or two sentences on what it starts or when it fits; read as the description. */
		description?: string;
		/** Fill of the field on the right. */
		color?: StartCardColor;
		/** Replaces the drawn plus, e.g. for "continue" or "open file" cards. */
		icon?: IconName;
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
	} & Omit<HTMLButtonAttributes, 'title' | 'type' | 'color'>;
</script>

<script lang="ts">
	import Icon from '../Icon/Icon.svelte';

	let {
		title,
		description,
		color = 'neutral',
		icon,
		disabled = false,
		onclick,
		...rest
	}: StartCardProps = $props();

	const uid = $props.id();
	const titleId = `cui-start-card-${uid}-title`;
	const descriptionId = `cui-start-card-${uid}-description`;
</script>

<button
	type="button"
	class="cui-start-card"
	data-color={color}
	aria-labelledby={titleId}
	aria-describedby={description ? descriptionId : undefined}
	{disabled}
	{onclick}
	{...rest}
>
	<span class="text">
		<span class="title" id={titleId}>{title}</span>
		{#if description}<span class="description" id={descriptionId}>{description}</span>{/if}
	</span>
	<span class="field" aria-hidden="true">
		{#if icon}<Icon name={icon} />{:else}<span class="plus"></span>{/if}
	</span>
</button>

<style>
	@layer calliope.components {
		/* The large "start something new" card of Campus, the IoT dashboard, KI-Training and
		   Teachable: flat and square on surface.subtle, text on the left, a square colour field
		   with a big plus on the right. The whole card is one button. */
		.cui-start-card {
			--_field-size: var(--cui-start-card-field-size, 10rem);
			--_fill: var(--cui-surface-inverse);
			--_on: var(--cui-text-inverse);

			box-sizing: border-box;
			display: flex;
			align-items: stretch;
			width: 100%;
			min-height: var(--_field-size);
			margin: 0;
			padding: 0;
			border: 0;
			border-radius: 0;
			background-color: var(--cui-surface-subtle);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-body-font-family);
			text-align: left;
			cursor: pointer;
			-webkit-tap-highlight-color: transparent;
		}

		.cui-start-card[data-color='highlight'] {
			--_fill: var(--cui-accent-highlight);
			--_on: var(--cui-accent-highlight-on);
		}
		.cui-start-card[data-color='ki-training'] {
			--_fill: var(--cui-identity-ki-training-fill);
			--_on: var(--cui-identity-ki-training-on);
		}
		.cui-start-card[data-color='teachable'] {
			--_fill: var(--cui-identity-teachable-fill);
			--_on: var(--cui-identity-teachable-on);
		}
		.cui-start-card[data-color='iot'] {
			--_fill: var(--cui-identity-iot-fill);
			--_on: var(--cui-identity-iot-on);
		}
		.cui-start-card[data-color='robotik'] {
			--_fill: var(--cui-identity-robotik-fill);
			--_on: var(--cui-identity-robotik-on);
		}
		.cui-start-card[data-color='makecode'] {
			--_fill: var(--cui-identity-makecode-fill);
			--_on: var(--cui-identity-makecode-on);
		}
		.cui-start-card[data-color='python'] {
			--_fill: var(--cui-identity-python-fill);
			--_on: var(--cui-identity-python-on);
		}
		.cui-start-card[data-color='blocks'] {
			--_fill: var(--cui-identity-blocks-fill);
			--_on: var(--cui-identity-blocks-on);
		}
		.cui-start-card[data-color='markdown'] {
			--_fill: var(--cui-identity-markdown-fill);
			--_on: var(--cui-identity-markdown-on);
		}

		.text {
			display: flex;
			flex: 1;
			flex-direction: column;
			gap: var(--cui-space-2);
			min-width: 0;
			padding: var(--cui-space-5) var(--cui-space-5) var(--cui-space-6);
		}

		.title {
			font-family: var(--cui-typography-h2-font-family);
			font-size: var(--cui-typography-h2-font-size);
			font-weight: var(--cui-typography-h2-font-weight);
			line-height: var(--cui-typography-h2-line-height);
			overflow-wrap: anywhere;
		}

		.description {
			font-size: var(--cui-typography-body-font-size);
			line-height: var(--cui-typography-prose-line-height);
		}

		/* At least square; grows with the text so the colour runs the full height. */
		.field {
			--cui-icon-size: calc(var(--_field-size) * 0.45);

			position: relative;
			display: grid;
			flex: none;
			place-items: center;
			width: var(--_field-size);
			min-height: var(--_field-size);
			background-color: var(--_fill);
			color: var(--_on);
			transition: filter var(--cui-duration-fast) var(--cui-easing-standard);
		}

		/* Two rounded bars, thicker than the add icon's stroke, as Campus draws it. */
		.plus::before,
		.plus::after {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			width: calc(var(--_field-size) * 0.31);
			height: calc(var(--_field-size) * 0.04);
			border-radius: var(--cui-radius-full);
			background-color: currentColor;
			transform: translate(-50%, -50%);
		}

		.plus::after {
			transform: translate(-50%, -50%) rotate(90deg);
		}

		@media (hover: hover) {
			.cui-start-card:not(:disabled):hover {
				background-image: linear-gradient(var(--cui-action-hover), var(--cui-action-hover));
			}

			.cui-start-card:not(:disabled):hover .field {
				filter: brightness(0.88);
			}
		}

		.cui-start-card:not(:disabled):active .field {
			filter: brightness(0.8);
		}

		.cui-start-card:focus-visible {
			outline: var(--cui-border-width-focus) solid var(--cui-focus-ring);
			outline-offset: var(--cui-focus-offset);
		}

		.cui-start-card:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}

		@media (prefers-reduced-motion: reduce) {
			.field {
				transition: none;
			}
		}
	}
</style>
