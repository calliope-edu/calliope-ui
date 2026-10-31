<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import IconButton from '../IconButton/IconButton.svelte';
	import TextField from './TextField.svelte';

	const { Story } = defineMeta({
		title: 'Primitives/TextField',
		component: TextField,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'Name des Raums', hint: 'Sehen alle, die den Raum betreten.', value: '' },
		argTypes: {
			type: {
				control: 'select',
				options: ['text', 'email', 'password', 'search', 'url', 'tel', 'number']
			}
		}
	});
</script>

<script lang="ts">
	let showPassword = $state(false);
	let name = $state('');
	const nameError = $derived(
		name.length > 0 && name.length < 3 ? 'Mindestens 3 Zeichen.' : undefined
	);
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<div style="max-width: 24rem"><TextField {...args} /></div>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="TextField">
		{#snippet lead()}
			Eingabefeld mit sichtbarem Label, Hinweis und Fehlermeldung. Hinweis und Fehler sind über
			<code>aria-describedby</code> verknüpft; ein Platzhalter ersetzt nie das Label.
		{/snippet}

		<section>
			<h2>Zustände</h2>
			<div class="grid">
				<TextField label="Name des Raums" placeholder="z. B. Klasse 6b" />
				<TextField label="Name des Raums" hint="Sehen alle, die den Raum betreten." />
				<TextField label="Name des Raums" required hint="Pflichtfeld" />
				<TextField
					label="Raumcode"
					value="apfel-baum"
					error="Diesen Raum gibt es nicht. Prüfe die Schreibweise."
				/>
				<TextField label="Name des Raums" value="Klasse 6b" disabled />
				<TextField label="Passwort" type={showPassword ? 'text' : 'password'} value="geheim123">
					{#snippet end()}
						<IconButton
							size="s"
							icon={showPassword ? 'hide' : 'show'}
							label="Passwort anzeigen"
							pressed={showPassword}
							onclick={() => (showPassword = !showPassword)}
						/>
					{/snippet}
				</TextField>
			</div>
		</section>

		<section>
			<h2>Fehler beim Tippen</h2>
			<p class="section-intro">
				Die Meldung erscheint in einer höflichen Live-Region: Screenreader lesen sie vor, ohne zu
				unterbrechen. Der Text bleibt dunkel, das Rot tragen die Icon-Scheibe und der Rahmen.
			</p>
			<div class="grid">
				<TextField
					label="Dein Name"
					bind:value={name}
					error={nameError}
					hint="Tippe ein oder zwei Zeichen."
				/>
			</div>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<div class="grid">
				<TextField label="Name des Raums" hint="Sehen alle, die den Raum betreten." />
				<TextField label="Raumcode" value="apfel-baum" error="Diesen Raum gibt es nicht." />
			</div>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Ein kurzes Label, das sagt, was hineingehört.',
					'Fehler sagen, wie es richtig geht: „Mindestens 3 Zeichen.“'
				]}
				donts={[
					'Kein Platzhalter als einziges Label.',
					'Keine rote Fehlerschrift; die Farbe gehört zur Icon-Scheibe.'
				]}
				notFor={[
					'Auswahl aus festen Werten: Select (Welle 2).',
					'Raumcode-Wörter: Combobox (Welle 2).'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--cui-space-6);
		align-items: start;
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
