<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import FoundationPage from './FoundationPage.svelte';
	import { entries } from './token-values.js';

	const durationUse: Record<string, string> = {
		instant: 'Sofort, ohne Übergang',
		fast: 'Hover, Menüs öffnen',
		base: 'Zustandswechsel, z. B. Switch',
		slow: 'Dialoge und Panels',
		spin: 'Eine Umdrehung des Spinners'
	};

	const easingUse: Record<string, string> = {
		standard: 'Standard (CSS ease)',
		enter: 'Etwas erscheint',
		exit: 'Etwas verschwindet',
		linear: 'Gleichmäßig, z. B. Spinner'
	};

	const durations = entries('duration-').filter((d) => d.key !== 'spin');
	const easings = entries('easing-');

	let moved = $state(false);
</script>

<FoundationPage title="Bewegung">
	{#snippet lead()}
		Bewegung ist kurz und erklärt, was passiert: etwas öffnet sich, etwas wechselt den Zustand. Wer
		im Betriebssystem „Bewegung reduzieren“ eingestellt hat, sieht alle Übergänge sofort. Nur der
		Spinner dreht sich weiter, langsamer.
	{/snippet}

	<section aria-labelledby="durations">
		<h2 id="durations">Dauer</h2>
		<p class="section-intro">
			Der Knopf startet alle Punkte gleichzeitig. Jeder läuft mit seiner Dauer und der
			Standard-Kurve.
			{#if prefersReducedMotion.current}
				<strong>„Bewegung reduzieren“ ist gerade eingeschaltet: Alle Punkte springen sofort.</strong
				>
			{/if}
		</p>
		<button type="button" class="play" onclick={() => (moved = !moved)}>
			{moved ? 'Zurück' : 'Abspielen'}
		</button>
		<ul class="tracks">
			{#each durations as duration (duration.key)}
				<li>
					<div class="spec">
						<p class="label">{duration.key} <span class="numbers muted">{duration.value}</span></p>
						<code>--cui-{duration.name}</code>
						<p class="muted">{durationUse[duration.key] ?? ''}</p>
					</div>
					<div class="track">
						<span
							class="dot"
							class:moved
							style:transition-duration="var(--cui-{duration.name})"
							style:transition-timing-function="var(--cui-easing-standard)"
						></span>
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="easings">
		<h2 id="easings">Kurven</h2>
		<p class="section-intro">Alle Punkte laufen hier 300 ms lang, jeder mit seiner Kurve.</p>
		<ul class="tracks">
			{#each easings as easing (easing.key)}
				<li>
					<div class="spec">
						<p class="label">{easing.key}</p>
						<code>--cui-{easing.name}</code>
						<p class="muted">{easingUse[easing.key] ?? ''}</p>
					</div>
					<div class="track">
						<span
							class="dot"
							class:moved
							style:transition-duration="var(--cui-duration-slow)"
							style:transition-timing-function="var(--cui-{easing.name})"
						></span>
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="spinner">
		<h2 id="spinner">Spinner</h2>
		<p class="section-intro">
			Eine Umdrehung dauert <code>--cui-duration-spin</code>. Bei reduzierter Bewegung verdoppelt
			sich die Dauer, der Spinner bleibt aber in Bewegung, damit man sieht, dass noch etwas lädt.
		</p>
		<span class="spin" role="img" aria-label="Lädt"></span>
	</section>
</FoundationPage>

<style>
	.play {
		height: var(--cui-size-control-m);
		margin-bottom: var(--cui-space-4);
		padding: 0 var(--cui-space-5);
		border: 0;
		border-radius: var(--cui-radius-full);
		background: var(--cui-action-primary-bg);
		color: var(--cui-action-primary-fg);
		font: inherit;
		font-size: var(--cui-typography-action-font-size);
		font-weight: var(--cui-typography-action-font-weight);
		letter-spacing: var(--cui-typography-action-letter-spacing);
		text-transform: uppercase;
		cursor: pointer;
		transition: background-color var(--cui-duration-fast) var(--cui-easing-standard);
	}

	.play:hover {
		background: var(--cui-action-primary-bg-hover);
	}

	.tracks {
		display: grid;
		gap: var(--cui-space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: grid;
		grid-template-columns: 16rem 1fr;
		align-items: center;
		gap: var(--cui-space-6);
	}

	.spec {
		display: grid;
		gap: var(--cui-space-1);
		font-size: var(--cui-font-size-sm);
	}

	.spec p {
		margin: 0;
	}

	.label {
		font-weight: var(--cui-font-weight-semibold);
	}

	.track {
		position: relative;
		height: var(--cui-space-6);
		border-radius: var(--cui-radius-full);
		background: var(--cui-surface-subtle);
	}

	.dot {
		position: absolute;
		top: 0;
		left: 0;
		width: var(--cui-space-6);
		height: var(--cui-space-6);
		border-radius: var(--cui-radius-full);
		background: var(--cui-brand-strong);
		transition-property: left;
	}

	.dot.moved {
		left: calc(100% - var(--cui-space-6));
	}

	.spin {
		display: inline-block;
		width: var(--cui-size-icon-l);
		height: var(--cui-size-icon-l);
		border: 3px solid var(--cui-surface-subtle);
		border-top-color: var(--cui-text-default);
		border-radius: var(--cui-radius-full);
		animation: spin var(--cui-duration-spin) var(--cui-easing-linear) infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(1turn);
		}
	}
</style>
