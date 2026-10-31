<script lang="ts">
	import ConfirmDialog from './ConfirmDialog.svelte';
	import { confirmQueue } from './confirm.svelte.js';

	// Mount once in the app layout; it shows the requests made with confirmDialog().
	const current = $derived(confirmQueue.current);
</script>

{#if current}
	{#key current.id}
		<ConfirmDialog
			open={true}
			title={current.title}
			description={current.description}
			confirmLabel={current.confirmLabel}
			cancelLabel={current.cancelLabel}
			tone={current.tone}
			onConfirm={() => confirmQueue.settle(true)}
			onCancel={() => confirmQueue.settle(false)}
		/>
	{/key}
{/if}
