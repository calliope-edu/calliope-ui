<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { MenuAlign } from '../Menu/Menu.svelte';

	export type AccountMenuProps = {
		/** Signed-in person; without it the trigger shows the person icon (signed out). */
		name?: string;
		/** Picture URL for the Avatar. */
		src?: string;
		/** Start of the trigger's accessible name: "Konto" → "Konto: Juri Wolf". */
		label: string;
		/** The person's colour as a ring on the Avatar. */
		swatch?: string;
		align?: MenuAlign;
		open?: boolean;
		/** MenuItems: settings, sign out; signed out: sign in, register. A MenuRadioGroup for the language. */
		children: Snippet;
	};
</script>

<script lang="ts">
	import Avatar from '../Avatar/Avatar.svelte';
	import Menu from '../Menu/Menu.svelte';

	let {
		name,
		src,
		label,
		swatch,
		align = 'end',
		open = $bindable(false),
		children
	}: AccountMenuProps = $props();
</script>

<Menu bind:open {align}>
	{#snippet trigger({ props })}
		<button
			{...props}
			type="button"
			class="cui-account-trigger"
			aria-label={name ? `${label}: ${name}` : label}
		>
			<Avatar {name} {src} {swatch} size="m" decorative />
		</button>
	{/snippet}
	{#if name}<p class="cui-account-name">{name}</p>{/if}
	{@render children()}
</Menu>

<style>
	@layer calliope.components {
		/* 40px round hit area around the 32px Avatar; the focus ring follows the circle. */
		.cui-account-trigger {
			display: inline-grid;
			flex: none;
			place-items: center;
			width: var(--cui-size-control-l);
			height: var(--cui-size-control-l);
			margin: 0;
			padding: 0;
			border: 0;
			border-radius: var(--cui-radius-full);
			background: transparent;
			color: inherit;
			cursor: pointer;
			-webkit-tap-highlight-color: transparent;
		}

		@media (hover: hover) {
			.cui-account-trigger:hover {
				background-color: var(--cui-action-hover);
			}
		}

		.cui-account-name {
			margin: 0;
			padding: var(--cui-space-2) var(--cui-space-3);
			color: var(--cui-text-muted);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--cui-typography-label-font-size);
			font-weight: var(--cui-typography-label-font-weight);
			overflow-wrap: anywhere;
		}
	}
</style>
