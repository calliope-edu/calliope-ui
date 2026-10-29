<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Motion from './Motion.svelte';

	const { Story } = defineMeta({
		title: 'Foundations/Bewegung'
	});
</script>

<Story name="Bewegung" asChild>
	<Motion />
</Story>
