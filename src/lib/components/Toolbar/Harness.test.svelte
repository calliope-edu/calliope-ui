<script lang="ts">
	import Toolbar from './Toolbar.svelte';
	import ToolbarSeparator from './ToolbarSeparator.svelte';

	let { orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' } = $props();
</script>

<button type="button">Davor</button>
<Toolbar label="Programm" {orientation}>
	<button type="button">Starten</button>
	<button type="button" disabled>Neu starten</button>
	<ToolbarSeparator />
	<button type="button">Herunterladen</button>
	<input aria-label="Name" />
	<button type="button">Teilen</button>
</Toolbar>
<button type="button">Danach</button>
