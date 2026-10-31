<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Banner from '../../lib/components/Banner/Banner.svelte';
	import Button from '../../lib/components/Button/Button.svelte';
	import ChoiceItem from '../../lib/components/ChoiceList/ChoiceItem.svelte';
	import ChoiceList from '../../lib/components/ChoiceList/ChoiceList.svelte';
	import Dialog from '../../lib/components/Dialog/Dialog.svelte';
	import IconButton from '../../lib/components/IconButton/IconButton.svelte';
	import Spinner from '../../lib/components/Spinner/Spinner.svelte';
	import TextField from '../../lib/components/TextField/TextField.svelte';

	/*
	 * The dialogs of mini-connection-widget (src/ui/*Modal.svelte, src/makecode/ui/) rebuilt from
	 * library parts, as the template for W4 (docs/plan/02-plan.md). Each one replaces a hand-made
	 * backdrop, card and button set; the widget keeps its stores and only swaps the markup.
	 */
	const { Story } = defineMeta({
		title: 'Rezepte/Verbindungs-Widget',
		parameters: { layout: 'fullscreen' }
	});

	const fileName = 'blinken.hex';
	const shareUrl = 'https://makecode.calliope.cc/_hK7c3PxR0aWv';
</script>

<script lang="ts">
	let choiceOpen = $state(false);
	let fallbackOpen = $state(false);
	let versionOpen = $state(false);
	let plugOpen = $state(false);
	let shareOpen = $state(false);
	let shareLoading = $state(true);
	let last = $state('');

	function choose(dialog: string, way: string) {
		last = `${dialog}: ${way}`;
		choiceOpen = fallbackOpen = versionOpen = plugOpen = false;
	}

	function openShare() {
		shareLoading = true;
		shareOpen = true;
		setTimeout(() => (shareLoading = false), 1200);
	}
</script>

<Story name="Dialoge" asChild>
	<div class="page">
		<header>
			<p class="eyebrow">Rezept</p>
			<h1>Verbindungs-Widget</h1>
			<p class="lead">
				Die Dialoge aus mini-connection-widget, gebaut aus Dialog, ChoiceList und Button. Jeder
				ersetzt einen selbstgebauten Hintergrund, eine eigene Karte und eigene Buttons; die Abläufe
				im Widget bleiben, wie sie sind.
			</p>
		</header>

		<div class="triggers">
			<Button variant="secondary" onclick={() => (choiceOpen = true)}>Programm übertragen</Button>
			<Button variant="secondary" onclick={() => (fallbackOpen = true)}>
				USB-Übertragung fehlgeschlagen
			</Button>
			<Button variant="secondary" onclick={() => (versionOpen = true)}>Welcher mini?</Button>
			<Button variant="secondary" onclick={() => (plugOpen = true)}>Kabel anschließen</Button>
			<Button variant="secondary" icon="share" onclick={openShare}>Programm teilen</Button>
		</div>
		<p class="last" aria-live="polite">{last ? `Gewählt: ${last}` : ''}</p>
	</div>

	<!-- ConnectionChoiceModal: also the copy Campus keeps for its own look and i18n. -->
	<Dialog
		bind:open={choiceOpen}
		size="s"
		title="Programm übertragen"
		description={`Der Calliope ist gerade nicht verbunden. Wähle, wie „${fileName}“ aufs Gerät kommen soll.`}
	>
		<ChoiceList>
			<ChoiceItem
				icon="bluetooth"
				title="Per Bluetooth"
				detail="Drahtlos. Der Calliope muss eingeschaltet und in Reichweite sein."
				onclick={() => choose('Übertragen', 'Bluetooth')}
			/>
			<ChoiceItem
				icon="usb"
				title="Per USB-Kabel"
				detail="Zuverlässig, funktioniert immer. Kabel an Calliope und Rechner anschließen."
				onclick={() => choose('Übertragen', 'USB')}
			/>
			<ChoiceItem
				icon="download"
				title="Als Datei herunterladen"
				detail=".hex-Datei speichern und selbst auf den Calliope kopieren."
				onclick={() => choose('Übertragen', 'Datei')}
			/>
		</ChoiceList>
		{#snippet actions()}
			<Button variant="secondary" onclick={() => (choiceOpen = false)}>Abbrechen</Button>
		{/snippet}
	</Dialog>

	<!-- Mini2FlashFallbackModal -->
	<Dialog
		bind:open={fallbackOpen}
		size="s"
		title="USB-Übertragung fehlgeschlagen"
		description={`„${fileName}“ kam nach 2 Versuchen nicht auf den Calliope mini 2. Versuche es noch einmal oder lade die Datei herunter und ziehe sie selbst auf das Laufwerk „MINI“, das klappt immer.`}
	>
		<ChoiceList>
			<ChoiceItem
				icon="retry"
				title="Nochmal versuchen"
				detail="Übertragung über USB erneut starten."
				onclick={() => choose('Fehlgeschlagen', 'Nochmal')}
			/>
			<ChoiceItem
				icon="download"
				title="Als Datei herunterladen"
				detail="Im Datei-Explorer auf das Laufwerk „MINI“ ziehen."
				onclick={() => choose('Fehlgeschlagen', 'Datei')}
			/>
		</ChoiceList>
		<p class="detail">Details: SEGGER MSD: write timed out</p>
		{#snippet actions()}
			<Button variant="secondary" onclick={() => (fallbackOpen = false)}>Abbrechen</Button>
		{/snippet}
	</Dialog>

	<!-- Mini12VersionModal -->
	<Dialog
		bind:open={versionOpen}
		size="s"
		title="Welcher Calliope mini ist das?"
		description={`„${fileName}“ braucht 32 KB RAM und läuft nur auf dem Calliope mini 2. Über Bluetooth lässt sich das nicht erkennen: Die Version steht auf der Rückseite des Boards.`}
	>
		<ChoiceList>
			<ChoiceItem
				icon="device"
				title="Calliope mini 2"
				detail="32 KB RAM. Die Übertragung startet."
				onclick={() => choose('Version', 'mini 2')}
			/>
			<ChoiceItem
				icon="device"
				title="Calliope mini 1"
				detail="16 KB RAM. Dieses Programm läuft darauf nicht."
				onclick={() => choose('Version', 'mini 1')}
			/>
		</ChoiceList>
		{#snippet actions()}
			<Button variant="secondary" onclick={() => (versionOpen = false)}>Abbrechen</Button>
		{/snippet}
	</Dialog>

	<!-- UsbPlugRequestModal: a confirm step, so plain buttons, primary last. -->
	<Dialog bind:open={plugOpen} size="s" title="Calliope per USB anschließen">
		<ol class="steps">
			<li>USB-Kabel mit dem Calliope verbinden.</li>
			<li>Auf „Übertragen“ klicken. Beim ersten Mal den Calliope im Browser-Dialog auswählen.</li>
		</ol>
		{#snippet actions()}
			<Button variant="secondary" onclick={() => (plugOpen = false)}>Abbrechen</Button>
			<Button icon="usb" onclick={() => choose('Kabel', 'Übertragen')}>Übertragen</Button>
		{/snippet}
	</Dialog>

	<!-- MakeCodeShareModal: loading, then the link to copy. -->
	<Dialog bind:open={shareOpen} size="s" title="Programm teilen">
		{#if shareLoading}
			<Spinner label="Link wird erstellt…" />
		{:else}
			<p class="intro">Jeder mit diesem Link kann dieses Programm öffnen und kopieren.</p>
			<TextField label="Link zum Programm" value={shareUrl} readonly>
				{#snippet end()}
					<IconButton icon="copy" label="Link kopieren" size="s" />
				{/snippet}
			</TextField>
		{/if}
		{#snippet actions()}
			<Button variant="secondary" onclick={() => (shareOpen = false)}>Schließen</Button>
			<Button icon="external-link" disabled={shareLoading} href={shareUrl} target="_blank">
				Öffnen
			</Button>
		{/snippet}
	</Dialog>
</Story>

<Story name="Verbindungshinweis" asChild>
	<div class="page">
		<header>
			<p class="eyebrow">Rezept</p>
			<h1>Hinweis im Kopf der Seite</h1>
			<p class="lead">
				ConnectionBanner zeigt, was mit der Verbindung los ist. Die Statusfarbe steht als Streifen
				und Icon, die Aktion als kleiner Button daneben.
			</p>
		</header>
		<div class="banners">
			<Banner tone="warning" title="USB-Verbindung unterbrochen." live="none">
				Steck den Calliope wieder ein, dann geht es weiter.
				{#snippet actions()}
					<Button size="s" variant="secondary">Neu verbinden</Button>
				{/snippet}
			</Banner>
			<Banner tone="error" title="Bluetooth nicht erreichbar." live="none">
				Drücke A + B, halte sie gedrückt und tippe kurz auf Reset.
				{#snippet actions()}
					<Button size="s" variant="secondary" icon="usb">USB verwenden</Button>
				{/snippet}
			</Banner>
			<Banner tone="success" title="Übertragen." live="none">„blinken.hex“ läuft jetzt.</Banner>
		</div>
	</div>
</Story>

<style>
	.page {
		max-width: 48rem;
		padding: var(--cui-space-8) var(--cui-space-6);
		color: var(--cui-text-default);
		font-family: var(--cui-typography-body-font-family);
	}

	.eyebrow {
		margin: 0;
		color: var(--cui-text-muted);
		font-size: var(--cui-typography-caption-font-size);
		font-weight: var(--cui-font-weight-bold);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	h1 {
		margin: var(--cui-space-1) 0 var(--cui-space-3);
		font-family: var(--cui-typography-h1-font-family);
		font-size: var(--cui-typography-h1-font-size);
		font-weight: var(--cui-typography-h1-font-weight);
	}

	.lead {
		max-width: 40rem;
		margin: 0 0 var(--cui-space-6);
		color: var(--cui-text-muted);
		line-height: 1.5;
	}

	.triggers {
		display: flex;
		flex-wrap: wrap;
		gap: var(--cui-space-3);
	}

	.last {
		min-height: 1.4em;
		margin-top: var(--cui-space-4);
		color: var(--cui-text-muted);
	}

	.banners {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-3);
	}

	.detail {
		margin: var(--cui-space-3) 0 0;
		color: var(--cui-text-muted);
		font-size: var(--cui-typography-caption-font-size);
		overflow-wrap: anywhere;
	}

	.steps,
	.intro {
		margin: 0;
		line-height: 1.5;
	}

	.intro {
		margin-bottom: var(--cui-space-3);
	}

	.steps {
		padding-left: var(--cui-space-5);
	}

	.steps li + li {
		margin-top: var(--cui-space-2);
	}
</style>
