<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Shape from './Shape.svelte';

	const { Story } = defineMeta({
		title: 'Foundations/Formen und Rahmen'
	});
</script>

<Story name="Formen und Rahmen" asChild>
	<Shape />
</Story>
