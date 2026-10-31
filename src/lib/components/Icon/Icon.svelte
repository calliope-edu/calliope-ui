<script lang="ts" module>
	export type IconSize = 's' | 'm' | 'l';
</script>

<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';
	import { icons, type IconName } from '../../icons/icons.js';

	let {
		name,
		size = 'm',
		label,
		...rest
	}: {
		/** Semantic name; the set behind it can change without touching consumers. */
		name: IconName;
		/** 16 / 20 / 24px. */
		size?: IconSize;
		/** Accessible name. Without it the icon is decorative and hidden from assistive tech. */
		label?: string;
	} & Omit<SVGAttributes<SVGSVGElement>, 'name'> = $props();
</script>

<svg
	class="cui-icon"
	data-size={size}
	viewBox="0 0 24 24"
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
	focusable="false"
	{...rest}
>
	{@html icons[name]}
</svg>

<style>
	@layer calliope.components {
		.cui-icon {
			flex: none;
			display: inline-block;
			width: var(--cui-icon-size, var(--cui-size-icon-m));
			height: var(--cui-icon-size, var(--cui-size-icon-m));
			vertical-align: middle;
		}

		.cui-icon[data-size='s'] {
			--cui-icon-size: var(--cui-size-icon-s);
		}

		.cui-icon[data-size='l'] {
			--cui-icon-size: var(--cui-size-icon-l);
		}
	}
</style>
