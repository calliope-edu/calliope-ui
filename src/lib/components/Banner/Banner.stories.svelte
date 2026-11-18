<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Button from '../Button/Button.svelte';
	import ProgressBar from '../ProgressBar/ProgressBar.svelte';
	import Banner from './Banner.svelte';

	const { Story } = defineMeta({
		title: 'Patterns/Banner',
		component: Banner,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { tone: 'info', title: 'Neuer Feed „temperatur“' },
		argTypes: {
			tone: { control: 'inline-radio', options: ['info', 'success', 'warning', 'error'] },
			live: { control: 'inline-radio', options: ['status', 'alert', 'none'] }
		}
	});
</script>

<script lang="ts">
	let hintVisible = $state(true);
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<Banner {...args}>Ein Gerät sendet Werte, für die es noch keinen Feed gibt.</Banner>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Patterns" title="Banner">
		{#snippet lead()}
			Ein Hinweis im Seitenfluss. Oben stehen ein optionales Status-Icon, die Überschrift und das X;
			darunter der Text mit seinen Buttons, mittig dazu ausgerichtet. Die Statusfarbe steckt nur in
			der Icon-Scheibe: kein Farbstreifen, kein getönter Hintergrund, und Info hat gar kein Icon.
			Fehler sind <code>role="alert"</code>, alles andere <code>role="status"</code>.
		{/snippet}

		<section>
			<h2>Töne</h2>
			<div class="stack">
				<Banner tone="info" title="Neuer Feed „temperatur“">
					Ein Gerät sendet Werte, für die es noch keinen Feed gibt.
				</Banner>
				<Banner tone="success" title="Feeds zusammengeführt">
					„temp“ und „temperatur“ sind jetzt ein Feed.
				</Banner>
				<Banner tone="warning" title="Raum pausiert">
					Geräte können gerade keine Werte senden.
				</Banner>
				<Banner tone="error" title="Keine Verbindung zum Server">
					Neue Werte erscheinen, sobald die Verbindung wieder steht.
				</Banner>
			</div>
		</section>

		<section>
			<h2>Mit Aktion und Schließen</h2>
			<div class="stack">
				{#if hintVisible}
					<Banner
						tone="info"
						title="Neuer Feed „licht“"
						onDismiss={() => (hintVisible = false)}
						dismissLabel="Hinweis schließen"
					>
						Lege eine Kachel an, um die Werte zu sehen.
						{#snippet actions()}
							<Button size="s" variant="secondary" icon="add">Kachel anlegen</Button>
						{/snippet}
					</Banner>
				{:else}
					<Button variant="secondary" size="s" onclick={() => (hintVisible = true)}>
						Hinweis wieder zeigen
					</Button>
				{/if}
				<Banner tone="error"
					>Nur eine Zeile ohne Titel: Der Feed konnte nicht gelöscht werden.</Banner
				>
				<Banner tone="success" title="Feeds zusammengeführt" onDismiss={() => {}} />
			</div>
		</section>

		<section>
			<h2>Beschäftigt</h2>
			<p class="note">
				<code>busy</code> setzt einen Spinner an die Stelle des Status-Icons und
				<code>aria-busy="true"</code>. Der Text darf auch ein ProgressBar sein.
			</p>
			<div class="stack">
				<Banner busy title="Raum wird vorbereitet…" onDismiss={() => {}}>
					Das dauert ein paar Sekunden.
					{#snippet actions()}
						<Button size="s" variant="secondary">Abbrechen</Button>
					{/snippet}
				</Banner>
				<Banner busy title="Werte werden exportiert…">
					<ProgressBar label="Export" value={64} />
				</Banner>
			</div>
		</section>

		<section>
			<h2>Schwebend</h2>
			<p class="note">
				<code>floating</code> gibt die erhöhte Fläche mit Schatten und so viel Breite wie der Inhalt braucht,
				für einen Banner über der Seite. Die Position setzt die App.
			</p>
			<div class="stack floating-demo">
				<Banner floating tone="warning" title="Raum pausiert" onDismiss={() => {}}>
					Geräte können gerade keine Werte senden.
					{#snippet actions()}
						<Button size="s" variant="secondary">Fortsetzen</Button>
					{/snippet}
				</Banner>
			</div>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<div class="stack">
				<Banner tone="info" title="Neuer Feed" onDismiss={() => {}}>
					Ein Gerät sendet neue Werte.
					{#snippet actions()}
						<Button size="s" variant="secondary">Kachel anlegen</Button>
					{/snippet}
				</Banner>
				<Banner tone="success" title="Feeds zusammengeführt">Ein Feed statt zwei.</Banner>
				<Banner tone="warning" title="Raum pausiert">Geräte senden gerade nichts.</Banner>
				<Banner tone="error" title="Keine Verbindung">Neue Werte erscheinen später.</Banner>
				<Banner busy title="Verbinde…" floating>Bitte warten.</Banner>
			</div>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Titel nennt, was passiert ist; der Text, was man tun kann.',
					'Höchstens eine Aktion, als Button s secondary.',
					'Ein Banner, das schon beim Laden der Seite da ist, bekommt live="none".'
				]}
				donts={[
					'Keine eingefärbte Fläche, kein Farbstreifen, kein roter Text.',
					'Nicht mehrere Banner übereinander stapeln: zusammenfassen.'
				]}
				notFor={[
					'Rückmeldung zu einer gerade ausgeführten Aktion: Toast.',
					'Fehler eines einzelnen Feldes: TextField error.',
					'Eine leere Liste: EmptyState.'
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
		max-width: 44rem;
	}

	.note {
		margin: 0 0 var(--cui-space-3);
		max-width: 44rem;
		color: var(--cui-text-muted);
	}

	.floating-demo {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-subtle);
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
