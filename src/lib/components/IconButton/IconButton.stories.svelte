<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { icons } from '../../icons/icons.js';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import IconButton from './IconButton.svelte';

	const { Story } = defineMeta({
		title: 'Primitives/IconButton',
		component: IconButton,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { icon: 'settings', label: 'Einstellungen', variant: 'ghost', size: 'm', tooltip: true },
		argTypes: {
			icon: { control: 'select', options: Object.keys(icons) },
			variant: { control: 'inline-radio', options: ['ghost', 'secondary', 'primary'] },
			size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
			pressed: { control: 'boolean' }
		}
	});

	const sizes = ['s', 'm', 'l'] as const;
</script>

<script lang="ts">
	let hidden = $state(true);
</script>

<Story name="Spielwiese" />

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="IconButton">
		{#snippet lead()}
			Ein runder Button nur mit Icon. Das Pflicht-Prop <code>label</code> wird zum
			<code>aria-label</code> und zum Tooltip, das Icon selbst ist für Screenreader unsichtbar.
		{/snippet}

		<section>
			<h2>Varianten und Größen</h2>
			<p class="section-intro">
				32 / 36 / 40 px Kreis. Die Trefferfläche ist nie kleiner als 24 px (D6). Zeig mit der Maus
				oder per Tab auf einen Button, um den Tooltip zu sehen.
			</p>
			{#each sizes as size (size)}
				<Row label="Größe {size}">
					<IconButton {size} icon="settings" label="Einstellungen" />
					<IconButton {size} icon="edit" label="Umbenennen" variant="secondary" />
					<IconButton {size} icon="add" label="Programm hinzufügen" variant="primary" />
				</Row>
			{/each}
		</section>

		<section>
			<h2>Zustände</h2>
			<Row label="Umschalter">
				<IconButton
					icon={hidden ? 'show' : 'hide'}
					label="Passwort anzeigen"
					pressed={!hidden}
					onclick={() => (hidden = !hidden)}
				/>
				<span class="muted">aria-pressed={String(!hidden)}</span>
			</Row>
			<Row label="Lädt">
				<IconButton icon="download" label="Herunterladen" loading />
				<IconButton icon="download" label="Herunterladen" variant="primary" loading />
			</Row>
			<Row label="Deaktiviert">
				<IconButton icon="delete" label="Löschen" disabled />
				<IconButton icon="delete" label="Löschen" variant="secondary" disabled />
			</Row>
			<Row label="Ohne Tooltip">
				<IconButton icon="close" label="Schließen" tooltip={false} />
				<span class="muted">z. B. das Schließen-Kreuz im Dialog</span>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Nur für Aktionen, deren Icon allgemein bekannt ist (Schließen, Einstellungen, Löschen).',
					'Ein label, das die Aktion benennt: „Programm löschen“, nicht „Mülleimer“.'
				]}
				donts={[
					'Keinen Namen nur über title oder den Tooltip.',
					'Keine Icon-Buttons dicht an dicht auf Touch-Flächen.'
				]}
				notFor={['Aktionen, die man erst lesen muss: Button mit Icon und Text.']}
			/>
		</section>
	</ComponentPage>
</Story>
