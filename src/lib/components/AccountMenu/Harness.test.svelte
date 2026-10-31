<script lang="ts">
	import MenuItem from '../Menu/MenuItem.svelte';
	import AccountMenu from './AccountMenu.svelte';

	let { name, onSignOut }: { name?: string; onSignOut?: () => void } = $props();
</script>

<AccountMenu {name} label="Konto">
	<MenuItem onSelect={onSignOut}>Abmelden</MenuItem>
</AccountMenu>
