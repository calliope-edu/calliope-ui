<script lang="ts">
	import Combobox from './Combobox.svelte';

	let {
		onValueChange,
		value = $bindable(),
		inputValue = $bindable('')
	}: {
		onValueChange?: (value: string | undefined) => void;
		value?: string;
		inputValue?: string;
	} = $props();

	const items = ['Apfel', 'Biene', 'Delfin', 'Eule', 'Kapelle', 'Papagei'].map((word) => ({
		value: word.toLowerCase(),
		label: word
	}));
</script>

<Combobox label="Erstes Wort" {items} bind:value bind:inputValue {onValueChange} />
<output data-testid="value">{value ?? '–'}</output>
