/**
 * Icon pipeline: semantic icon names → SVG bodies, baked into TypeScript at build time.
 *
 * Run with `pnpm icons`. Consumers need no icon plugin: `src/lib/icons/icons.ts` holds the
 * SVG bodies of the active set. The set is PrimeIcons (decided by the owner on 2026-11-03 after
 * the comparison on the Foundations/Icons page). The Material Symbols names stay in the map so
 * switching back remains a change of `ACTIVE` and a rerun, since components only use the
 * semantic names.
 *
 * Both sets come from Iconify JSON packages and use a 24×24 grid. Where a set has no glyph for a
 * semantic name, the map holds `null` and `DRAWN` supplies one drawn in the style of that set.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';

const require = createRequire(import.meta.url);

const SETS = {
	material: {
		label: 'Material Symbols Rounded',
		package: '@iconify-json/material-symbols/icons.json'
	},
	prime: { label: 'PrimeIcons', package: '@iconify-json/prime/icons.json' }
};

const ACTIVE = 'prime';

/**
 * Semantic name → icon per set. The first block is the 28 icons of the design draft
 * (docs/input/icons.txt), the second what Wave 1 and 2 components need on top, then W4 and Wave 3 additions.
 */
const ICONS = {
	wifi: { material: 'wifi-rounded', prime: 'wifi' },
	collapse: {
		material: 'close-fullscreen-rounded',
		prime: 'arrow-down-left-and-arrow-up-right-to-center'
	},
	expand: {
		material: 'open-in-full-rounded',
		prime: 'arrow-up-right-and-arrow-down-left-from-center'
	},
	check: { material: 'check-rounded', prime: 'check' },
	'check-circle': { material: 'check-circle-rounded', prime: 'check-circle' },
	clipboard: { material: 'content-paste-rounded', prime: 'clipboard' },
	settings: { material: 'settings-rounded', prime: 'cog' },
	download: { material: 'download-rounded', prime: 'download' },
	more: { material: 'more-horiz', prime: 'ellipsis-h' },
	error: { material: 'error-rounded', prime: 'exclamation-circle' },
	fullscreen: { material: 'fullscreen-rounded', prime: 'expand' },
	'external-link': { material: 'open-in-new-rounded', prime: 'external-link' },
	show: { material: 'visibility-rounded', prime: 'eye' },
	hide: { material: 'visibility-off-rounded', prime: 'eye-slash' },
	filter: { material: 'filter-alt-rounded', prime: 'filter' },
	'filter-off': { material: 'filter-alt-off-rounded', prime: 'filter-slash' },
	info: { material: 'info-rounded', prime: 'info-circle' },
	device: { material: 'memory-rounded', prime: 'microchip' },
	pause: { material: 'pause-circle-rounded', prime: 'pause-circle' },
	edit: { material: 'edit-rounded', prime: 'pencil' },
	play: { material: 'play-circle-rounded', prime: 'play-circle' },
	add: { material: 'add-rounded', prime: 'plus' },
	help: { material: 'help-rounded', prime: 'question-circle' },
	stop: { material: 'stop-circle-rounded', prime: 'stop-circle' },
	close: { material: 'close-rounded', prime: 'times' },
	'close-circle': { material: 'cancel-rounded', prime: 'times-circle' },
	upload: { material: 'upload-rounded', prime: 'upload' },

	'chevron-down': { material: 'expand-more-rounded', prime: 'chevron-down' },
	'chevron-right': { material: 'chevron-right-rounded', prime: 'chevron-right' },
	'more-vertical': { material: 'more-vert', prime: 'ellipsis-v' },
	copy: { material: 'content-copy-rounded', prime: 'copy' },
	delete: { material: 'delete-rounded', prime: 'trash' },
	warning: { material: 'warning-rounded', prime: 'exclamation-triangle' },
	menu: { material: 'menu-rounded', prime: 'bars' },
	search: { material: 'search-rounded', prime: 'search' },
	minus: { material: 'remove-rounded', prime: 'minus' },

	bluetooth: { material: 'bluetooth-rounded', prime: null },
	usb: { material: 'usb-rounded', prime: null },
	retry: { material: 'refresh-rounded', prime: 'refresh' },
	share: { material: 'share-rounded', prime: 'share-alt' },
	'qr-code': { material: 'qr-code-rounded', prime: 'qrcode' },
	link: { material: 'link-rounded', prime: 'link' },

	language: { material: 'language', prime: 'globe' },
	person: { material: 'person-rounded', prime: 'user' },
	login: { material: 'login-rounded', prime: 'sign-in' },
	logout: { material: 'logout-rounded', prime: 'sign-out' }
};

/*
 * Glyphs a set lacks, drawn on its grid in its style. PrimeIcons draws with a 1.5px line and
 * round ends and joins; its glyphs span about 3 to 21 on the 24px grid.
 */
const PRIME_LINE =
	'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"';
const DRAWN = {
	prime: {
		// The rune ᛒ: a stem with two arrow loops on the right, crossed by two diagonals.
		bluetooth: `<path ${PRIME_LINE} d="M7.25 7.75l9.5 8.5L12 20.5v-17l4.75 4.25l-9.5 8.5"/>`,
		// The USB trident: arrowhead on top, round and square ends on the arms, a dot at the foot.
		usb: [
			`<path ${PRIME_LINE} d="M12 6.25v10.5M12 14.75l-5-3v-1.5M12 12.75l5-2.75V8.75"/>`,
			`<path fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" d="M12 3.25l2.25 3h-4.5z"/>`,
			'<circle cx="12" cy="18.75" r="2" fill="currentColor"/>',
			'<circle cx="7" cy="8.75" r="1.5" fill="currentColor"/>',
			'<rect width="3" height="3" x="15.5" y="5.75" fill="currentColor" rx=".5"/>'
		].join('')
	}
};

/** @param {keyof typeof SETS} set */
async function bodies(set) {
	const json = JSON.parse(await readFile(require.resolve(SETS[set].package), 'utf8'));
	if (json.width !== 24 || json.height !== 24) throw new Error(`${set}: expected a 24px grid`);
	const out = {};
	for (const [name, sources] of Object.entries(ICONS)) {
		let id = sources[set];
		if (id === null) {
			const drawn = DRAWN[set]?.[name];
			if (!drawn) throw new Error(`${set}: has no icon for "${name}" (null in the map, not drawn)`);
			out[name] = drawn;
			continue;
		}
		id = json.aliases?.[id]?.parent ?? id;
		const icon = json.icons[id];
		if (!icon) throw new Error(`${set}: no icon "${sources[set]}" for "${name}"`);
		out[name] = icon.body;
	}
	return out;
}

const HEADER = (set) =>
	[
		'/*',
		` * Generated by scripts/build-icons.js from ${SETS[set].label} (${SETS[set].package.split('/icons.json')[0]}).`,
		' * Do not edit by hand: change the name map in the script and run `pnpm icons`.',
		' */',
		''
	].join('\n');

async function write(path, source) {
	const config = await prettier.resolveConfig(path);
	await writeFile(path, await prettier.format(source, { ...config, filepath: path }));
	console.log(`wrote ${path}`);
}

const active = await bodies(ACTIVE);
await write(
	fileURLToPath(new URL('../src/lib/icons/icons.ts', import.meta.url)),
	HEADER(ACTIVE) +
		`/** Name of the icon set the library ships. */\n` +
		`export const iconSet = ${JSON.stringify(SETS[ACTIVE].label)};\n\n` +
		`/** SVG bodies on a 24×24 viewBox, keyed by semantic name. */\n` +
		`export const icons = ${JSON.stringify(active, null, '\t')} as const;\n\n` +
		`export type IconName = keyof typeof icons;\n`
);
