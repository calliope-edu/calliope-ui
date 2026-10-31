<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Button from '../Button/Button.svelte';
	import StatusDot from '../StatusDot/StatusDot.svelte';
	import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.svelte';
	import LiveRegion from './LiveRegion.svelte';

	const { Story } = defineMeta({
		title: 'Hilfsmittel/LiveRegion und VisuallyHidden',
		component: LiveRegion,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { message: '3 Geräte verbunden', politeness: 'polite', visible: true },
		argTypes: { politeness: { control: 'inline-radio', options: ['polite', 'assertive'] } }
	});
</script>

<script lang="ts">
	let devices = $state(2);
	const message = $derived(`${devices} ${devices === 1 ? 'Gerät' : 'Geräte'} verbunden`);
</script>

<Story name="Spielwiese" />

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Hilfsmittel" title="LiveRegion und VisuallyHidden">
		{#snippet lead()}
			Zwei Bausteine ohne eigenes Aussehen. <code>LiveRegion</code> sagt Änderungen an, die man
			nicht sieht oder leicht übersieht. <code>VisuallyHidden</code> gibt Screenreadern Text, der auf
			dem Bildschirm schon anders gezeigt wird.
		{/snippet}

		<section>
			<h2>LiveRegion</h2>
			<p class="section-intro">
				Die Region steht von Anfang an im DOM; neue Nachrichten werden höflich (<code>polite</code>)
				angesagt. Hier ist sie sichtbar (<code>visible</code>), damit man sieht, was ein
				Screenreader hört.
			</p>
			<Row label="Geräte im Raum">
				<Button variant="secondary" size="s" onclick={() => devices++}>Gerät verbinden</Button>
				<Button
					variant="secondary"
					size="s"
					disabled={devices === 0}
					onclick={() => (devices = Math.max(0, devices - 1))}>Gerät trennen</Button
				>
			</Row>
			<Row label="Angesagt">
				<LiveRegion {message} visible />
			</Row>
		</section>

		<section>
			<h2>VisuallyHidden</h2>
			<Row label="Zusatz zum Icon">
				<span class="count">
					12 <VisuallyHidden>neue Werte</VisuallyHidden>
				</span>
				<span class="muted">Vorgelesen: „12 neue Werte“</span>
			</Row>
			<Row label="In StatusDot">
				<StatusDot status="success" label="Online" hideLabel />
				<span class="muted">Vorgelesen: „Online“</span>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Kurze, vollständige Sätze ansagen: „3 Geräte verbunden“.',
					'assertive nur für Fehler, die die Arbeit unterbrechen.',
					'Eine Region pro Zweck, nicht pro Wert.'
				]}
				donts={[
					'Keine Live-Messwerte im Sekundentakt ansagen.',
					'VisuallyHidden nicht nutzen, um sichtbare Beschriftungen zu ersetzen.'
				]}
				notFor={[
					'Feldfehler: TextField und Checkbox haben ihre eigene Region.',
					'Sichtbare Rückmeldung: Toast oder Banner (sie sind schon Live-Regionen).'
				]}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.count {
		display: inline-grid;
		place-items: center;
		min-width: var(--cui-size-control-s);
		height: var(--cui-size-control-s);
		border-radius: var(--cui-radius-md);
		background-color: var(--cui-surface-subtle);
		font-weight: var(--cui-font-weight-semibold);
	}
</style>
