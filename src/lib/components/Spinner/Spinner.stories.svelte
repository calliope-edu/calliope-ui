<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import Button from '../Button/Button.svelte';
	import Spinner from './Spinner.svelte';

	const { Story } = defineMeta({
		title: 'Primitives/Spinner',
		component: Spinner,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'Wird geladen', size: 'l', delay: 0 },
		argTypes: { size: { control: 'inline-radio', options: ['s', 'm', 'l'] } }
	});
</script>

<script lang="ts">
	let run = $state(0);
</script>

<Story name="Spielwiese" />

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="Spinner">
		{#snippet lead()}
			Zeigt, dass etwas läuft. Mit <code>label</code> ist er eine Statusmeldung (<code
				>role="status"</code
			>), ohne ist er Dekoration, etwa im ladenden Button.
		{/snippet}

		<section>
			<h2>Größen</h2>
			<Row label="s / m / l">
				<Spinner size="s" label="Wird geladen" />
				<Spinner size="m" label="Wird geladen" />
				<Spinner size="l" label="Wird geladen" />
			</Row>
			<Row label="Mit Text">
				<span class="inline"><Spinner size="s" /> Programm wird übertragen …</span>
			</Row>
		</section>

		<section>
			<h2>Verzögerung</h2>
			<p class="section-intro">
				Mit <code>delay</code> erscheint er erst nach der Wartezeit. Kurze Vorgänge blitzen dann nicht
				auf.
			</p>
			<Row label="delay=300">
				{#key run}<Spinner label="Wird geladen" delay={300} size="l" />{/key}
				<Button variant="secondary" size="s" onclick={() => run++}>Neu starten</Button>
			</Row>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={['Ein label, das sagt, worauf gewartet wird.', 'Bei längeren Vorgängen Text daneben.']}
				donts={['Nicht mehrere Spinner gleichzeitig auf einer Seite.']}
				notFor={['Bekannter Fortschritt (z. B. Übertragung in Prozent): ProgressBar (Welle 2).']}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.inline {
		display: inline-flex;
		align-items: center;
		gap: var(--cui-space-2);
	}
</style>
