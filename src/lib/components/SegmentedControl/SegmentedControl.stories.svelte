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

	const languages: SegmentedOption[] = [
		{ value: 'blocks', label: 'Blöcke' },
		{ value: 'js', label: 'JavaScript' },
		{ value: 'py', label: 'Python' }
	];

	const codeViews: SegmentedOption[] = [
		{ value: 'svg', label: 'Blöcke' },
		{ value: 'ts', label: 'Code' }
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
			variant: 'frame',
			fullWidth: false,
			disabled: false
		},
		argTypes: {
			size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
			variant: { control: 'inline-radio', options: ['frame', 'pill', 'bar'] }
		}
	});
</script>

<script lang="ts">
	let view = $state('dashboard');
	let mode = $state('train');
	let pillView = $state('dashboard');
	let language = $state('blocks');
</script>

<Story name="Spielwiese" />

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="SegmentedControl">
		{#snippet lead()}
			Wählt einen Modus oder eine Ansicht aus zwei bis vier Optionen (<code>radiogroup</code>). Die
			Wahl gilt sofort. Ein Tab-Stopp für die ganze Gruppe; Pfeiltasten wechseln die Option.
		{/snippet}

		<section>
			<h2>Varianten</h2>
			<p class="section-intro">
				Zwei Varianten, vorerst beide: <code>frame</code> (Standard) ist das Rechteck mit Rahmen,
				<code>pill</code> die schwarze Pille mit weißer Wahl, der Ansichts-Umschalter aus Campus
				(Editor-Kopf, IoT-Dashboard, MakeCode-Leiste, Live Wall). Beide sind dieselbe
				<code>radiogroup</code> mit denselben Größen; die Pille kehrt sich im dunklen Theme um. Dazu
				kommt zum Vergleich <code>bar</code>.
			</p>
			<Row label="frame (Standard)">
				<SegmentedControl label="Ansicht" options={views} bind:value={view} />
			</Row>
			<Row label="pill">
				<SegmentedControl label="Ansicht" variant="pill" options={views} bind:value={view} />
			</Row>
			<Row label="bar">
				<SegmentedControl label="Ansicht" variant="bar" options={views} bind:value={view} />
				<span class="muted"
					>Die Pille in der Fläche der Leisten-Buttons (siehe Button, Leisten-Button), zum Vergleich
					mit <code>pill</code>; auf einer grauen Leiste mit <code>data-surface="subtle"</code> weiß bzw.
					schwarz.</span
				>
			</Row>
			<div class="bars">
				{#each ['light', 'dark'] as const as theme (theme)}
					{#each ['subtle', theme === 'light' ? 'default' : 'page'] as surface (surface)}
						<div class="bar" data-theme={theme} data-surface={surface}>
							<SegmentedControl
								label="Ansicht"
								variant="bar"
								size="s"
								options={views}
								value="feeds"
							/>
							<SegmentedControl
								label="Ansicht"
								variant="pill"
								size="s"
								options={views}
								value="feeds"
							/>
						</div>
					{/each}
				{/each}
			</div>
		</section>

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

		<section>
			<h2>Pille</h2>
			<p class="section-intro">
				Die Spur trägt die Füllung von <code>control.on</code>, die gewählte Option springt in
				<code>control.on-mark</code> heraus, wie Knopf und Spur eines Switches. Halbfette Schrift. Der
				Fokusring liegt um die ganze Spur auf der Seitenfläche, nicht auf der dunklen Spur; der Fokus
				steht immer auf der gewählten Option.
			</p>
			<Row label="IoT-Dashboard">
				<SegmentedControl label="Ansicht" variant="pill" options={views} bind:value={pillView} />
			</Row>
			<Row label="MakeCode-Leiste">
				<SegmentedControl
					label="Programmiersprache"
					variant="pill"
					options={languages}
					bind:value={language}
				/>
			</Row>
			<Row label="Live Wall">
				<SegmentedControl label="Ansicht" variant="pill" options={codeViews} value="svg" />
			</Row>
			<Row label="Mit Icons">
				<SegmentedControl
					label="Ansicht"
					variant="pill"
					value="dashboard"
					options={[
						{ value: 'dashboard', label: 'Dashboard', icon: 'device' },
						{ value: 'feeds', label: 'Feeds', icon: 'wifi' }
					]}
				/>
			</Row>
			<Row label="Größen s / m / l">
				<SegmentedControl label="Ansicht" variant="pill" size="s" options={views} value="feeds" />
				<SegmentedControl label="Ansicht" variant="pill" size="m" options={views} value="feeds" />
				<SegmentedControl label="Ansicht" variant="pill" size="l" options={views} value="feeds" />
			</Row>
			<Row label="Volle Breite">
				<div style="width: 28rem; max-width: 100%">
					<SegmentedControl label="Modus" variant="pill" fullWidth options={modes} value="code" />
				</div>
			</Row>
			<Row label="Option deaktiviert">
				<SegmentedControl
					label="Modus"
					variant="pill"
					value="train"
					options={[modes[0], { ...modes[1], disabled: true }, modes[2]]}
				/>
			</Row>
			<Row label="Deaktiviert">
				<SegmentedControl label="Modus" variant="pill" disabled options={modes} value="train" />
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
			<Row label="Pille">
				<SegmentedControl label="Ansicht" variant="pill" options={views} value="dashboard" />
				<SegmentedControl
					label="Programmiersprache"
					variant="pill"
					options={languages}
					value="js"
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
					'Pille für den Ansichts-Umschalter in einer Kopf- oder Werkzeugleiste, Rahmen für eine Wahl in Formularen und Panels.',
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
	.muted {
		max-width: 28rem;
		color: var(--cui-text-muted);
		font-size: var(--cui-font-size-sm);
	}

	/* bar beside pill on the four surfaces: grey and white (light), dark grey and black (dark). */
	.bars {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--cui-space-2);
		margin: var(--cui-space-3) 0;
	}

	.bar {
		display: flex;
		justify-content: center;
		gap: var(--cui-space-3);
		padding: var(--cui-space-3);
		border: 1px solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-lg);
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
