import type { StorybookConfig } from '@storybook/sveltekit';
import { iconComparison } from './icon-comparison.js';

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
	},
	viteFinal: (config) => ({ ...config, plugins: [...(config.plugins ?? []), iconComparison()] })
};

export default config;
