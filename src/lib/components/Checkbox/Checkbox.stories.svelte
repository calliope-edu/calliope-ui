<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Checkbox from './Checkbox.svelte';

	const { Story } = defineMeta({
		title: 'Primitives/Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'Zeit anzeigen', checked: false, indeterminate: false, disabled: false }
	});
</script>

<script lang="ts">
	const columns = ['Gerät', 'Wert', 'Zeit'];
	let shown = $state<Record<string, boolean>>({ Gerät: true, Wert: true, Zeit: false });
	const count = $derived(Object.values(shown).filter(Boolean).length);
	const all = $derived(count === columns.length);
	const some = $derived(count > 0 && !all);

	function setAll(checked: boolean) {
		for (const column of columns) shown[column] = checked;
	}
</script>

<Story name="Spielwiese" />

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="Checkbox">
		{#snippet lead()}
			Wählt eine oder mehrere Optionen, die erst mit dem Speichern gelten. 24 px Kästchen mit 2 px
			Rand; angehakt füllt es sich mit Tinte (hell) bzw. Weiß (dunkel), D2.
		{/snippet}

		<section>
			<h2>Zustände</h2>
			<Row label="Aus / an">
				<Checkbox label="Zeit anzeigen" />
				<Checkbox label="Zeit anzeigen" checked />
			</Row>
			<Row label="Teilweise">
				<Checkbox label="Alle Spalten" indeterminate />
			</Row>
			<Row label="Mit Hinweis">
				<Checkbox
					label="Gerät anzeigen"
					hint="Zeigt den Namen des Geräts neben dem Wert."
					checked
				/>
			</Row>
			<Row label="Fehler">
				<Checkbox
					label="Ich habe die Hinweise zum Datenschutz gelesen"
					error="Bitte bestätige die Hinweise, um den Raum zu erstellen."
					required
				/>
			</Row>
			<Row label="Deaktiviert">
				<Checkbox label="Zeit anzeigen" disabled />
				<Checkbox label="Zeit anzeigen" disabled checked />
			</Row>
		</section>

		<section>
			<h2>Gruppe mit „Alle“</h2>
			<p class="section-intro">
				Spalten der Tabellen-Kachel im IoT-Dashboard. Mehrere Checkboxen stehen in einem
				<code>&lt;fieldset&gt;</code> mit <code>&lt;legend&gt;</code>; „Alle“ zeigt „teilweise“,
				wenn nur ein Teil gewählt ist.
			</p>
			<fieldset class="group">
				<legend>Spalten</legend>
				<Checkbox
					label="Alle Spalten"
					checked={all}
					indeterminate={some}
					onCheckedChange={(checked) => setAll(checked)}
				/>
				<div class="nested">
					{#each columns as column (column)}
						<Checkbox label={column} bind:checked={shown[column]} />
					{/each}
				</div>
			</fieldset>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Row label="Aus / an / teilweise">
				<Checkbox label="Zeit anzeigen" />
				<Checkbox label="Zeit anzeigen" checked />
				<Checkbox label="Alle Spalten" indeterminate />
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Das Label beschreibt die Option positiv: „Zeit anzeigen“, nicht „Zeit nicht ausblenden“.',
					'Mehrere zusammengehörige Checkboxen stehen in einem fieldset mit legend.',
					'Ein Klick auf das Label schaltet mit; die Trefferfläche ist mehr als 24 px hoch.'
				]}
				donts={[
					'Keine Checkbox für eine Einstellung, die sofort wirkt: dafür gibt es den Switch.',
					'Keine Status- oder Identitätsfarbe für „angehakt“.'
				]}
				notFor={[
					'Genau eine aus mehreren Optionen: RadioGroup.',
					'Sofort wirkende Einstellung: Switch.'
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

	.group {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-2);
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

	.nested {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-2);
		padding-left: var(--cui-space-8);
	}
</style>
