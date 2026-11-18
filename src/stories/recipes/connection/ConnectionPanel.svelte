<script lang="ts" module>
	export type TransportState = 'idle' | 'connecting' | 'connected' | 'error';
</script>

<script lang="ts">
	/*
	 * The dropdown of the ConnectButton in mini-connection-widget (src/ui/ConnectionPanel.svelte),
	 * without its stores: a dark panel with a filled card per transport (icon, name, StatusDot and
	 * its one action), the name pad in the Bluetooth card, and "Programm übertragen" once connected.
	 * Verbinden is the positive primary button; Trennen and Abbrechen are secondary.
	 */
	import Button from '../../../lib/components/Button/Button.svelte';
	import Icon from '../../../lib/components/Icon/Icon.svelte';
	import ProgressBar from '../../../lib/components/ProgressBar/ProgressBar.svelte';
	import StatusDot, { type Status } from '../../../lib/components/StatusDot/StatusDot.svelte';
	import PatternPad from './PatternPad.svelte';

	type Props = {
		usb?: TransportState;
		ble?: TransportState;
		/** Percent while a program is being flashed; replaces the transfer button. */
		flashing?: number;
		/** The Calliope's name pattern, drawn already (as after a USB connect). */
		pattern?: boolean[][];
		/** Covers the Popover's own padding, as the widget does inside ConnectButton. */
		embedded?: boolean;
	};

	let {
		usb = 'idle',
		ble = 'idle',
		flashing,
		pattern: initial,
		embedded = false
	}: Props = $props();

	const empty = () => Array.from({ length: 5 }, () => Array<boolean>(5).fill(false));
	// The pad is the story's own state, seeded once from the prop.
	// svelte-ignore state_referenced_locally
	let pattern = $state(initial ?? empty());
	// Every column has a bar: the name is complete and Verbinden may go.
	const complete = $derived([0, 1, 2, 3, 4].every((c) => pattern[4][c]));

	const status: Record<TransportState, Status> = {
		idle: 'neutral',
		connecting: 'info',
		connected: 'success',
		error: 'error'
	};
	const word: Record<TransportState, string> = {
		idle: 'Nicht verbunden',
		connecting: 'Verbinde…',
		connected: 'Verbunden',
		error: 'Fehler'
	};

	const anyConnected = $derived(usb === 'connected' || ble === 'connected');
</script>

<div class="panel" class:embedded data-theme="dark">
	<h2 class="title">Calliope mini Verbindung</h2>

	<div class="transports">
		<div class="card">
			<div class="head">
				<span class="name"><Icon name="usb" size="s" />USB</span>
				<StatusDot status={status[usb]} label={word[usb]} size="s" />
				<span class="action">
					{#if usb === 'connected'}
						<Button size="s" variant="secondary">Trennen</Button>
					{:else if usb === 'connecting' || usb === 'error'}
						<Button size="s" variant="secondary">Abbrechen</Button>
					{:else}
						<Button size="s" tone="positive">Verbinden</Button>
					{/if}
				</span>
			</div>
		</div>

		<div class="card">
			<div class="head">
				<span class="name"><Icon name="bluetooth" size="s" />Bluetooth</span>
				<StatusDot status={status[ble]} label={word[ble]} size="s" />
				{#if ble === 'connected'}
					<span class="action"><Button size="s" variant="secondary">Trennen</Button></span>
				{/if}
			</div>
			<div class="pad">
				<PatternPad
					value={pattern}
					onchange={(g) => (pattern = g)}
					disabled={ble === 'connected' || ble === 'connecting'}
				/>
				{#if ble !== 'connected'}
					<p class="hint">Zeichne das Muster, das dein Calliope mini anzeigt.</p>
				{/if}
			</div>
			{#if ble !== 'connected'}
				<div class="foot">
					{#if ble === 'connecting' || ble === 'error'}
						<Button size="s" variant="secondary">Abbrechen</Button>
					{:else}
						<Button size="s" tone="positive" disabled={!complete}>Verbinden</Button>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	{#if flashing !== undefined}
		<div class="flash">
			<ProgressBar
				label={`Übertragung per ${ble === 'connected' ? 'Bluetooth' : 'USB'}`}
				value={flashing}
				hint="Nur geänderte Teile"
			/>
		</div>
	{:else if anyConnected}
		<div class="wide">
			<Button fullWidth icon="upload">Programm übertragen</Button>
		</div>
	{/if}
</div>

<style>
	.panel {
		box-sizing: border-box;
		width: 20rem;
		max-width: 100%;
		padding: var(--cui-space-4);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
		font-family: var(--cui-typography-body-font-family);
		font-size: var(--cui-typography-label-font-size);
		line-height: var(--cui-typography-body-line-height);
	}

	/* Inside the Popover: cover its padding and surface, so the dark panel fills it edge to edge. */
	.panel.embedded {
		width: auto;
		max-width: none;
		margin: calc(-1 * var(--cui-space-4));
		border-radius: var(--cui-radius-lg);
	}

	.title {
		margin: 0 0 var(--cui-space-3);
		font-size: var(--cui-typography-body-font-size);
		font-weight: var(--cui-font-weight-bold);
		line-height: var(--cui-font-line-height-tight);
	}

	.transports {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-3);
	}

	/* Filled, neutral cards: the state lives in the StatusDot and the button. */
	.card {
		padding: var(--cui-space-3);
		border-radius: var(--cui-radius-lg);
		background-color: var(--cui-surface-subtle);
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--cui-space-2);
	}

	.name {
		display: inline-flex;
		align-items: center;
		gap: var(--cui-space-1);
		font-weight: var(--cui-font-weight-semibold);
	}

	.action {
		margin-left: auto;
	}

	.pad {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--cui-space-2);
		margin: var(--cui-space-3) 0 var(--cui-space-1);
	}

	.hint {
		margin: 0;
		color: var(--cui-text-muted);
		font-size: var(--cui-typography-caption-font-size);
		text-align: center;
	}

	.foot {
		display: flex;
		justify-content: flex-end;
		margin-top: var(--cui-space-3);
	}

	.wide {
		margin-top: var(--cui-space-3);
	}

	.flash {
		margin: var(--cui-space-4) 0 var(--cui-space-1);
	}
</style>
