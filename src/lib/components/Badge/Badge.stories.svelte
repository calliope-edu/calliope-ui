<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Badge from './Badge.svelte';

	const { Story } = defineMeta({
		title: 'Primitives/Badge',
		component: Badge,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { tone: 'neutral', size: 's' },
		argTypes: {
			tone: {
				control: 'select',
				options: ['neutral', 'success', 'warning', 'error', 'info', 'highlight', 'identity']
			},
			size: { control: 'inline-radio', options: ['s', 'm'] }
		}
	});

	const identities = [
		['ki-training', 'KI-Training'],
		['teachable', 'Teachable'],
		['iot', 'IoT-WiFi'],
		['robotik', 'Robotik'],
		['makecode', 'MakeCode'],
		['python', 'Python'],
		['blocks', 'Blocks'],
		['markdown', 'Markdown']
	] as const;
</script>

<Story name="Spielwiese">
	{#snippet template({ children: _, ...args })}
		<Badge {...args}>Pausiert</Badge>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="Badge">
		{#snippet lead()}
			Ein kurzes Etikett zum Lesen, nicht zum Drücken: deshalb ein abgerundetes Rechteck (6 px),
			keine Pille. Jede Fläche trägt ihre feste Textfarbe; Status-Badges haben zusätzlich ein Icon.
		{/snippet}

		<section>
			<h2>Töne</h2>
			<Row label="Neutral">
				<Badge>3 Geräte</Badge>
				<Badge>Entwurf</Badge>
			</Row>
			<Row label="Status">
				<Badge tone="success" icon="check">Verbunden</Badge>
				<Badge tone="warning" icon="pause">Pausiert</Badge>
				<Badge tone="error" icon="error">Gesperrt</Badge>
				<Badge tone="info" icon="info">Neu im Raum</Badge>
			</Row>
			<Row label="Auszeichnung">
				<Badge tone="highlight">Neu</Badge>
			</Row>
			<Row label="Identität">
				{#each identities as [identity, name] (identity)}
					<Badge tone="identity" {identity}>{name}</Badge>
				{/each}
			</Row>
			<Row label="Gerätefarbe">
				<Badge swatch="var(--cui-data-series-1)">Calliope 1</Badge>
				<Badge swatch="var(--cui-data-series-2)">Calliope 2</Badge>
				<Badge swatch="var(--cui-data-series-3)">Wetterstation</Badge>
			</Row>
		</section>

		<section>
			<h2>Größen</h2>
			<Row label="s (12 px)">
				<Badge tone="warning" icon="pause">Pausiert</Badge>
				<Badge>Gestern, 14:03</Badge>
			</Row>
			<Row label="m (14 px)">
				<Badge size="m" tone="warning" icon="pause">Pausiert</Badge>
				<Badge size="m">3 Geräte</Badge>
			</Row>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Row label="Neutral und Status">
				<Badge>3 Geräte</Badge>
				<Badge tone="success" icon="check">Verbunden</Badge>
				<Badge tone="warning" icon="pause">Pausiert</Badge>
				<Badge tone="error" icon="error">Gesperrt</Badge>
				<Badge tone="highlight">Neu</Badge>
			</Row>
			<Row label="Gerätefarbe">
				<Badge swatch="var(--cui-data-series-1)">Calliope 1</Badge>
				<Badge swatch="var(--cui-data-series-4)">Calliope 4</Badge>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Ein bis zwei Wörter; der Zustand steht im Text („Pausiert“), nicht nur in der Farbe.',
					'Größe m auf allem, was eine Lehrkraft aus Entfernung liest.',
					'Den Raum pausieren ist ein Button; der Zustand daneben ein Badge (DESIGN.md, Button).'
				]}
				donts={[
					'Kein Badge zum Klicken: was man drückt, ist eine Pille (Chip, Button).',
					'Keine Identitätsfarbe für einen Status, keine Statusfarbe für ein Produkt.',
					'Keine eingefärbten Hintergründe: die Fläche ist voll oder neutral.'
				]}
				notFor={[
					'Klickbare Filter oder entfernbare Werte: Chip.',
					'Online/Offline in Listen und Tabellen: StatusDot.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
