<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { toast } from 'svelte-sonner';
	import Badge from '../../lib/components/Badge/Badge.svelte';
	import Banner from '../../lib/components/Banner/Banner.svelte';
	import Button from '../../lib/components/Button/Button.svelte';
	import Checkbox from '../../lib/components/Checkbox/Checkbox.svelte';
	import Chip from '../../lib/components/Chip/Chip.svelte';
	import Dialog from '../../lib/components/Dialog/Dialog.svelte';
	import EmptyState from '../../lib/components/EmptyState/EmptyState.svelte';
	import Popover from '../../lib/components/Popover/Popover.svelte';
	import ProgressBar from '../../lib/components/ProgressBar/ProgressBar.svelte';
	import Radio from '../../lib/components/Radio/Radio.svelte';
	import RadioGroup from '../../lib/components/Radio/RadioGroup.svelte';
	import SegmentedControl from '../../lib/components/SegmentedControl/SegmentedControl.svelte';
	import Select from '../../lib/components/Select/Select.svelte';
	import Slider from '../../lib/components/Slider/Slider.svelte';
	import StatusDot from '../../lib/components/StatusDot/StatusDot.svelte';
	import Switch from '../../lib/components/Switch/Switch.svelte';
	import Tab from '../../lib/components/Tabs/Tab.svelte';
	import TabList from '../../lib/components/Tabs/TabList.svelte';
	import TabPanel from '../../lib/components/Tabs/TabPanel.svelte';
	import Tabs from '../../lib/components/Tabs/Tabs.svelte';
	import Toaster from '../../lib/components/Toast/Toaster.svelte';

	const { Story } = defineMeta({
		title: 'Rezepte/IoT-Dashboard',
		parameters: { layout: 'fullscreen' }
	});

	// Devices get a data series colour by serial (D4).
	const devices = [
		{
			serial: 'A1',
			name: 'Calliope 1',
			colour: 'var(--cui-data-series-1)',
			status: 'success',
			word: 'Online'
		},
		{
			serial: 'B2',
			name: 'Calliope 2',
			colour: 'var(--cui-data-series-2)',
			status: 'success',
			word: 'Online'
		},
		{
			serial: 'C3',
			name: 'Wetterstation',
			colour: 'var(--cui-data-series-3)',
			status: 'warning',
			word: 'Pausiert'
		},
		{
			serial: 'D4',
			name: 'Calliope 4',
			colour: 'var(--cui-data-series-4)',
			status: 'error',
			word: 'Gesperrt'
		}
	] as const;

	const feeds = [
		{ name: 'temperatur', value: '21,4 °C', serial: 'C3', time: 'vor 4 s' },
		{ name: 'licht', value: '182', serial: 'A1', time: 'vor 1 s' },
		{ name: 'lautstaerke', value: '37', serial: 'B2', time: 'vor 12 s' }
	];

	const series = [
		{ value: 'cyan', label: 'Türkis', token: '--cui-data-series-1' },
		{ value: 'magenta', label: 'Magenta', token: '--cui-data-series-2' },
		{ value: 'lime', label: 'Hellgrün', token: '--cui-data-series-3' },
		{ value: 'indigo', label: 'Indigo', token: '--cui-data-series-4' },
		{ value: 'orange', label: 'Orange', token: '--cui-data-series-5' },
		{ value: 'yellow', label: 'Gelb', token: '--cui-data-series-6' }
	];

	const device = (serial: string) => devices.find((d) => d.serial === serial)!;
</script>

<script lang="ts">
	let view = $state('dashboard');
	let feedTab = $state('overview');
	let hint = $state(true);
	let lamp = $state(true);
	let brightness = $state(128);
	let editorOpen = $state(false);
	let widgetFeed = $state<string | undefined>('temperatur');
	let widgetDevice = $state<string | undefined>('all');
	let widgetColour = $state('auto');
	let xAxis = $state('time');
	let showDevice = $state(true);
	let showTime = $state(false);
	let filter = $state<Record<string, boolean>>({ A1: true, B2: true, C3: true, D4: false });
	let exporting = $state<number | null>(null);

	function exportCsv() {
		exporting = 0;
		const timer = setInterval(() => {
			exporting = (exporting ?? 0) + 20;
			if (exporting >= 100) {
				clearInterval(timer);
				exporting = null;
				toast.success('CSV heruntergeladen', { description: '3 Feeds, 1 248 Werte' });
			}
		}, 300);
	}

	function saveWidget() {
		editorOpen = false;
		toast.success('Kachel gespeichert');
	}
</script>

<Story name="Dashboard und Feeds" asChild>
	<Toaster />
	<div class="app">
		<header class="bar">
			<h1>Klimaprojekt 7b</h1>
			<SegmentedControl
				label="Ansicht"
				size="m"
				options={[
					{ value: 'dashboard', label: 'Dashboard', icon: 'device' },
					{ value: 'feeds', label: 'Feeds', icon: 'wifi' }
				]}
				bind:value={view}
			/>
			<div class="bar-end">
				<Popover title="Token des Dashboards" align="end">
					{#snippet trigger({ props })}
						<Button {...props} variant="secondary" size="s" iconEnd="chevron-down">Token</Button>
					{/snippet}
					<p class="text">Mit diesem Token senden Geräte an dein Dashboard.</p>
					<code class="token">K7-PX2-QM9</code>
					<div class="end">
						<Button size="s" icon="copy" onclick={() => toast.success('Token kopiert')}>
							Kopieren
						</Button>
					</div>
				</Popover>
				<Button size="s" icon="add" onclick={() => (editorOpen = true)}>Kachel</Button>
			</div>
		</header>

		{#if hint}
			<Banner
				tone="info"
				title="Neuer Feed „licht“"
				onDismiss={() => (hint = false)}
				dismissLabel="Hinweis schließen"
			>
				Calliope 1 sendet Werte, für die es noch keine Kachel gibt.
				{#snippet actions()}
					<Button size="s" variant="secondary" icon="add" onclick={() => (editorOpen = true)}>
						Kachel anlegen
					</Button>
				{/snippet}
			</Banner>
		{/if}

		{#if view === 'dashboard'}
			<div class="grid">
				<article class="widget" data-theme="dark">
					<header>
						<h2>Temperatur</h2>
						<Badge swatch={device('C3').colour}>Wetterstation</Badge>
					</header>
					<p class="readout">21,4 <span>°C</span></p>
					<StatusDot status="warning" label="Pausiert" size="s" />
				</article>
				<article class="widget" data-theme="dark">
					<header>
						<h2>Lampe</h2>
						<Badge swatch={device('A1').colour}>Calliope 1</Badge>
					</header>
					<Switch label="Lampe an" bind:checked={lamp} />
				</article>
				<article class="widget" data-theme="dark">
					<header>
						<h2>Helligkeit</h2>
						<Badge>Alle Geräte</Badge>
					</header>
					<Slider
						label="LED-Helligkeit"
						min={0}
						max={255}
						bind:value={brightness}
						onValueCommit={(v) => toast(`Helligkeit ${v} gesendet`)}
					/>
				</article>
				<article class="widget" data-theme="dark">
					<header>
						<h2>Lautstärke</h2>
						<Badge swatch={device('B2').colour}>Calliope 2</Badge>
					</header>
					<EmptyState
						compact
						level={3}
						title="Noch keine Werte"
						description="Calliope 2 hat noch nichts gesendet."
					/>
				</article>
			</div>
		{:else}
			<Tabs bind:value={feedTab}>
				<TabList label="Feeds">
					<Tab value="overview">Übersicht</Tab>
					<Tab value="stream">Verlauf</Tab>
				</TabList>
				<TabPanel value="overview">
					<div class="filters" role="group" aria-label="Geräte filtern">
						{#each devices as d (d.serial)}
							<Chip label={d.name} swatch={d.colour} bind:selected={filter[d.serial]} />
						{/each}
					</div>
					<table class="table">
						<thead>
							<tr><th>Feed</th><th>Letzter Wert</th><th>Gerät</th><th>Status</th><th>Zeit</th></tr>
						</thead>
						<tbody>
							{#each feeds.filter((f) => filter[f.serial]) as f (f.name)}
								{@const d = device(f.serial)}
								<tr>
									<td><code>{f.name}</code></td>
									<td class="num">{f.value}</td>
									<td><Badge swatch={d.colour}>{d.name}</Badge></td>
									<td><StatusDot status={d.status} label={d.word} /></td>
									<td class="muted">{f.time}</td>
								</tr>
							{/each}
						</tbody>
					</table>
					<div class="export">
						{#if exporting !== null}
							<ProgressBar label="CSV wird erstellt" value={exporting} />
						{:else}
							<Button variant="secondary" size="s" icon="download" onclick={exportCsv}>CSV</Button>
						{/if}
					</div>
				</TabPanel>
				<TabPanel value="stream">
					<EmptyState
						title="Noch kein Verlauf"
						description="Sobald Geräte senden, erscheinen die Werte hier in der Reihenfolge ihres Eingangs."
						icon="wifi"
					/>
				</TabPanel>
			</Tabs>
		{/if}
	</div>

	<Dialog bind:open={editorOpen} title="Kachel anlegen" size="m">
		<div class="form">
			<Select
				label="Feed"
				items={feeds.map((f) => ({ value: f.name, label: f.name }))}
				bind:value={widgetFeed}
			/>
			<Select
				label="Gerät"
				items={[
					{ value: 'all', label: 'Alle Geräte' },
					...devices.map((d) => ({ value: d.serial, label: d.name }))
				]}
				bind:value={widgetDevice}
			/>
			<RadioGroup label="Farbe" variant="swatch" bind:value={widgetColour}>
				<Radio value="auto" label="Automatisch (Gerätefarbe)" glyph="A" />
				{#each series as s (s.value)}
					<Radio value={s.value} label={s.label} swatch="var({s.token})" />
				{/each}
			</RadioGroup>
			<SegmentedControl
				label="X-Achse"
				labelVisible
				size="m"
				options={[
					{ value: 'time', label: 'Zeit' },
					{ value: 'index', label: 'Reihenfolge' }
				]}
				bind:value={xAxis}
			/>
			<fieldset class="columns">
				<legend>Anzeigen</legend>
				<Checkbox label="Gerät" bind:checked={showDevice} />
				<Checkbox label="Zeit" bind:checked={showTime} />
			</fieldset>
		</div>
		{#snippet actions()}
			<Button variant="secondary" onclick={() => (editorOpen = false)}>Abbrechen</Button>
			<Button onclick={saveWidget}>Speichern</Button>
		{/snippet}
	</Dialog>
</Story>

<style>
	.app {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-4);
		max-width: 72rem;
		margin: 0 auto;
		padding: var(--cui-space-6) var(--cui-space-8) var(--cui-space-12);
		font-family: var(--cui-font-family-sans);
		color: var(--cui-text-default);
	}

	.bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--cui-space-4);
	}

	h1 {
		margin: 0;
		font-size: var(--cui-typography-h1-font-size);
		font-weight: var(--cui-typography-h1-font-weight);
	}

	.bar-end {
		display: flex;
		gap: var(--cui-space-2);
		margin-left: auto;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		gap: var(--cui-space-4);
	}

	/* The IoT widget cards are dark areas inside the light theme (DESIGN.md). */
	.widget {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-4);
		min-height: 9rem;
		padding: var(--cui-space-4);
		border-radius: var(--cui-radius-lg);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}

	.widget header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--cui-space-2);
	}

	.widget h2 {
		margin: 0;
		font-size: var(--cui-typography-h3-font-size);
		font-weight: var(--cui-typography-h3-font-weight);
	}

	.readout {
		margin: 0;
		font-size: var(--cui-typography-readout-font-size);
		font-weight: var(--cui-typography-readout-font-weight);
		line-height: var(--cui-typography-readout-line-height);
		font-variant-numeric: tabular-nums;
	}

	.readout span {
		font-size: var(--cui-font-size-lg);
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: var(--cui-space-2);
		margin: var(--cui-space-4) 0;
	}

	.table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--cui-typography-label-font-size);
	}

	th,
	td {
		padding: var(--cui-space-2) var(--cui-space-4) var(--cui-space-2) 0;
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		text-align: left;
	}

	th {
		color: var(--cui-text-muted);
		font-weight: var(--cui-font-weight-semibold);
	}

	.num {
		font-variant-numeric: tabular-nums;
	}

	.muted {
		color: var(--cui-text-muted);
	}

	.export {
		display: flex;
		justify-content: flex-end;
		margin-top: var(--cui-space-4);
	}

	.export :global(.cui-progress-bar) {
		width: 20rem;
	}

	.text {
		margin: 0;
	}

	.token {
		display: block;
		margin-top: var(--cui-space-3);
		font-family: var(--cui-typography-code-font-family);
		font-size: var(--cui-font-size-lg);
		letter-spacing: 0.06em;
	}

	.end {
		display: flex;
		justify-content: flex-end;
		margin-top: var(--cui-space-3);
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-5);
	}

	.columns {
		display: flex;
		gap: var(--cui-space-6);
		margin: 0;
		padding: 0;
		border: 0;
	}

	legend {
		margin-bottom: var(--cui-space-2);
		padding: 0;
		font-size: var(--cui-typography-label-font-size);
		font-weight: var(--cui-font-weight-semibold);
	}
</style>
