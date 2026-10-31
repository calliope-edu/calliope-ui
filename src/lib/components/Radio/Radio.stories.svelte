<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Radio from './Radio.svelte';
	import RadioGroup from './RadioGroup.svelte';

	const { Story } = defineMeta({
		title: 'Primitives/Radio',
		component: RadioGroup,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'X-Achse', value: 'time', variant: 'default', disabled: false },
		argTypes: {
			variant: { control: 'inline-radio', options: ['default', 'swatch'] },
			orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] }
		}
	});

	// The six data series colours (D4) plus "automatic" (the device's own colour).
	const series = [
		{ value: 'cyan', label: 'Türkis', token: '--cui-data-series-1' },
		{ value: 'magenta', label: 'Magenta', token: '--cui-data-series-2' },
		{ value: 'lime', label: 'Hellgrün', token: '--cui-data-series-3' },
		{ value: 'indigo', label: 'Indigo', token: '--cui-data-series-4' },
		{ value: 'orange', label: 'Orange', token: '--cui-data-series-5' },
		{ value: 'yellow', label: 'Gelb', token: '--cui-data-series-6' }
	];
</script>

<script lang="ts">
	let kind = $state('line');
	let colour = $state('auto');
	let darkColour = $state('magenta');
</script>

<Story name="Spielwiese">
	{#snippet template({ children: _, ...args })}
		<RadioGroup {...args}>
			{#if args.variant === 'swatch'}
				{#each series as s (s.value)}
					<Radio value={s.value} label={s.label} swatch="var({s.token})" />
				{/each}
			{:else}
				<Radio value="time" label="Zeit" />
				<Radio value="index" label="Reihenfolge" hint="Ein Schritt je Messwert" />
			{/if}
		</RadioGroup>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="Radio">
		{#snippet lead()}
			Genau eine aus mehreren sichtbaren Optionen. <code>RadioGroup</code> trägt die Frage als
			sichtbares Label, die Pfeiltasten wechseln die Auswahl. Die Variante
			<code>swatch</code> wählt eine Farbe, zum Beispiel für eine Kachel im IoT-Dashboard.
		{/snippet}

		<section>
			<h2>Zustände</h2>
			<Row label="Standard">
				<RadioGroup label="Darstellung" bind:value={kind}>
					<Radio value="line" label="Linie" />
					<Radio value="bars" label="Balken" hint="Ein Balken je Gerät" />
					<Radio value="table" label="Tabelle" />
				</RadioGroup>
			</Row>
			<Row label="Nebeneinander">
				<RadioGroup label="X-Achse" value="time" orientation="horizontal">
					<Radio value="time" label="Zeit" />
					<Radio value="index" label="Reihenfolge" />
				</RadioGroup>
			</Row>
			<Row label="Mit Hinweis und Fehler">
				<RadioGroup
					label="Wer darf Werte senden?"
					hint="Gilt für alle Feeds dieses Dashboards."
					error="Bitte wähle eine Option."
					required
				>
					<Radio value="all" label="Alle Geräte im Raum" />
					<Radio value="mine" label="Nur meine Geräte" />
				</RadioGroup>
			</Row>
			<Row label="Eine Option deaktiviert">
				<RadioGroup label="Darstellung" value="line">
					<Radio value="line" label="Linie" />
					<Radio value="stream" label="Verlauf" disabled />
				</RadioGroup>
			</Row>
			<Row label="Gruppe deaktiviert">
				<RadioGroup label="Darstellung" value="line" disabled>
					<Radio value="line" label="Linie" />
					<Radio value="bars" label="Balken" />
				</RadioGroup>
			</Row>
		</section>

		<section>
			<h2>Farbfelder</h2>
			<p class="section-intro">
				32 px Scheiben in den sechs Farben der Datenreihen (D4). Die Auswahl zeigt ein Ring mit
				Abstand, der auf jeder Farbe sichtbar bleibt. Der Name der Farbe ist der Accessible Name und
				erscheint als Titel. „A“ steht für die Farbe des Geräts.
			</p>
			<Row label="Kachelfarbe">
				<RadioGroup label="Farbe" variant="swatch" bind:value={colour}>
					<Radio value="auto" label="Automatisch (Gerätefarbe)" glyph="A" />
					{#each series as s (s.value)}
						<Radio value={s.value} label={s.label} swatch="var({s.token})" />
					{/each}
				</RadioGroup>
			</Row>
			<Row label="Gewählt">
				<span>{series.find((s) => s.value === colour)?.label ?? 'Automatisch'}</span>
			</Row>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Row label="Standard">
				<RadioGroup label="X-Achse" value="time" orientation="horizontal">
					<Radio value="time" label="Zeit" />
					<Radio value="index" label="Reihenfolge" />
				</RadioGroup>
			</Row>
			<Row label="Farbfelder">
				<RadioGroup label="Farbe" variant="swatch" bind:value={darkColour}>
					<Radio value="auto" label="Automatisch (Gerätefarbe)" glyph="A" />
					{#each series as s (s.value)}
						<Radio value={s.value} label={s.label} swatch="var({s.token})" />
					{/each}
				</RadioGroup>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Das Gruppen-Label stellt die Frage, die Optionen antworten.',
					'Eine sinnvolle Vorauswahl setzen, wenn es eine gibt.',
					'Farbfelder immer mit Namen (label), auch wenn er nur vorgelesen wird.'
				]}
				donts={[
					'Keine Radios für An/Aus: dafür gibt es Switch oder Checkbox.',
					'Keine Status- oder Identitätsfarben als Farbfeld anbieten.',
					'Kein Zeichen (glyph) auf einer farbigen Scheibe: es hätte keinen festen Kontrast.'
				]}
				notFor={[
					'Zwei bis vier kurze Modi in einer Zeile: SegmentedControl.',
					'Mehr als etwa sechs Optionen: Select.',
					'Mehrere Optionen zugleich: Checkbox.'
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
