<script lang="ts">
	import Button from '../Button/Button.svelte';
	import TextField from '../TextField/TextField.svelte';
	import Dialog from './Dialog.svelte';

	let {
		dismissible = true,
		withField = true,
		onOpenChange
	}: {
		dismissible?: boolean;
		withField?: boolean;
		onOpenChange?: (open: boolean) => void;
	} = $props();

	let open = $state(false);
</script>

<Dialog bind:open title="Raum erstellen" description="Mit Raumcode" {dismissible} {onOpenChange}>
	{#snippet trigger({ props })}
		<Button {...props}>Öffnen</Button>
	{/snippet}
	{#if withField}<TextField label="Name des Raums" />{/if}
	{#snippet actions()}
		<Button onclick={() => (open = false)}>Erstellen</Button>
	{/snippet}
</Dialog>
