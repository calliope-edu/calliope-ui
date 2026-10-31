import type { Preview } from '@storybook/sveltekit';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

import '@fontsource-variable/roboto';
import '@fontsource-variable/roboto-condensed';
import '../src/lib/styles/styles.css';

const preview: Preview = {
	decorators: [
		withThemeByDataAttribute({
			themes: { Hell: 'light', Dunkel: 'dark' },
			defaultTheme: 'Hell',
			attributeName: 'data-theme'
		})
	],
	parameters: {
		layout: 'fullscreen',
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		options: {
			storySort: {
				order: [
					'Foundations',
					[
						'Farben',
						'Typografie',
						'Abstände',
						'Formen und Rahmen',
						'Schatten und Ebenen',
						'Größen',
						'Bewegung'
					],
					'Primitives',
					'Overlays',
					'Patterns',
					'Rezepte'
				]
			}
		},
		a11y: {
			test: 'todo'
		}
	}
};

export default preview;
