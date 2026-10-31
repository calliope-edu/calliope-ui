<script lang="ts">
	import Radio from './Radio.svelte';
	import RadioGroup, { type RadioVariant } from './RadioGroup.svelte';

	let {
		value = $bindable('line'),
		variant = 'default',
		hint,
		error,
		onValueChange
	}: {
		value?: string;
		variant?: RadioVariant;
		hint?: string;
		error?: string;
		onValueChange?: (value: string) => void;
	} = $props();
</script>

{#if variant === 'swatch'}
	<RadioGroup label="Farbe" variant="swatch" bind:value {onValueChange}>
		<Radio value="auto" label="Automatisch (Gerätefarbe)" glyph="A" />
		<Radio value="cyan" label="Türkis" swatch="var(--cui-data-series-1)" />
		<Radio value="magenta" label="Magenta" swatch="var(--cui-data-series-2)" />
	</RadioGroup>
{:else}
	<RadioGroup label="Darstellung" bind:value {hint} {error} {onValueChange}>
		<Radio value="line" label="Linie" />
		<Radio value="bars" label="Balken" hint="Ein Balken je Gerät" />
		<Radio value="table" label="Tabelle" disabled />
		<Radio value="text" label="Text" />
	</RadioGroup>
{/if}
