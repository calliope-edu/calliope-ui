import { describe, expect, it } from 'vitest';
import { apcaContrast, contrastRatio, formatLc } from './contrast.js';

describe('contrastRatio (WCAG 2)', () => {
	it('spans 1:1 to 21:1', () => {
		expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
		expect(contrastRatio('#6476fd', '#6476fd')).toBeCloseTo(1, 5);
	});
});

describe('apcaContrast (APCA-W3 0.0.98G)', () => {
	// Reference values from the apca-w3 package (github.com/Myndex/apca-w3).
	it.each([
		['#888888', '#ffffff', 63.056469930209424],
		['#ffffff', '#888888', -68.54146436644962],
		['#000000', '#aaaaaa', 58.146262578561334],
		['#aaaaaa', '#000000', -56.24113336839742],
		['#000000', '#ffffff', 106.04067321268862],
		['#ffffff', '#000000', -107.88473318309848]
	])('gives %s on %s the reference Lc', (text, background, lc) => {
		expect(apcaContrast(text, background)).toBeCloseTo(lc, 6);
	});

	it('depends on polarity, unlike WCAG 2', () => {
		expect(Math.abs(apcaContrast('#ffffff', '#888888'))).toBeGreaterThan(
			apcaContrast('#888888', '#ffffff') + 5
		);
		expect(contrastRatio('#ffffff', '#888888')).toBe(contrastRatio('#888888', '#ffffff'));
	});

	it('clips near-equal colours to 0', () => {
		expect(apcaContrast('#6476fd', '#6476fd')).toBe(0);
		expect(apcaContrast('#fefefe', '#ffffff')).toBe(0);
	});

	it('ignores an alpha suffix', () => {
		expect(apcaContrast('#000000b3', '#ffffff')).toBe(apcaContrast('#000000', '#ffffff'));
	});

	it('rates white on IoT indigo far above black (DESIGN.md, colour pairs)', () => {
		expect(Math.round(Math.abs(apcaContrast('#ffffff', '#6476fd')))).toBe(70);
		expect(Math.round(Math.abs(apcaContrast('#000000', '#6476fd')))).toBe(39);
	});
});

describe('formatLc', () => {
	it('rounds and drops the sign', () => {
		expect(formatLc(-70.49)).toBe('Lc 70');
		expect(formatLc(63.5)).toBe('Lc 64');
	});
});
