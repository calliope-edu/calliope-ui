<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Button from '../Button/Button.svelte';
	import IconButton from '../IconButton/IconButton.svelte';
	import Menu from '../Menu/Menu.svelte';
	import MenuItem from '../Menu/MenuItem.svelte';
	import SegmentedControl from '../SegmentedControl/SegmentedControl.svelte';
	import Toolbar from './Toolbar.svelte';
	import ToolbarSeparator from './ToolbarSeparator.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Toolbar',
		component: Toolbar,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'Programm', orientation: 'horizontal' },
		argTypes: {
			orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] }
		}
	});
</script>

<script lang="ts">
	let running = $state(false);
	let view = $state('blocks');
	let lastAction = $state('–');
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<Toolbar label={args.label ?? 'Programm'} orientation={args.orientation}>
			<IconButton icon="play" label="Starten" />
			<IconButton icon="stop" label="Stoppen" />
			<ToolbarSeparator orientation={args.orientation === 'vertical' ? 'horizontal' : 'vertical'} />
			<IconButton icon="download" label="Herunterladen" />
			<IconButton icon="share" label="Teilen" />
		</Toolbar>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Navigation" title="Toolbar">
		{#snippet lead()}
			Eine Leiste zusammengehöriger Werkzeuge mit nur einem Tab-Stopp: Tab springt in die Leiste und
			wieder heraus, die Pfeiltasten wandern darin, Pos1 und Ende springen an die Ränder. Das spart
			Schülerinnen und Schülern, die mit der Tastatur arbeiten, viele Tab-Schritte.
		{/snippet}

		<section>
			<h2>Editor-Leiste</h2>
			<p class="section-intro">
				Probier es: in die Leiste tabben, mit ← → wandern. Deaktivierte Buttons werden übersprungen,
				ein Menü-Auslöser öffnet mit Enter oder ↓.
			</p>
			<div class="frame">
				<Toolbar label="Programm">
					<Button size="s" icon={running ? 'stop' : 'play'} onclick={() => (running = !running)}>
						{running ? 'Stoppen' : 'Starten'}
					</Button>
					<IconButton icon="retry" label="Neu starten" size="s" disabled={!running} />
					<ToolbarSeparator />
					<IconButton
						icon="download"
						label="Herunterladen"
						size="s"
						onclick={() => (lastAction = 'Herunterladen')}
					/>
					<IconButton
						icon="share"
						label="Teilen"
						size="s"
						onclick={() => (lastAction = 'Teilen')}
					/>
					<Menu>
						{#snippet trigger({ props })}
							<IconButton {...props} icon="more" label="Weitere Aktionen" size="s" />
						{/snippet}
						<MenuItem icon="copy" onSelect={() => (lastAction = 'Duplizieren')}
							>Duplizieren</MenuItem
						>
						<MenuItem icon="edit" onSelect={() => (lastAction = 'Umbenennen')}>Umbenennen</MenuItem>
					</Menu>
				</Toolbar>
				<p class="hint">Zuletzt: {lastAction}</p>
			</div>
		</section>

		<section>
			<h2>Mit Ansichtswechsel</h2>
			<p class="section-intro">
				Ein SegmentedControl in der Leiste behält seinen eigenen Tab-Stopp und seine Pfeiltasten
				(eine Radiogruppe): Tab erreicht ihn, ← → wechseln darin die Ansicht.
			</p>
			<div class="frame">
				<Toolbar label="Editor">
					<SegmentedControl
						label="Ansicht"
						size="s"
						options={[
							{ value: 'blocks', label: 'Blöcke' },
							{ value: 'python', label: 'Python' }
						]}
						bind:value={view}
					/>
					<ToolbarSeparator />
					<IconButton icon="help" label="Hilfe" size="s" />
					<IconButton icon="settings" label="Einstellungen" size="s" />
				</Toolbar>
			</div>
		</section>

		<section>
			<h2>Senkrecht</h2>
			<p class="section-intro">Am Rand einer Arbeitsfläche; hier wandern ↑ ↓.</p>
			<div class="frame narrow">
				<Toolbar label="Ansicht" orientation="vertical">
					<IconButton icon="fullscreen" label="Vollbild" />
					<IconButton icon="expand" label="Vergrößern" />
					<IconButton icon="collapse" label="Verkleinern" />
					<ToolbarSeparator orientation="horizontal" />
					<IconButton icon="settings" label="Einstellungen" />
				</Toolbar>
			</div>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Toolbar label="Serielle Ausgabe">
				<IconButton icon="pause" label="Anhalten" size="s" />
				<IconButton icon="delete" label="Leeren" size="s" />
				<ToolbarSeparator />
				<IconButton icon="download" label="Als CSV herunterladen" size="s" />
			</Toolbar>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'label nennt, wofür die Leiste ist („Programm“, „Serielle Ausgabe“).',
					'Jeder Icon-Button hat ein label; der Tooltip zeigt es.',
					'Gruppen mit ToolbarSeparator trennen.'
				]}
				donts={[
					'Keine einzelnen Buttons als Toolbar: ab etwa drei Werkzeugen lohnt sie sich.',
					'Keine Textfelder als Hauptinhalt: dort gehören die Pfeiltasten dem Feld.'
				]}
				notFor={[
					'Navigation zwischen Seiten: Links oder Tabs.',
					'Eine Auswahl aus zwei bis vier Ansichten allein: SegmentedControl.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.frame {
		display: grid;
		gap: var(--cui-space-2);
		padding: var(--cui-space-2) var(--cui-space-3);
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-lg);
	}

	.frame.narrow {
		justify-self: start;
	}

	.hint {
		margin: 0;
		color: var(--cui-text-muted);
		font-size: var(--cui-font-size-sm);
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
