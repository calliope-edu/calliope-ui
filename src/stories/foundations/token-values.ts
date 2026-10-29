/** Helpers for listing token groups on the Foundations pages. */

import { tokens, type TokenName } from '#lib/tokens/index.js';

export type TokenEntry = {
	/** Token name without `--cui-`, e.g. `space-4`. */
	name: TokenName;
	/** Name without the group prefix, e.g. `4`. */
	key: string;
	value: string;
};

/** All theme-independent tokens whose name starts with `prefix`, in source order. */
export function entries(prefix: string): TokenEntry[] {
	return (Object.keys(tokens) as TokenName[])
		.filter((name) => name.startsWith(prefix))
		.map((name) => ({ name, key: name.slice(prefix.length), value: String(tokens[name]) }));
}

/** "1.5rem" → 24, "12px" → 12; anything else → NaN. */
export function toPx(value: string | number): number {
	const match = /^(-?[\d.]+)(rem|px)$/.exec(String(value));
	if (!match) return NaN;
	return Number(match[1]) * (match[2] === 'rem' ? 16 : 1);
}
