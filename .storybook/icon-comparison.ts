import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { getIconData, iconToSVG } from '@iconify/utils';
import type { Plugin } from 'vite';

/*
 * Serves `virtual:icon-comparison` for the Foundations page "Icons": only the candidate icons
 * listed in icon-candidates.json, taken from the Iconify sets at build time. The sets themselves
 * are 0.2 to 10 MB of JSON each and never reach the browser.
 */

const ID = 'virtual:icon-comparison';
const RESOLVED_ID = '\0' + ID;
const CANDIDATES = fileURLToPath(
	new URL('../src/stories/foundations/icon-candidates.json', import.meta.url)
);

type IconSet = Parameters<typeof getIconData>[0];
type Candidate = { label: string; prime: string; material: string };

const require = createRequire(import.meta.url);
const sets: Record<string, IconSet> = {};

function loadSet(name: string): IconSet {
	sets[name] ??= require(`@iconify-json/${name}/icons.json`) as IconSet;
	return sets[name];
}

function svg(set: string, name: string) {
	const data = getIconData(loadSet(set), name);
	if (!data) throw new Error(`Icon ${set}:${name} not found`);
	const { attributes, body } = iconToSVG(data);
	return { name, viewBox: attributes.viewBox, body };
}

export function iconComparison(): Plugin {
	return {
		name: 'calliope-icon-comparison',
		resolveId: (id) => (id === ID ? RESOLVED_ID : undefined),
		load(id) {
			if (id !== RESOLVED_ID) return;
			this.addWatchFile(CANDIDATES);
			const candidates = JSON.parse(readFileSync(CANDIDATES, 'utf8')) as Candidate[];
			const icons = candidates.map((c) => ({
				label: c.label,
				prime: svg('prime', c.prime),
				material: svg('material-symbols', c.material),
				materialLight: svg('material-symbols-light', c.material)
			}));
			return `export default ${JSON.stringify(icons)};`;
		}
	};
}
