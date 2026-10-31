<script lang="ts">
	let {
		dos,
		donts,
		notFor
	}: {
		dos: string[];
		donts: string[];
		/** When to use something else instead. */
		notFor?: string[];
	} = $props();
</script>

<!-- Do / Don't block of a component overview (docs/plan/02-plan.md, 1.3). -->
<div class="guidelines">
	<div class="column" data-kind="do">
		<h3>So</h3>
		<ul>
			{#each dos as item (item)}<li>{item}</li>{/each}
		</ul>
	</div>
	<div class="column" data-kind="dont">
		<h3>Nicht so</h3>
		<ul>
			{#each donts as item (item)}<li>{item}</li>{/each}
		</ul>
	</div>
	{#if notFor?.length}
		<div class="column" data-kind="not-for">
			<h3>Stattdessen</h3>
			<ul>
				{#each notFor as item (item)}<li>{item}</li>{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.guidelines {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: var(--cui-space-6);
	}

	/* Status stripe, no tinted background (decided 2026-10-29). */
	.column {
		padding-left: var(--cui-space-4);
		border-left: 4px solid var(--cui-border-subtle);
	}

	[data-kind='do'] {
		border-left-color: var(--cui-status-success-fill);
	}

	[data-kind='dont'] {
		border-left-color: var(--cui-status-error-fill);
	}

	h3 {
		margin: 0 0 var(--cui-space-2);
		font-family: var(--cui-typography-h3-font-family);
		font-size: var(--cui-typography-h3-font-size);
		font-weight: var(--cui-typography-h3-font-weight);
	}

	ul {
		margin: 0;
		padding-left: var(--cui-space-5);
		line-height: var(--cui-font-line-height-relaxed);
	}

	li + li {
		margin-top: var(--cui-space-1);
	}
</style>
