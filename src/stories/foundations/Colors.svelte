<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { palette, type PaletteGroup, type PaletteName } from '#lib/tokens/index.js';
	import { contrastRatio, formatRatio, rate, type Rating } from '#lib/tokens/contrast.js';

	const INK = '#1B1C1D';
	const WHITE = '#FFFFFF';

	const groups: { id: PaletteGroup; title: string; intro: string }[] = [
		{ id: 'neutral', title: 'Neutral', intro: 'Flächen, Text und Rahmen.' },
		{
			id: 'brand',
			title: 'Marke',
			intro: 'Markenfarbe und ihre dunkle Variante für Fokus und Links.'
		},
		{
			id: 'color',
			title: 'Farben',
			intro: 'Für Status und Identität von Produkten und Editoren, nicht zur Dekoration.'
		},
		{
			id: 'error',
			title: 'Ergänzung',
			intro: 'Rot nur für Fehler.'
		}
	];

	// Usage rules per palette value (docs/plan/02-plan.md, section 2.3).
	const rules: Partial<Record<PaletteName, string>> = {
		teal: 'Nur als Fläche mit dunklem Text. Als Text und Link nur auf Dunkel.',
		'teal-dark': 'Fokusring, Links, Linien und Icons auf Hell. Links ohne Unterstreichung.',
		lime: 'Nur als Fläche mit dunklem Text.',
		cyan: 'Nur als Fläche mit dunklem Text.',
		yellow: 'Nur als Fläche mit dunklem Text.',
		amber: 'Nur als Fläche mit dunklem Text.',
		green: 'Nur als Fläche mit dunklem Text.',
		orange: 'Als Fläche mit dunklem Text.',
		blue: 'Als Fläche mit dunklem Text. Weiß nur für große Schrift.',
		indigo: 'Als Fläche mit dunklem Text. Weiß nur für große Schrift.',
		violet: 'Als Fläche mit schwarzem Text, sonst als Akzent (Rand, Icon).',
		magenta: 'Auszeichnung: Fläche mit weißem Text.',
		plum: 'Editor MakeCode: Fläche mit weißem Text.',
		red: 'Als Fläche mit schwarzem Text. Nie als Text: Fehlertext bleibt dunkel, das Rot sitzt im Icon.'
	};

	const ratingLabel: Record<Rating, string> = {
		aa: 'AA',
		'aa-large': 'nur groß',
		fail: 'nicht lesbar'
	};

	type Role = { token: string; role: string };

	const roleGroups: { title: string; roles: Role[] }[] = [
		{
			title: 'Flächen',
			roles: [
				{ token: 'surface-page', role: 'Seitenhintergrund' },
				{ token: 'surface-default', role: 'Panels, Karten, Eingabefelder' },
				{ token: 'surface-subtle', role: 'Ruhige Fläche, z. B. Leisten und Chips' },
				{ token: 'surface-raised', role: 'Menüs, Popover, Dialoge (mit Schatten)' },
				{ token: 'surface-inverse', role: 'Gegenfläche: Tooltip, Primary-Button' },
				{ token: 'surface-inverse-hover', role: 'Hover auf der Gegenfläche' },
				{ token: 'surface-scrim', role: 'Abdunklung hinter Dialogen' }
			]
		},
		{
			title: 'Text und Rahmen',
			roles: [
				{ token: 'text-default', role: 'Text und Icons' },
				{ token: 'text-muted', role: 'Sekundärtext, Platzhalter' },
				{ token: 'text-inverse', role: 'Text auf der Gegenfläche' },
				{ token: 'text-error', role: 'Fehlertext (das Rot sitzt im Icon)' },
				{ token: 'border-subtle', role: 'Trennlinien, Kartenrahmen' },
				{ token: 'border-control', role: 'Rahmen von Eingabefeldern und Checkboxen' },
				{ token: 'border-strong', role: 'Outline-Button, Auswahl' }
			]
		},
		{
			title: 'Marke, Links und Fokus',
			roles: [
				{ token: 'brand-default', role: 'Markenfarbe als Fläche' },
				{ token: 'brand-strong', role: 'Markenlinien und Icons' },
				{ token: 'text-link', role: 'Linktext, ohne Unterstreichung' },
				{ token: 'accent-line', role: 'Aktive Navigation, „gehört dir“' },
				{ token: 'accent-highlight', role: 'Auszeichnung, z. B. „Neu“' },
				{ token: 'focus-ring', role: 'Fokusring' }
			]
		},
		{
			title: 'Bedienelemente',
			roles: [
				{ token: 'control-on', role: 'Eingeschaltet, angehakt (Switch, Checkbox)' },
				{ token: 'control-on-mark', role: 'Haken und Knopf darauf' },
				{ token: 'action-primary-bg', role: 'Primary-Button' },
				{ token: 'action-primary-bg-hover', role: 'Primary-Button, Hover' },
				{ token: 'action-hover', role: 'Hover von Ghost-Buttons und Menüeinträgen' }
			]
		},
		{
			title: 'Status',
			roles: [
				{ token: 'status-success-fill', role: 'Erfolg, online' },
				{ token: 'status-warning-fill', role: 'Warnung, pausiert' },
				{ token: 'status-error-fill', role: 'Fehler, offline, Löschen' },
				{ token: 'status-info-fill', role: 'Info' }
			]
		},
		{
			title: 'Identität',
			roles: [
				{ token: 'identity-ki-training-fill', role: 'Produkt KI-Training' },
				{ token: 'identity-teachable-fill', role: 'Produkt Teachable' },
				{ token: 'identity-iot-fill', role: 'Produkt IoT-WiFi' },
				{ token: 'identity-robotik-fill', role: 'Produkt Robotik' },
				{ token: 'identity-makecode-fill', role: 'Editor MakeCode' },
				{ token: 'identity-python-fill', role: 'Editor Python' },
				{ token: 'identity-blocks-fill', role: 'Editor Blocks' },
				{ token: 'identity-markdown-fill', role: 'Editor Markdown' }
			]
		},
		{
			title: 'Datenreihen (IoT-Diagramme)',
			roles: [1, 2, 3, 4, 5, 6].map((n) => ({
				token: `data-series-${n}`,
				role: `Reihe ${n}, immer mit Name und Markerform`
			}))
		}
	];

	/** "#1b1c1db3" → "ink 70 %": the fixed alpha neutrals (D1). */
	function describe(value: string): { name?: string; hex: string; alpha?: string } {
		const base = value.slice(0, 7);
		const alpha =
			value.length === 9
				? `${Math.round((parseInt(value.slice(7), 16) / 255) * 100)} %`
				: undefined;
		return { name: paletteByHex.get(base), hex: base.toUpperCase(), alpha };
	}

	const paletteByHex = new Map(palette.map((c) => [c.hex.toLowerCase(), c.name]));

	let resolved = $state<Record<string, string>>({});

	// Semantic tokens depend on the theme, so read their values from the page and
	// read them again whenever the Storybook theme switch changes data-theme.
	const readSemanticTokens: Attachment<HTMLElement> = (el) => {
		const read = () => {
			const style = getComputedStyle(el);
			const next: Record<string, string> = {};
			for (const group of roleGroups) {
				for (const { token } of group.roles) {
					next[token] = style.getPropertyValue(`--cui-${token}`).trim().toLowerCase();
				}
			}
			resolved = next;
		};
		read();
		const observer = new MutationObserver(read);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});
		return () => observer.disconnect();
	};
</script>

<article class="page" {@attach readSemanticTokens}>
	<header class="intro">
		<p class="eyebrow">Foundations</p>
		<h1>Farben</h1>
		<p class="lead">
			Calliope nutzt eine feste Palette ohne abgeleitete Abstufungen. Komponenten verwenden nie die
			Palette direkt, sondern semantische Tokens mit genau einer Rolle. Kontrast entsteht über die
			Paarung von Fläche und Text, nicht über hellere oder dunklere Varianten.
		</p>
	</header>

	<section aria-labelledby="palette">
		<h2 id="palette">Palette</h2>
		<p class="section-intro">
			Basis-Tokens <code>--cui-palette-*</code>. Jede Karte zeigt, wie gut dunkler und weißer Text
			auf der Farbe lesbar ist (WCAG 2.1 AA: 4,5 für Text, 3 für große Schrift und Icons).
		</p>

		{#each groups as group (group.id)}
			<h3>{group.title}</h3>
			<p class="group-intro">{group.intro}</p>
			<ul class="swatches">
				{#each palette.filter((c) => c.group === group.id) as color (color.name)}
					{@const onInk = contrastRatio(color.hex, INK)}
					{@const onWhite = contrastRatio(color.hex, WHITE)}
					<li class="swatch">
						<div class="chip" style:background-color="var(--cui-palette-{color.name})">
							<span class="sample" style:color={INK}>Aa</span>
							<span class="sample" style:color={WHITE}>Aa</span>
						</div>
						<div class="meta">
							<p class="name">{color.name}</p>
							<p class="hex">{color.hex}</p>
							<code>--cui-palette-{color.name}</code>
							<dl class="ratios">
								<div>
									<dt>Dunkler Text</dt>
									<dd class="ratio">{formatRatio(onInk)}</dd>
									<dd class="rating rating-{rate(onInk)}">{ratingLabel[rate(onInk)]}</dd>
								</div>
								<div>
									<dt>Weißer Text</dt>
									<dd class="ratio">{formatRatio(onWhite)}</dd>
									<dd class="rating rating-{rate(onWhite)}">{ratingLabel[rate(onWhite)]}</dd>
								</div>
							</dl>
							{#if rules[color.name]}
								<p class="rule">{rules[color.name]}</p>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		{/each}
	</section>

	<section aria-labelledby="roles">
		<h2 id="roles">Rollen</h2>
		<p class="section-intro">
			Semantische Tokens <code>--cui-*</code>. Der Wert folgt dem Theme: Schalte oben in der
			Werkzeugleiste zwischen Hell und Dunkel um. Status wird nie nur über Farbe vermittelt, sondern
			immer mit Icon und Text.
		</p>

		{#each roleGroups as group (group.title)}
			<h3>{group.title}</h3>
			<table class="roles">
				<thead>
					<tr>
						<th scope="col"><span class="visually-hidden">Farbe</span></th>
						<th scope="col">Token</th>
						<th scope="col">Rolle</th>
						<th scope="col">Wert</th>
					</tr>
				</thead>
				<tbody>
					{#each group.roles as { token, role } (token)}
						{@const value = resolved[token] ?? ''}
						{@const color = describe(value)}
						<tr>
							<td><span class="dot" style:background-color="var(--cui-{token})"></span></td>
							<td><code>--cui-{token}</code></td>
							<td>{role}</td>
							<td class="value">
								{#if color.name}
									{color.name}{color.alpha ? ` ${color.alpha}` : ''}
									<span class="hex">{color.hex}</span>
								{:else}
									{value}
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/each}
	</section>

	<section aria-labelledby="pairings">
		<h2 id="pairings">Links, Fokus und dunkle Bereiche</h2>
		<p class="section-intro">
			Dunkle Bereiche im hellen Theme (Header, Panels) setzen <code>data-theme="dark"</code> auf ihren
			Teilbaum. Mit der Tabulatortaste lässt sich der Fokusring auf beiden Flächen prüfen.
		</p>
		<div class="pairings">
			<div class="pairing" data-theme="light">
				<p class="pairing-label">Hell</p>
				<p>
					Weiter zur <a href="#pairings">Projektübersicht</a>. Links sind petrol und ohne
					Unterstreichung, die erst beim Zeigen oder Fokussieren erscheint.
				</p>
				<button type="button" class="demo-button">Speichern</button>
			</div>
			<div class="pairing" data-theme="dark">
				<p class="pairing-label">Dunkel</p>
				<p>Weiter zur <a href="#pairings">Projektübersicht</a>. Auf Dunkel ist der Link türkis.</p>
				<button type="button" class="demo-button">Speichern</button>
			</div>
		</div>
	</section>
</article>

<style>
	.page {
		max-width: 72rem;
		margin: 0 auto;
		padding: 3rem 2rem 4rem;
		font-family: var(--cui-font-family-sans);
		color: var(--cui-text-default);
	}

	.eyebrow {
		margin: 0;
		font-size: var(--cui-font-size-sm);
		font-weight: var(--cui-font-weight-semibold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	h1 {
		margin: 0.25rem 0 1rem;
		font-size: var(--cui-font-size-display);
		font-weight: var(--cui-font-weight-bold);
		line-height: var(--cui-typography-display-line-height);
		letter-spacing: -0.01em;
	}

	.lead {
		max-width: 46rem;
		margin: 0;
		font-size: 1.125rem;
		line-height: 1.5;
	}

	section {
		margin-top: 4rem;
	}

	h2 {
		margin: 0 0 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--cui-brand-strong);
		font-size: var(--cui-font-size-2xl);
		font-weight: var(--cui-font-weight-semibold);
		line-height: var(--cui-font-line-height-tight);
	}

	h3 {
		margin: 2.5rem 0 0.25rem;
		font-size: var(--cui-font-size-xl);
		font-weight: var(--cui-font-weight-semibold);
		line-height: var(--cui-font-line-height-tight);
	}

	.section-intro,
	.group-intro {
		max-width: 46rem;
		margin: 0 0 1rem;
		line-height: 1.5;
	}

	code {
		font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
		font-size: 0.8125rem;
	}

	.swatches {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.swatch {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: 1px solid var(--cui-border-subtle);
		border-radius: 0.5rem;
	}

	.chip {
		display: flex;
		align-items: flex-end;
		gap: 0.75rem;
		height: 6rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--cui-border-subtle);
	}

	.sample {
		font-size: 1.5rem;
		font-weight: var(--cui-font-weight-semibold);
		line-height: 1;
	}

	.meta {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.75rem 1rem 1rem;
		font-size: var(--cui-font-size-sm);
	}

	.meta p {
		margin: 0;
	}

	.name {
		font-size: var(--cui-font-size-md);
		font-weight: var(--cui-font-weight-semibold);
	}

	.hex {
		font-variant-numeric: tabular-nums;
	}

	.ratios {
		display: grid;
		gap: 0.25rem;
		margin: 0.5rem 0 0;
		font-size: var(--cui-font-size-xs);
	}

	.ratios div {
		display: grid;
		grid-template-columns: 1fr auto 5rem;
		align-items: center;
		gap: 0.5rem;
	}

	.ratios dt,
	.ratios dd {
		margin: 0;
		white-space: nowrap;
	}

	.ratio {
		font-variant-numeric: tabular-nums;
		text-align: right;
	}

	.rating {
		padding: 0 0.375rem;
		border: 1px solid currentColor;
		border-radius: 999px;
		font-weight: var(--cui-font-weight-medium);
		text-align: center;
	}

	.rating-aa {
		border-color: transparent;
		background: var(--cui-text-default);
		color: var(--cui-surface-page);
	}

	.rating-fail {
		border-style: dashed;
	}

	.rule {
		margin-top: 0.5rem !important;
		padding-top: 0.5rem;
		border-top: 1px solid var(--cui-border-subtle);
		line-height: 1.4;
	}

	.roles {
		width: 100%;
		border-collapse: collapse;
		table-layout: fixed;
		font-size: var(--cui-font-size-sm);
	}

	.roles th {
		padding: 0.5rem 0.75rem;
		border-bottom: 2px solid var(--cui-border-subtle);
		font-weight: var(--cui-font-weight-semibold);
		text-align: left;
	}

	.roles td {
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--cui-border-subtle);
		vertical-align: middle;
	}

	.roles th:first-child {
		width: 2.5rem;
	}

	.roles th:nth-child(2) {
		width: 35%;
	}

	.roles th:nth-child(4) {
		width: 25%;
	}

	.value .hex {
		margin-left: 0.25rem;
		opacity: 0.85;
	}

	.dot {
		display: block;
		width: 1.75rem;
		height: 1.75rem;
		border: 1px solid var(--cui-border-subtle);
		border-radius: 50%;
	}

	.pairings {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1rem;
	}

	.pairing {
		padding: 1.5rem;
		border: 1px solid var(--cui-border-subtle);
		border-radius: 0.5rem;
		background: var(--cui-surface-page);
		color: var(--cui-text-default);
	}

	.pairing p {
		margin: 0 0 1rem;
		line-height: 1.5;
	}

	.pairing .pairing-label {
		margin-bottom: 0.5rem;
		font-size: var(--cui-font-size-xs);
		font-weight: var(--cui-font-weight-semibold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.pairing a {
		color: var(--cui-text-link);
		text-decoration: none;
	}

	.pairing a:hover,
	.pairing a:focus-visible {
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 0.2em;
	}

	.demo-button {
		padding: 0.5rem 1rem;
		border: 0;
		border-radius: 999px;
		background: var(--cui-surface-inverse);
		color: var(--cui-text-inverse);
		font: inherit;
		font-size: var(--cui-font-size-sm);
		font-weight: var(--cui-font-weight-semibold);
		cursor: pointer;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>
