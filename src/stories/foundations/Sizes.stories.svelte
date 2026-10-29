<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Sizes from './Sizes.svelte';

	const { Story } = defineMeta({
		title: 'Foundations/Größen'
	});
</script>

<Story name="Größen" asChild>
	<Sizes />
</Story>
