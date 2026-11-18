<script lang="ts">
	/*
	 * The 5×5 name pad of mini-connection-widget (src/ui/PatternPad.svelte), for the recipe: the
	 * histogram the Calliope shows in pairing mode. Clicking a cell sets its column's bar to that
	 * height. Lit cells use the Calliope LED orange, as in the widget.
	 */
	type Props = {
		value: boolean[][];
		onchange?: (grid: boolean[][]) => void;
		size?: number;
		disabled?: boolean;
	};

	let { value, onchange, size = 132, disabled = false }: Props = $props();

	const rows = [0, 1, 2, 3, 4];
	const cols = [0, 1, 2, 3, 4];

	const lit = (r: number, c: number) => Boolean(value[r]?.[c]);

	function setColumn(col: number, topRow: number) {
		if (disabled) return;
		onchange?.(rows.map((r) => cols.map((c) => (c === col ? r >= topRow : lit(r, c)))));
	}
</script>

<div class="pad" style:--size="{size}px">
	{#each rows as r (r)}
		{#each cols as c (c)}
			<button
				type="button"
				class="cell"
				class:on={lit(r, c)}
				aria-label={`Spalte ${c + 1}, Höhe ${5 - r}`}
				aria-pressed={lit(r, c)}
				{disabled}
				onclick={() => setColumn(c, r)}
			></button>
		{/each}
	{/each}
</div>

<style>
	.pad {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		gap: var(--cui-space-1);
		width: var(--size);
		height: var(--size);
	}

	.cell {
		padding: 0;
		border: 0;
		border-radius: var(--cui-radius-md);
		background-color: var(--cui-action-hover);
		cursor: pointer;
	}

	/* The LED colour of the device itself, not a UI role. */
	.cell.on {
		background-color: var(--cui-palette-orange);
	}

	.cell:disabled {
		cursor: default;
	}
</style>
