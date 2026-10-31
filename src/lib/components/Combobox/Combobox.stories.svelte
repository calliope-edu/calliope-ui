<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Combobox from './Combobox.svelte';

	// Part of the room-code word list.
	const words = [
		'Ameise',
		'Apfel',
		'Banane',
		'Biene',
		'Birne',
		'Delfin',
		'Drache',
		'Eule',
		'Fuchs',
		'Giraffe',
		'Igel',
		'Kapelle',
		'Kiwi',
		'Koala',
		'Lama',
		'Mango',
		'Möwe',
		'Papagei',
		'Pinguin',
		'Rakete',
		'Schnecke',
		'Tiger',
		'Wal',
		'Zebra'
	].map((word) => ({ value: word.toLowerCase(), label: word }));

	const { Story } = defineMeta({
		title: 'Primitives/Combobox',
		component: Combobox,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			label: 'Erstes Wort',
			items: words,
			placeholder: 'Wort eintippen',
			hint: 'Das erste Wort des Raumcodes.',
			emptyLabel: 'Keine Treffer'
		}
	});
</script>

<script lang="ts">
	let word = $state<string | undefined>(undefined);
	let typed = $state('');
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<div style="max-width: 24rem"><Combobox {...args} /></div>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="Combobox">
		{#snippet lead()}
			Eingabefeld, das beim Tippen eine lange Liste filtert, etwa die Wörter eines Raumcodes.
			Treffer am Wortanfang stehen oben, der erste ist vorgewählt: Enter übernimmt ihn, Pfeiltasten
			wählen einen anderen. Wer das Wort ganz eintippt und weitergeht, hat es ebenfalls gewählt.
		{/snippet}

		<section>
			<h2>Zustände</h2>
			<div class="grid">
				<Combobox label="Erstes Wort" items={words} placeholder="Wort eintippen" />
				<Combobox label="Erstes Wort" items={words} value="delfin" />
				<Combobox
					label="Zweites Wort"
					items={words}
					placeholder="Wort eintippen"
					hint="Steht auf der Tafel, zum Beispiel „Apfel Biene Delfin“."
				/>
				<Combobox
					label="Zweites Wort"
					items={words}
					inputValue="Bananne"
					error="Dieses Wort gibt es nicht. Wähle eins aus der Liste."
				/>
				<Combobox label="Drittes Wort" items={words} value="eule" disabled />
				<Combobox label="Drittes Wort" items={words} placeholder="Wort eintippen" required />
			</div>
		</section>

		<section>
			<h2>Filtern</h2>
			<p class="section-intro">
				Tippe „a“: Wörter, die mit A beginnen, stehen vor denen, die ein A enthalten. Findet der
				Filter nichts, steht „Keine Treffer“ in der Liste und wird höflich vorgelesen.
			</p>
			<Row label="Gebunden">
				<div class="field">
					<Combobox label="Erstes Wort" items={words} bind:value={word} bind:inputValue={typed} />
				</div>
				<span class="muted">value = {word ?? '–'} · inputValue = „{typed}“</span>
			</Row>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<div class="grid">
				<Combobox label="Erstes Wort" items={words} value="biene" hint="Drei Wörter." />
				<Combobox
					label="Zweites Wort"
					items={words}
					inputValue="Bananne"
					error="Dieses Wort gibt es nicht."
				/>
			</div>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Für lange Listen, in denen man den Eintrag schneller tippt als sucht.',
					'Das Label bleibt immer sichtbar; der Platzhalter sagt nur, was zu tun ist.',
					'Einen passenden Text für leere Treffer geben (emptyLabel), in der Sprache der App.'
				]}
				donts={[
					'Keine Combobox für freie Eingaben: Gewählt wird nur, was in der Liste steht.',
					'Keine Combobox zur Navigation oder Suche über Seiten hinweg.',
					'Kein Platzhalter als einziges Label.'
				]}
				notFor={[
					'Bis etwa 15 feste Einträge ohne Tippen: Select.',
					'Zwei bis drei Optionen: RadioGroup oder SegmentedControl.',
					'Freier Text ohne Liste: TextField.'
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

	.field {
		width: 18rem;
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
