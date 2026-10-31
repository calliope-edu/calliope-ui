<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import SegmentedControl, { type SegmentedOption } from './SegmentedControl.svelte';

	const views: SegmentedOption[] = [
		{ value: 'dashboard', label: 'Dashboard' },
		{ value: 'feeds', label: 'Feeds' }
	];

	const modes: SegmentedOption[] = [
		{ value: 'train', label: 'Trainieren' },
		{ value: 'apply', label: 'Anwenden' },
		{ value: 'code', label: 'Programmieren' }
	];

	const { Story } = defineMeta({
		title: 'Primitives/SegmentedControl',
		component: SegmentedControl,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			label: 'Modus',
			labelVisible: false,
			options: modes,
			value: 'train',
			size: 'l',
			fullWidth: false,
			disabled: false
		},
		argTypes: { size: { control: 'inline-radio', options: ['s', 'm', 'l'] } }
	});
</script>

<script lang="ts">
	let view = $state('dashboard');
	let mode = $state('train');
</script>

<Story name="Spielwiese" />

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="SegmentedControl">
		{#snippet lead()}
			Wählt einen Modus oder eine Ansicht aus zwei bis vier Optionen (<code>radiogroup</code>). Die
			Wahl gilt sofort. Ein Tab-Stopp für die ganze Gruppe; Pfeiltasten wechseln die Option.
		{/snippet}

		<section>
			<h2>Zustände</h2>
			<p class="section-intro">
				Die gewählte Option ist gefüllt (Tinte, auf dunklen Bereichen Weiß). Hover legt den
				Hover-Ton hinter eine nicht gewählte Option; der Fokusring liegt im 2px-Rand um die Option.
			</p>
			<Row label="Zwei Optionen">
				<SegmentedControl label="Ansicht" options={views} bind:value={view} />
			</Row>
			<Row label="Drei Optionen">
				<SegmentedControl label="Modus" options={modes} bind:value={mode} />
			</Row>
			<Row label="Mit Icons">
				<SegmentedControl
					label="Ansicht"
					value="dashboard"
					options={[
						{ value: 'dashboard', label: 'Dashboard', icon: 'device' },
						{ value: 'feeds', label: 'Feeds', icon: 'wifi' }
					]}
				/>
			</Row>
			<Row label="Sichtbares Label">
				<SegmentedControl label="Modus" labelVisible options={modes} value="apply" />
			</Row>
			<Row label="Größen s / m / l">
				<SegmentedControl label="Ansicht" size="s" options={views} value="dashboard" />
				<SegmentedControl label="Ansicht" size="m" options={views} value="dashboard" />
				<SegmentedControl label="Ansicht" size="l" options={views} value="dashboard" />
			</Row>
			<Row label="Volle Breite">
				<div style="width: 28rem; max-width: 100%">
					<SegmentedControl label="Modus" fullWidth options={modes} value="code" />
				</div>
			</Row>
			<Row label="Option deaktiviert">
				<SegmentedControl
					label="Modus"
					value="train"
					options={[modes[0], { ...modes[1], disabled: true }, modes[2]]}
				/>
			</Row>
			<Row label="Deaktiviert">
				<SegmentedControl label="Modus" disabled options={modes} value="train" />
			</Row>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Row label="Drei Optionen">
				<SegmentedControl label="Modus" options={modes} value="apply" />
			</Row>
			<Row label="Mit Icons">
				<SegmentedControl
					label="Ansicht"
					value="feeds"
					options={[
						{ value: 'dashboard', label: 'Dashboard', icon: 'device' },
						{ value: 'feeds', label: 'Feeds', icon: 'wifi' }
					]}
				/>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Zwei bis vier kurze Optionen, die sich gegenseitig ausschließen: „Dashboard / Feeds“.',
					'Immer einen Namen für die Gruppe (label), auch wenn er nicht sichtbar ist.',
					'Eine Option ist immer gewählt; die Wahl gilt sofort.',
					'In Ansichten für Schülerinnen und Schüler Größe l (40px).'
				]}
				donts={[
					'Keine Aktionen als Optionen („Speichern“, „Löschen“): das sind Buttons.',
					'Keine Status- oder Identitätsfarbe für die gewählte Option (D2).',
					'Keine langen Labels, die abgeschnitten werden.'
				]}
				notFor={[
					'Zwischen Inhaltsbereichen mit eigenem Inhalt wechseln: Tabs.',
					'Mehr als vier Optionen: Select.',
					'Eine Einstellung an/aus: Switch.'
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
