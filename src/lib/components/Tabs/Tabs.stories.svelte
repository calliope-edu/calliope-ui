<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Tab from './Tab.svelte';
	import TabList from './TabList.svelte';
	import TabPanel from './TabPanel.svelte';
	import Tabs from './Tabs.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Tabs',
		component: Tabs,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { value: 'dashboard' }
	});
</script>

<script lang="ts">
	let view = $state('dashboard');
	let darkView = $state('feeds');
</script>

{#snippet projectTabs(icons: boolean)}
	<TabList label="Projektansicht">
		<Tab value="dashboard" icon={icons ? 'device' : undefined}>Dashboard</Tab>
		<Tab value="feeds" icon={icons ? 'wifi' : undefined}>Feeds</Tab>
		<Tab value="settings" icon={icons ? 'settings' : undefined}>Einstellungen</Tab>
	</TabList>
	<TabPanel value="dashboard">
		<p class="panel-text">4 Widgets · zuletzt aktualisiert vor 2 Minuten</p>
	</TabPanel>
	<TabPanel value="feeds">
		<p class="panel-text">Temperatur, Lautstärke und Helligkeit von 12 Geräten</p>
	</TabPanel>
	<TabPanel value="settings">
		<p class="panel-text">Raumcode, Aktualisierung und Geräte verwalten</p>
	</TabPanel>
{/snippet}

<Story name="Spielwiese">
	{#snippet template(args)}
		<Tabs value={args.value}>{@render projectTabs(false)}</Tabs>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Navigation" title="Tabs">
		{#snippet lead()}
			Wechselt zwischen Inhaltsbereichen derselben Seite (<code>tablist</code>, <code>tab</code>,
			<code>tabpanel</code>). Der aktive Tab trägt die 2px-Akzentlinie; Pfeiltasten, Pos1 und Ende
			wechseln sofort, Tab springt in den Inhalt.
		{/snippet}

		<section>
			<h2>Zustände</h2>
			<p class="section-intro">
				Hover legt den Hover-Ton hinter den Tab, Tastaturfokus zeigt den Fokusring innen am Tab und
				am Inhaltsbereich (mit Tab hineinspringen).
			</p>
			<Row label="Nur Text">
				<div class="frame"><Tabs bind:value={view}>{@render projectTabs(false)}</Tabs></div>
			</Row>
			<Row label="Mit Icons">
				<div class="frame"><Tabs value="feeds">{@render projectTabs(true)}</Tabs></div>
			</Row>
			<Row label="Ein Tab deaktiviert">
				<div class="frame">
					<Tabs value="live">
						<TabList label="Raum">
							<Tab value="live">Live-Ansicht</Tab>
							<Tab value="export" disabled>Export</Tab>
							<Tab value="history">Verlauf</Tab>
						</TabList>
						<TabPanel value="live"><p class="panel-text">Live-Werte der Klasse</p></TabPanel>
						<TabPanel value="export"><p class="panel-text">Export</p></TabPanel>
						<TabPanel value="history"><p class="panel-text">Werte der letzten Stunde</p></TabPanel>
					</Tabs>
				</div>
			</Row>
			<Row label="Schmal (scrollt)">
				<div class="frame narrow">
					<Tabs value="dashboard">{@render projectTabs(true)}</Tabs>
				</div>
			</Row>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Row label="Mit Icons">
				<div class="frame"><Tabs bind:value={darkView}>{@render projectTabs(true)}</Tabs></div>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Tabs wechseln Inhaltsbereiche, die nebeneinander stehen könnten: „Dashboard“, „Feeds“, „Einstellungen“.',
					'Kurze Labels aus ein bis zwei Wörtern; die Liste bekommt einen Namen (label), z. B. „Projektansicht“.',
					'Ein Tab ist immer gewählt; der erste Tab ist der Start.'
				]}
				donts={[
					'Keine Tabs für Schritte, die nacheinander kommen müssen.',
					'Keine Aktion hinter einem Tab („Speichern“ ist ein Button).',
					'Den aktiven Tab nicht nur über Farbe zeigen: die Akzentlinie gehört dazu.'
				]}
				notFor={[
					'Einen Modus oder Wert aus zwei bis vier Optionen wählen: SegmentedControl.',
					'Mehr als etwa sechs Bereiche oder Wechsel zwischen Seiten: Navigation der App.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.frame {
		width: min(36rem, 100%);
	}

	.narrow {
		width: 16rem;
	}

	.panel-text {
		margin: 0;
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
