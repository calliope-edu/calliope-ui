<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Badge from '../Badge/Badge.svelte';
	import Button from '../Button/Button.svelte';
	import IconButton from '../IconButton/IconButton.svelte';
	import Menu from '../Menu/Menu.svelte';
	import MenuItem from '../Menu/MenuItem.svelte';
	import StatusDot from '../StatusDot/StatusDot.svelte';
	import Card from './Card.svelte';

	const identities = [
		'makecode',
		'python',
		'blocks',
		'markdown',
		'ki-training',
		'teachable',
		'iot',
		'robotik'
	] as const;

	const { Story } = defineMeta({
		title: 'Patterns/Card',
		component: Card,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			title: 'Wetterstation',
			eyebrow: 'MakeCode-Programm',
			description: 'Misst Temperatur und Licht und zeigt beides auf der LED-Matrix.',
			level: 3,
			padding: 'm',
			identity: 'makecode'
		},
		argTypes: {
			identity: { control: 'select', options: [undefined, ...identities] },
			padding: { control: 'inline-radio', options: ['m', 'l'] },
			level: { control: 'inline-radio', options: [2, 3, 4] }
		}
	});
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<div style="max-width: 22rem">
			<Card {...args}>
				{#snippet actions()}
					<Button size="s">Öffnen</Button>
					<Button size="s" variant="ghost">Teilen</Button>
				{/snippet}
			</Card>
		</div>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Patterns" title="Card">
		{#snippet lead()}
			Eine Fläche für ein Ding: ein Programm, einen Raum, eine Lerneinheit. Flach mit 1px-Rahmen,
			ohne Schatten und ohne Anheben beim Darüberfahren. Ersetzt die ungenutzte Campus-<code
				>Card</code
			>.
		{/snippet}

		<section>
			<h2>Aufbau</h2>
			<p class="section-intro">
				Kennzeile, Titel, ein bis zwei Sätze, dann freier Inhalt und eine Aktionszeile. Alles ist
				optional; der Titel ist eine Überschrift (level), damit die Karte in die Gliederung passt.
			</p>
			<div class="grid">
				<Card
					eyebrow="MakeCode-Programm"
					title="Wetterstation"
					description="Misst Temperatur und Licht und zeigt beides auf der LED-Matrix."
					identity="makecode"
				>
					<div class="meta">
						<Badge size="s">Geändert vor 2 Tagen</Badge>
					</div>
					{#snippet actions()}
						<Button size="s">Öffnen</Button>
						<Menu>
							{#snippet trigger({ props })}
								<IconButton {...props} icon="more" label="Weitere Aktionen" size="s" />
							{/snippet}
							<MenuItem icon="edit">Umbenennen</MenuItem>
							<MenuItem icon="copy">Duplizieren</MenuItem>
							<MenuItem icon="delete" tone="negative">Löschen</MenuItem>
						</Menu>
					{/snippet}
				</Card>
				<Card title="Raum 7b" description="12 Teilnehmende, Code K7-PX2." padding="l">
					<StatusDot status="success" label="Offen" />
					{#snippet actions()}
						<Button size="s" variant="secondary">Raum betreten</Button>
					{/snippet}
				</Card>
				<Card title="Nur Inhalt">
					<p class="text">Ohne Beschreibung und ohne Aktionen, z. B. als Rahmen für eine Liste.</p>
				</Card>
			</div>
		</section>

		<section>
			<h2>Als Link</h2>
			<p class="section-intro">
				Mit <code>href</code> wird der Titel zum Link, dessen Klickfläche die ganze Karte bedeckt. Ein
				Tab-Stopp, der Name ist der Titel, der Fokusring liegt um die Karte. Buttons in der Aktionszeile
				bleiben eigenständig klickbar.
			</p>
			<div class="grid">
				<Card
					href="#lerneinheit"
					eyebrow="Lerneinheit"
					title="Der erste Sensor"
					description="In 45 Minuten vom Lichtsensor zur Nachtlampe."
					identity="blocks"
				/>
				<Card
					href="#iot"
					eyebrow="Projekt"
					title="Klimaprojekt 7b"
					description="3 Feeds, zuletzt aktiv vor 5 Minuten."
					identity="iot"
				>
					{#snippet actions()}
						<Button size="s" variant="ghost" icon="share">Teilen</Button>
					{/snippet}
				</Card>
			</div>
		</section>

		<section>
			<h2>Mit Vorschau</h2>
			<div class="grid">
				<Card
					href="#vorschau"
					title="Lauflicht"
					description="Python-Programm für den Calliope mini 3."
					identity="python"
				>
					{#snippet media()}
						<svg viewBox="0 0 320 140" role="presentation">
							<rect width="320" height="140" style:fill="var(--cui-surface-subtle)" />
							{#each Array.from({ length: 5 }, (_, i) => i) as i (i)}
								<rect
									x={98 + i * 26}
									y="58"
									width="20"
									height="20"
									rx="4"
									style:fill={i === 2 ? 'var(--cui-text-default)' : 'var(--cui-border-control)'}
								/>
							{/each}
						</svg>
					{/snippet}
				</Card>
			</div>
		</section>

		<section>
			<h2>Identitätslinie</h2>
			<p class="section-intro">
				Eine 4px-Linie oben in der Farbe des Produkts oder Editors. Die Fläche bleibt neutral: keine
				eingefärbten Hintergründe.
			</p>
			<div class="grid small">
				{#each identities as identity (identity)}
					<Card title={identity} {identity} level={4} />
				{/each}
			</div>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<div class="grid">
				<Card
					eyebrow="Gerät"
					title="Calliope 1"
					description="Sendet an „temperatur“ und „licht“."
					identity="iot"
				>
					{#snippet actions()}
						<Button size="s" variant="secondary">Details</Button>
					{/snippet}
				</Card>
				<Card href="#dunkel" title="Als Link" description="Fokus- und Hover-Zustand auf Dunkel." />
			</div>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Eine Karte steht für genau ein Ding; der Titel nennt es.',
					'Ganz klickbar nur über href (ein Link). Weitere Aktionen in die Aktionszeile.',
					'Die Überschriftenebene (level) passt zur Seite; Karten in einer Liste stehen in <ul>/<li>.'
				]}
				donts={[
					'Kein Schatten, kein Anheben beim Darüberfahren: Karten liegen flach.',
					'Keine eingefärbte Fläche; Identität nur als Linie oben.',
					'Keine Karte als Button für eine Auswahl im Dialog.'
				]}
				notFor={[
					'Eine Wahl zwischen zwei bis vier Wegen: ChoiceList.',
					'Hinweise und Fehler: Banner.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--cui-space-4);
	}

	.grid.small {
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
	}

	.meta {
		display: flex;
		gap: var(--cui-space-2);
	}

	.text {
		margin: 0;
		font-size: var(--cui-font-size-sm);
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-page);
		color: var(--cui-text-default);
	}
</style>
