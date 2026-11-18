<script lang="ts" module>
	export type ToasterPosition =
		'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

	export type ToasterProps = {
		/** Where toasts stack. Bottom right keeps them clear of the app header. */
		position?: ToasterPosition;
		/** Milliseconds a toast stays. Errors should pass a longer one, or Infinity, per call. */
		duration?: number;
		/** Every toast gets a close button. */
		closeButton?: boolean;
		/** Accessible name of the close buttons. */
		closeLabel?: string;
		/** Name of the toast region for screen readers ("Benachrichtigungen"). */
		label?: string;
		/** Show the stacked toasts one below the other instead of only on hover. */
		expand?: boolean;
		/** How many toasts show at once; older ones wait. */
		visibleToasts?: number;
	};
</script>

<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import type { IconName } from '../../icons/icons.js';
	import Icon from '../Icon/Icon.svelte';
	import Spinner from '../Spinner/Spinner.svelte';
	import './toast.css';

	let {
		position = 'bottom-right',
		duration = 5000,
		closeButton = true,
		closeLabel = 'Schließen',
		label = 'Benachrichtigungen',
		expand = false,
		visibleToasts = 4
	}: ToasterProps = $props();
</script>

<!-- One per app, in the root layout. Toasts are raised with toast() / toast.success() etc. -->

{#snippet disc(name: IconName)}
	<span class="cui-toast-disc"><Icon {name} size="s" /></span>
{/snippet}

<!-- Like the Banner: a disc for success, warning and error, no icon for info, a spinner while loading. -->
{#snippet successIcon()}{@render disc('check')}{/snippet}
{#snippet warningIcon()}{@render disc('warning')}{/snippet}
{#snippet errorIcon()}{@render disc('error')}{/snippet}
{#snippet loadingIcon()}<Spinner size="s" />{/snippet}
{#snippet closeIcon()}<Icon name="close" size="s" />{/snippet}

<Toaster
	{position}
	{duration}
	{expand}
	{closeButton}
	closeButtonAriaLabel={closeLabel}
	containerAriaLabel={label}
	gap={8}
	{visibleToasts}
	class="cui-toaster"
	style="z-index: var(--cui-z-index-toast)"
	{successIcon}
	infoIcon={null}
	{warningIcon}
	{errorIcon}
	{loadingIcon}
	{closeIcon}
	toastOptions={{
		unstyled: true,
		classes: {
			toast: 'cui-toast',
			icon: 'cui-toast-icon',
			loader: 'cui-toast-loader',
			content: 'cui-toast-content',
			title: 'cui-toast-title',
			description: 'cui-toast-description',
			actionButton: 'cui-toast-action',
			cancelButton: 'cui-toast-cancel',
			closeButton: 'cui-toast-close'
		}
	}}
/>
