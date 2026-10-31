<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Select from './Select.svelte';

	const periods = [
		{ value: 'hour', label: 'Letzte Stunde' },
		{ value: 'day', label: 'Letzter Tag' },
		{ value: 'week', label: 'Letzte Woche' },
		{ value: 'month', label: 'Letzter Monat' },
		{ value: 'all', label: 'Gesamte Aufzeichnung', disabled: true }
	];

	const metrics = [
		{ value: 'temperature', label: 'Temperatur' },
		{ value: 'light', label: 'Helligkeit' },
		{ value: 'sound', label: 'Lautstärke' },
		{ value: 'acceleration', label: 'Beschleunigung' },
		{ value: 'compass', label: 'Kompass' }
	];

	const devices = [
		{ value: 'mini-1', label: 'Calliope mini „Tisch 1“' },
		{ value: 'mini-2', label: 'Calliope mini „Tisch 2“' },
		{ value: 'mini-3', label: 'Calliope mini „Fensterbank“' },
		{ value: 'mini-4', label: 'Calliope mini „Schulgarten“' }
	];

	const { Story } = defineMeta({
		title: 'Primitives/Select',
		component: Select,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			label: 'Zeitraum',
			items: periods,
			placeholder: 'Zeitraum wählen',
			hint: 'Gilt für alle Diagramme dieser Seite.'
		}
	});
</script>

<script lang="ts">
	let metric = $state<string | undefined>('temperature');
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<div style="max-width: 24rem"><Select {...args} /></div>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="Select">
		{#snippet lead()}
			Auswahl eines Werts aus einer festen Liste, mit sichtbarem Label. Pfeiltasten bewegen die
			Auswahl, Enter wählt, ein Anfangsbuchstabe springt zum passenden Eintrag; Escape schließt und
			lässt den Fokus auf dem Feld.
		{/snippet}

		<section>
			<h2>Zustände</h2>
			<div class="grid">
				<Select label="Zeitraum" items={periods} placeholder="Zeitraum wählen" />
				<Select label="Messwert" items={metrics} value="light" />
				<Select
					label="Gerät"
					items={devices}
					placeholder="Gerät wählen"
					hint="Nur Geräte, die gerade verbunden sind."
				/>
				<Select
					label="Gerät"
					items={devices}
					placeholder="Gerät wählen"
					error="Wähle ein Gerät, damit Messwerte ankommen."
				/>
				<Select label="Zeitraum" items={periods} value="day" disabled />
				<Select label="Messwert" items={metrics} placeholder="Messwert wählen" required />
			</div>
		</section>

		<section>
			<h2>Auswahl</h2>
			<p class="section-intro">
				Gewählt ist, was im Feld steht und in der Liste einen Haken hat. Deaktivierte Einträge
				bleiben sichtbar, lassen sich aber nicht wählen.
			</p>
			<Row label="Gebunden">
				<div class="field"><Select label="Messwert" items={metrics} bind:value={metric} /></div>
				<span class="muted">value = {metric ?? '–'}</span>
			</Row>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<div class="grid">
				<Select label="Zeitraum" items={periods} value="hour" hint="Gilt für alle Diagramme." />
				<Select
					label="Gerät"
					items={devices}
					placeholder="Gerät wählen"
					error="Dieses Gerät ist offline."
				/>
			</div>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Für etwa 4 bis 15 feste Einträge, die sich nicht nach dem Tippen sortieren müssen.',
					'Das Label bleibt immer sichtbar; der Platzhalter sagt nur, was zu tun ist („Gerät wählen“).',
					'Einträge kurz und unterscheidbar am Anfang („Letzte Stunde“, „Letzter Tag“).'
				]}
				donts={[
					'Kein Select zur Navigation: Seitenwechsel gehören in Links, Tabs oder ein Menü.',
					'Kein Platzhalter als einziges Label.',
					'Keine Aktionen als Einträge („Löschen“); dafür gibt es das Menu.'
				]}
				notFor={[
					'Zwei bis drei Optionen: RadioGroup oder SegmentedControl, alle auf einen Blick.',
					'Lange oder durchsuchbare Listen (Raumcode-Wörter): Combobox.',
					'Aktionen an einem Element: Menu.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--cui-space-6);
		align-items: start;
	}

	.field {
		width: 18rem;
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
