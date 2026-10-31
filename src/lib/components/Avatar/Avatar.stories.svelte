<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComponentPage from '../../../stories/components/ComponentPage.svelte';
	import Guidelines from '../../../stories/components/Guidelines.svelte';
	import Row from '../../../stories/components/Row.svelte';
	import StatusDot from '../StatusDot/StatusDot.svelte';
	import Avatar from './Avatar.svelte';

	// A picture as a data URL, so the story works offline.
	const picture =
		'data:image/svg+xml,' +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#42C8C8"/><circle cx="32" cy="26" r="12" fill="#1B1C1D"/><rect x="12" y="42" width="40" height="30" rx="15" fill="#1B1C1D"/></svg>'
		);

	const { Story } = defineMeta({
		title: 'Primitives/Avatar',
		component: Avatar,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { name: 'Mia Schneider', size: 'l', decorative: false },
		argTypes: {
			size: { control: 'inline-radio', options: ['s', 'm', 'l', 'xl'] },
			swatch: { control: 'color' }
		}
	});
</script>

<Story name="Spielwiese" />

<Story name="Übersicht" asChild parameters={{ layout: 'fullscreen' }}>
	<ComponentPage eyebrow="Primitives" title="Avatar">
		{#snippet lead()}
			Bild oder Initialen einer Person. Die Fläche ist für alle gleich neutral: Farbe trägt in
			Calliope Status und Identität, nicht die Unterscheidung von Personen. Ersetzt <code
				>UserAvatar</code
			> mit seinen Zufallsfarben.
		{/snippet}

		<section>
			<h2>Größen</h2>
			<Row label="s · 24px">
				<Avatar name="Mia Schneider" size="s" />
				<Avatar name="Ada" size="s" />
			</Row>
			<Row label="m · 32px">
				<Avatar name="Mia Schneider" size="m" />
				<Avatar name="Ada" size="m" />
			</Row>
			<Row label="l · 40px">
				<Avatar name="Mia Schneider" size="l" />
				<Avatar name="Ada" size="l" />
			</Row>
			<Row label="xl · 64px">
				<Avatar name="Mia Schneider" size="xl" />
				<Avatar name="Ada" size="xl" />
			</Row>
		</section>

		<section>
			<h2>Inhalt</h2>
			<Row label="Initialen">
				<Avatar name="Mia Schneider" />
				<Avatar name="Özlem Çelik" />
				<Avatar name="Lena Marie von Berg" />
			</Row>
			<Row label="Bild">
				<Avatar name="Mia Schneider" src={picture} />
				<Avatar name="Mia Schneider" src={picture} size="xl" />
			</Row>
			<Row label="Bild lädt nicht">
				<Avatar name="Mia Schneider" src="/gibt-es-nicht.png" />
			</Row>
			<Row label="Ohne Namen">
				<Avatar />
				<Avatar size="xl" />
			</Row>
		</section>

		<section>
			<h2>Eigene Farbe als Ring</h2>
			<p class="section-intro">
				Wo eine Person schon eine Farbe hat (Cursor im gemeinsamen Editor), zeigt <code>swatch</code
				> sie als 2px-Ring. Die Fläche bleibt neutral, der Name steht daneben.
			</p>
			<div class="people">
				<span class="person"
					><Avatar name="Mia Schneider" swatch="#42C8C8" decorative />Mia Schneider</span
				>
				<span class="person"
					><Avatar name="Ada Lovelace" swatch="#E4007E" decorative />Ada Lovelace</span
				>
				<span class="person"
					><Avatar name="Max Planck" swatch="#F8C526" decorative />Max Planck</span
				>
			</div>
		</section>

		<section>
			<h2>In einer Teilnehmerliste</h2>
			<p class="section-intro">
				Name steht daneben, also <code>decorative</code>. Der Status kommt als StatusDot mit Wort,
				nie als Farbe oder Transparenz des Avatars.
			</p>
			<ul class="list">
				<li>
					<Avatar name="Mia Schneider" decorative /><span class="name">Mia Schneider</span>
					<StatusDot status="success" label="Online" />
				</li>
				<li>
					<Avatar name="Ada Lovelace" decorative /><span class="name">Ada Lovelace</span>
					<StatusDot status="warning" label="Wartet" />
				</li>
				<li>
					<Avatar name="Max Planck" decorative /><span class="name">Max Planck</span>
					<StatusDot status="neutral" label="Offline" />
				</li>
			</ul>
		</section>

		<section data-theme="dark" class="dark-band">
			<h2>Auf dunklen Bereichen</h2>
			<div class="people">
				<Avatar name="Mia Schneider" />
				<Avatar name="Ada" swatch="#42C8C8" />
				<Avatar />
				<Avatar name="Mia Schneider" src={picture} />
			</div>
		</section>

		<section>
			<h2>Richtlinien</h2>
			<Guidelines
				dos={[
					'name immer setzen, wenn es eine Person gibt: daraus kommen Initialen und Name für Screenreader.',
					'decorative, wenn der Name direkt daneben steht.',
					'Status und Rolle als Wort daneben (StatusDot, Badge).'
				]}
				donts={[
					'Keine Zufallsfarben als Fläche: neue Farbtöne außerhalb der Palette.',
					'Keinen Status über Transparenz oder Graustufen des Avatars zeigen.'
				]}
				notFor={['Konto-Menü im Kopf: AccountMenu (Avatar als Auslöser).']}
			/>
		</section>
	</ComponentPage>
</Story>

<style>
	.people {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--cui-space-4);
	}

	.person {
		display: inline-flex;
		align-items: center;
		gap: var(--cui-space-2);
		font-size: var(--cui-font-size-sm);
		font-weight: var(--cui-font-weight-medium);
	}

	.list {
		display: grid;
		max-width: 28rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.list li {
		display: flex;
		align-items: center;
		gap: var(--cui-space-3);
		padding: var(--cui-space-2) 0;
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
	}

	.name {
		flex: 1;
		font-size: var(--cui-font-size-md);
	}

	.dark-band {
		padding: var(--cui-space-6);
		border-radius: var(--cui-radius-xl);
		background-color: var(--cui-surface-default);
		color: var(--cui-text-default);
	}
</style>
