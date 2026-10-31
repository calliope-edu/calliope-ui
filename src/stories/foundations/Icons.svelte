<script lang="ts">
	import Icon from '../../lib/components/Icon/Icon.svelte';
	import { icons, iconSet, type IconName } from '../../lib/icons/icons.js';
	import FoundationPage from './FoundationPage.svelte';
	import { compareIcons, compareSet, sourceNames } from './icons.compare.js';

	const names = Object.keys(icons) as IconName[];
</script>

<FoundationPage title="Icons">
	{#snippet lead()}
		Komponenten nutzen Icons über semantische Namen: <code>&lt;Icon name="download" /&gt;</code>.
		Welches Set dahinter steht, ist noch offen. Diese Seite vergleicht beide Kandidaten mit den 28
		Icons aus dem Entwurf und denen, die Welle 1 braucht.
	{/snippet}

	<section aria-labelledby="compare">
		<h2 id="compare">Vergleich</h2>
		<p class="section-intro">
			Ausgeliefert wird vorerst <strong>{iconSet}</strong> (wie Campus heute). Der Wechsel auf
			{compareSet} ist eine Zeile in <code>scripts/build-icons.js</code>; die Namen bleiben gleich.
		</p>
		<table>
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">{iconSet}</th>
					<th scope="col">{compareSet}</th>
				</tr>
			</thead>
			<tbody>
				{#each names as name (name)}
					<tr>
						<th scope="row"><code>{name}</code></th>
						<td>
							<Icon {name} size="l" />
							<span class="muted source">{sourceNames[name].active}</span>
						</td>
						<td>
							<svg class="compare" viewBox="0 0 24 24" aria-hidden="true">
								{@html compareIcons[name]}
							</svg>
							<span class="muted source">{sourceNames[name].compare}</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<section aria-labelledby="sizes">
		<h2 id="sizes">Größen</h2>
		<p class="section-intro">16 / 20 / 24 px. Icons übernehmen die Textfarbe.</p>
		<div class="sizes">
			{#each ['s', 'm', 'l'] as const as size (size)}
				<span><Icon name="settings" {size} /> <code>{size}</code></span>
			{/each}
		</div>
	</section>
</FoundationPage>

<style>
	table {
		width: 100%;
		max-width: 46rem;
		border-collapse: collapse;
	}

	th,
	td {
		padding: var(--cui-space-2) var(--cui-space-3);
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		text-align: left;
		vertical-align: middle;
	}

	thead th {
		font-size: var(--cui-font-size-sm);
		font-weight: var(--cui-font-weight-semibold);
	}

	tbody th {
		font-weight: var(--cui-font-weight-regular);
	}

	.compare {
		width: var(--cui-size-icon-l);
		height: var(--cui-size-icon-l);
		vertical-align: middle;
	}

	.source {
		margin-left: var(--cui-space-2);
		font-size: var(--cui-font-size-xs);
	}

	.sizes {
		display: flex;
		gap: var(--cui-space-6);
		align-items: center;
	}

	.sizes span {
		display: inline-flex;
		align-items: center;
		gap: var(--cui-space-2);
	}
</style>
