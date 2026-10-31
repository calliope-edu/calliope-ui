<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import LocaleSwitcher from './LocaleSwitcher.svelte';

	const locales = [
		{ code: 'de', name: 'Deutsch' },
		{ code: 'en', name: 'English' }
	];

	const many = [
		...locales,
		{ code: 'fr', name: 'Français' },
		{ code: 'uk', name: 'Українська' },
		{ code: 'tr', name: 'Türkçe' }
	];

	const { Story } = defineMeta({
		title: 'Navigation/LocaleSwitcher',
		component: LocaleSwitcher,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { locales, value: 'de', label: 'Sprache', variant: 'ghost', size: 's', align: 'end' },
		argTypes: {
			variant: { control: 'inline-radio', options: ['ghost', 'secondary'] },
			size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
			align: { control: 'inline-radio', options: ['start', 'center', 'end'] }
		}
	});
</script>

<script lang="ts">
	let locale = $state('de');
	let other = $state('uk');
</script>

<Story name="Spielwiese" />

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Navigation" title="LocaleSwitcher">
		{#snippet lead()}
			Wechselt die Sprache der App. Ein Menü mit den Sprachen in ihrer eigenen Schreibweise; die
			aktuelle trägt den Haken. Die Bibliothek wechselt selbst nichts: die App setzt die Sprache in <code
				>onValueChange</code
			> (in Campus über Paraglide).
		{/snippet}

		<section>
			<h2>Varianten</h2>
			<Row label="ghost (Kopfzeile)">
				<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
			</Row>
			<Row label="secondary">
				<LocaleSwitcher {locales} label="Sprache" variant="secondary" bind:value={locale} />
			</Row>
			<Row label="size l (Schülerseiten)">
				<LocaleSwitcher {locales} label="Sprache" size="l" bind:value={locale} />
			</Row>
			<Row label="Gewählt">
				<span class="value">{locale}</span>
			</Row>
		</section>

		<section>
			<h2>Mehr Sprachen</h2>
			<p class="section-intro">
				Jede Sprache steht in ihrer eigenen Schrift und trägt <code>lang</code>, damit Screenreader
				sie richtig aussprechen.
			</p>
			<LocaleSwitcher locales={many} label="Sprache" align="start" bind:value={other} />
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>In der dunklen Kopfzeile</h2>
			<LocaleSwitcher {locales} label="Language" bind:value={locale} />
		</section>

		<section>
			<h2>Barrierefreiheit</h2>
			<p class="section-intro">
				Sichtbar steht nur das Kürzel. Vorgelesen wird „Sprache: Deutsch, DE“: der Name enthält das
				sichtbare Kürzel, so funktioniert auch die Sprachsteuerung („Klicke DE“).
			</p>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Sprachnamen in ihrer eigenen Sprache („English“, nicht „Englisch“).',
					'label in der aktuellen Sprache der App („Sprache“ / „Language“).',
					'Im Konto-Menü statt eines eigenen Auslösers: MenuRadioGroup mit denselben Einträgen.'
				]}
				donts={[
					'Keine Flaggen: Flaggen stehen für Länder, nicht für Sprachen.',
					'Die aktuelle Sprache nicht deaktivieren: sie ist gewählt, nicht gesperrt.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.value {
		font-family: var(--cui-font-family-mono);
		font-size: var(--cui-font-size-sm);
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
