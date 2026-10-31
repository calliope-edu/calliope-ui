import { createRawSnippet } from 'svelte';

/** A children snippet with plain text, for rendering components in tests. */
export const text = (value: string) =>
	createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));
