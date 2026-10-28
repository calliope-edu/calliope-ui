/**
 * The fixed Calliope palette (docs/plan/02-plan.md, section 2.1). No derived scales:
 * every colour in the library is one of these values.
 *
 * Hand-maintained together with tokens.css until the Style Dictionary pipeline
 * generates both from one DTCG source.
 */

export type PaletteGroup = 'neutral' | 'brand' | 'color' | 'error';

export interface PaletteColor {
	/** Token name, also the CSS custom property `--cui-palette-<name>`. */
	name: string;
	hex: string;
	group: PaletteGroup;
}

export const palette = [
	{ name: 'black', hex: '#000000', group: 'neutral' },
	{ name: 'ink', hex: '#1B1C1D', group: 'neutral' },
	{ name: 'graphite', hex: '#323334', group: 'neutral' },
	{ name: 'mist', hex: '#E8EDEB', group: 'neutral' },
	{ name: 'white', hex: '#FFFFFF', group: 'neutral' },
	{ name: 'teal', hex: '#42C8C8', group: 'brand' },
	{ name: 'teal-dark', hex: '#25A3A7', group: 'brand' },
	{ name: 'lime', hex: '#98F404', group: 'color' },
	{ name: 'cyan', hex: '#34E5DB', group: 'color' },
	{ name: 'blue', hex: '#3B82F6', group: 'color' },
	{ name: 'yellow', hex: '#EEFF41', group: 'color' },
	{ name: 'amber', hex: '#F8C526', group: 'color' },
	{ name: 'orange', hex: '#FF4E00', group: 'color' },
	{ name: 'magenta', hex: '#E4007E', group: 'color' },
	{ name: 'violet', hex: '#8073E4', group: 'color' },
	{ name: 'indigo', hex: '#6476FD', group: 'color' },
	{ name: 'green', hex: '#3FC663', group: 'color' },
	{ name: 'red', hex: '#C8102E', group: 'error' }
] as const satisfies readonly PaletteColor[];

export type PaletteName = (typeof palette)[number]['name'];
