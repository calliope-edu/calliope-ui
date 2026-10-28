/** WCAG 2.x contrast helpers for the Foundations pages. */

function channel(value: number): number {
	const c = value / 255;
	return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
	const n = parseInt(hex.replace('#', ''), 16);
	const r = (n >> 16) & 0xff;
	const g = (n >> 8) & 0xff;
	const b = n & 0xff;
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
