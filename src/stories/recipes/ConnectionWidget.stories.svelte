<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../../lib/components/Button/Button.svelte';
	import ChoiceItem from '../../lib/components/ChoiceList/ChoiceItem.svelte';
	import ChoiceList from '../../lib/components/ChoiceList/ChoiceList.svelte';
	import Dialog from '../../lib/components/Dialog/Dialog.svelte';
	import IconButton from '../../lib/components/IconButton/IconButton.svelte';
	import Popover from '../../lib/components/Popover/Popover.svelte';
	import ProgressBar from '../../lib/components/ProgressBar/ProgressBar.svelte';
	import Spinner from '../../lib/components/Spinner/Spinner.svelte';
	import StatusDot from '../../lib/components/StatusDot/StatusDot.svelte';
	import TextField from '../../lib/components/TextField/TextField.svelte';
	import ConnectionPanel from './connection/ConnectionPanel.svelte';
	import ConnectionToast from './connection/ConnectionToast.svelte';

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

	// The name pattern of a Calliope "zuvig": one bar per letter, as after a USB connect.
	const heights = [2, 4, 1, 5, 3];
	const zuvig = [0, 1, 2, 3, 4].map((r) => heights.map((h) => r >= 5 - h));
</script>

<script lang="ts">
	let choiceOpen = $state(false);
	let fallbackOpen = $state(false);
	let versionOpen = $state(false);
	let plugOpen = $state(false);
	let shareOpen = $state(false);
	let shareLoading = $state(true);
	let last = $state('');
	let panelOpen = $state(false);

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

<Story name="Verbindungs-Panel" asChild>
	<div class="page wide">
		<header>
			<p class="eyebrow">Rezept</p>
			<h1>Verbindungs-Panel</h1>
			<p class="lead">
				Das Dropdown des ConnectButton: ein dunkles Panel mit einer gefüllten Karte je
				Übertragungsweg. Jede Karte trägt Icon und Namen, einen StatusDot mit Wort und genau eine
				Aktion. Verbinden ist der grüne Button (<code>tone="positive"</code>), Trennen und Abbrechen
				sind sekundär. In der Bluetooth-Karte zeichnet man das Muster des Calliope; erst dann geht
				Verbinden.
			</p>
		</header>

		<div class="bar">
			<span class="bar-name">Calliope Campus</span>
			<Popover bind:open={panelOpen} side="bottom" align="end" size="m">
				{#snippet trigger({ props })}
					<Button {...props} variant="secondary" size="s">
						<StatusDot status="neutral" label="Nicht verbunden" />
					</Button>
				{/snippet}
				<ConnectionPanel embedded />
			</Popover>
		</div>

		<h2>Zustände</h2>
		<div class="panels">
			<figure>
				<ConnectionPanel />
				<figcaption>Nichts verbunden: Verbinden wartet auf das Muster.</figcaption>
			</figure>
			<figure>
				<ConnectionPanel usb="connected" pattern={zuvig} />
				<figcaption>USB verbunden: Muster schon gezeichnet, Programm übertragen.</figcaption>
			</figure>
			<figure>
				<ConnectionPanel ble="connecting" pattern={zuvig} />
				<figcaption>Bluetooth verbindet: Abbrechen statt Verbinden.</figcaption>
			</figure>
			<figure>
				<ConnectionPanel usb="connected" ble="connected" pattern={zuvig} flashing={64} />
				<figcaption>Beide verbunden, Übertragung läuft.</figcaption>
			</figure>
		</div>
	</div>
</Story>

<Story name="Verbindungshinweis" asChild>
	<div class="page">
		<header>
			<p class="eyebrow">Rezept</p>
			<h1>Hinweis im Kopf der Seite</h1>
			<p class="lead">
				ConnectionBanner zeigt, was mit der Verbindung los ist. In der Überschriftenzeile stehen ein
				optionales Status-Icon, die Überschrift und das X; darunter der Text mit seinen Buttons,
				mittig dazu ausgerichtet. Kein Farbstreifen und kein getönter Hintergrund: Die Statusfarbe
				steckt nur im Icon. USB und Bluetooth haben keine eigene Farbe, nur ihr Icon.
			</p>
		</header>
		<div class="banners">
			<ConnectionToast title="Kein Calliope mini verbunden.">
				Verbinde deinen Calliope mini per USB-Kabel oder Bluetooth, um zu starten.
				{#snippet actions()}
					<Button size="s" variant="secondary" icon="usb">USB verbinden</Button>
					<Button size="s" variant="secondary" icon="bluetooth">Bluetooth verbinden</Button>
				{/snippet}
			</ConnectionToast>
			<ConnectionToast title="Verbinde per Bluetooth…" busy>
				Calliope mini zuvig
				{#snippet actions()}
					<Button size="s" variant="secondary">Abbrechen</Button>
				{/snippet}
			</ConnectionToast>
			<ConnectionToast title="Calliope mini neu verbinden." tone="warning">
				Zieh den Calliope mini einmal vom USB-Kabel ab und steck ihn wieder ein. Klicke dann auf
				„Erneut verbinden“.
				{#snippet actions()}
					<Button size="s" variant="secondary" icon="retry">Erneut verbinden</Button>
				{/snippet}
			</ConnectionToast>
			<ConnectionToast title="Das hat nicht geholfen." tone="error">
				Lade die Seite neu, um die USB-Verbindung zurückzusetzen.
				{#snippet actions()}
					<Button size="s" variant="secondary" icon="retry">Seite neu laden</Button>
				{/snippet}
			</ConnectionToast>
			<ConnectionToast title="Programm wird übertragen…">
				<ProgressBar label="Übertragung" value={42} />
			</ConnectionToast>
			<ConnectionToast title="USB verbunden" tone="success" />
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
		align-items: flex-start;
		gap: var(--cui-space-4);
	}

	.page.wide {
		max-width: 92rem;
	}

	h2 {
		margin: var(--cui-space-8) 0 var(--cui-space-4);
		font-size: var(--cui-typography-h3-font-size);
	}

	/* A stand-in for the host's header, where the trigger sits. */
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 40rem;
		padding: var(--cui-space-2) var(--cui-space-4);
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-lg);
		background-color: var(--cui-surface-default);
	}

	.bar-name {
		font-weight: var(--cui-font-weight-bold);
	}

	.panels {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: var(--cui-space-6);
	}

	figure {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-2);
		width: 20rem;
		margin: 0;
	}

	figcaption {
		color: var(--cui-text-muted);
		font-size: var(--cui-typography-caption-font-size);
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
