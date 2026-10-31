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

// Wave 2: forms
export { default as Checkbox, type CheckboxProps } from './components/Checkbox/Checkbox.svelte';
export {
	default as RadioGroup,
	type RadioGroupProps,
	type RadioVariant
} from './components/Radio/RadioGroup.svelte';
export { default as Radio, type RadioProps } from './components/Radio/Radio.svelte';
export {
	default as Select,
	type SelectItem,
	type SelectProps
} from './components/Select/Select.svelte';
export {
	default as Combobox,
	type ComboboxItem,
	type ComboboxProps
} from './components/Combobox/Combobox.svelte';
export { default as Slider, type SliderProps } from './components/Slider/Slider.svelte';
export {
	default as SegmentedControl,
	type SegmentedControlProps,
	type SegmentedControlSize,
	type SegmentedOption
} from './components/SegmentedControl/SegmentedControl.svelte';

// Wave 2: navigation
export { default as Tabs, type TabsProps } from './components/Tabs/Tabs.svelte';
export { default as TabList, type TabListProps } from './components/Tabs/TabList.svelte';
export { default as Tab, type TabProps } from './components/Tabs/Tab.svelte';
export { default as TabPanel, type TabPanelProps } from './components/Tabs/TabPanel.svelte';

// Wave 2: status
export {
	default as Badge,
	type BadgeProps,
	type BadgeSize,
	type BadgeTone
} from './components/Badge/Badge.svelte';
export {
	default as ProgressBar,
	formatPercent,
	type ProgressBarProps
} from './components/ProgressBar/ProgressBar.svelte';
export { default as Chip, type ChipProps } from './components/Chip/Chip.svelte';
export {
	default as StatusDot,
	type Status,
	type StatusDotProps,
	type StatusDotSize
} from './components/StatusDot/StatusDot.svelte';
export {
	default as Banner,
	type BannerProps,
	type BannerTone
} from './components/Banner/Banner.svelte';
export {
	default as EmptyState,
	type EmptyStateProps
} from './components/EmptyState/EmptyState.svelte';
export {
	default as Toaster,
	type ToasterPosition,
	type ToasterProps
} from './components/Toast/Toaster.svelte';
export { toast } from 'svelte-sonner';

// Wave 2: overlays
export {
	default as Popover,
	type PopoverAlign,
	type PopoverProps,
	type PopoverSide
} from './components/Popover/Popover.svelte';

// Wave 2: accessibility helpers
export { default as VisuallyHidden } from './components/VisuallyHidden/VisuallyHidden.svelte';
export { default as LiveRegion, type Politeness } from './components/LiveRegion/LiveRegion.svelte';
