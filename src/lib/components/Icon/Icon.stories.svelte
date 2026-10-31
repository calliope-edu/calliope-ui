<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { icons } from '../../icons/icons.js';
	import Icon from './Icon.svelte';

	const { Story } = defineMeta({
		title: 'Primitives/Icon',
		component: Icon,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { name: 'download', size: 'l' },
		argTypes: {
			name: { control: 'select', options: Object.keys(icons) },
			size: { control: 'inline-radio', options: ['s', 'm', 'l'] }
		}
	});
</script>

<Story name="Spielwiese" />
