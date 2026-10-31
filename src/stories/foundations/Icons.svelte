<script lang="ts">
	import icons, { type IconCandidate, type IconSvg } from 'virtual:icon-comparison';
	import FoundationPage from './FoundationPage.svelte';

	type SetId = 'prime' | 'material';
	type Theme = 'light' | 'dark';
	type Size = 's' | 'm' | 'l';

	let materialWeight = $state<'regular' | 'light'>('regular');

	const sets: { id: SetId; name: string }[] = [
		{ id: 'prime', name: 'PrimeIcons' },
		{ id: 'material', name: 'Material Symbols' }
	];
	const themes: { id: Theme; name: string }[] = [
		{ id: 'light', name: 'Hell' },
		{ id: 'dark', name: 'Dunkel' }
	];
	const sizes: Size[] = ['s', 'm', 'l'];

	function pick(candidate: IconCandidate, set: SetId): IconSvg {
		if (set === 'prime') return candidate.prime;
		return materialWeight === 'light' ? candidate.materialLight : candidate.material;
	}

	// Examples below name icons by their PrimeIcons name, the names in docs/input/icons.txt.
	const byPrimeName = new Map(icons.map((c) => [c.prime.name, c]));
	const icon = (primeName: string, set: SetId) => pick(byPrimeName.get(primeName)!, set);

	const menu = [
		{ icon: 'pencil', text: 'Umbenennen' },
		{ icon: 'clipboard', text: 'Code kopieren' },
		{ icon: 'download', text: 'Herunterladen' },
		{ icon: 'external-link', text: 'Im Editor öffnen' },
		{ icon: 'cog', text: 'Einstellungen' }
	];

	const statusLines = [
		{ icon: 'wifi', text: 'Calliope mini ist mit dem WLAN verbunden.' },
		{ icon: 'check-circle', text: 'Programm wurde übertragen.' },
		{ icon: 'exclamation-circle', text: 'Verbindung unterbrochen. Steck den USB-Stecker neu ein.' },
		{ icon: 'info-circle', text: 'Messwerte werden alle 5 Sekunden aktualisiert.' }
	];

	const buttons: { size: Size; variant: 'primary' | 'secondary'; icon: string; text: string }[] = [
		{ size: 'l', variant: 'primary', icon: 'play-circle', text: 'Starten' },
		{ size: 'm', variant: 'primary', icon: 'download', text: 'Herunterladen' },
		{ size: 'm', variant: 'secondary', icon: 'upload', text: 'Hochladen' },
		{ size: 's', variant: 'secondary', icon: 'plus', text: 'Hinzufügen' }
	];

	const iconButtons = [
		{ icon: 'times', label: 'Schließen' },
		{ icon: 'ellipsis-h', label: 'Mehr' },
		{ icon: 'eye', label: 'Anzeigen' },
		{ icon: 'expand', label: 'Vollbild' }
	];
</script>

{#snippet glyph(svg: IconSvg, size: Size)}
	<svg
		class="glyph"
		viewBox={svg.viewBox}
		style:width="var(--cui-size-icon-{size})"
		style:height="var(--cui-size-icon-{size})"
		aria-hidden="true"
	>
		{@html svg.body}
	</svg>
{/snippet}

<FoundationPage title="Icons">
	{#snippet lead()}
		Noch offen: Welches Icon-Set nutzt die Bibliothek? Hier stehen beide Kandidaten nebeneinander,
		mit den Icons aus dem Entwurf, in den drei Icon-Größen, auf Hell und Dunkel, neben Text und in
		Buttons.
	{/snippet}

	<section aria-labelledby="candidates">
		<h2 id="candidates">Die Kandidaten</h2>
		<table class="facts">
			<thead>
				<tr>
					<th scope="col"></th>
					<th scope="col">PrimeIcons</th>
					<th scope="col">Material Symbols</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">Herkunft</th>
					<td>Entwurf Calliope_UX_UI</td>
					<td>Campus heute (Variante Rounded)</td>
				</tr>
				<tr>
					<th scope="row">Umfang</th>
					<td class="numbers">313 Icons</td>
					<td class="numbers">rund 4.000 Motive, je als Outline und gefüllt</td>
				</tr>
				<tr>
					<th scope="row">Strichstärke</th>
					<td>eine</td>
					<td> 100 bis 700 als variable Schrift; als SVG gibt es 400 (Regular) und 300 (Light) </td>
				</tr>
				<tr>
					<th scope="row">Lizenz</th>
					<td>MIT</td>
					<td>Apache 2.0</td>
				</tr>
			</tbody>
		</table>
		<p class="section-intro">
			Die Komponenten bekommen später semantische Namen (<code>&lt;Icon name="download" /&gt;</code
			>). Das Set lässt sich also auch nach der Entscheidung noch tauschen.
		</p>
	</section>

	<div class="weight-bar">
		<fieldset class="weight">
			<legend>Strichstärke Material Symbols</legend>
			<label>
				<input type="radio" bind:group={materialWeight} value="regular" />
				Regular 400 <span class="muted">(Campus heute)</span>
			</label>
			<label>
				<input type="radio" bind:group={materialWeight} value="light" />
				Light 300
			</label>
		</fieldset>
	</div>

	<section aria-labelledby="all">
		<h2 id="all">Alle Icons aus dem Entwurf</h2>
		<p class="section-intro">
			Die 27 Icons aus <code>docs/input/icons.txt</code> (die Liste hat 28 Einträge, InfoCircle steht
			als PNG und als SVG darin). Jedes Feld zeigt die Größen s, m und l (16, 20 und 24 px). Für Material
			Symbols ist das passende Motiv ausgewählt, in der Outline-Variante, weil auch die PrimeIcons nicht
			gefüllt sind.
		</p>
		<div class="table-scroll">
			<table class="grid">
				<thead>
					<tr>
						<th scope="col" rowspan="2">Bedeutung</th>
						{#each themes as theme (theme.id)}
							<th scope="colgroup" colspan="2" data-theme={theme.id} class="theme-head">
								{theme.name}
							</th>
						{/each}
					</tr>
					<tr>
						{#each themes as theme (theme.id)}
							{#each sets as set (set.id)}
								<th scope="col" data-theme={theme.id} class="set-head">{set.name}</th>
							{/each}
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each icons as candidate (candidate.prime.name)}
						<tr>
							<th scope="row" class="meaning">
								{candidate.label}
								<span class="names">
									<code>{candidate.prime.name}</code>
									<code>{pick(candidate, 'material').name}</code>
								</span>
							</th>
							{#each themes as theme (theme.id)}
								{#each sets as set (set.id)}
									<td data-theme={theme.id} class="sizes" class:first={set.id === 'prime'}>
										{#each sizes as size (size)}
											{@render glyph(pick(candidate, set.id), size)}
										{/each}
									</td>
								{/each}
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section aria-labelledby="text">
		<h2 id="text">Neben Text</h2>
		<p class="section-intro">
			Menüeinträge in der Schrift Label (14 px, Medium) mit Icon s (16 px), Statusmeldungen in Body
			(16 px) mit Icon m (20 px).
		</p>
		<div class="panels">
			{#each themes as theme (theme.id)}
				{#each sets as set (set.id)}
					<div class="panel" data-theme={theme.id}>
						<p class="panel-title">{set.name} · {theme.name}</p>
						<ul class="menu">
							{#each menu as item (item.icon)}
								<li>{@render glyph(icon(item.icon, set.id), 's')}{item.text}</li>
							{/each}
						</ul>
						<ul class="status">
							{#each statusLines as line (line.icon)}
								<li>{@render glyph(icon(line.icon, set.id), 'm')}{line.text}</li>
							{/each}
						</ul>
					</div>
				{/each}
			{/each}
		</div>
	</section>

	<section aria-labelledby="buttons">
		<h2 id="buttons">In Buttons</h2>
		<p class="section-intro">
			Buttons in den Größen l, m und s (40, 36 und 32 px hoch) mit Icon l, m und s, dazu runde
			Icon-Buttons in Größe m. Die Buttons sind nur Anschauung, die Button-Komponente folgt in Welle
			1.
		</p>
		<div class="panels">
			{#each themes as theme (theme.id)}
				{#each sets as set (set.id)}
					<div class="panel" data-theme={theme.id}>
						<p class="panel-title">{set.name} · {theme.name}</p>
						<div class="buttons">
							{#each buttons as button (button.text)}
								<button
									type="button"
									class="button {button.variant} size-{button.size}"
									style:height="var(--cui-size-control-{button.size})"
								>
									{@render glyph(icon(button.icon, set.id), button.size)}
									{button.text}
								</button>
							{/each}
						</div>
						<div class="buttons">
							{#each iconButtons as button (button.icon)}
								<button type="button" class="icon-button" aria-label={button.label}>
									{@render glyph(icon(button.icon, set.id), 'm')}
								</button>
							{/each}
						</div>
					</div>
				{/each}
			{/each}
		</div>
	</section>
</FoundationPage>

<style>
	/* Keep headings clear of the sticky weight bar when jumping to a section. */
	section {
		scroll-margin-top: var(--cui-space-16);
	}

	.glyph {
		display: block;
		flex: none;
		fill: currentColor;
	}

	.facts {
		width: 100%;
		margin-bottom: var(--cui-space-4);
		border-collapse: collapse;
		font-size: var(--cui-font-size-sm);
	}

	.facts th,
	.facts td {
		padding: var(--cui-space-2) var(--cui-space-3);
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		text-align: left;
		vertical-align: top;
	}

	.facts th {
		font-weight: var(--cui-font-weight-semibold);
	}

	.facts thead th,
	.facts tbody th {
		width: 12rem;
	}

	.weight-bar {
		position: sticky;
		top: 0;
		z-index: 1;
		margin-top: var(--cui-space-10);
		padding: var(--cui-space-3) 0;
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		background: var(--cui-surface-page);
	}

	.weight {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--cui-space-2) var(--cui-space-6);
		margin: 0;
		padding: 0;
		border: 0;
		font-size: var(--cui-font-size-sm);
	}

	.weight legend {
		float: left;
		margin-right: var(--cui-space-2);
		padding: 0;
		font-weight: var(--cui-font-weight-semibold);
	}

	.weight label {
		display: inline-flex;
		align-items: center;
		gap: var(--cui-space-2);
		cursor: pointer;
	}

	.weight input {
		width: 1.125rem;
		height: 1.125rem;
		margin: 0;
		accent-color: var(--cui-surface-inverse);
	}

	.table-scroll {
		overflow-x: auto;
	}

	.grid {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--cui-font-size-sm);
	}

	.grid th {
		font-weight: var(--cui-font-weight-semibold);
		text-align: left;
	}

	.theme-head,
	.set-head {
		padding: var(--cui-space-2) var(--cui-space-4);
	}

	.theme-head {
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-size: var(--cui-font-size-xs);
	}

	.set-head {
		font-weight: var(--cui-font-weight-medium);
	}

	.meaning {
		padding: var(--cui-space-2) var(--cui-space-4) var(--cui-space-2) 0;
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		white-space: nowrap;
	}

	.names {
		display: flex;
		flex-direction: column;
		font-weight: var(--cui-font-weight-regular);
		color: var(--cui-text-muted);
	}

	.names code {
		font-size: 0.6875rem;
	}

	.sizes {
		padding: var(--cui-space-2) var(--cui-space-4);
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
	}

	.sizes.first {
		border-left: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
	}

	/* Glyphs sit on a common baseline (bottom edge) so the three sizes compare at a glance. */
	.sizes {
		white-space: nowrap;
	}

	.sizes .glyph {
		display: inline-block;
		margin-right: var(--cui-space-4);
		vertical-align: bottom;
	}

	.panels {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--cui-space-4);
	}

	.panel {
		display: grid;
		align-content: start;
		gap: var(--cui-space-4);
		padding: var(--cui-space-6);
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-lg);
	}

	.panel-title {
		margin: 0;
		font-size: var(--cui-font-size-sm);
		font-weight: var(--cui-font-weight-semibold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.menu,
	.status {
		display: grid;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.menu li,
	.status li {
		display: flex;
		align-items: center;
		gap: var(--cui-space-2);
	}

	.menu li {
		min-height: var(--cui-size-control-m);
		font-size: var(--cui-typography-label-font-size);
		font-weight: var(--cui-typography-label-font-weight);
		line-height: var(--cui-typography-label-line-height);
	}

	.status {
		gap: var(--cui-space-2);
	}

	.status li {
		align-items: flex-start;
		font-size: var(--cui-typography-body-font-size);
		line-height: var(--cui-typography-body-line-height);
	}

	/* Body line is 22.4 px, the m icon 20 px: nudge it onto the first line's centre. */
	.status .glyph {
		margin-top: 0.075rem;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--cui-space-3);
	}

	.button {
		display: inline-flex;
		align-items: center;
		gap: var(--cui-space-2);
		padding: 0 var(--cui-space-4) 0 var(--cui-space-3);
		border: var(--cui-border-width-button) solid transparent;
		border-radius: var(--cui-radius-full);
		font: inherit;
		font-family: var(--cui-typography-action-font-family);
		font-size: var(--cui-typography-action-font-size);
		font-weight: var(--cui-typography-action-font-weight);
		letter-spacing: var(--cui-typography-action-letter-spacing);
		line-height: var(--cui-typography-action-line-height);
		text-transform: uppercase;
		cursor: pointer;
	}

	/* Action text is 12 / 14 / 16 px for s / m / l (DESIGN.md, Button). */
	.button.size-s {
		font-size: var(--cui-font-size-xs);
	}

	.button.size-l {
		font-size: var(--cui-font-size-md);
	}

	.button.primary {
		background: var(--cui-action-primary-bg);
		color: var(--cui-action-primary-fg);
	}

	.button.secondary {
		border-color: var(--cui-border-strong);
		background: transparent;
		color: var(--cui-text-default);
	}

	.icon-button {
		display: grid;
		place-items: center;
		width: var(--cui-size-control-m);
		height: var(--cui-size-control-m);
		padding: 0;
		border: 0;
		border-radius: var(--cui-radius-full);
		background: transparent;
		color: var(--cui-text-default);
		cursor: pointer;
	}

	.icon-button:hover {
		background: var(--cui-action-hover);
	}
</style>
