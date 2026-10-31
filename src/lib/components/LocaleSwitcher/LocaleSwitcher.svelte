<script lang="ts" module>
	import type { ButtonSize, ButtonVariant } from '../Button/Button.svelte';
	import type { MenuAlign } from '../Menu/Menu.svelte';

	export type Locale = {
		/** BCP 47 code, e.g. "de", "en". Shown in the trigger and set as `lang` on the item. */
		code: string;
		/** The language's own name ("Deutsch", "English"), so everyone finds theirs. */
		name: string;
	};

	export type LocaleSwitcherProps = {
		locales: Locale[];
		/** Code of the current locale. */
		value: string;
		onValueChange?: (code: string) => void;
		/** "Sprache" / "Language": heading of the list and start of the trigger's accessible name. */
		label: string;
		variant?: Extract<ButtonVariant, 'ghost' | 'secondary'>;
		size?: ButtonSize;
		align?: MenuAlign;
	};
</script>

<script lang="ts">
	import Button from '../Button/Button.svelte';
	import Menu from '../Menu/Menu.svelte';
	import MenuRadioGroup from '../Menu/MenuRadioGroup.svelte';
	import MenuRadioItem from '../Menu/MenuRadioItem.svelte';
	import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.svelte';

	let {
		locales,
		value = $bindable(),
		onValueChange,
		label,
		variant = 'ghost',
		size = 's',
		align = 'end'
	}: LocaleSwitcherProps = $props();

	const current = $derived(locales.find((locale) => locale.code === value));
</script>

<Menu {align}>
	{#snippet trigger({ props })}
		<Button {...props} {variant} {size} icon="language" iconEnd="chevron-down">
			<!-- Name read out: "Sprache: Deutsch, DE"; it contains the visible code (WCAG 2.5.3). -->
			<VisuallyHidden>{label}: {current?.name ?? value},</VisuallyHidden>
			{value}
		</Button>
	{/snippet}
	<MenuRadioGroup {label} bind:value {onValueChange}>
		{#each locales as locale (locale.code)}
			<MenuRadioItem value={locale.code}>
				<span lang={locale.code}>{locale.name}</span>
			</MenuRadioItem>
		{/each}
	</MenuRadioGroup>
</Menu>
