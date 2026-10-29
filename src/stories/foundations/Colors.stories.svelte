<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Colors from './Colors.svelte';

	const { Story } = defineMeta({
		title: 'Foundations/Farben'
	});
</script>

<Story name="Farben" asChild>
	<Colors />
</Story>
