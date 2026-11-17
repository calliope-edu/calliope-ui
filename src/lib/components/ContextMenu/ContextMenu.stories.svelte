<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import IconButton from '../IconButton/IconButton.svelte';
	import Menu from '../Menu/Menu.svelte';
	import MenuItem from '../Menu/MenuItem.svelte';
	import MenuSeparator from '../Menu/MenuSeparator.svelte';
	import ContextMenu from './ContextMenu.svelte';

	const { Story } = defineMeta({
		title: 'Overlays/ContextMenu',
		component: ContextMenu,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { disabled: false }
	});
</script>

<script lang="ts">
	type Pupil = { name: string; blocked: boolean; anonymous: boolean };

	let pupils = $state<Pupil[]>([
		{ name: 'Ada', blocked: false, anonymous: false },
		{ name: 'Grace', blocked: true, anonymous: false },
		{ name: 'Linus', blocked: false, anonymous: true }
	]);
	let selected = $state<Pupil | null>(null);
	let lastAction = $state('–');

	function toggleBlock(pupil: Pupil | null) {
		if (!pupil) return;
		pupil.blocked = !pupil.blocked;
		lastAction = `${pupil.name} ${pupil.blocked ? 'gesperrt' : 'entsperrt'}`;
	}
</script>

{#snippet pupilItems(pupil: Pupil | null)}
	<MenuItem onSelect={() => toggleBlock(pupil)}>
		{pupil?.blocked ? 'Entsperren' : 'Sperren'}
	</MenuItem>
	<MenuItem
		disabled={!pupil?.anonymous}
		onSelect={() => (lastAction = `Passwort für ${pupil?.name}`)}
	>
		Passwort setzen
	</MenuItem>
	<MenuSeparator />
	<MenuItem icon="delete" tone="negative" onSelect={() => (lastAction = `${pupil?.name} entfernt`)}>
		Aus dem Raum entfernen
	</MenuItem>
{/snippet}

<Story name="Spielwiese">
	{#snippet template(args)}
		<ContextMenu disabled={args.disabled}>
			{#snippet trigger({ props })}
				<div {...props} class="area">Rechtsklick hier (auf Touch: lange drücken)</div>
			{/snippet}
			<MenuItem icon="edit">Umbenennen</MenuItem>
			<MenuItem icon="copy">Duplizieren</MenuItem>
			<MenuSeparator />
			<MenuItem icon="delete" tone="negative">Löschen</MenuItem>
		</ContextMenu>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Overlays" title="ContextMenu">
		{#snippet lead()}
			Das Menu für den Rechtsklick: Es öffnet sich an der Mausposition, auf Touch-Geräten nach
			langem Drücken. Einträge, Tastatur und Aussehen sind dieselben wie bei
			<code>Menu</code>; es nimmt dieselben <code>MenuItem</code>, <code>MenuGroup</code> und
			<code>MenuSeparator</code>.
		{/snippet}

		<section>
			<h2>Liste mit Rechtsklick</h2>
			<p class="section-intro">
				Ein ContextMenu für die ganze Liste. Jede Zeile merkt sich in ihrem eigenen
				<code>oncontextmenu</code>, wer gemeint ist; das läuft, bevor das Menü aufgeht. Dieselben
				Aktionen stehen auch hinter dem ⋮-Button jeder Zeile, denn der Rechtsklick ist nur eine
				Abkürzung.
			</p>
			<ContextMenu>
				{#snippet trigger({ props })}
					<ul {...props} class="list" aria-label="Teilnehmende">
						{#each pupils as pupil (pupil.name)}
							<li class="pupil" oncontextmenu={() => (selected = pupil)}>
								<span class="name">{pupil.name}</span>
								<span class="muted">
									{pupil.blocked ? 'gesperrt' : pupil.anonymous ? 'ohne Passwort' : 'aktiv'}
								</span>
								<Menu align="end">
									{#snippet trigger({ props })}
										<IconButton
											{...props}
											icon="more-vertical"
											label="Aktionen für {pupil.name}"
											size="s"
										/>
									{/snippet}
									{@render pupilItems(pupil)}
								</Menu>
							</li>
						{/each}
					</ul>
				{/snippet}
				{@render pupilItems(selected)}
			</ContextMenu>
			<p class="muted">zuletzt: {lastAction}</p>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Für Dinge, die es oft gibt (Zeilen, Karten, Dateien): ein ContextMenu um die ganze Liste.',
					'Jede Aktion auch sichtbar anbieten, meist als Menu hinter einem ⋮-IconButton in der Zeile.',
					'Dieselben Einträge in derselben Reihenfolge wie im sichtbaren Menu.'
				]}
				donts={[
					'Keine Aktion, die es nur per Rechtsklick gibt: Tastatur, Touch und Neulinge finden sie nicht.',
					'Kein ContextMenu auf Text, den man markieren oder kopieren will; dort bleibt das Browsermenü.'
				]}
				notFor={['Ein Menü hinter einem Button: Menu.']}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.area {
		display: grid;
		place-items: center;
		height: 10rem;
		border: var(--cui-border-width-hairline) dashed var(--cui-border-strong);
		border-radius: var(--cui-radius-md);
		color: var(--cui-text-muted);
	}

	.list {
		max-width: 28rem;
		margin: 0 0 var(--cui-space-3);
		padding: 0;
		list-style: none;
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-md);
	}

	.pupil {
		display: flex;
		align-items: center;
		gap: var(--cui-space-3);
		padding: var(--cui-space-2) var(--cui-space-2) var(--cui-space-2) var(--cui-space-4);
	}

	.pupil + .pupil {
		border-top: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
	}

	.name {
		flex: 1;
		font-weight: var(--cui-font-weight-medium);
	}

	.muted {
		color: var(--cui-text-muted);
	}
</style>
