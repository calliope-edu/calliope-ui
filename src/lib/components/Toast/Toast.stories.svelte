<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { toast } from 'svelte-sonner';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Button from '../Button/Button.svelte';
	import Toaster from './Toaster.svelte';

	const { Story } = defineMeta({
		title: 'Patterns/Toast',
		component: Toaster,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { position: 'bottom-right', closeButton: true },
		argTypes: {
			position: {
				control: 'select',
				options: [
					'top-left',
					'top-center',
					'top-right',
					'bottom-left',
					'bottom-center',
					'bottom-right'
				]
			}
		}
	});

	function saveLater() {
		return new Promise<void>((resolve) => setTimeout(resolve, 1500));
	}

	/** Clears the toasts of a story when it is left; they live in svelte-sonner's global state. */
	function clearToasts() {
		return () => {
			toast.dismiss();
		};
	}

	/** One toast of each kind that stays. Raised after the Toaster is on the page, so it measures them. */
	async function raiseAll() {
		const next = () => new Promise((resolve) => setTimeout(resolve, 150));
		toast.loading('Wird gespeichert …', { duration: Infinity });
		await next();
		toast('Feed „licht“ gelöscht', {
			duration: Infinity,
			action: { label: 'Rückgängig', onClick: () => {} }
		});
		await next();
		toast.info('Ein neues Gerät ist im Raum', { duration: Infinity });
		await next();
		toast.success('Dashboard gespeichert', {
			description: 'Alle Kacheln sind gesichert.',
			duration: Infinity
		});
		await next();
		toast.warning('Raum pausiert', {
			description: 'Geräte senden nichts.',
			duration: Infinity,
			action: { label: 'Fortsetzen', onClick: () => {} }
		});
		await next();
		toast.error('Feed konnte nicht gelöscht werden', {
			description: 'Prüfe die Verbindung und versuche es noch einmal.',
			duration: Infinity
		});
	}
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<Toaster {...args} />
		<Button onclick={() => toast.success('Dashboard gespeichert')}>Toast zeigen</Button>
	{/snippet}
</Story>

<Story
	name="Alle Arten"
	tags={['!autodocs']}
	args={{ position: 'top-left', expand: true, visibleToasts: 6 }}
	beforeEach={clearToasts}
	play={raiseAll}
>
	{#snippet template(args)}
		<Toaster {...args} />
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Patterns" title="Toast">
		{#snippet lead()}
			Kurze Rückmeldung auf eine Aktion, die gerade passiert ist. Dünne Hülle um svelte-sonner:
			<code>&lt;Toaster /&gt;</code> einmal im Layout, dann <code>toast()</code>,
			<code>toast.success()</code> usw. Aussehen wie der schwebende Banner: Kopfzeile mit Status-Scheibe
			(nur Erfolg, Warnung, Fehler), Titel und X, darunter die Beschreibung mit den Buttons. Kein Farbstreifen,
			kein eingefärbter Hintergrund; beim Laden dreht ein Spinner.
		{/snippet}

		<Toaster />

		<section>
			<h2>Arten</h2>
			<Row label="Status">
				<Button variant="secondary" onclick={() => toast('CSV wird erstellt')}>Neutral</Button>
				<Button
					variant="secondary"
					onclick={() =>
						toast.success('Dashboard gespeichert', {
							description: 'Alle Kacheln sind gesichert.'
						})}>Erfolg</Button
				>
				<Button variant="secondary" onclick={() => toast.info('Ein neues Gerät ist im Raum')}
					>Info</Button
				>
				<Button
					variant="secondary"
					onclick={() => toast.warning('Raum pausiert', { description: 'Geräte senden nichts.' })}
					>Warnung</Button
				>
				<Button
					variant="secondary"
					onclick={() =>
						toast.error('Feed konnte nicht gelöscht werden', {
							description: 'Prüfe die Verbindung und versuche es noch einmal.',
							duration: Infinity
						})}>Fehler</Button
				>
			</Row>
			<Row label="Mit Aktion">
				<Button
					variant="secondary"
					onclick={() =>
						toast('Feed „licht“ gelöscht', {
							action: { label: 'Rückgängig', onClick: () => toast.success('Wiederhergestellt') }
						})}>Löschen mit Rückgängig</Button
				>
			</Row>
			<Row label="Mit Beschreibung und Aktion">
				<Button
					variant="secondary"
					onclick={() =>
						toast.warning('Raum pausiert', {
							description: 'Geräte senden nichts.',
							action: { label: 'Fortsetzen', onClick: () => toast.success('Raum läuft wieder') }
						})}>Pausieren</Button
				>
			</Row>
			<Row label="Mit Promise">
				<Button
					variant="secondary"
					onclick={() =>
						toast.promise(saveLater(), {
							loading: 'Wird gespeichert …',
							success: 'Gespeichert',
							error: 'Speichern fehlgeschlagen'
						})}>Speichern</Button
				>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Ein Satz im Perfekt: „Dashboard gespeichert“.',
					'Fehler bleiben stehen (duration: Infinity), bis man sie schließt.',
					'Löschen mit „Rückgängig“ statt einer Rückfrage, wo es geht.'
				]}
				donts={[
					'Keine Toasts für Dinge, die man nicht verpassen darf: sie verschwinden.',
					'Keine Toasts beim Laden der Seite.'
				]}
				notFor={[
					'Ein Zustand, der bleibt (Raum pausiert, offline): Banner.',
					'Eine Entscheidung vor dem Löschen: ConfirmDialog.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>
