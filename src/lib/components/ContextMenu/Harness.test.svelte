<script lang="ts">
	import MenuItem from '../Menu/MenuItem.svelte';
	import MenuSeparator from '../Menu/MenuSeparator.svelte';
	import ContextMenu from './ContextMenu.svelte';

	let { onBlock, disabled = false }: { onBlock?: (name: string) => void; disabled?: boolean } =
		$props();

	const pupils = ['Ada', 'Grace'];
	let selected = $state<string | null>(null);
</script>

<ContextMenu {disabled}>
	{#snippet trigger({ props })}
		<ul {...props} aria-label="Teilnehmende">
			{#each pupils as name (name)}
				<li oncontextmenu={() => (selected = name)}>{name}</li>
			{/each}
		</ul>
	{/snippet}
	<MenuItem onSelect={() => selected && onBlock?.(selected)}>{selected} sperren</MenuItem>
	<MenuItem disabled>Passwort setzen</MenuItem>
	<MenuSeparator />
	<MenuItem icon="delete" tone="negative">Entfernen</MenuItem>
</ContextMenu>
