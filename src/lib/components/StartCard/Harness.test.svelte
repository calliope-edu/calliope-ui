<script lang="ts">
	import StartCard from './StartCard.svelte';
	import StartCardGrid from './StartCardGrid.svelte';

	let { onStart }: { onStart: (what: string) => void } = $props();
</script>

<StartCardGrid label="So geht es los">
	<StartCard
		title="Programmierung"
		description="Erstelle ein neues MakeCode-Programm."
		color="makecode"
		onclick={() => onStart('program')}
	/>
	<StartCard title="Feed anlegen" disabled onclick={() => onStart('feed')} />
	<StartCard title="Weiter" icon="chevron-right" onclick={() => onStart('continue')} />
</StartCardGrid>
