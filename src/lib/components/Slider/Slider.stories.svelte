<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Slider from './Slider.svelte';

	const seconds = (v: number) => `${v} s`;

	const { Story } = defineMeta({
		title: 'Primitives/Slider',
		component: Slider,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			label: 'Helligkeit',
			min: 0,
			max: 255,
			step: 1,
			value: 128,
			showValue: true,
			disabled: false
		}
	});
</script>

<script lang="ts">
	let brightness = $state(128);
	let interval = $state(5);
	let committed = $state(5);
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<div class="frame"><Slider {...args} /></div>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="Slider">
		{#snippet lead()}
			Stellt einen Zahlenwert in einem Bereich ein (<code>role="slider"</code>), z. B. die
			Helligkeit der LEDs. Das Label benennt den Regler, der aktuelle Wert steht am Ende der
			Label-Zeile. Pfeiltasten ändern um einen Schritt, Pos1 und Ende springen an die Grenzen.
		{/snippet}

		<section>
			<h2>Zustände</h2>
			<p class="section-intro">
				Hover legt einen 4px-Hof um den Regler wie beim Switch; Tastaturfokus zeigt den Fokusring
				außerhalb des hellen Rings. Die ganze 24px hohe Zeile nimmt Klicks an.
			</p>
			<Row label="Standard">
				<div class="frame">
					<Slider label="Helligkeit" min={0} max={255} bind:value={brightness} />
				</div>
			</Row>
			<Row label="Mit Einheit und Hinweis">
				<div class="frame">
					<Slider
						label="Aktualisierung"
						min={1}
						max={60}
						bind:value={interval}
						onValueCommit={(v) => (committed = v)}
						formatValue={seconds}
						hint="Wie oft die Geräte ihre Messwerte senden."
					/>
					<p class="muted note">Übernommen (onValueCommit): {committed} s</p>
				</div>
			</Row>
			<Row label="Mit Schritten">
				<div class="frame">
					<Slider label="Lautstärke" min={0} max={100} step={10} value={30} />
				</div>
			</Row>
			<Row label="Ohne Wert">
				<div class="frame">
					<Slider label="Empfindlichkeit" value={60} showValue={false} />
				</div>
			</Row>
			<Row label="Grenzen">
				<div class="frame"><Slider label="Helligkeit" min={0} max={255} value={0} /></div>
				<div class="frame"><Slider label="Helligkeit" min={0} max={255} value={255} /></div>
			</Row>
			<Row label="Deaktiviert">
				<div class="frame">
					<Slider
						label="Helligkeit"
						min={0}
						max={255}
						value={128}
						disabled
						hint="Im Raum pausiert."
					/>
				</div>
			</Row>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<Row label="Standard">
				<div class="frame">
					<Slider label="Aktualisierung" min={1} max={60} value={15} formatValue={seconds} />
				</div>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Für Werte, bei denen die ungefähre Lage zählt und die man ausprobiert: Helligkeit, Lautstärke.',
					'Den Wert mit Einheit zeigen (formatValue); dieselbe Form wird vorgelesen.',
					'Teure Folgen (Senden an Geräte) an onValueCommit hängen, nicht an jede Bewegung.'
				]}
				donts={[
					'Kein Slider für genaue Werte, die man kennt (Raumcode, Port): Eingabefeld.',
					'Keine Farbe für den Bereich außer control.on (D2), auch nicht für „zu hoch“.',
					'Kein Slider ohne sichtbares Label.'
				]}
				notFor={[
					'Zwei bis vier feste Stufen: SegmentedControl.',
					'Fortschritt anzeigen, den man nicht einstellt: ProgressBar.'
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
		margin: var(--cui-space-2) 0 0;
		font-size: var(--cui-font-size-sm);
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
