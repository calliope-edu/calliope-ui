<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import StartCard from './StartCard.svelte';
	import StartCardGrid from './StartCardGrid.svelte';

	const colors = [
		'neutral',
		'highlight',
		'makecode',
		'python',
		'blocks',
		'markdown',
		'ki-training',
		'teachable',
		'iot',
		'robotik'
	] as const;

	const { Story } = defineMeta({
		title: 'Patterns/StartCard',
		component: StartCard,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			title: 'Programmierung',
			description:
				'Erstelle ein neues MakeCode-Programm und sende Daten vom Calliope mini an das Dashboard.',
			color: 'makecode',
			disabled: false
		},
		argTypes: {
			color: { control: 'select', options: colors },
			icon: { control: 'select', options: [undefined, 'retry', 'upload', 'add', 'chevron-right'] }
		}
	});
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<div style="max-width: 36rem">
			<StartCard {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Patterns" title="StartCard">
		{#snippet lead()}
			Die große Karte, mit der etwas Neues beginnt: ein Programm, ein Feed, eine Trainingssitzung.
			Flach und eckig auf <code>surface.subtle</code>, links Titel und ein bis zwei Sätze, rechts
			ein quadratisches Farbfeld mit großem Plus. Die ganze Karte ist ein Button.
		{/snippet}

		<section>
			<h2>Leeres IoT-Dashboard</h2>
			<p class="section-intro">
				Zwei Wege in ein leeres Dashboard. Die Karte, die das Produkt weiterbringt, trägt seine
				Identitätsfarbe; die Nebenaufgabe bleibt neutral.
			</p>
			<StartCardGrid label="So geht es los">
				<StartCard
					color="makecode"
					title="Programmierung"
					description="Erstelle ein neues MakeCode-Programm und sende Daten vom Calliope mini an das Dashboard."
				/>
				<StartCard
					title="Feed anlegen"
					description="Wenn du das Dashboard schon einrichten willst, bevor ein Programm sendet. Sonst nicht nötig: Ein Programm legt seine Feeds selbst an."
				/>
			</StartCardGrid>
		</section>

		<section>
			<h2>KI-Training</h2>
			<p class="section-intro">
				Mit <code>icon</code> zeigt das Feld ein anderes Zeichen, etwa für „weitermachen“ oder „aus Datei
				öffnen“. Das Plus bleibt dem Neuanfang vorbehalten.
			</p>
			<StartCardGrid label="Sitzung">
				<StartCard
					color="ki-training"
					icon="retry"
					title="Letzte Sitzung fortsetzen"
					description="Mach dort weiter, wo du aufgehört hast: Gesten, Daten und Modell sind noch da."
				/>
				<StartCard
					color="ki-training"
					icon="upload"
					title="Aus Datei öffnen"
					description="Lade eine gespeicherte Sitzung oder ein Projekt von deinem Rechner."
				/>
				<StartCard
					color="ki-training"
					title="Neue Sitzung"
					description="Lege Gesten an, nimm Daten auf und trainiere ein neues Modell."
				/>
			</StartCardGrid>
		</section>

		<section>
			<h2>Feldfarben</h2>
			<p class="section-intro">
				<code>color</code> nimmt eine Identität (Produkt oder Editor), <code>highlight</code> oder
				<code>neutral</code> (Standard). Das Plus nimmt die passende Vordergrundfarbe der Füllung, auf
				hellen Füllungen also Tinte statt Weiß. Der Text bleibt schwarz bzw. weiß.
			</p>
			<div class="colors">
				{#each colors as color (color)}
					<StartCard {color} title={color} />
				{/each}
			</div>
		</section>

		<section>
			<h2>Zustände</h2>
			<StartCardGrid>
				<StartCard
					color="makecode"
					disabled
					title="Programmierung"
					description="Deaktiviert, solange das Dashboard noch vorbereitet wird."
				/>
				<StartCard
					color="teachable"
					title="Ein neues Projekt mit einem ziemlich langen Titel, der umbricht"
					description="Wird der Text höher als das Feld, wächst das Farbfeld mit, damit die Farbe die ganze Höhe einnimmt. Das Plus bleibt in der Mitte."
				/>
			</StartCardGrid>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<StartCardGrid>
				<StartCard color="iot" title="Neues Dashboard" description="Für ein neues Projekt." />
				<StartCard title="Neutral" description="Auf Dunkel wird das neutrale Feld hell." />
			</StartCardGrid>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Für den Einstieg: etwas Neues anlegen, eine Sitzung beginnen oder fortsetzen.',
					'Mehrere Karten in ein StartCardGrid mit label; die wahrscheinlichste zuerst.',
					'Die Hauptkarte in der Identitätsfarbe des Produkts, Nebenwege neutral.'
				]}
				donts={[
					'Keine Rundung, kein Rahmen, kein Schatten: die Karte liegt flach.',
					'Kein farbiger Text; Farbe nur im Feld.',
					'Keine Links oder Buttons in der Karte: sie ist selbst der Button.'
				]}
				notFor={[
					'Eine Wahl zwischen zwei bis vier Wegen in einem Dialog: ChoiceList.',
					'Ein Ding, das es schon gibt (Programm, Raum): Card.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.colors {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		gap: var(--cui-space-4);
		--cui-start-card-field-size: 6rem;
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-page);
		color: var(--cui-text-default);
	}
</style>
