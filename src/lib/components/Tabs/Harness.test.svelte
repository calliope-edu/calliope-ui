<script lang="ts">
	import Tab from './Tab.svelte';
	import TabList from './TabList.svelte';
	import TabPanel from './TabPanel.svelte';
	import Tabs from './Tabs.svelte';

	let {
		value = $bindable('dashboard'),
		onValueChange
	}: { value?: string; onValueChange?: (value: string) => void } = $props();
</script>

<Tabs bind:value {onValueChange}>
	<TabList label="Projektansicht">
		<Tab value="dashboard" icon="device">Dashboard</Tab>
		<Tab value="feeds">Feeds</Tab>
		<Tab value="export" disabled>Export</Tab>
		<Tab value="settings" icon="settings">Einstellungen</Tab>
	</TabList>
	<TabPanel value="dashboard">Widgets der Klasse</TabPanel>
	<TabPanel value="feeds">Messwerte der Geräte</TabPanel>
	<TabPanel value="export">Export</TabPanel>
	<TabPanel value="settings">Raum und Geräte</TabPanel>
</Tabs>
<p>Selected: {value}</p>
