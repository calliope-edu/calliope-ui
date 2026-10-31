<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Button from '../Button/Button.svelte';
	import ProgressBar from './ProgressBar.svelte';

	const files = (value: number, max: number) => `${value} von ${max} Dateien`;

	const { Story } = defineMeta({
		title: 'Primitives/ProgressBar',
		component: ProgressBar,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'Firmware wird übertragen', value: 42, max: 100, showValue: true }
	});
</script>

<script lang="ts">
	let flashing = $state(0);
	let timer: ReturnType<typeof setInterval> | undefined;

	function flash() {
		clearInterval(timer);
		flashing = 0;
		timer = setInterval(() => {
			flashing = Math.min(flashing + 7, 100);
			if (flashing === 100) clearInterval(timer);
		}, 300);
	}

	$effect(() => () => clearInterval(timer));
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<div class="frame"><ProgressBar {...args} /></div>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="ProgressBar">
		{#snippet lead()}
			Zeigt den Fortschritt eines Vorgangs, der länger als ein paar Sekunden dauert (<code
				>role="progressbar"</code
			>), z. B. das Übertragen der Firmware auf den Calliope mini. Ohne bekannten Umfang (<code
				>value=&#123;null&#125;</code
			>) läuft ein Abschnitt durch die Leiste.
		{/snippet}

		<section>
			<h2>Zustände</h2>
			<Row label="Läuft">
				<div class="frame"><ProgressBar label="Firmware wird übertragen" value={42} /></div>
			</Row>
			<Row label="Zum Ausprobieren">
				<div class="frame">
					<ProgressBar label="Firmware wird übertragen" value={flashing} />
				</div>
				<Button variant="secondary" size="s" onclick={flash}>Übertragen</Button>
			</Row>
			<Row label="Eigenes Format">
				<div class="frame">
					<ProgressBar label="Hochladen" value={3} max={12} formatValue={files} />
				</div>
			</Row>
			<Row label="Mit Hinweis">
				<div class="frame">
					<ProgressBar
						label="Firmware wird übertragen"
						value={68}
						hint="Calliope mini nicht trennen, bis die Übertragung fertig ist."
					/>
				</div>
			</Row>
			<Row label="Unbestimmt">
				<div class="frame"><ProgressBar label="Verbindung wird hergestellt" value={null} /></div>
			</Row>
			<Row label="Fertig / leer">
				<div class="frame"><ProgressBar label="Hochladen" value={100} /></div>
				<div class="frame"><ProgressBar label="Hochladen" value={0} /></div>
			</Row>
			<Row label="Ohne Wert">
				<div class="frame"><ProgressBar label="Hochladen" value={30} showValue={false} /></div>
			</Row>
			<p class="muted note">
				Bei „Bewegung reduzieren“ steht statt des laufenden Abschnitts eine gestrichelte Füllung
				über die ganze Breite: sichtbar beschäftigt, ohne einen Anteil vorzutäuschen.
			</p>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Row label="Läuft">
				<div class="frame"><ProgressBar label="Firmware wird übertragen" value={42} /></div>
			</Row>
			<Row label="Unbestimmt">
				<div class="frame"><ProgressBar label="Verbindung wird hergestellt" value={null} /></div>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Das Label sagt, was gerade passiert: „Firmware wird übertragen“.',
					'Den Anteil zeigen, wenn er bekannt ist; sonst value={null}.',
					'Am Ende eine Bestätigung oder den nächsten Schritt zeigen, nicht nur 100 %.'
				]}
				donts={[
					'Keine Status- oder Identitätsfarbe für die Füllung, auch nicht Grün für „fertig“.',
					'Keinen Fortschritt vortäuschen, der nicht gemessen wird.',
					'Keine Fehlermeldung in der Leiste: ein Fehler gehört in einen Banner oder FieldHint.'
				]}
				notFor={[
					'Kurz warten ohne Umfang, z. B. in einem Button: Spinner.',
					'Einen Wert einstellen: Slider.'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.frame {
		width: min(22rem, 100%);
	}

	.note {
		max-width: 46rem;
		margin: var(--cui-space-3) 0 0;
		font-size: var(--cui-font-size-sm);
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
