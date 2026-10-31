<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Button from '../Button/Button.svelte';
	import IconButton from '../IconButton/IconButton.svelte';
	import Switch from '../Switch/Switch.svelte';
	import Popover from './Popover.svelte';

	const { Story } = defineMeta({
		title: 'Overlays/Popover',
		component: Popover,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { title: 'Token', side: 'bottom', align: 'start', size: 'm', showClose: false },
		argTypes: {
			side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
			align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
			size: { control: 'inline-radio', options: ['s', 'm', 'l'] }
		}
	});
</script>

<Story name="Spielwiese">
	{#snippet template({ children: _, ...args })}
		<Popover {...args}>
			{#snippet trigger({ props })}
				<Button {...props} variant="secondary">Token zeigen</Button>
			{/snippet}
			<p class="text">Mit diesem Token senden Geräte an dein Dashboard.</p>
		</Popover>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Overlays" title="Popover">
		{#snippet lead()}
			Ein kleines Panel am Auslöser, das auch Bedienelemente enthalten darf (anders als der
			Tooltip). Fokus geht hinein, Escape und ein Klick daneben schließen es, der Fokus kehrt zum
			Auslöser zurück.
		{/snippet}

		<section>
			<h2>Beispiele</h2>
			<Row label="Mit Titel">
				<Popover title="Token des Dashboards">
					{#snippet trigger({ props })}
						<Button {...props} variant="secondary" iconEnd="chevron-down">Token</Button>
					{/snippet}
					<p class="text">Mit diesem Token senden Geräte an dein Dashboard.</p>
					<code class="token">K7-PX2-QM9</code>
					<div class="actions"><Button size="s" icon="copy">Kopieren</Button></div>
				</Popover>
			</Row>
			<Row label="Mit Einstellungen">
				<Popover title="Kachel" showClose size="s" align="end">
					{#snippet trigger({ props })}
						<IconButton {...props} icon="settings" label="Kachel einstellen" />
					{/snippet}
					<div class="settings">
						<Switch label="Gerät anzeigen" checked labelPosition="start" />
						<Switch label="Zeit anzeigen" labelPosition="start" />
					</div>
				</Popover>
			</Row>
			<Row label="Ohne Titel">
				<Popover size="s">
					{#snippet trigger({ props })}
						<IconButton {...props} icon="help" label="Was ist ein Feed?" />
					{/snippet}
					<p class="text">Ein Feed sammelt die Werte, die Geräte unter einem Namen senden.</p>
				</Popover>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Für kurze Inhalte am Auslöser: ein Wert zum Kopieren, zwei, drei Einstellungen.',
					'Ein Titel, wenn das Panel Bedienelemente hat; er ist zugleich sein Name.'
				]}
				donts={[
					'Keine langen Formulare und keine Pflichtentscheidung: dafür gibt es den Dialog.',
					'Nicht auf Hover öffnen.'
				]}
				notFor={[
					'Nur eine kurze Beschriftung: Tooltip.',
					'Eine Liste von Befehlen: Menu.',
					'Ein Formular oder eine Entscheidung: Dialog.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.text {
		margin: 0;
	}

	.token {
		display: block;
		margin-top: var(--cui-space-3);
		font-family: var(--cui-typography-code-font-family);
		font-size: var(--cui-font-size-lg);
		letter-spacing: 0.06em;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		margin-top: var(--cui-space-3);
	}

	.settings {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-3);
	}
</style>
