<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import StatusDot from './StatusDot.svelte';

	const { Story } = defineMeta({
		title: 'Primitives/StatusDot',
		component: StatusDot,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { status: 'success', label: 'Online', size: 'm', hideLabel: false },
		argTypes: {
			status: {
				control: 'inline-radio',
				options: ['success', 'warning', 'error', 'info', 'neutral']
			},
			size: { control: 'inline-radio', options: ['s', 'm', 'l'] }
		}
	});

	const devices = [
		{ name: 'Calliope 1', status: 'success', word: 'Online' },
		{ name: 'Wetterstation', status: 'warning', word: 'Pausiert' },
		{ name: 'Calliope 3', status: 'error', word: 'Gesperrt' },
		{ name: 'Calliope 4', status: 'neutral', word: 'Inaktiv' }
	] as const;
</script>

<Story name="Spielwiese" />

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="StatusDot">
		{#snippet lead()}
			Zustand eines Geräts oder einer Verbindung: ein Punkt und ein Wort. Der Punkt hat je Status
			eine eigene Form (Kreis, Raute, Quadrat, Ring), damit er auch ohne Farbe unterscheidbar ist.
			Ein Punkt nur mit <code>title</code> ist keine Statusanzeige.
		{/snippet}

		<section>
			<h2>Status</h2>
			<Row label="Alle">
				<StatusDot status="success" label="Online" />
				<StatusDot status="warning" label="Pausiert" />
				<StatusDot status="error" label="Offline" />
				<StatusDot status="info" label="Wird verbunden" />
				<StatusDot status="neutral" label="Inaktiv" />
			</Row>
		</section>

		<section>
			<h2>Größen</h2>
			<Row label="s (12 px)"><StatusDot size="s" status="success" label="Online" /></Row>
			<Row label="m (14 px)"><StatusDot status="success" label="Online" /></Row>
			<Row label="l (16 px), Beamer"><StatusDot size="l" status="success" label="Online" /></Row>
		</section>

		<section>
			<h2>In einer Tabelle</h2>
			<p class="section-intro">
				Nur wo die Spalte „Status“ heißt, darf das Wort unsichtbar werden (<code>hideLabel</code>);
				es bleibt für Screenreader da, und die Form trägt den Unterschied.
			</p>
			<table class="table">
				<thead><tr><th>Gerät</th><th>Status</th><th>Status (kompakt)</th></tr></thead>
				<tbody>
					{#each devices as device (device.name)}
						<tr>
							<td>{device.name}</td>
							<td><StatusDot status={device.status} label={device.word} /></td>
							<td><StatusDot status={device.status} label={device.word} hideLabel /></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Row label="Alle">
				<StatusDot status="success" label="Online" />
				<StatusDot status="warning" label="Pausiert" />
				<StatusDot status="error" label="Offline" />
				<StatusDot status="info" label="Wird verbunden" />
				<StatusDot status="neutral" label="Inaktiv" />
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Immer ein Wort dazu; „Online“ ist Grün (status.success), „Pausiert“ Amber.',
					'Auf Lehrkraft- und Beamer-Ansichten mindestens Größe m bzw. l.'
				]}
				donts={[
					'Kein Punkt nur mit title-Attribut.',
					'Kein Hellgrün für „online“: Hellgrün ist KI-Training. Kein Orange für „pausiert“: Orange ist Robotik.'
				]}
				notFor={['Ein Zustand als Etikett neben einem Titel: Badge.']}
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

	.table {
		border-collapse: collapse;
		font-size: var(--cui-typography-label-font-size);
	}

	th,
	td {
		padding: var(--cui-space-2) var(--cui-space-6) var(--cui-space-2) 0;
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		text-align: left;
	}

	th {
		color: var(--cui-text-muted);
		font-weight: var(--cui-font-weight-semibold);
	}
</style>
