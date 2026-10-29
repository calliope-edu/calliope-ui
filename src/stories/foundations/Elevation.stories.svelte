<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Elevation from './Elevation.svelte';

	const { Story } = defineMeta({
		title: 'Foundations/Schatten und Ebenen'
	});
</script>

<Story name="Schatten und Ebenen" asChild>
	<Elevation />
</Story>
