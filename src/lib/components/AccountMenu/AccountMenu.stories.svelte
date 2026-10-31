<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import MenuItem from '../Menu/MenuItem.svelte';
	import MenuRadioGroup from '../Menu/MenuRadioGroup.svelte';
	import MenuRadioItem from '../Menu/MenuRadioItem.svelte';
	import MenuSeparator from '../Menu/MenuSeparator.svelte';
	import AccountMenu from './AccountMenu.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/AccountMenu',
		component: AccountMenu,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { name: 'Mia Schneider', label: 'Konto', align: 'start' }
	});
</script>

<script lang="ts">
	let locale = $state('de');
	let lastAction = $state('–');
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<AccountMenu name={args.name} label={args.label ?? 'Konto'} align={args.align}>
			<MenuItem icon="settings">Einstellungen</MenuItem>
			<MenuSeparator />
			<MenuItem icon="logout">Abmelden</MenuItem>
		</AccountMenu>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Navigation" title="AccountMenu">
		{#snippet lead()}
			Das Konto-Menü rechts im Kopf: der Avatar ist der Auslöser, darin Einstellungen, Sprache und
			Abmelden. Abgemeldet zeigt der Auslöser das Personen-Icon und das Menü Anmelden und
			Registrieren. Die Einträge gibt die App vor.
		{/snippet}

		<section>
			<h2>Zustände</h2>
			<Row label="Angemeldet">
				<AccountMenu name="Mia Schneider" label="Konto" align="start">
					<MenuItem icon="settings" onSelect={() => (lastAction = 'Einstellungen')}>
						Einstellungen
					</MenuItem>
					<MenuSeparator />
					<MenuRadioGroup label="Sprache" bind:value={locale}>
						<MenuRadioItem value="de"><span lang="de">Deutsch</span></MenuRadioItem>
						<MenuRadioItem value="en"><span lang="en">English</span></MenuRadioItem>
					</MenuRadioGroup>
					<MenuSeparator />
					<MenuItem icon="logout" onSelect={() => (lastAction = 'Abmelden')}>Abmelden</MenuItem>
				</AccountMenu>
			</Row>
			<Row label="Mit eigener Farbe">
				<AccountMenu name="Mia Schneider" label="Konto" swatch="#42C8C8" align="start">
					<MenuItem icon="logout">Abmelden</MenuItem>
				</AccountMenu>
			</Row>
			<Row label="Abgemeldet">
				<AccountMenu label="Konto" align="start">
					<MenuItem icon="login" onSelect={() => (lastAction = 'Anmelden')}>Anmelden</MenuItem>
					<MenuItem icon="person" onSelect={() => (lastAction = 'Registrieren')}>
						Registrieren
					</MenuItem>
					<MenuSeparator />
					<MenuRadioGroup label="Sprache" bind:value={locale}>
						<MenuRadioItem value="de"><span lang="de">Deutsch</span></MenuRadioItem>
						<MenuRadioItem value="en"><span lang="en">English</span></MenuRadioItem>
					</MenuRadioGroup>
				</AccountMenu>
			</Row>
			<Row label="Zuletzt">
				<span class="value">{lastAction} · Sprache {locale}</span>
			</Row>
		</section>

		<section>
			<h2>Barrierefreiheit</h2>
			<p class="section-intro">
				Der Auslöser heißt „Konto: Mia Schneider“ (abgemeldet nur „Konto“) und kündigt das Menü an.
				Die Trefferfläche ist 40px rund um den 32px-Avatar; der Fokusring folgt dem Kreis.
			</p>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Abmelden steht zuletzt, nach einem Trenner.',
					'Die Sprache als MenuRadioGroup mit Sprachnamen in ihrer eigenen Sprache.'
				]}
				donts={[
					'Keine Hauptaktionen der Seite ins Konto-Menü.',
					'Abmelden nicht als negative (rote) Aktion: es zerstört nichts.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.value {
		font-size: var(--cui-font-size-sm);
	}
</style>
