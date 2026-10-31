<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import AccountMenu from '../AccountMenu/AccountMenu.svelte';
	import Badge from '../Badge/Badge.svelte';
	import IconButton from '../IconButton/IconButton.svelte';
	import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher.svelte';
	import MenuItem from '../Menu/MenuItem.svelte';
	import MenuRadioGroup from '../Menu/MenuRadioGroup.svelte';
	import MenuRadioItem from '../Menu/MenuRadioItem.svelte';
	import MenuSeparator from '../Menu/MenuSeparator.svelte';
	import SegmentedControl from '../SegmentedControl/SegmentedControl.svelte';
	import AppHeader from './AppHeader.svelte';

	const locales = [
		{ code: 'de', name: 'Deutsch' },
		{ code: 'en', name: 'English' }
	];

	const { Story } = defineMeta({
		title: 'Patterns/AppHeader',
		component: AppHeader,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		args: { title: 'Calliope Campus', href: '#', sticky: false }
	});
</script>

<script lang="ts">
	let locale = $state('de');
	let view = $state('dashboard');
	let mode = $state('train');
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<AppHeader {...args}>
			{#snippet end()}
				<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
				<AccountMenu name="Mia Schneider" label="Konto">
					<MenuItem icon="settings">Einstellungen</MenuItem>
					<MenuSeparator />
					<MenuItem icon="logout">Abmelden</MenuItem>
				</AccountMenu>
			{/snippet}
		</AppHeader>
	{/snippet}
</Story>

<Story name="Übersicht" asChild>
	<ComponentPage eyebrow="Patterns" title="AppHeader">
		{#snippet lead()}
			Der Kopf jeder Calliope-App: ein dunkles Band mit Marke links, Werkzeugen in der Mitte und
			Konto rechts. Ersetzt <code>BrandedHeader</code> in Campus und ist die Vorlage für calliope-docs
			und Teachable. Der App-Name ist Link zur Startseite, aber keine Überschrift: die h1 gehört der Seite.
		{/snippet}

		<section>
			<h2>Campus, angemeldet</h2>
			<p class="section-intro">
				Rechts die Sprache und das Konto-Menü. Der erste Tab-Stopp ist der Link „Zum Inhalt
				springen“, sichtbar erst mit Fokus.
			</p>
			<div class="frame">
				<AppHeader
					title="Calliope Campus"
					href="#campus"
					skipLink={{ href: '#inhalt', label: 'Zum Inhalt springen' }}
				>
					{#snippet end()}
						<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
						<AccountMenu name="Mia Schneider" label="Konto">
							<MenuItem icon="settings">Einstellungen</MenuItem>
							<MenuSeparator />
							<MenuItem icon="logout">Abmelden</MenuItem>
						</AccountMenu>
					{/snippet}
				</AppHeader>
				<div class="content" id="inhalt" tabindex="-1"><h1>Meine Räume</h1></div>
			</div>
		</section>

		<section>
			<h2>Im Raum, mit Ansichtswechsel</h2>
			<p class="section-intro">
				<code>start</code> trägt den Raum, <code>center</code> den Wechsel, der immer mittig bleibt, wie
				lang die Seiten auch sind. Unter 640px rutscht die Mitte in eine eigene Zeile.
			</p>
			<div class="frame">
				<AppHeader title="Calliope Campus" href="#campus">
					{#snippet start()}
						<span class="room">Klimaprojekt 7b</span>
						<Badge size="s">K7-PX2</Badge>
					{/snippet}
					{#snippet center()}
						<SegmentedControl
							label="Ansicht"
							size="s"
							options={[
								{ value: 'dashboard', label: 'Dashboard', icon: 'device' },
								{ value: 'feeds', label: 'Feeds', icon: 'wifi' }
							]}
							bind:value={view}
						/>
					{/snippet}
					{#snippet end()}
						<IconButton icon="help" label="Hilfe" />
						<AccountMenu name="Mia Schneider" label="Konto">
							<MenuItem icon="logout">Abmelden</MenuItem>
						</AccountMenu>
					{/snippet}
				</AppHeader>
			</div>
		</section>

		<section>
			<h2>Abgemeldet, Sprache im Konto-Menü</h2>
			<div class="frame">
				<AppHeader title="Calliope Campus" href="#campus">
					{#snippet end()}
						<AccountMenu label="Konto">
							<MenuItem icon="login">Anmelden</MenuItem>
							<MenuItem icon="person">Registrieren</MenuItem>
							<MenuSeparator />
							<MenuRadioGroup label="Sprache" bind:value={locale}>
								<MenuRadioItem value="de"><span lang="de">Deutsch</span></MenuRadioItem>
								<MenuRadioItem value="en"><span lang="en">English</span></MenuRadioItem>
							</MenuRadioGroup>
						</AccountMenu>
					{/snippet}
				</AppHeader>
			</div>
		</section>

		<section>
			<h2>Andere Apps</h2>
			<p class="section-intro">
				Gleicher Kopf, anderer Name. Eine eigene Marke kommt über <code>logo</code>.
			</p>
			<div class="stack">
				<div class="frame">
					<AppHeader title="Calliope Docs" href="#docs">
						{#snippet end()}
							<IconButton icon="search" label="Suchen" />
							<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
						{/snippet}
					</AppHeader>
				</div>
				<div class="frame">
					<AppHeader title="Teachable" href="#teachable">
						{#snippet center()}
							<SegmentedControl
								label="Schritt"
								size="s"
								options={[
									{ value: 'train', label: 'Trainieren' },
									{ value: 'use', label: 'Anwenden' },
									{ value: 'code', label: 'Programmieren' }
								]}
								bind:value={mode}
							/>
						{/snippet}
						{#snippet end()}
							<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
						{/snippet}
					</AppHeader>
				</div>
			</div>
		</section>

		<section>
			<h2>Schmal</h2>
			<p class="section-intro">
				Unter 480px bleibt vom Namen nur die Marke sichtbar; vorgelesen wird er weiter.
			</p>
			<div class="frame narrow">
				<AppHeader title="Calliope Campus" href="#campus">
					{#snippet center()}
						<SegmentedControl
							label="Ansicht"
							size="s"
							options={[
								{ value: 'dashboard', label: 'Dashboard' },
								{ value: 'feeds', label: 'Feeds' }
							]}
							bind:value={view}
						/>
					{/snippet}
					{#snippet end()}
						<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
						<AccountMenu name="Mia Schneider" label="Konto">
							<MenuItem icon="logout">Abmelden</MenuItem>
						</AccountMenu>
					{/snippet}
				</AppHeader>
			</div>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Einmal pro Seite, ganz oben; sticky, wenn die Seite lang scrollt.',
					'skipLink setzen und das Ziel (main) mit tabindex="-1" fokussierbar machen.',
					'Rechts höchstens drei Dinge: eine Aktion, Sprache, Konto.'
				]}
				donts={[
					'Den App-Namen nicht als h1: die h1 ist der Titel der Seite.',
					'Kein eigenes Grau: das Band ist immer surface.default im dunklen Thema.'
				]}
				notFor={['Leiste über einem Editor mit Programmname und Werkzeugen: Toolbar im Inhalt.']}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.frame {
		overflow: hidden;
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-lg);
	}

	.frame.narrow {
		max-width: 22rem;
	}

	.stack {
		display: grid;
		gap: var(--cui-space-4);
	}

	.content {
		padding: var(--cui-space-6) var(--cui-space-8);
	}

	.content h1 {
		margin: 0;
		border: 0;
		padding: 0;
		font-family: var(--cui-typography-h1-font-family);
		font-size: var(--cui-typography-h1-font-size);
	}

	.room {
		overflow: hidden;
		font-weight: var(--cui-font-weight-medium);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
