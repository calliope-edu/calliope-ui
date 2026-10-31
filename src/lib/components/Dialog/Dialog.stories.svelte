<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Button from '../Button/Button.svelte';
	import Switch from '../Switch/Switch.svelte';
	import TextField from '../TextField/TextField.svelte';
	import Dialog from './Dialog.svelte';

	const { Story } = defineMeta({
		title: 'Overlays/Dialog',
		component: Dialog,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			title: 'Raum erstellen',
			description: 'Schülerinnen und Schüler treten mit dem Raumcode bei.',
			size: 'm',
			dismissible: true,
			showClose: true
		},
		argTypes: { size: { control: 'inline-radio', options: ['s', 'm', 'l'] } }
	});
</script>

<script lang="ts">
	let createOpen = $state(false);
	let requiredOpen = $state(false);
	let sizeOpen = $state<'s' | 'm' | 'l' | null>(null);
	let roomName = $state('');
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<Dialog {...args}>
			{#snippet trigger({ props })}
				<Button {...props}>Dialog öffnen</Button>
			{/snippet}
			<p style="margin: 0">Inhalt des Dialogs.</p>
			{#snippet actions()}
				<Button variant="secondary">Abbrechen</Button>
				<Button>Erstellen</Button>
			{/snippet}
		</Dialog>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Overlays" title="Dialog">
		{#snippet lead()}
			Ersetzt <code>Modal</code>. Beim Öffnen springt der Fokus in den Dialog und bleibt dort, der
			Hintergrund ist gesperrt, Escape schließt, und beim Schließen kehrt der Fokus zum auslösenden
			Button zurück.
		{/snippet}

		<section>
			<h2>Mit Formular</h2>
			<Row label="Typischer Fall">
				<Button icon="add" onclick={() => (createOpen = true)}>Raum erstellen</Button>
			</Row>
			<Dialog
				bind:open={createOpen}
				title="Raum erstellen"
				description="Schülerinnen und Schüler treten mit dem Raumcode bei."
			>
				<div class="form">
					<TextField label="Name des Raums" bind:value={roomName} placeholder="z. B. Klasse 6b" />
					<Switch label="Chat erlauben" checked />
				</div>
				{#snippet actions()}
					<Button variant="secondary" onclick={() => (createOpen = false)}>Abbrechen</Button>
					<Button onclick={() => (createOpen = false)}>Erstellen</Button>
				{/snippet}
			</Dialog>
		</section>

		<section>
			<h2>Breiten</h2>
			<p class="section-intro">400 / 600 / 800 px, auf kleinen Bildschirmen volle Breite.</p>
			<Row label="size">
				{#each ['s', 'm', 'l'] as const as size (size)}
					<Button variant="secondary" onclick={() => (sizeOpen = size)}>Größe {size}</Button>
				{/each}
			</Row>
			<Dialog
				open={sizeOpen !== null}
				onOpenChange={(open) => !open && (sizeOpen = null)}
				size={sizeOpen ?? 'm'}
				title="Dialog in Größe {sizeOpen}"
			>
				<p style="margin: 0">
					Kurze Rückfragen sind schmal, Formulare mittel, Vorschauen und Tabellen breit.
				</p>
			</Dialog>
		</section>

		<section>
			<h2>Ohne Wegklicken</h2>
			<p class="section-intro">
				<code>dismissible=&#123;false&#125;</code> und <code>showClose=&#123;false&#125;</code>: nur
				wenn eine Entscheidung nötig ist. Escape und ein Klick auf den Hintergrund schließen dann
				nicht.
			</p>
			<Row label="Pflichtentscheidung">
				<Button variant="secondary" onclick={() => (requiredOpen = true)}>Name festlegen</Button>
			</Row>
			<Dialog
				bind:open={requiredOpen}
				title="Wie heißt du?"
				description="Dein Name ist für die Lehrkraft sichtbar."
				size="s"
				dismissible={false}
				showClose={false}
			>
				<TextField label="Dein Name" />
				{#snippet actions()}
					<Button size="l" onclick={() => (requiredOpen = false)}>Weiter</Button>
				{/snippet}
			</Dialog>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Ein Titel, der sagt, worum es geht; er benennt den Dialog für Screenreader.',
					'Die Hauptaktion rechts, „Abbrechen“ links daneben.',
					'Den Text für das Schließen-Kreuz über closeLabel aus den App-Übersetzungen.'
				]}
				donts={[
					'Keine Dialoge, die einen weiteren Dialog öffnen.',
					'Kein Wegklicken sperren, nur weil es einfacher ist.'
				]}
				notFor={[
					'Eine Rückfrage mit Ja/Nein: ConfirmDialog.',
					'Kurze Rückmeldung nach einer Aktion: Toast (Welle 2).'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.form {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-4);
	}
</style>
