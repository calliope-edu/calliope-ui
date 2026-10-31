<script lang="ts">
	import FoundationPage from './FoundationPage.svelte';
	import { entries } from './token-values.js';

	const layerUse: Record<string, string> = {
		base: 'Normaler Seiteninhalt',
		raised: 'Überlappende Teile einer Karte',
		sticky: 'Mitlaufende Leisten',
		header: 'App-Header',
		dropdown: 'Menüs und Popover',
		overlay: 'Überlagerung von Editor-Iframes, Hinweis auf mehrere Tabs',
		dialog: 'Dialoge mit Abdunklung',
		toast: 'Kurze Meldungen',
		tooltip: 'Tooltips, immer obenauf'
	};

	const layers = entries('z-index-');
</script>

<FoundationPage title="Schatten und Ebenen">
	{#snippet lead()}
		Flächen in Ruhe sind flach und haben höchstens eine feine Linie. Schatten bekommt nur, was über
		der Seite schwebt: Menüs, Popover, Toasts und Dialoge. Eine Karte hebt sich auch beim Zeigen
		nicht an.
	{/snippet}

	<section aria-labelledby="shadows">
		<h2 id="shadows">Drei Stufen</h2>
		<div class="stage">
			<figure>
				<div class="surface flat">Karte</div>
				<figcaption>
					In Ruhe: kein Schatten, Rahmen <code>--cui-border-subtle</code>
				</figcaption>
			</figure>
			<figure>
				<div class="surface menu">Menü</div>
				<figcaption><code>--cui-shadow-menu</code>: Menüs, Popover, Toasts, Tooltips</figcaption>
			</figure>
			<figure>
				<div class="surface dialog">Dialog</div>
				<figcaption><code>--cui-shadow-dialog</code>: Dialoge</figcaption>
			</figure>
		</div>
	</section>

	<section aria-labelledby="scrim">
		<h2 id="scrim">Abdunklung hinter Dialogen</h2>
		<p class="section-intro">
			Hinter einem Dialog liegt <code>--cui-surface-scrim</code>: Tinte mit 60 % Deckkraft im hellen
			Theme, Schwarz mit 70 % im dunklen.
		</p>
		<div class="scrim-demo">
			<div class="page-behind">
				<p>Meine Projekte</p>
				<p class="muted">Lauflicht · Wetterstation · Reaktionsspiel</p>
			</div>
			<div class="scrim"></div>
			<div class="surface dialog floating">
				<p class="dialog-title">Projekt löschen?</p>
				<p class="muted">„Lauflicht“ wird endgültig gelöscht.</p>
			</div>
		</div>
	</section>

	<section aria-labelledby="layers">
		<h2 id="layers">Ebenen</h2>
		<p class="section-intro">
			Die Reihenfolge übereinanderliegender Elemente ist festgelegt. Eigene z-index-Werte in Apps
			sind nicht nötig.
		</p>
		<table>
			<thead>
				<tr>
					<th scope="col">Token</th>
					<th scope="col">Wert</th>
					<th scope="col">Für</th>
				</tr>
			</thead>
			<tbody>
				{#each layers as layer (layer.key)}
					<tr>
						<td><code>--cui-{layer.name}</code></td>
						<td class="numbers">{layer.value}</td>
						<td>{layerUse[layer.key] ?? ''}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</FoundationPage>

<style>
	.stage {
		display: flex;
		flex-wrap: wrap;
		gap: var(--cui-space-10);
		padding: var(--cui-space-8);
		border-radius: var(--cui-radius-xl);
		background: var(--cui-surface-subtle);
	}

	figure {
		display: grid;
		gap: var(--cui-space-3);
		width: 14rem;
		margin: 0;
	}

	figcaption {
		font-size: var(--cui-font-size-sm);
	}

	.surface {
		display: grid;
		place-items: center;
		height: 8rem;
		background: var(--cui-surface-raised);
		font-weight: var(--cui-font-weight-semibold);
	}

	.flat {
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-lg);
		background: var(--cui-surface-default);
	}

	.menu {
		border-radius: var(--cui-radius-lg);
		box-shadow: var(--cui-shadow-menu);
	}

	.dialog {
		border-radius: var(--cui-radius-dialog);
		box-shadow: var(--cui-shadow-dialog);
	}

	.scrim-demo {
		position: relative;
		height: 16rem;
		overflow: hidden;
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-xl);
	}

	.page-behind {
		padding: var(--cui-space-6);
		background: var(--cui-surface-page);
	}

	.page-behind p,
	.floating p {
		margin: 0 0 var(--cui-space-2);
	}

	.scrim {
		position: absolute;
		inset: 0;
		background: var(--cui-surface-scrim);
	}

	.floating {
		position: absolute;
		top: 50%;
		left: 50%;
		display: block;
		width: 20rem;
		height: auto;
		padding: var(--cui-space-6);
		font-weight: var(--cui-font-weight-regular);
		transform: translate(-50%, -50%);
	}

	.dialog-title {
		font-family: var(--cui-typography-h2-font-family);
		font-size: var(--cui-typography-h2-font-size);
		font-weight: var(--cui-typography-h2-font-weight);
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
