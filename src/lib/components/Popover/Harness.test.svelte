<script lang="ts">
	import Button from '../Button/Button.svelte';
	import Popover from './Popover.svelte';
</script>

<Popover title="Token" showClose>
	{#snippet trigger({ props })}
		<Button {...props}>Token zeigen</Button>
	{/snippet}
	<p>Der Token verbindet Geräte mit diesem Dashboard.</p>
	<Button>Kopieren</Button>
</Popover>
