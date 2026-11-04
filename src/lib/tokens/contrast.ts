/**
 * Contrast helpers (Foundations pages, token tests). WCAG 2.x is the binding check (BITV 2.0,
 * EN 301 549); APCA, the WCAG 3 draft method, is a second check on top (DESIGN.md, Colour).
 */

function rgb(hex: string): [number, number, number] {
	const n = parseInt(hex.replace('#', '').slice(0, 6), 16);
	return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function channel(value: number): number {
	const c = value / 255;
	return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
	const [r, g, b] = rgb(hex);
	return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: string, b: string): number {
	const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
	return (hi + 0.05) / (lo + 0.05);
}

export type Rating = 'aa' | 'aa-large' | 'fail';

/** AA: 4.5 for body text, 3 for large text (24px, or 18.66px bold) and UI elements. */
export function rate(ratio: number): Rating {
	if (ratio >= 4.5) return 'aa';
	if (ratio >= 3) return 'aa-large';
	return 'fail';
}

export function formatRatio(ratio: number): string {
	return ratio.toFixed(ratio < 10 ? 2 : 1).replace('.', ',');
}

// APCA-W3 0.0.98G constants (github.com/Myndex/apca-w3).
const APCA = {
	trc: 2.4,
	r: 0.2126729,
	g: 0.7151522,
	b: 0.072175,
	normBg: 0.56,
	normText: 0.57,
	revText: 0.62,
	revBg: 0.65,
	blackThreshold: 0.022,
	blackClamp: 1.414,
	scale: 1.14,
	offset: 0.027,
	deltaYMin: 0.0005,
	loClip: 0.1
} as const;

function apcaLuminance(hex: string): number {
	const [r, g, b] = rgb(hex);
	const y =
		APCA.r * (r / 255) ** APCA.trc +
		APCA.g * (g / 255) ** APCA.trc +
		APCA.b * (b / 255) ** APCA.trc;
	return y > APCA.blackThreshold ? y : y + (APCA.blackThreshold - y) ** APCA.blackClamp;
}

/**
 * APCA lightness contrast Lc of `text` on `background`, signed like the reference: positive for
 * dark text on light, negative for light text on dark. Compare `Math.abs()` against thresholds.
 */
export function apcaContrast(text: string, background: string): number {
	const yText = apcaLuminance(text);
	const yBg = apcaLuminance(background);
	if (Math.abs(yBg - yText) < APCA.deltaYMin) return 0;
	if (yBg > yText) {
		const sapc = (yBg ** APCA.normBg - yText ** APCA.normText) * APCA.scale;
		return sapc < APCA.loClip ? 0 : (sapc - APCA.offset) * 100;
	}
	const sapc = (yBg ** APCA.revBg - yText ** APCA.revText) * APCA.scale;
	return sapc > -APCA.loClip ? 0 : (sapc + APCA.offset) * 100;
}

/** "Lc 70", rounded and without sign. */
export function formatLc(lc: number): string {
	return `Lc ${Math.round(Math.abs(lc))}`;
}
