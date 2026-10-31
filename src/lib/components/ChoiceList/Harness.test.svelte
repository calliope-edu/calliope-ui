<script lang="ts">
	import ChoiceItem from './ChoiceItem.svelte';
	import ChoiceList from './ChoiceList.svelte';

	let { onChoose }: { onChoose: (way: string) => void } = $props();
</script>

<ChoiceList label="Übertragungsweg">
	<ChoiceItem
		icon="usb"
		title="Per USB-Kabel"
		detail="Kabel an Calliope und Rechner anschließen."
		onclick={() => onChoose('usb')}
	/>
	<ChoiceItem icon="bluetooth" title="Per Bluetooth" disabled onclick={() => onChoose('ble')} />
</ChoiceList>
