<script lang="ts">
	import Button from '../Button/Button.svelte';
	import Menu from './Menu.svelte';
	import MenuItem from './MenuItem.svelte';
	import MenuRadioGroup from './MenuRadioGroup.svelte';
	import MenuRadioItem from './MenuRadioItem.svelte';
	import MenuSeparator from './MenuSeparator.svelte';

	let {
		onRename,
		onDelete,
		sort = $bindable('name')
	}: { onRename?: () => void; onDelete?: () => void; sort?: string } = $props();
</script>

<Menu>
	{#snippet trigger({ props })}
		<Button {...props}>Aktionen</Button>
	{/snippet}
	<MenuItem icon="edit" onSelect={onRename}>Umbenennen</MenuItem>
	<MenuItem icon="upload" disabled>Hochladen</MenuItem>
	<MenuSeparator />
	<MenuItem icon="delete" tone="negative" onSelect={onDelete}>Löschen</MenuItem>
	<MenuRadioGroup label="Sortieren nach" bind:value={sort}>
		<MenuRadioItem value="name">Name</MenuRadioItem>
		<MenuRadioItem value="changed">Zuletzt geändert</MenuRadioItem>
	</MenuRadioGroup>
</Menu>
