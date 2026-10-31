<script lang="ts">
	import { Switch } from 'bits-ui';
	import FieldHint from '../TextField/FieldHint.svelte';

	let {
		checked = $bindable(false),
		onCheckedChange,
		label,
		hint,
		labelPosition = 'end',
		disabled = false,
		name,
		value,
		id: idProp
	}: {
		checked?: boolean;
		onCheckedChange?: (checked: boolean) => void;
		/** Visible label; says what is switched on, not the state ("Chat erlauben"). */
		label: string;
		/** Help text, linked with aria-describedby (never nested in the control). */
		hint?: string;
		/** Label after (default) or before the switch. */
		labelPosition?: 'start' | 'end';
		disabled?: boolean;
		/** Form field name; the switch submits `value` (default "on") when checked. */
		name?: string;
		value?: string;
		id?: string;
	} = $props();

	const uid = $props.id();
	const id = $derived(idProp ?? `cui-switch-${uid}`);
	const hintId = $derived(`${id}-hint`);
</script>

<div class="cui-switch" data-label-position={labelPosition} data-disabled={disabled || undefined}>
	<div class="row">
		<Switch.Root
			{id}
			bind:checked
			{onCheckedChange}
			{disabled}
			{name}
			{value}
			class="cui-switch-track"
			aria-describedby={hint ? hintId : undefined}
		>
			<Switch.Thumb class="cui-switch-thumb" />
		</Switch.Root>
		<label for={id}>{label}</label>
	</div>
	{#if hint}<FieldHint id={hintId}>{hint}</FieldHint>{/if}
</div>

<style>
	@layer calliope.components {
		.cui-switch {
			display: inline-flex;
			flex-direction: column;
			gap: var(--cui-space-1);
		}

		.row {
			display: inline-flex;
			align-items: center;
			gap: var(--cui-space-3);
		}

		.cui-switch[data-label-position='start'] {
			display: flex;
		}

		[data-label-position='start'] .row {
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
		}

		label {
			color: var(--cui-text-default);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			line-height: var(--cui-typography-label-line-height);
			cursor: pointer;
		}

		/* 48×28 track: off = outline with a hollow-looking knob, on = control.on fill with the
		   mark-coloured knob at the far end. Position and fill both carry the state. */
		:global(.cui-switch-track) {
			position: relative;
			box-sizing: border-box;
			flex: none;
			width: var(--cui-size-switch-width);
			height: var(--cui-size-switch-height);
			margin: 0;
			padding: 0;
			border: var(--cui-border-width-control) solid var(--cui-border-control);
			border-radius: var(--cui-radius-full);
			background-color: transparent;
			cursor: pointer;
			transition:
				background-color var(--cui-duration-base) var(--cui-easing-standard),
				border-color var(--cui-duration-base) var(--cui-easing-standard);
		}

		:global(.cui-switch-track[data-state='checked']) {
			border-color: var(--cui-control-on);
			background-color: var(--cui-control-on);
		}

		:global(.cui-switch-thumb) {
			position: absolute;
			top: 50%;
			left: 4px;
			display: block;
			width: 16px;
			height: 16px;
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-border-control);
			transform: translateY(-50%);
			transition:
				transform var(--cui-duration-base) var(--cui-easing-standard),
				width var(--cui-duration-base) var(--cui-easing-standard),
				background-color var(--cui-duration-base) var(--cui-easing-standard);
		}

		/* Checked knob grows to 20px and moves right: 48 − 2×2 border − 20 − 2 inset = 22. */
		:global(.cui-switch-track[data-state='checked'] .cui-switch-thumb) {
			width: 20px;
			height: 20px;
			background-color: var(--cui-control-on-mark);
			transform: translate(18px, -50%);
		}

		@media (hover: hover) {
			:global(.cui-switch-track:not([data-disabled]):hover) {
				box-shadow: 0 0 0 4px var(--cui-action-hover);
			}
		}

		.cui-switch[data-disabled] {
			opacity: 0.4;
		}

		[data-disabled] label,
		:global(.cui-switch-track[data-disabled]) {
			cursor: not-allowed;
		}
	}
</style>
