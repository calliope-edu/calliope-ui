<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Button from '../Button/Button.svelte';
	import IconButton from '../IconButton/IconButton.svelte';
	import Menu from './Menu.svelte';
	import MenuGroup from './MenuGroup.svelte';
	import MenuItem from './MenuItem.svelte';
	import MenuRadioGroup from './MenuRadioGroup.svelte';
	import MenuRadioItem from './MenuRadioItem.svelte';
	import MenuSeparator from './MenuSeparator.svelte';

	const { Story } = defineMeta({
		title: 'Overlays/Menu',
		component: Menu,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { side: 'bottom', align: 'start' },
		argTypes: {
			side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
			align: { control: 'inline-radio', options: ['start', 'center', 'end'] }
		}
	});
</script>

<script lang="ts">
	let lastAction = $state('–');
	let sort = $state('name');
	let locale = $state('de');
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<Menu side={args.side} align={args.align}>
			{#snippet trigger({ props })}
				<Button {...props} variant="secondary" iconEnd="chevron-down">Aktionen</Button>
			{/snippet}
			<MenuItem icon="edit">Umbenennen</MenuItem>
			<MenuItem icon="copy">Duplizieren</MenuItem>
			<MenuSeparator />
			<MenuItem icon="delete" tone="negative">Löschen</MenuItem>
		</Menu>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Overlays" title="Menu">
		{#snippet lead()}
			Ersetzt <code>Dropdown</code> für Aktionen und Auswahlen. Der Auslöser ist ein eigener Button. Pfeiltasten,
			Pos1/Ende und Tippen eines Anfangsbuchstabens bewegen die Auswahl, Escape schließt und gibt den
			Fokus zurück.
		{/snippet}

		<section>
			<h2>Aktionen</h2>
			<Row label="Mit Button">
				<Menu>
					{#snippet trigger({ props })}
						<Button {...props} variant="secondary" iconEnd="chevron-down">Aktionen</Button>
					{/snippet}
					<MenuItem icon="edit" onSelect={() => (lastAction = 'Umbenennen')}>Umbenennen</MenuItem>
					<MenuItem icon="copy" onSelect={() => (lastAction = 'Duplizieren')}>Duplizieren</MenuItem>
					<MenuItem icon="download" onSelect={() => (lastAction = 'Herunterladen')}>
						Herunterladen
					</MenuItem>
					<MenuItem icon="upload" disabled>Hochladen</MenuItem>
					<MenuSeparator />
					<MenuItem icon="delete" tone="negative" onSelect={() => (lastAction = 'Löschen')}>
						Löschen
					</MenuItem>
				</Menu>
				<span class="muted">zuletzt gewählt: {lastAction}</span>
			</Row>
			<Row label="Mit IconButton">
				<Menu align="end">
					{#snippet trigger({ props })}
						<IconButton {...props} icon="more-vertical" label="Weitere Aktionen" />
					{/snippet}
					<MenuItem icon="edit">Umbenennen</MenuItem>
					<MenuItem icon="settings">Einstellungen</MenuItem>
				</Menu>
			</Row>
		</section>

		<section>
			<h2>Auswahl</h2>
			<p class="section-intro">
				Gewählt ist, was einen Haken hat (<code>menuitemradio</code>). Nie sieht eine Auswahl aus
				wie ein deaktivierter Eintrag.
			</p>
			<Row label="Sortieren">
				<Menu>
					{#snippet trigger({ props })}
						<Button {...props} variant="ghost" iconEnd="chevron-down">Sortieren</Button>
					{/snippet}
					<MenuRadioGroup label="Sortieren nach" bind:value={sort}>
						<MenuRadioItem value="name">Name</MenuRadioItem>
						<MenuRadioItem value="changed">Zuletzt geändert</MenuRadioItem>
						<MenuRadioItem value="editor">Editor</MenuRadioItem>
					</MenuRadioGroup>
				</Menu>
				<span class="muted">sort = {sort}</span>
			</Row>
			<Row label="Gruppen">
				<Menu>
					{#snippet trigger({ props })}
						<Button {...props} variant="secondary" icon="settings">Konto</Button>
					{/snippet}
					<MenuGroup label="Konto">
						<MenuItem icon="edit">Name ändern</MenuItem>
					</MenuGroup>
					<MenuSeparator />
					<MenuRadioGroup label="Sprache" bind:value={locale}>
						<MenuRadioItem value="de">Deutsch</MenuRadioItem>
						<MenuRadioItem value="en">English</MenuRadioItem>
					</MenuRadioGroup>
				</Menu>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Einträge als Verben („Umbenennen“), höchstens etwa sieben.',
					'Endgültige Einträge ans Ende, hinter einen Trenner, mit tone="negative".'
				]}
				donts={[
					'Kein Menü als Tooltip oder Hinweis missbrauchen.',
					'Keine Links, Formulare oder Schalter im Menü.',
					'Keine rote Schrift für Löschen; das Icon trägt das Rot.'
				]}
				notFor={[
					'Erklärender Text beim Zeigen: Tooltip.',
					'Formularauswahl mit Label: Select (Welle 2).'
				]}
			/>
		</section>
	</ComponentPage>
</Story>
