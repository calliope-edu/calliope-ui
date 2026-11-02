<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../components/ComponentPage.svelte';
	import PlotPrototype from './PlotPrototype.svelte';
	import SvgPrototype from './SvgPrototype.svelte';
	import { sampleSeries } from './shared.js';

	const { Story } = defineMeta({
		title: 'Patterns/Diagramm-Vergleich',
		parameters: { layout: 'fullscreen' }
	});

	const notes = [
		{
			topic: 'Zusätzliche Größe (min + gzip, ohne Svelte)',
			plot: '+ 85 kB (88 kB mit dem gemeinsamen Muster). svelteplot zieht d3-scale, d3-shape, d3-array, d3-time und mehr mit, trotz Tree-Shaking. Campus lädt svelteplot schon für die Admin-Statistik; Widget, Docs und Teachable zahlen es neu.',
			svg: '+ 1,5 kB (4,5 kB mit dem gemeinsamen Muster, das bei beiden gleich ist: 3 kB).'
		},
		{
			topic: 'Barrierefreies Muster',
			plot: 'svelteplot rendert sein eigenes <svg> ohne Rolle, Name oder Tastatur. Tabelle, Cursor und LiveRegion liegen deshalb außen herum (wie bei SVG); der Cursor wird als zusätzliche Marks (RuleX, Dot) gezeichnet. Geht, aber svelteplot trägt nichts bei.',
			svg: 'Dasselbe Muster, aber alles in eigener Hand: SVG aria-hidden, Cursor direkt gezeichnet, Tastatur am Plot-Rahmen. Keine Fremd-Markup-Struktur, an die man sich anpassen muss.'
		},
		{
			topic: 'Farb-Tokens',
			plot: 'Konstante Farben dürfen CSS-Variablen sein (data.series-*). Achsen und Raster nur über currentColor und :global-Selektoren in svelteplots Klassen; die können sich mit Updates ändern (Version 0.14, vor 1.0).',
			svg: 'Jede Farbe ist direkt ein --cui-Token, auch Achsen, Raster und Cursor.'
		},
		{
			topic: 'Marker-Formen',
			plot: '14 eingebaute Symbole (Kreis, Quadrat, Dreieck, Raute, Plus, Stern …). Form pro Serie ist eine Konstante.',
			svg: 'Sechs eigene Formen (ca. 40 Zeilen), dieselben in Legende, Linie und Cursor.'
		},
		{
			topic: 'Reduzierte Bewegung',
			plot: 'svelteplot animiert nichts selbst. Ein eigener Übergang am Cursor geht nicht, weil die Marks neu gerendert werden; der Cursor springt immer.',
			svg: 'Cursor gleitet mit --cui-duration-fast; unter prefers-reduced-motion ist die Dauer 0 und er springt.'
		},
		{
			topic: 'Aufwand für den Rest',
			plot: 'Achsen, Zeitskala, schöne Wertebereiche und weitere Diagrammtypen (Balken, Flächen) gibt es geschenkt. Dafür CSS-Überschreibungen pflegen und API-Brüche vor 1.0 mitgehen. Etwa 2 Tage.',
			svg: 'Achsen, Zeit-Ticks, Lücken, Größenmessung selbst (ca. 300 Zeilen). Campus zeichnet sein IotChart heute schon so, die Umstellung ist nah dran. Jeder weitere Diagrammtyp ist eigene Arbeit. Etwa 2–3 Tage.'
		}
	];
</script>

<Story name="Vergleich" asChild>
	<ComponentPage eyebrow="Patterns · Entscheidung" title="Diagramm: svelteplot oder eigenes SVG">
		{#snippet lead()}
			Dasselbe Liniendiagramm zweimal: vier Geräte, Temperatur alle fünf Minuten, ein Gerät mit
			Lücke. Beide mit demselben barrierefreien Muster (Zusammenfassung, Tastatur-Cursor mit
			LiveRegion, versteckte Tabelle). Zum Ausprobieren in ein Diagramm tabben und die Pfeiltasten
			benutzen.
		{/snippet}

		<section data-theme="dark" class="band">
			<div class="pair">
				<article class="widget">
					<p class="which">A · svelteplot</p>
					<PlotPrototype title="Temperatur (svelteplot)" series={sampleSeries} />
				</article>
				<article class="widget">
					<p class="which">B · eigenes SVG</p>
					<SvgPrototype title="Temperatur (eigenes SVG)" series={sampleSeries} />
				</article>
			</div>
		</section>

		<section>
			<h2>Notizen</h2>
			<table class="notes">
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col">A · svelteplot</th>
						<th scope="col">B · eigenes SVG</th>
					</tr>
				</thead>
				<tbody>
					{#each notes as n (n.topic)}
						<tr>
							<th scope="row">{n.topic}</th>
							<td>{n.plot}</td>
							<td>{n.svg}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>

		<section>
			<h2>Empfehlung</h2>
			<p class="section-intro">
				<strong>B, eigenes SVG.</strong> Das IoT-Dashboard braucht heute genau einen Diagrammtyp, die
				Linie über die Zeit. Dafür kostet svelteplot rund 85 kB und bringt für das barrierefreie Muster
				nichts mit; Farben, Achsen und Cursor müssten wir in seine Klassen hineinüberschreiben. Eigenes
				SVG ist 1,5 kB groß, jedes Detail ist ein Token, der Cursor folgt den Motion-Tokens, und Campus'
				heutiges IotChart ist schon so gebaut. Kommen später viele Diagrammtypen dazu (Balken, Histogramme
				in ML/Teachable), lohnt sich ein neuer Blick auf svelteplot; das Muster außen herum bliebe dasselbe.
			</p>
		</section>
	</ComponentPage>
</Story>

<style>
	.band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-page);
		color: var(--cui-text-default);
	}

	.pair {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
		gap: var(--cui-space-4);
	}

	.widget {
		padding: var(--cui-space-4);
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-lg);
		background-color: var(--cui-surface-default);
	}

	.which {
		margin: 0 0 var(--cui-space-2);
		color: var(--cui-text-muted);
		font-size: var(--cui-typography-caption-font-size);
		font-weight: var(--cui-font-weight-semibold);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.notes {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--cui-font-size-sm);
		line-height: var(--cui-font-line-height-relaxed);
	}

	.notes th,
	.notes td {
		padding: var(--cui-space-3);
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		text-align: left;
		vertical-align: top;
	}

	.notes tbody th {
		width: 12rem;
		font-weight: var(--cui-font-weight-semibold);
	}
</style>
