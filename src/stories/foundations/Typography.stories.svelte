<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Typography from './Typography.svelte';

	const { Story } = defineMeta({
		title: 'Foundations/Typografie'
	});
</script>

<Story name="Typografie" asChild>
	<Typography />
</Story>
