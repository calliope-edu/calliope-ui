<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Switch from './Switch.svelte';

	const { Story } = defineMeta({
		title: 'Primitives/Switch',
		component: Switch,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'Chat erlauben', checked: false, disabled: false },
		argTypes: { labelPosition: { control: 'inline-radio', options: ['end', 'start'] } }
	});
</script>

<script lang="ts">
	let iot = $state(true);
</script>

<Story name="Spielwiese" />

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="Switch">
		{#snippet lead()}
			Schaltet eine Einstellung sofort an oder aus (<code>role="switch"</code>). Position und Größe
			des Knopfs zeigen den Zustand, nicht die Farbe allein.
		{/snippet}

		<section>
			<h2>Zustände</h2>
			<Row label="Aus / an">
				<Switch label="Chat erlauben" />
				<Switch label="Chat erlauben" checked />
			</Row>
			<Row label="Mit Hinweis">
				<Switch
					label="IoT-Projekt"
					bind:checked={iot}
					hint="Schülerinnen und Schüler können Geräte mit dem WLAN verbinden."
				/>
			</Row>
			<Row label="Label vorne">
				<div style="width: 18rem"><Switch label="Ton" labelPosition="start" checked /></div>
			</Row>
			<Row label="Deaktiviert">
				<Switch label="Chat erlauben" disabled />
				<Switch label="Chat erlauben" disabled checked />
			</Row>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Row label="Aus / an">
				<Switch label="Chat erlauben" />
				<Switch label="Chat erlauben" checked />
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Das Label nennt, was eingeschaltet wird: „Chat erlauben“.',
					'Die Änderung gilt sofort, ohne Speichern-Button.'
				]}
				donts={[
					'Kein Label, das den Zustand nennt („An“/„Aus“).',
					'Keine Status- oder Identitätsfarbe für „an“: an ist Tinte (hell) bzw. Weiß (dunkel), D2.'
				]}
				notFor={['Eine Auswahl, die erst mit „Speichern“ gilt: Checkbox (Welle 2).']}
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
