<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { icons } from '../../icons/icons.js';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import IconButton from '../IconButton/IconButton.svelte';
	import Button from './Button.svelte';

	const iconOptions = [undefined, ...Object.keys(icons)];

	const { Story } = defineMeta({
		title: 'Primitives/Button',
		component: Button,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { variant: 'primary', tone: 'neutral', size: 'm', loading: false, disabled: false },
		argTypes: {
			variant: {
				control: 'inline-radio',
				options: ['primary', 'secondary', 'ghost', 'link', 'bar']
			},
			tone: { control: 'inline-radio', options: ['neutral', 'positive', 'negative', 'identity'] },
			identity: {
				control: 'select',
				options: [
					'makecode',
					'python',
					'blocks',
					'markdown',
					'ki-training',
					'teachable',
					'iot',
					'robotik'
				]
			},
			size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
			icon: { control: 'select', options: iconOptions },
			iconEnd: { control: 'select', options: iconOptions },
			pressed: { control: 'boolean' }
		}
	});

	const identities = [
		'makecode',
		'python',
		'blocks',
		'markdown',
		'ki-training',
		'teachable',
		'iot',
		'robotik'
	] as const;
	const sizes = ['s', 'm', 'l'] as const;
</script>

<script lang="ts">
	let paused = $state(false);
	let barPressed = $state(false);
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<Button {...args}>Übertragen</Button>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="Button">
		{#snippet lead()}
			Ein Button für alle Aktionen: <code>variant</code> sagt, wie wichtig sie ist,
			<code>tone</code> färbt nur die Fläche eines Primary-Buttons, <code>size</code> passt ihn an. Die
			Pille heißt „drück mich“.
		{/snippet}

		<section>
			<h2>Varianten und Größen</h2>
			<p class="section-intro">
				32 / 36 / 40 px hoch. Auf Flächen für Schülerinnen und Schüler ist <code>l</code> Standard (D6).
			</p>
			{#each sizes as size (size)}
				<Row label="Größe {size}">
					<Button {size}>Übertragen</Button>
					<Button {size} variant="secondary">Abbrechen</Button>
					<Button {size} variant="ghost">Mehr anzeigen</Button>
					<Button {size} variant="link">Anleitung öffnen</Button>
				</Row>
			{/each}
		</section>

		<section>
			<h2>Töne</h2>
			<p class="section-intro">
				Töne füllen nur. Text steht immer in der festen Paarfarbe auf der Fläche, nie farbig auf
				Weiß. Der Löschen-Button hat schwarze Schrift auf Rot (5,1:1).
			</p>
			<Row label="Status">
				<Button tone="positive" icon="check">Freigeben</Button>
				<Button tone="negative" icon="delete">Löschen</Button>
			</Row>
			<Row label="Identität">
				{#each identities as identity (identity)}
					<Button tone="identity" {identity}>{identity}</Button>
				{/each}
			</Row>
		</section>

		<section>
			<h2>Zustände</h2>
			<Row label="Mit Icon">
				<Button icon="download">Herunterladen</Button>
				<Button variant="secondary" iconEnd="chevron-down">Sortieren</Button>
				<Button variant="ghost" icon="add">Programm</Button>
			</Row>
			<Row label="Lädt">
				<Button loading>Übertragen</Button>
				<Button variant="secondary" loading>Abbrechen</Button>
				<Button tone="negative" loading>Löschen</Button>
			</Row>
			<Row label="Deaktiviert">
				<Button disabled>Übertragen</Button>
				<Button variant="secondary" disabled>Abbrechen</Button>
				<Button variant="ghost" disabled>Mehr anzeigen</Button>
				<Button variant="link" disabled>Anleitung öffnen</Button>
			</Row>
			<Row label="Fokussierbar deaktiviert">
				<Button disabled focusableWhenDisabled>Übertragen</Button>
				<span class="muted"
					>bleibt per Tab erreichbar (aria-disabled), damit ein Tooltip den Grund nennen kann</span
				>
			</Row>
			<Row label="Umschalter">
				<Button variant="secondary" pressed={paused} onclick={() => (paused = !paused)}>
					Raum pausieren
				</Button>
				<span class="muted"
					>aria-pressed={String(paused)}: die Beschriftung bleibt, der Zustand ist die Fläche</span
				>
			</Row>
			<Row label="Als Link">
				<Button href="#anleitung" variant="secondary" iconEnd="external-link">Zur Anleitung</Button>
			</Row>
		</section>

		<section>
			<h2>Leisten-Button</h2>
			<p class="section-intro">
				<code>variant="bar"</code> ist der Button der Editor-Leiste aus Campus (Teilen, Erweiterungen,
				Calliope mini rechts in der MakeCode- und IoT-Leiste): schwarze Fläche, weiße Schrift in normaler
				Schreibweise, halbfett, 8 px Ecken, kein Rahmen. Er sieht in beiden Themes gleich aus und steht
				so auf einer hellen wie auf einer dunklen Leiste. Beim Überfahren legt sich ein weißer Schleier
				darüber, gedrückt wird er weiß mit schwarzem Rand. Vorläufig eine Variante neben den anderen,
				bis entschieden ist, welcher Weg bleibt.
			</p>
			{#each sizes as size (size)}
				<Row label="Größe {size}">
					<IconButton {size} variant="bar" icon="share" label="Teilen" />
					<Button {size} variant="bar" iconEnd="chevron-down">2 Erweiterungen</Button>
					<Button {size} variant="bar" iconEnd="chevron-down">Calliope mini 3</Button>
				</Row>
			{/each}
			<Row label="Zustände">
				<Button variant="bar" pressed={barPressed} onclick={() => (barPressed = !barPressed)}>
					Simulator
				</Button>
				<Button variant="bar" loading>Teilen</Button>
				<Button variant="bar" disabled>Calliope mini 3</Button>
				<IconButton variant="bar" icon="share" label="Teilen" disabled />
			</Row>
			<div class="bars">
				<div class="editor-bar" data-theme="light">
					<span>Helle Leiste</span>
					<IconButton variant="bar" icon="share" label="Teilen" />
					<Button variant="bar" iconEnd="chevron-down">2 Erweiterungen</Button>
					<Button variant="bar" iconEnd="chevron-down">Calliope mini 3</Button>
				</div>
				<div class="editor-bar" data-theme="dark">
					<span>Dunkle Leiste</span>
					<IconButton variant="bar" icon="share" label="Teilen" />
					<Button variant="bar" iconEnd="chevron-down">2 Erweiterungen</Button>
					<Button variant="bar" iconEnd="chevron-down">Calliope mini 3</Button>
				</div>
			</div>
		</section>

		<section>
			<h2>Breite</h2>
			<p class="section-intro">
				Ein Button ist so breit wie seine Beschriftung, auch in Spalten (Karten, Dialoge), die ihre
				Kinder sonst auf volle Breite ziehen. Die ganze Zeile füllt er nur mit
				<code>fullWidth</code>.
			</p>
			<Row label="In einer Spalte">
				<div class="stack">
					<span>Raum „Klasse 6b“</span>
					<Button variant="secondary">Einstellungen</Button>
				</div>
				<div class="stack">
					<span>Mit fullWidth</span>
					<Button fullWidth>Beitreten</Button>
				</div>
			</Row>
		</section>

		<section>
			<h2>Rahmenstärke (D3)</h2>
			<p class="section-intro">
				Entschieden: 2 px in jeder Größe (oben). Zum Vergleich darunter ein Rahmen, der mit der
				Größe wächst (1,5 / 2 / 2,5 px), angelehnt an die Strichstärke der Schrift.
			</p>
			<Row label="2 px (entschieden)">
				{#each sizes as size (size)}
					<Button {size} variant="secondary">Abbrechen</Button>
				{/each}
			</Row>
			<div class="scaled">
				<Row label="1,5 / 2 / 2,5 px">
					{#each sizes as size (size)}
						<Button {size} variant="secondary">Abbrechen</Button>
					{/each}
				</Row>
			</div>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Row label="data-theme=dark">
				<Button>Übertragen</Button>
				<Button variant="secondary">Abbrechen</Button>
				<Button variant="ghost">Mehr anzeigen</Button>
				<Button variant="link">Anleitung öffnen</Button>
				<Button tone="negative">Löschen</Button>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Ein Verb als Beschriftung: „Speichern“, „Raum schließen“.',
					'Ein Primary-Button pro Bereich; die Hauptaktion steht rechts.',
					'Löschen und andere endgültige Aktionen mit tone="negative" und einer Rückfrage (ConfirmDialog).',
					'Bei Ladevorgängen loading setzen statt den Button zu deaktivieren.'
				]}
				donts={[
					'Keine farbige Schrift auf Weiß, auch nicht für Ghost- oder Link-Buttons.',
					'Nicht die Marke (Teal) als Fläche für Aktionen.',
					'Die Beschriftung eines Umschalters nicht mit dem Zustand wechseln („Pausieren“/„Fortsetzen“).',
					'Keinen deaktivierten Primary-Button ohne sichtbaren Grund.'
				]}
				notFor={[
					'Nur ein Icon: IconButton.',
					'Aktionen rechts in einer Editor-Leiste: variant="bar", nicht primary oder secondary.',
					'Navigation zu einer anderen Seite im Fließtext: ein normaler Link.',
					'Ein Zustand an/aus, der sofort gilt: Switch.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-3);
		width: 16rem;
		padding: var(--cui-space-4);
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-md);
	}

	.scaled {
		--cui-button-border-width-s: var(--cui-border-width-button-scaled-s);
		--cui-button-border-width-m: var(--cui-border-width-button-scaled-m);
		--cui-button-border-width-l: var(--cui-border-width-button-scaled-l);
	}

	.bars {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-3);
		margin-top: var(--cui-space-4);
	}

	/* A stand-in for the editor bar: surface.subtle is mist on light, graphite on dark. */
	.editor-bar {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--cui-space-2);
		padding: var(--cui-space-2) var(--cui-space-4);
		border-radius: var(--cui-radius-lg);
		background-color: var(--cui-surface-subtle);
		color: var(--cui-text-default);
	}

	.editor-bar span {
		margin-right: auto;
		color: var(--cui-text-muted);
		font-size: var(--cui-font-size-sm);
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
