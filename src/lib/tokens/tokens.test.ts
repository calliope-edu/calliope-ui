import { describe, expect, it } from 'vitest';
import { contrastRatio } from './contrast.js';
import { colors, palette, tokens } from './tokens.js';

const hex = new Map<string, string>(palette.map((c) => [c.name, c.hex.toLowerCase()]));
const HEX = /^#[0-9a-f]{6}([0-9a-f]{2})?$/;

/** Resolve a CSS value like "var(--cui-palette-ink)" or "var(--cui-surface-inverse)". */
function resolve(theme: keyof typeof colors, value: string): string {
	const ref = /^var\(--cui-(.+)\)$/.exec(value);
	if (!ref) return value;
	const [, name] = ref;
	if (name.startsWith('palette-')) return hex.get(name.slice('palette-'.length)) ?? value;
	return resolve(theme, String(colors[theme][name as keyof (typeof colors)['light']]));
}

const role = (theme: keyof typeof colors, name: keyof (typeof colors)['light']) =>
	resolve(theme, colors[theme][name]);

describe('palette', () => {
	it('holds the 19 fixed colours with the owner decisions of 2026-10-29', () => {
		expect(palette).toHaveLength(19);
		expect(hex.get('teal-dark')).toBe('#1d8286');
		expect(hex.get('plum')).toBe('#a5289b');
		expect(hex.get('magenta')).toBe('#e4007e');
		expect(hex.get('red')).toBe('#e53f4b');
	});
});

describe.each(['light', 'dark'] as const)('colour roles (%s)', (theme) => {
	it('carry the same keys in both themes', () => {
		expect(Object.keys(colors[theme]).sort()).toEqual(Object.keys(colors.light).sort());
	});

	it('resolve to a palette value, or a palette value with alpha (D1)', () => {
		const values = new Set(hex.values());
		for (const name of Object.keys(colors[theme]) as (keyof (typeof colors)['light'])[]) {
			const value = role(theme, name);
			expect(value, name).toMatch(HEX);
			expect(values.has(value.slice(0, 7)), `${name}: ${value}`).toBe(true);
		}
	});

	it('pair every status and identity fill with readable text (4.5:1)', () => {
		for (const name of Object.keys(colors[theme]) as (keyof (typeof colors)['light'])[]) {
			const fill = /^(status|identity)-(.+)-fill$/.exec(name);
			if (!fill) continue;
			const on = `${fill[1]}-${fill[2]}-on` as keyof (typeof colors)['light'];
			const ratio = contrastRatio(role(theme, name), role(theme, on));
			expect(ratio, `${name} with ${on}`).toBeGreaterThanOrEqual(4.5);
		}
	});

	it('keep text and links readable on the page (4.5:1) and the focus ring visible (3:1)', () => {
		const page = role(theme, 'surface-page');
		expect(contrastRatio(role(theme, 'text-default'), page)).toBeGreaterThanOrEqual(4.5);
		expect(contrastRatio(role(theme, 'text-link'), page)).toBeGreaterThanOrEqual(4.5);
		expect(contrastRatio(role(theme, 'text-error'), page)).toBeGreaterThanOrEqual(4.5);
		expect(contrastRatio(role(theme, 'focus-ring'), page)).toBeGreaterThanOrEqual(3);
		expect(
			contrastRatio(role(theme, 'action-primary-fg'), role(theme, 'action-primary-bg'))
		).toBeGreaterThanOrEqual(4.5);
	});
});

describe('decisions', () => {
	it('never use the error red as text colour', () => {
		for (const theme of ['light', 'dark'] as const) {
			expect(role(theme, 'text-error')).not.toBe(hex.get('red'));
		}
	});

	it('give the destructive fill black text, not white (5.1:1)', () => {
		expect(role('light', 'status-error-on')).toBe('#000000');
	});

	it('use 2px for outline buttons at every size (D3) and 24px touch targets (D6)', () => {
		expect(tokens['border-width-button']).toBe('2px');
		expect(tokens['size-touch-min']).toBe('1.5rem');
		expect(tokens['size-control-l']).toBe('2.5rem');
	});
});
