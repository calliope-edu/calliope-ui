<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Button from '../Button/Button.svelte';
	import IconButton from '../IconButton/IconButton.svelte';
	import Tooltip from './Tooltip.svelte';

	const { Story } = defineMeta({
		title: 'Overlays/Tooltip',
		component: Tooltip,
		tags: ['autodocs'],
		parameters: { layout: 'centered' },
		args: { text: 'Programm auf den Calliope mini übertragen', side: 'top', delay: 400 },
		argTypes: { side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] } }
	});
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<Tooltip {...args}>
			{#snippet trigger({ props })}
				<Button {...props} icon="download">Übertragen</Button>
			{/snippet}
		</Tooltip>
	{/snippet}
</Story>

<Story name="Geöffnet" asChild>
	<div style="padding: 4rem">
		<Tooltip text="Einstellungen" open>
			{#snippet trigger({ props })}
				<IconButton {...props} icon="settings" label="Einstellungen" tooltip={false} />
			{/snippet}
		</Tooltip>
	</div>
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Overlays" title="Tooltip">
		{#snippet lead()}
			Kurzer Text beim Zeigen mit der Maus oder beim Fokus per Tastatur. Escape schließt ihn. Ein
			Tooltip enthält nie Bedienelemente und ist nie der einzige Name eines Buttons.
		{/snippet}

		<section>
			<h2>Auslöser</h2>
			<Row label="IconButton">
				<IconButton icon="settings" label="Einstellungen" />
				<IconButton icon="fullscreen" label="Vollbild" />
				<span class="muted">IconButton bringt den Tooltip schon mit</span>
			</Row>
			<Row label="Button">
				<Tooltip text="Programm auf den Calliope mini übertragen">
					{#snippet trigger({ props })}
						<Button {...props} icon="download">Übertragen</Button>
					{/snippet}
				</Tooltip>
			</Row>
			<Row label="Grund fürs Deaktivieren">
				<Tooltip text="Erst einen Calliope mini verbinden">
					{#snippet trigger({ props })}
						<Button {...props} disabled focusableWhenDisabled>Übertragen</Button>
					{/snippet}
				</Tooltip>
				<span class="muted">bleibt per Tab erreichbar, damit der Grund lesbar ist</span>
			</Row>
		</section>

		<section>
			<h2>Seiten</h2>
			<Row label="side">
				{#each ['top', 'right', 'bottom', 'left'] as const as side (side)}
					<Tooltip text="Tooltip {side}" {side}>
						{#snippet trigger({ props })}
							<Button {...props} variant="secondary" size="s">{side}</Button>
						{/snippet}
					</Tooltip>
				{/each}
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Ein paar Wörter, die ergänzen, was der Button tut.',
					'Den Grund nennen, warum etwas gerade nicht geht.'
				]}
				donts={[
					'Keine Links, Buttons oder Formulare im Tooltip.',
					'Keine wichtigen Informationen nur im Tooltip: auf Touch-Geräten sieht ihn niemand.'
				]}
				notFor={[
					'Auswahl oder Aktionen: Menu.',
					'Längere Erklärungen mit Bedienelementen: Popover (Welle 2).'
				]}
			/>
		</section>
	</ComponentPage>
</Story>
