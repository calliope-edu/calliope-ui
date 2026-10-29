<script lang="ts">
	import FoundationPage from './FoundationPage.svelte';
	import { entries, toPx } from './token-values.js';

	const controls = entries('size-control-');
	const icons = entries('size-icon-');
	const breakpoints = entries('breakpoint-');

	const controlUse: Record<string, string> = {
		s: 'Kleine Buttons, Chips',
		m: 'Buttons (Standard für Lehrkräfte)',
		l: 'Buttons auf Schüleroberflächen (Standard), Segmented Control'
	};

	const breakpointUse: Record<string, string> = {
		sm: 'Kleine Smartphones',
		md: 'Smartphones quer',
		lg: 'Tablets hochkant',
		xl: 'Tablets quer, kleine Laptops'
	};
</script>

<FoundationPage title="Größen">
	{#snippet lead()}
		Feste Höhen für Bedienelemente und Icons. Alles, was man antippen kann, ist mindestens 24 × 24
		px groß. Auf Oberflächen für Schülerinnen und Schüler ist Größe l mit 40 px der Standard.
	{/snippet}

	<section aria-labelledby="controls">
		<h2 id="controls">Bedienelemente</h2>
		<ul class="controls">
			{#each controls as control (control.key)}
				<li>
					<span class="control" style:height="var(--cui-{control.name})">Größe {control.key}</span>
					<p class="label">
						{control.key} <span class="numbers muted">{toPx(control.value)} px</span>
					</p>
					<code>--cui-{control.name}</code>
					<p class="muted">{controlUse[control.key] ?? ''}</p>
				</li>
			{/each}
			<li>
				<span class="field">Projektname</span>
				<p class="label">Eingabefeld <span class="numbers muted">40 px</span></p>
				<code>--cui-size-field</code>
				<p class="muted">Textfeld und Auswahlliste</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="touch">
		<h2 id="touch">Mindestgröße zum Antippen</h2>
		<p class="section-intro">
			Ein Icon-Button zeigt ein 20-px-Icon, seine Trefferfläche ist aber mindestens
			<code>--cui-size-touch-min</code> (24 px, WCAG 2.5.8) und wächst mit der Größe des Buttons. Die
			gestrichelte Linie zeigt die Trefferfläche.
		</p>
		<div class="touch">
			{#each ['size-touch-min', 'size-control-m', 'size-control-l'] as size (size)}
				<figure>
					<span class="hit" style:width="var(--cui-{size})" style:height="var(--cui-{size})">
						<span class="icon"></span>
					</span>
					<figcaption><code>--cui-{size}</code></figcaption>
				</figure>
			{/each}
		</div>
	</section>

	<section aria-labelledby="icons">
		<h2 id="icons">Icons</h2>
		<ul class="icons">
			{#each icons as icon (icon.key)}
				<li>
					<span
						class="icon"
						style:width="var(--cui-{icon.name})"
						style:height="var(--cui-{icon.name})"
					></span>
					<p class="label">{icon.key} <span class="numbers muted">{toPx(icon.value)} px</span></p>
					<code>--cui-{icon.name}</code>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="breakpoints">
		<h2 id="breakpoints">Breakpoints</h2>
		<p class="section-intro">
			Wie in Campus heute: Die Seite ist für den Desktop gebaut, kleinere Bildschirme werden über
			<code>max-width</code>-Abfragen angepasst. In CSS-Media-Queries funktionieren Custom
			Properties nicht, dafür gibt es die Sass-Variablen aus <code>tokens.scss</code>, z. B.
			<code>$cui-breakpoint-lg</code>.
		</p>
		<table>
			<thead>
				<tr>
					<th scope="col">Token</th>
					<th scope="col">Wert</th>
					<th scope="col">Typisch für</th>
				</tr>
			</thead>
			<tbody>
				{#each breakpoints as bp (bp.key)}
					<tr>
						<td><code>--cui-{bp.name}</code></td>
						<td class="numbers">{bp.value}</td>
						<td>{breakpointUse[bp.key] ?? ''}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</FoundationPage>

<style>
	.controls,
	.icons {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
		gap: var(--cui-space-6) var(--cui-space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: grid;
		align-content: start;
		justify-items: start;
		gap: var(--cui-space-1);
		font-size: var(--cui-font-size-sm);
	}

	li p {
		margin: 0;
	}

	.label {
		font-weight: var(--cui-font-weight-semibold);
	}

	.control {
		display: inline-flex;
		align-items: center;
		margin-bottom: var(--cui-space-2);
		padding: 0 var(--cui-space-4);
		border-radius: var(--cui-radius-full);
		background: var(--cui-action-primary-bg);
		color: var(--cui-action-primary-fg);
		font-weight: var(--cui-typography-action-font-weight);
	}

	.field {
		display: inline-flex;
		align-items: center;
		width: 12rem;
		height: var(--cui-size-field);
		margin-bottom: var(--cui-space-2);
		padding: 0 var(--cui-space-3);
		border: var(--cui-border-width-hairline) solid var(--cui-border-control);
		border-radius: var(--cui-radius-md);
		color: var(--cui-text-muted);
	}

	.touch {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		gap: var(--cui-space-10);
	}

	figure {
		display: grid;
		justify-items: center;
		gap: var(--cui-space-2);
		margin: 0;
	}

	figcaption {
		font-size: var(--cui-font-size-sm);
	}

	.hit {
		display: grid;
		place-items: center;
		border-radius: var(--cui-radius-full);
		outline: 1px dashed var(--cui-brand-strong);
	}

	.hit .icon {
		width: var(--cui-size-icon-m);
		height: var(--cui-size-icon-m);
	}

	.icon {
		display: block;
		border-radius: var(--cui-radius-sm);
		background: var(--cui-text-default);
		mask: radial-gradient(circle, #000 55%, transparent 56%);
	}

	.icons .icon {
		margin-bottom: var(--cui-space-2);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--cui-font-size-sm);
	}

	th,
	td {
		padding: var(--cui-space-2) var(--cui-space-3);
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		text-align: left;
	}

	th {
		font-weight: var(--cui-font-weight-semibold);
	}
</style>
