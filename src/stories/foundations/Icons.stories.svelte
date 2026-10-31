<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icons from './Icons.svelte';

	const { Story } = defineMeta({
		title: 'Foundations/Icons'
	});
</script>

<Story name="Icons" asChild>
	<Icons />
</Story>
