<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Button from '../Button/Button.svelte';
	import EmptyState from './EmptyState.svelte';

	const { Story } = defineMeta({
		title: 'Patterns/EmptyState',
		component: EmptyState,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			title: 'Noch keine Kacheln',
			description: 'Kacheln zeigen die Werte deiner Geräte oder steuern sie.',
			icon: 'add',
			compact: false
		}
	});
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<EmptyState {...args}>
			{#snippet actions()}
				<Button icon="add">Kachel anlegen</Button>
			{/snippet}
		</EmptyState>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Patterns" title="EmptyState">
		{#snippet lead()}
			Was an einer Stelle erscheint, solange es nichts zu zeigen gibt: ein Satz, was fehlt, ein
			Satz, wozu es da ist, und höchstens eine Hauptaktion für den ersten Schritt.
		{/snippet}

		<section>
			<h2>Erster Start</h2>
			<div class="frame">
				<EmptyState
					title="Noch keine Kacheln"
					description="Kacheln zeigen die Werte deiner Geräte oder steuern sie. Lege die erste an."
					icon="add"
				>
					{#snippet actions()}
						<Button icon="add">Kachel anlegen</Button>
						<Button variant="secondary">Beispiel laden</Button>
					{/snippet}
				</EmptyState>
			</div>
		</section>

		<section>
			<h2>Kompakt</h2>
			<p class="section-intro">
				In einer Tabelle oder einem kleinen Panel: linksbündig, ohne Icon.
			</p>
			<div class="frame">
				<EmptyState
					compact
					level={4}
					title="Noch keine Werte"
					description="Sobald ein Gerät an „temperatur“ sendet, erscheinen die Werte hier."
				/>
			</div>
		</section>

		<section>
			<h2>Kein Treffer</h2>
			<div class="frame">
				<EmptyState
					title="Keine Feeds mit „licht“"
					description="Prüfe die Schreibweise oder zeige alle Feeds."
					icon="filter-off"
				>
					{#snippet actions()}
						<Button variant="secondary">Filter zurücksetzen</Button>
					{/snippet}
				</EmptyState>
			</div>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<EmptyState
				title="Noch keine Werte"
				description="Sobald ein Gerät sendet, erscheint hier der Verlauf."
				icon="device"
			/>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Der Titel ist eine Feststellung („Noch keine Feeds“), keine Fehlermeldung.',
					'Die Aktion beginnt den ersten Schritt, mit Verb („Kachel anlegen“).',
					'Die Überschriftenebene (level) passt zur Seite.'
				]}
				donts={[
					'Keine Statusfarbe: eine leere Liste ist kein Fehler.',
					'Keine langen Anleitungen: höchstens zwei Sätze, Hilfe verlinken.'
				]}
				notFor={['Etwas ist schiefgegangen: Banner mit tone="error".']}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.frame {
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-lg);
		padding: 0 var(--cui-space-4);
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
