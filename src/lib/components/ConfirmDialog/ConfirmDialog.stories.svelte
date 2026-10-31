<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Button from '../Button/Button.svelte';
	import TextField from '../TextField/TextField.svelte';
	import ConfirmDialog from './ConfirmDialog.svelte';
	import ConfirmDialogHost from './ConfirmDialogHost.svelte';
	import { confirmDialog } from './confirm.svelte.js';

	const { Story } = defineMeta({
		title: 'Overlays/ConfirmDialog',
		component: ConfirmDialog,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			title: 'Programm löschen?',
			description:
				'„Ampel“ wird für alle im Raum gelöscht. Das lässt sich nicht rückgängig machen.',
			confirmLabel: 'Löschen',
			cancelLabel: 'Abbrechen',
			tone: 'negative'
		},
		argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'negative'] } }
	});
</script>

<script lang="ts">
	let deleteOpen = $state(false);
	let closeOpen = $state(false);
	let renameOpen = $state(false);
	let noticeOpen = $state(false);
	let newName = $state('Ampel');
	let result = $state('noch nichts gewählt');

	async function deleteViaPromise() {
		const ok = await confirmDialog({
			title: 'Raum schließen?',
			description: 'Alle Schülerinnen und Schüler verlassen den Raum.',
			confirmLabel: 'Raum schließen',
			tone: 'negative'
		});
		result = ok ? 'bestätigt' : 'abgebrochen';
	}

	const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<ConfirmDialog {...args} open={false} />
		<p class="muted">Steuerung über open; die Übersicht zeigt die Fälle zum Anklicken.</p>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Overlays" title="ConfirmDialog">
		{#snippet lead()}
			Ersetzt <code>window.confirm</code>, <code>alert</code> und <code>prompt</code>. Der
			Bestätigen-Button trägt ein Verb („Löschen“, nicht „OK“). Bei endgültigen Aktionen ist er rot
			mit schwarzer Schrift, und der Fokus startet auf „Abbrechen“.
		{/snippet}

		<section>
			<h2>Fälle</h2>
			<Row label="Endgültig (negative)">
				<Button tone="negative" icon="delete" onclick={() => (deleteOpen = true)}>
					Programm löschen
				</Button>
				<span class="muted">bestätigen lädt 1 s, dann schließt der Dialog</span>
			</Row>
			<Row label="Neutral">
				<Button variant="secondary" onclick={() => (closeOpen = true)}>Abmelden</Button>
			</Row>
			<Row label="Statt prompt()">
				<Button variant="secondary" icon="edit" onclick={() => (renameOpen = true)}>
					Umbenennen
				</Button>
			</Row>
			<Row label="Statt alert()">
				<Button variant="secondary" onclick={() => (noticeOpen = true)}>Hinweis zeigen</Button>
			</Row>

			<ConfirmDialog
				bind:open={deleteOpen}
				title="Programm löschen?"
				description="„Ampel“ wird für alle im Raum gelöscht. Das lässt sich nicht rückgängig machen."
				confirmLabel="Löschen"
				tone="negative"
				onConfirm={() => wait(1000)}
			/>
			<ConfirmDialog
				bind:open={closeOpen}
				title="Abmelden?"
				description="Deine Programme bleiben im Raum gespeichert."
				confirmLabel="Abmelden"
			/>
			<ConfirmDialog bind:open={renameOpen} title="Programm umbenennen" confirmLabel="Umbenennen">
				<TextField label="Neuer Name" bind:value={newName} />
			</ConfirmDialog>
			<ConfirmDialog
				bind:open={noticeOpen}
				title="Verbindung getrennt"
				description="Der Calliope mini wurde abgezogen. Steck ihn wieder ein, um weiterzumachen."
				confirmLabel="Verstanden"
				cancelLabel={null}
			/>
		</section>

		<section>
			<h2>Als Funktion</h2>
			<p class="section-intro">
				<code>await confirmDialog(&#123; … &#125;)</code> liefert <code>true</code> oder
				<code>false</code>, wie <code>window.confirm</code>. Dafür steht einmal
				<code>&lt;ConfirmDialogHost /&gt;</code> im App-Layout.
			</p>
			<Row label="confirmDialog()">
				<Button variant="secondary" onclick={deleteViaPromise}>Raum schließen</Button>
				<span class="muted">Ergebnis: {result}</span>
			</Row>
			<ConfirmDialogHost />
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Der Titel ist die Frage, die Beschreibung nennt die Folgen.',
					'Ein Verb auf dem Bestätigen-Button, das zur Frage passt.'
				]}
				donts={[
					'Nicht „OK“ / „Ja“ / „Nein“.',
					'Nicht für jede kleine Aktion fragen; lieber rückgängig machen lassen.'
				]}
				notFor={['Formulare mit mehreren Feldern: Dialog.']}
			/>
		</section>
	</ComponentPage>
</Story>
