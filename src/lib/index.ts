// Components are exported from here as they are added (docs/plan/02-plan.md, section 3).
export { colors, cssVar, palette, tokens } from './tokens/index.js';
export type {
	ColorRole,
	PaletteColor,
	PaletteGroup,
	PaletteName,
	Theme,
	TokenName
} from './tokens/index.js';

export { icons, iconSet, type IconName } from './icons/icons.js';

// Wave 1: primitives
export { default as Icon, type IconSize } from './components/Icon/Icon.svelte';
export {
	default as Button,
	type ButtonProps,
	type ButtonSize,
	type ButtonTone,
	type ButtonVariant,
	type Identity
} from './components/Button/Button.svelte';
export {
	default as IconButton,
	type IconButtonProps,
	type IconButtonVariant
} from './components/IconButton/IconButton.svelte';
export { default as Spinner, type SpinnerSize } from './components/Spinner/Spinner.svelte';
export { default as TextField, type TextFieldProps } from './components/TextField/TextField.svelte';
export { default as Label } from './components/TextField/Label.svelte';
export { default as FieldHint } from './components/TextField/FieldHint.svelte';
export { default as Switch } from './components/Switch/Switch.svelte';

// Wave 1: overlays
export {
	default as Dialog,
	type DialogProps,
	type DialogSize
} from './components/Dialog/Dialog.svelte';
export {
	default as ConfirmDialog,
	type ConfirmDialogProps,
	type ConfirmTone
} from './components/ConfirmDialog/ConfirmDialog.svelte';
export { default as ConfirmDialogHost } from './components/ConfirmDialog/ConfirmDialogHost.svelte';
export { confirmDialog, type ConfirmOptions } from './components/ConfirmDialog/confirm.svelte.js';
export { default as Menu, type MenuProps } from './components/Menu/Menu.svelte';
export { default as MenuItem } from './components/Menu/MenuItem.svelte';
export { default as MenuGroup } from './components/Menu/MenuGroup.svelte';
export { default as MenuRadioGroup } from './components/Menu/MenuRadioGroup.svelte';
export { default as MenuRadioItem } from './components/Menu/MenuRadioItem.svelte';
export { default as MenuSeparator } from './components/Menu/MenuSeparator.svelte';
export {
	default as Tooltip,
	type TooltipProps,
	type TooltipSide
} from './components/Tooltip/Tooltip.svelte';
