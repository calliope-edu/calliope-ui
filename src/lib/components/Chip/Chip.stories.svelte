<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Chip from './Chip.svelte';

	const { Story } = defineMeta({
		title: 'Primitives/Chip',
		component: Chip,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'Nur online', selected: false, disabled: false }
	});
</script>

<script lang="ts">
	let online = $state(true);
	let devices = $state<Record<string, boolean>>({
		'Calliope 1': true,
		'Calliope 2': false,
		Wetterstation: true
	});
	const colours: Record<string, string> = {
		'Calliope 1': 'var(--cui-data-series-1)',
		'Calliope 2': 'var(--cui-data-series-2)',
		Wetterstation: 'var(--cui-data-series-3)'
	};
	let words = $state(['Apfel', 'Biene', 'Delfin']);
</script>

<Story name="Spielwiese" />

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="Chip">
		{#snippet lead()}
			Eine Pille, die man drückt: als Filter zum An- und Abwählen (<code>aria-pressed</code>) oder
			als Wert mit einem Entfernen-Knopf. Gewählt füllt sie sich mit Tinte und zeigt einen Haken.
		{/snippet}

		<section>
			<h2>Filter</h2>
			<Row label="Aus / an">
				<Chip label="Nur online" selected={false} />
				<Chip label="Nur online" selected />
			</Row>
			<Row label="Geräte filtern">
				{#each Object.keys(devices) as name (name)}
					<Chip label={name} swatch={colours[name]} bind:selected={devices[name]} />
				{/each}
			</Row>
			<Row label="Mit Icon">
				<Chip label="Filter" icon="filter" bind:selected={online} />
			</Row>
			<Row label="Deaktiviert">
				<Chip label="Nur online" selected={false} disabled />
				<Chip label="Nur online" selected disabled />
			</Row>
		</section>

		<section>
			<h2>Entfernbare Werte</h2>
			<p class="section-intro">
				Zum Beispiel die Wörter eines Raumcodes. Ziel ist nur der 24 px Knopf; er heißt nach dem
				Chip („Apfel entfernen“).
			</p>
			<Row label="Wörter">
				{#each words as word (word)}
					<Chip label={word} onRemove={() => (words = words.filter((w) => w !== word))} />
				{:else}
					<span class="muted">Alle entfernt.</span>
				{/each}
			</Row>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Row label="Filter">
				<Chip label="Nur online" selected={false} />
				<Chip label="Nur online" selected />
				<Chip label="Calliope 1" swatch="var(--cui-data-series-1)" selected={false} />
			</Row>
			<Row label="Entfernbar">
				<Chip label="Apfel" onRemove={() => {}} />
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Kurze Labels; mehrere Chips stehen in einer Zeile und brechen um.',
					'Für Filter immer selected setzen (auch false), damit der Zustand vorgelesen wird.'
				]}
				donts={[
					'Kein Chip als reines Etikett: was man nicht drücken kann, ist ein Badge.',
					'Keine Statusfarbe für „gewählt“.'
				]}
				notFor={[
					'Reiner Zustand oder Zähler: Badge.',
					'Eine Aktion mit Wirkung („Speichern“): Button.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
