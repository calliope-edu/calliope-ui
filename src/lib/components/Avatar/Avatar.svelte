<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type AvatarSize = 's' | 'm' | 'l' | 'xl';

	export type AvatarProps = {
		/** The person's name: source of the initials and the accessible name. Without it a person icon shows. */
		name?: string;
		/** Picture URL. Falls back to the initials when it is missing or fails to load. */
		src?: string;
		/** s / m / l / xl = 24 / 32 / 40 / 64px. */
		size?: AvatarSize;
		/** The person's own colour (e.g. their cursor colour) as a 2px ring. The fill stays neutral. */
		swatch?: string;
		/** Hide it from assistive tech, when the name is written right next to it. */
		decorative?: boolean;
	} & HTMLAttributes<HTMLSpanElement>;

	/** Up to two letters: first and last word of the name, or the first two letters of one word. */
	export function initials(name: string): string {
		const words = name.trim().split(/\s+/).filter(Boolean);
		if (words.length === 0) return '';
		const letters =
			words.length === 1
				? Array.from(words[0]).slice(0, 2)
				: [Array.from(words[0])[0], Array.from(words[words.length - 1])[0]];
		return letters.join('').toLocaleUpperCase();
	}
</script>

<script lang="ts">
	import Icon from '../Icon/Icon.svelte';

	let { name, src, size = 'm', swatch, decorative = false, ...rest }: AvatarProps = $props();

	let failed = $state<string | undefined>();
	const showImage = $derived(Boolean(src) && failed !== src);
	const letters = $derived(name ? initials(name) : '');
	const label = $derived(decorative ? undefined : name || undefined);
	const iconSize = $derived(size === 'xl' ? 'l' : size === 's' ? 's' : 'm');
</script>

<!-- Neutral fill for everyone: colour is for status and identity, not for telling people apart. -->
<span
	class="cui-avatar"
	data-size={size}
	data-swatch={swatch ? '' : undefined}
	style:--_swatch={swatch}
	role={label && !showImage ? 'img' : undefined}
	aria-label={showImage ? undefined : label}
	aria-hidden={label ? undefined : 'true'}
	{...rest}
>
	{#if showImage}
		<img {src} alt={label ?? ''} onerror={() => (failed = src)} />
	{:else if letters}
		<span aria-hidden="true">{letters}</span>
	{:else}
		<Icon name="person" size={iconSize} />
	{/if}
</span>

<style>
	@layer calliope.components {
		.cui-avatar {
			--_size: 2rem;
			--_font-size: var(--cui-font-size-sm);

			box-sizing: border-box;
			display: inline-grid;
			flex: none;
			place-items: center;
			width: var(--_size);
			height: var(--_size);
			overflow: hidden;
			border-radius: var(--cui-radius-full);
			background-color: var(--cui-surface-subtle);
			color: var(--cui-text-default);
			font-family: var(--cui-typography-label-font-family);
			font-size: var(--_font-size);
			font-weight: var(--cui-font-weight-semibold);
			line-height: 1;
			user-select: none;
		}

		.cui-avatar[data-size='s'] {
			--_size: 1.5rem;
			--_font-size: var(--cui-font-size-xs);
		}

		.cui-avatar[data-size='l'] {
			--_size: 2.5rem;
			--_font-size: var(--cui-font-size-md);
		}

		.cui-avatar[data-size='xl'] {
			--_size: 4rem;
			--_font-size: var(--cui-font-size-2xl);
		}

		.cui-avatar[data-swatch] {
			border: var(--cui-border-width-control) solid var(--_swatch);
		}

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
