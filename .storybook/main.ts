import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|ts|svelte)'],
	addons: [
		'@storybook/addon-svelte-csf',
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@storybook/addon-themes'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	core: {
		disableTelemetry: true,
		disableWhatsNewNotifications: true
	},
	features: {
		sidebarOnboardingChecklist: false,
		menuOnboardingChecklist: false
	}
};

export default config;
