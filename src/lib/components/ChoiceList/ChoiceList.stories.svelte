<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import ChoiceItem from './ChoiceItem.svelte';
	import ChoiceList from './ChoiceList.svelte';

	const { Story } = defineMeta({
		title: 'Patterns/ChoiceList',
		component: ChoiceItem,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			title: 'Per USB-Kabel',
			detail: 'Zuverlässig, funktioniert immer. Kabel an Calliope und Rechner anschließen.',
			icon: 'usb',
			disabled: false
		}
	});
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<div class="narrow">
			<ChoiceList label="Übertragungsweg">
				<ChoiceItem {...args} />
			</ChoiceList>
		</div>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Patterns" title="ChoiceList">
		{#snippet lead()}
			Zwei bis vier Wege, zwischen denen man sich entscheidet, als große Kacheln: Jede Kachel ist
			ein Button, der Klick ist die Wahl. Gedacht für Dialoge wie „Programm übertragen“, in denen
			die Frage schon im Titel steht.
		{/snippet}

		<section>
			<h2>Mit Icon und Erklärung</h2>
			<div class="narrow">
				<ChoiceList label="Übertragungsweg">
					<ChoiceItem
						icon="bluetooth"
						title="Per Bluetooth"
						detail="Drahtlos. Der Calliope muss eingeschaltet und in Reichweite sein."
					/>
					<ChoiceItem
						icon="usb"
						title="Per USB-Kabel"
						detail="Zuverlässig, funktioniert immer. Kabel an Calliope und Rechner anschließen."
					/>
					<ChoiceItem
						icon="download"
						title="Als Datei herunterladen"
						detail=".hex-Datei speichern und selbst auf den Calliope kopieren."
					/>
				</ChoiceList>
			</div>
		</section>

		<section>
			<h2>Kurz</h2>
			<p class="section-intro">
				Ohne Erklärung, wenn der Titel allein reicht. Eine nicht verfügbare Wahl bleibt sichtbar und
				ist deaktiviert, statt zu verschwinden.
			</p>
			<div class="narrow">
				<ChoiceList label="Welcher Calliope mini?">
					<ChoiceItem icon="device" title="Calliope mini 2" />
					<ChoiceItem icon="device" title="Calliope mini 1" />
					<ChoiceItem icon="bluetooth" title="Per Bluetooth" disabled />
				</ChoiceList>
			</div>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<div class="narrow">
				<ChoiceList label="Nach dem Fehler">
					<ChoiceItem
						icon="retry"
						title="Nochmal versuchen"
						detail="Übertragung über USB erneut starten."
					/>
					<ChoiceItem
						icon="download"
						title="Als Datei herunterladen"
						detail="Auf das Laufwerk „MINI“ ziehen, das klappt immer."
					/>
				</ChoiceList>
			</div>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Der Titel jeder Kachel ist der Weg („Per USB-Kabel“), die Erklärung sagt in einem Satz, was er braucht.',
					'Der wahrscheinlichste Weg steht oben.',
					'Abbrechen ist kein Weg: es gehört als Button in den Fuß des Dialogs.'
				]}
				donts={[
					'Keine Farben pro Kachel: die Wege unterscheiden sich durch Icon und Text.',
					'Keine Auswahl mit anschließendem „Weiter“: dafür gibt es RadioGroup.'
				]}
				notFor={[
					'Eine Einstellung, die bestehen bleibt: RadioGroup oder SegmentedControl.',
					'Nur eine Aktion: Button.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.narrow {
		max-width: 28rem;
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
