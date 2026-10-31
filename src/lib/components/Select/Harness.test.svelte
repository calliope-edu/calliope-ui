<script lang="ts">
	import Select from './Select.svelte';

	let {
		onValueChange,
		value = $bindable()
	}: { onValueChange?: (value: string | undefined) => void; value?: string } = $props();

	const items = [
		{ value: 'hour', label: 'Letzte Stunde' },
		{ value: 'day', label: 'Letzter Tag' },
		{ value: 'week', label: 'Letzte Woche', disabled: true },
		{ value: 'month', label: 'Letzter Monat' }
	];
</script>

<Select label="Zeitraum" {items} bind:value {onValueChange} placeholder="Zeitraum wählen" />
<output data-testid="value">{value ?? '–'}</output>
