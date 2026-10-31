/** Candidate icons for the Foundations page "Icons", served by .storybook/icon-comparison.ts. */
declare module 'virtual:icon-comparison' {
	export type IconSvg = {
		/** Name in the Iconify set, e.g. `wifi-rounded`. */
		name: string;
		viewBox: string;
		/** Inner SVG markup, drawn with `currentColor`. */
		body: string;
	};

	export type IconCandidate = {
		label: string;
		prime: IconSvg;
		/** Material Symbols Rounded, weight 400 (Campus today). */
		material: IconSvg;
		/** Material Symbols Rounded, weight 300. */
		materialLight: IconSvg;
	};

	const icons: IconCandidate[];
	export default icons;
}
