<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../../lib/components/Button/Button.svelte';
	import IconButton from '../../lib/components/IconButton/IconButton.svelte';
	import Menu from '../../lib/components/Menu/Menu.svelte';
	import MenuRadioGroup from '../../lib/components/Menu/MenuRadioGroup.svelte';
	import MenuRadioItem from '../../lib/components/Menu/MenuRadioItem.svelte';
	import Popover from '../../lib/components/Popover/Popover.svelte';
	import SegmentedControl from '../../lib/components/SegmentedControl/SegmentedControl.svelte';

	/*
	 * The editor bar above an embedded MakeCode editor (Campus' EditorHeader, the widget's
	 * MakeCodeToolbar): the pill SegmentedControl in the middle, bar buttons on the right.
	 */
	const { Story } = defineMeta({
		title: 'Rezepte/Editor-Leiste',
		parameters: { layout: 'fullscreen' }
	});

	const languages = [
		{ value: 'blocks', label: 'Blöcke' },
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'python', label: 'Python' }
	];

	const views = [
		{ value: 'dashboard', label: 'Dashboard' },
		{ value: 'feeds', label: 'Feeds' }
	];

	const extensions = [
		{ name: 'iot', source: 'calliope-edu/pxt-iot' },
		{ name: 'neopixel', source: 'microsoft/pxt-neopixel' }
	];
</script>

<script lang="ts">
	let language = $state('blocks');
	let version = $state('3');
	let sharing = $state(false);
	let view = $state('dashboard');

	function share() {
		sharing = true;
		setTimeout(() => (sharing = false), 1500);
	}
</script>

{#snippet makecodeBar(theme?: 'light' | 'dark', live = false)}
	<div class="editor-bar" data-theme={theme}>
		<div class="bar-start"></div>
		<SegmentedControl
			label="Programmiersprache"
			variant="pill"
			size="s"
			options={languages}
			value={live ? language : 'blocks'}
			onValueChange={(v) => live && (language = v)}
		/>
		<div class="bar-end">
			<IconButton
				variant="bar"
				icon="share"
				label={live && sharing ? 'Wird geteilt…' : 'Programm teilen'}
				loading={live && sharing}
				onclick={live ? share : undefined}
			/>
			<Popover title="Erweiterungen" side="bottom" align="end" size="l">
				{#snippet trigger({ props })}
					<Button {...props} variant="bar" iconEnd="chevron-down">
						{extensions.length} Erweiterungen
					</Button>
				{/snippet}
				<ul class="extensions">
					{#each extensions as extension (extension.name)}
						<li>
							<span class="extension-name">{extension.name}</span>
							<span class="extension-source">{extension.source}</span>
						</li>
					{/each}
				</ul>
			</Popover>
			<Menu align="end">
				{#snippet trigger({ props })}
					<Button {...props} variant="bar" iconEnd="chevron-down">
						Calliope mini {live ? version : '3'}
					</Button>
				{/snippet}
				<MenuRadioGroup
					label="Calliope mini"
					value={live ? version : '3'}
					onValueChange={(v) => live && (version = v)}
				>
					{#each ['1', '2', '3'] as v (v)}
						<MenuRadioItem value={v}>Calliope mini {v}</MenuRadioItem>
					{/each}
				</MenuRadioGroup>
			</Menu>
		</div>
	</div>
{/snippet}

<Story name="MakeCode und IoT" asChild>
	<div class="page">
		<header>
			<p class="eyebrow">Rezept</p>
			<h1>Editor-Leiste</h1>
			<p class="lead">
				Die Leiste über einem eingebetteten Editor: in der Mitte der Umschalter als Pille (<code
					>SegmentedControl variant="pill"</code
				>), rechts die Leisten-Buttons (<code>Button variant="bar"</code>, Teilen als
				<code>IconButton variant="bar"</code>). Die Leiste selbst ist <code>surface.subtle</code>;
				sie folgt dem Theme der Seite. Die Leisten-Buttons bleiben in beiden Themes schwarz mit
				weißer Schrift, wie in Campus.
			</p>
		</header>

		<h2>MakeCode</h2>
		<p class="note">Folgt dem Theme der Seite (Umschalter oben in der Werkzeugleiste).</p>
		{@render makecodeBar(undefined, true)}

		<h2>Hell und dunkel</h2>
		<div class="stack">
			{@render makecodeBar('light')}
			{@render makecodeBar('dark')}
		</div>

		<h2>IoT-Dashboard</h2>
		<div class="stack">
			{#each ['light', 'dark'] as const as theme (theme)}
				<div class="editor-bar" data-theme={theme}>
					<div class="bar-start"><span class="bar-title">Klimaprojekt 7b</span></div>
					<SegmentedControl
						label="Ansicht"
						variant="pill"
						size="s"
						options={views}
						bind:value={view}
					/>
					<div class="bar-end">
						<Button variant="bar" icon="add">Neues Programm</Button>
						<Button variant="bar" iconEnd="chevron-down">Token</Button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Story>

<style>
	.page {
		max-width: 64rem;
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

	h2 {
		margin: var(--cui-space-8) 0 var(--cui-space-3);
		font-size: var(--cui-typography-h3-font-size);
	}

	.lead {
		max-width: 44rem;
		margin: 0;
		color: var(--cui-text-muted);
		line-height: 1.5;
	}

	.note {
		margin: 0 0 var(--cui-space-3);
		color: var(--cui-text-muted);
		font-size: var(--cui-font-size-sm);
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-4);
	}

	/* The bar: three columns so the switch stays centred whatever the sides hold. */
	.editor-bar {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(min-content, 1fr);
		align-items: center;
		gap: var(--cui-space-3);
		min-height: 3.5rem;
		padding: var(--cui-space-2) var(--cui-space-4);
		box-sizing: border-box;
		background-color: var(--cui-surface-subtle);
		color: var(--cui-text-default);
	}

	.bar-end {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--cui-space-2);
	}

	.bar-title {
		font-size: var(--cui-typography-h3-font-size);
		font-weight: var(--cui-font-weight-medium);
		white-space: nowrap;
	}

	.extensions {
		display: flex;
		flex-direction: column;
		gap: var(--cui-space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.extensions li {
		display: flex;
		flex-direction: column;
	}

	.extension-name {
		font-size: var(--cui-typography-label-font-size);
		font-weight: var(--cui-font-weight-medium);
	}

	.extension-source {
		color: var(--cui-text-muted);
		font-size: var(--cui-typography-caption-font-size);
	}
</style>
