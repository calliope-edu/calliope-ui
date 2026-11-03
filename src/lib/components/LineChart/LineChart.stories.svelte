<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Badge from '../Badge/Badge.svelte';
	import LineChart, { type LineChartSeries } from './LineChart.svelte';
	import { assignSeriesSlots, colourOf, type SeriesSlot } from './chart.js';

	const start = new Date(2026, 10, 2, 14, 0).getTime();
	const step = 5 * 60_000;

	/** A smooth, repeatable curve per device; `skip` leaves a gap. */
	function wave(seed: number, base: number, amp: number, count = 24, skip: number[] = []) {
		const points = [];
		for (let i = 0; i < count; i++) {
			if (skip.includes(i)) continue;
			const v = base + amp * Math.sin((i + seed) / 3) + ((seed * 7 + i * 13) % 5) * 0.15;
			points.push({ t: start + i * step + seed * 20_000, v: Math.round(v * 10) / 10 });
		}
		return points;
	}

	const devices = [
		{ id: 'A1', name: 'Calliope 1', points: wave(0, 21, 1.2) },
		{ id: 'B2', name: 'Calliope 2', points: wave(2, 19.5, 1.6) },
		{ id: 'C3', name: 'Wetterstation', points: wave(5, 17, 2.4, 24, [9, 10, 11]) },
		{ id: 'D4', name: 'Calliope 4', points: wave(8, 23, 0.8) },
		{ id: 'E5', name: 'Gewächshaus', points: wave(11, 26, 1.4) },
		{ id: 'F6', name: 'Klasse 7b', points: wave(14, 15, 1.1) }
	];

	// Slots by serial (D4): the app keeps this map so a device keeps its colour.
	const slots = assignSeriesSlots(devices.map((d) => d.id));
	const withSlots = (list: typeof devices): LineChartSeries[] =>
		list.map((d) => ({ ...d, slot: slots.get(d.id) }));

	const four = withSlots(devices.slice(0, 4));
	const six = withSlots(devices);
	const one = withSlots(devices.slice(2, 3));
	const longNames = withSlots([
		{ ...devices[0], name: 'Temperaturmessstation Schulhof Nord' },
		{ ...devices[1], name: 'Bodenfeuchtigkeitssensor Gewächshaus' },
		{ ...devices[3], name: 'Klassenzimmerluftqualitätsmessgerät' }
	]);

	const { Story } = defineMeta({
		title: 'Patterns/LineChart',
		component: LineChart,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			label: 'Temperatur',
			series: four,
			unit: '°C',
			height: 240,
			loading: false,
			legend: true,
			showSummary: false
		},
		argTypes: {
			series: { control: false },
			height: { control: { type: 'range', min: 120, max: 400, step: 20 } }
		}
	});
</script>

<Story name="Spielwiese">
	{#snippet template(args)}
		<div class="widget" data-theme="dark" style="max-width: 40rem">
			<LineChart {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Patterns" title="LineChart">
		{#snippet lead()}
			Verlauf eines Feeds über die Zeit, eine Linie pro Gerät. Gebaut für die dunklen Kacheln des
			IoT-Dashboards: jede Reihe hat eine der sechs Datenfarben, eine eigene Markerform und ihren
			Namen in der Legende. Wer nicht sieht, bekommt dieselben Werte als Zusammenfassung, mit dem
			Tastatur-Cursor und als Tabelle.
		{/snippet}

		<section>
			<h2>Aufbau</h2>
			<p class="section-intro">
				Legende oben, darunter die Fläche mit drei bis sechs Wertelinien und Uhrzeiten auf runden
				Schritten. Eine Lücke in den Daten (Wetterstation, 14:45 bis 14:55) bleibt eine Lücke. In
				die Fläche tabben und mit den Pfeiltasten die Werte durchgehen; die Maus zeigt den nächsten
				Punkt.
			</p>
			<article class="widget wide" data-theme="dark">
				<header>
					<h3>Temperatur</h3>
					<Badge>4 Geräte</Badge>
				</header>
				<LineChart label="Temperatur" series={four} unit="°C" />
			</article>
		</section>

		<section>
			<h2>Zustände</h2>
			<div class="grid">
				<article class="widget" data-theme="dark">
					<header><h3>Leer</h3></header>
					<LineChart label="Lautstärke" series={[]} height={160} />
				</article>
				<article class="widget" data-theme="dark">
					<header><h3>Lädt</h3></header>
					<LineChart label="Licht" loading height={160} />
				</article>
				<article class="widget" data-theme="dark">
					<header>
						<h3>Eine Reihe</h3>
						<Badge swatch={colourOf(one[0].slot as SeriesSlot)}>Wetterstation</Badge>
					</header>
					<LineChart
						label="Temperatur Wetterstation"
						series={one}
						unit="°C"
						height={160}
						legend={false}
					/>
				</article>
			</div>
		</section>

		<section>
			<h2>Sechs Reihen</h2>
			<p class="section-intro">
				Mehr als sechs Reihen zeigt ein Diagramm nicht: ab der siebten wiederholen sich Farben und
				Formen. Bei mehr Geräten filtert die App (Chips über der Kachel).
			</p>
			<article class="widget wide" data-theme="dark">
				<header><h3>Temperatur, alle Räume</h3></header>
				<LineChart label="Temperatur, alle Räume" series={six} unit="°C" height={280} />
			</article>
		</section>

		<section>
			<h2>Lange deutsche Namen</h2>
			<p class="section-intro">
				Namen in der Legende brechen um statt abgeschnitten zu werden; auch eine schmale Kachel
				zeigt jeden Namen ganz.
			</p>
			<article class="widget narrow" data-theme="dark">
				<header><h3>Messwerte</h3></header>
				<LineChart label="Messwerte" series={longNames} unit="°C" height={200} />
			</article>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklem Band</h2>
			<p class="section-intro">
				Für die Vollbildansicht oder den Beamer ohne Kachel, mit sichtbarer Zusammenfassung (<code
					>showSummary</code
				>).
			</p>
			<LineChart label="Temperatur" series={four} unit="°C" height={320} showSummary />
		</section>

		<section>
			<h2>Barrierefreiheit</h2>
			<p class="section-intro">
				Die Fläche ist ein Tab-Stopp (<code>role="application"</code>, „Diagramm“) mit dem
				<code>label</code> als Namen. Ihre Beschreibung ist eine Textzusammenfassung (Zeitraum, je
				Reihe kleinster, größter und letzter Wert) plus die Tastenhilfe; mit <code>summary</code>
				kann die App eine eigene setzen. Links/Rechts gehen die Punkte einer Reihe durch, Oben/Unten wechseln
				die Reihe zum gleichen Zeitpunkt, Pos1/Ende und Bild auf/ab springen; jeder Punkt wird über eine
				LiveRegion angesagt und oben in der Fläche gezeigt. Escape nimmt den Cursor weg. Eine versteckte
				Tabelle enthält alle Werte. Der Cursor gleitet mit
				<code>--cui-duration-fast</code>; bei reduzierter Bewegung springt er.
			</p>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'Nur auf dunklen Flächen (data-theme="dark"): dafür sind die sechs Datenfarben gemacht.',
					'Farben nach Seriennummer vergeben (assignSeriesSlots) und die Zuordnung halten, damit ein Gerät seine Farbe behält.',
					'Einheit über unit oder formatValue mitgeben; sie steht in Ansage und Tabelle.',
					'label nennt den Feed, so wie er im Kachel-Titel steht.'
				]}
				donts={[
					'Keine Status- oder Identitätsfarben für Reihen: Grün heißt „online“, nicht „Gerät 3“.',
					'Nicht mehr als sechs Reihen gleichzeitig.',
					'Keine Werte nur in der Grafik: was die App zusätzlich zeigt, gehört in summary.'
				]}
				notFor={[
					'Ein einzelner aktueller Wert: Readout-Zahl in der Kachel.',
					'Fortschritt oder Anteil: ProgressBar.'
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

	/* The IoT widget cards are dark areas inside the light theme (DESIGN.md). */
	.widget {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-3);
		padding: var(--cui-space-4);
		border-radius: var(--cui-radius-lg);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}

	.widget.wide {
		max-width: 48rem;
	}

	.widget.narrow {
		max-width: 20rem;
	}

	.widget header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--cui-space-2);
	}

	.widget h3 {
		margin: 0;
		font-family: var(--cui-typography-h3-font-family);
		font-size: var(--cui-typography-h3-font-size);
		font-weight: var(--cui-typography-h3-font-weight);
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-page);
		color: var(--cui-text-default);
	}
</style>
