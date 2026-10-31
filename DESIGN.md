---
name: calliope-ui
description: Shared design system for Calliope's Svelte apps — a calm light canvas, dark chrome, one fixed palette in which every colour has exactly one job, legible from the back row of a classroom.
status: Phase 0 result. All decisions settled 2026-10-29; to be revised from the built state at the end of each wave.
tokens: src/lib/tokens/*.tokens.json (DTCG)
colors:
  black: '#000000'
  ink: '#1B1C1D'
  graphite: '#323334'
  mist: '#E8EDEB'
  white: '#FFFFFF'
  teal: '#42C8C8'
  teal-dark: '#1D8286'
  lime: '#98F404'
  cyan: '#34E5DB'
  blue: '#3B82F6'
  yellow: '#EEFF41'
  amber: '#F8C526'
  orange: '#FF4E00'
  magenta: '#E4007E'
  plum: '#A5289B'
  violet: '#8073E4'
  indigo: '#6476FD'
  green: '#3FC663'
  red: '#E53F4B'
typography:
  display:
    {
      fontFamily: Roboto Condensed,
      fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
      fontWeight: 700,
      lineHeight: 1.1
    }
  h1: { fontFamily: Roboto Condensed, fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.2 }
  h2: { fontFamily: Roboto Condensed, fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.2 }
  h3: { fontFamily: Roboto Condensed, fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.2 }
  subtitle:
    {
      fontFamily: Roboto,
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.04em',
      textTransform: uppercase
    }
  body: { fontFamily: Roboto, fontSize: '1rem', fontWeight: 400, lineHeight: 1.4 }
  label: { fontFamily: Roboto, fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.4 }
  caption: { fontFamily: Roboto, fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.4 }
  action:
    {
      fontFamily: Roboto Condensed,
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.04em',
      textTransform: uppercase
    }
  readout:
    {
      fontFamily: Roboto,
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1,
      fontVariantNumeric: tabular-nums
    }
rounded:
  sm: '4px'
  md: '6px'
  lg: '8px'
  xl: '12px'
  dialog: '20px'
  full: '9999px'
spacing:
  '1': '0.25rem'
  '2': '0.5rem'
  '3': '0.75rem'
  '4': '1rem'
  '5': '1.25rem'
  '6': '1.5rem'
  '8': '2rem'
  '10': '2.5rem'
  '12': '3rem'
  '16': '4rem'
---

# Design System: calliope-ui

## Overview

calliope-ui serves Campus (with the IoT dashboard), the device connection widget, calliope-docs
and ml-machine. Its users are teachers running a 45-minute lesson and pupils from about ten years
up, on school laptops, Chromebooks, tablets, and a beamer at the front of the room. Three things
follow from that, and every rule below comes back to one of them:

1. **Legible from the back row.** Text and status must survive projection and washed-out light.
   WCAG 2.1 AA (BITV 2.0) is the floor, not the goal.
2. **Colour has a job, or it is not there.** One fixed palette, no derived scales, no tints.
   Every value has exactly one role: neutral field, brand, status, or identity.
3. **Calm until something happens.** Surfaces at rest are flat and near-monochrome. Status is the
   loudest thing on a screen.

The library owns tokens, base styles and components. It never owns the interiors of embedded
editors (MakeCode, Python, Blocks are third-party iframes) and it brings no strings of its own:
apps keep their i18n.

Background and evidence: [`docs/03-design-audit.md`](docs/03-design-audit.md).

## Tokens

Source of truth is `src/lib/tokens/*.tokens.json` in DTCG format. `pnpm tokens`
(`scripts/build-tokens.js`, Style Dictionary) generates `tokens.css` (custom properties, prefix
`--cui-`), `tokens.scss` and `tokens.ts` from them. The CSS name is the token path joined with
`-`; colour roles drop their `color` group (`color.text.default` → `--cui-text-default`).

| File                                                             | Contents                                                                |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `palette.tokens.json`                                            | The 18 fixed colours. Components never reference them directly          |
| `color.light.tokens.json`, `color.dark.tokens.json`              | Semantic colour roles; both themes carry the same keys                  |
| `typography.tokens.json`                                         | Families, sizes, weights, line heights, tracking, composite text styles |
| `space.tokens.json`                                              | 4px spacing grid                                                        |
| `radius.tokens.json`, `border.tokens.json`, `shadow.tokens.json` | Shape, strokes, the two float shadows                                   |
| `motion.tokens.json`                                             | Durations and easings                                                   |
| `layout.tokens.json`                                             | z-index scale, breakpoints, control and icon sizes                      |

Tokens marked `$extensions.calliope.status: "comparison"` exist only to compare variants in Storybook (D3).

## Colours

### The palette

| Group   | Values                                                                                                                                                                                                |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neutral | `#000000` black · `#1B1C1D` ink · `#323334` graphite · `#E8EDEB` mist · `#FFFFFF` white                                                                                                               |
| Brand   | `#42C8C8` teal · `#1D8286` teal-dark (focus, links)                                                                                                                                                   |
| Colours | `#98F404` lime · `#34E5DB` cyan · `#3B82F6` blue · `#EEFF41` yellow · `#F8C526` amber · `#FF4E00` orange · `#E4007E` magenta · `#A5289B` plum · `#8073E4` violet · `#6476FD` indigo · `#3FC663` green |
| Error   | `#E53F4B` red (errors only)                                                                                                                                                                           |

The palette follows `Calliope_UX_UI` with three owner decisions (2026-10-29): `#1D8286` replaces
`#25A3A7` for focus and links, MakeCode gets `#A5289B`, and the error red is the draft's
`#E53F4B`. Values found in the apps that are not on this list are mapped to the nearest role
(see audit §1).
`#FAFAFA` (Chalk) becomes `#FFFFFF`; Steel `#90A4A8` is replaced by ink with transparency (D1).

### Roles

| Role                   | Light                                       | Dark       | Use                                                              |
| ---------------------- | ------------------------------------------- | ---------- | ---------------------------------------------------------------- |
| `surface.page`         | white                                       | black      | Page background                                                  |
| `surface.default`      | white                                       | ink        | Panels, cards, inputs, header band                               |
| `surface.subtle`       | mist                                        | graphite   | Secondary areas, chips, hover fill                               |
| `surface.raised`       | white                                       | graphite   | Menus, popovers, dialogs (+ shadow)                              |
| `surface.inverse`      | ink                                         | white      | Primary action, tooltip                                          |
| `text.default`         | ink                                         | white      | Text and icons                                                   |
| `text.muted`           | ink 70 %                                    | white 70 % | Secondary text, placeholder                                      |
| `text.link`            | teal-dark                                   | teal       | Links: colour only, no underline                                 |
| `accent.line`          | teal-dark                                   | teal       | Active navigation marker, "this is yours" stripe                 |
| `accent.highlight`     | magenta                                     | magenta    | Highlight (Auszeichnung): marks a single item, e.g. "new"        |
| `text.error`           | ink                                         | white      | Error messages; the red goes to the icon disc or border          |
| `border.subtle`        | mist                                        | graphite   | Decorative dividers only                                         |
| `border.control`       | ink 60 %                                    | white 60 % | Input, checkbox, radio, switch boundary                          |
| `focus.ring`           | teal-dark                                   | teal       | Focus indicator                                                  |
| `control.on`           | ink                                         | white      | On / checked / filled: switch, checkbox, radio, slider, progress |
| `brand.default`        | teal                                        | teal       | Brand fill (dark text on it), brand text on dark                 |
| `status.success`       | green                                       | green      | Online, connected, done                                          |
| `status.warning`       | amber                                       | amber      | Warning, **paused**                                              |
| `status.error`         | red                                         | red        | Error, offline, destructive                                      |
| `status.info`          | blue                                        | blue       | Information                                                      |
| `identity.ki-training` | lime                                        | lime       | Product KI-Training                                              |
| `identity.teachable`   | yellow                                      | yellow     | Product Teachable                                                |
| `identity.iot`         | indigo                                      | indigo     | Product IoT-WiFi                                                 |
| `identity.robotik`     | orange                                      | orange     | Product Robotik                                                  |
| `identity.makecode`    | plum                                        | plum       | Editor MakeCode                                                  |
| `identity.python`      | violet                                      | violet     | Editor Python                                                    |
| `identity.blocks`      | cyan                                        | cyan       | Editor Blocks                                                    |
| `identity.markdown`    | ink                                         | graphite   | Editor Markdown                                                  |
| `data.series-1…6`      | cyan, magenta, lime, indigo, orange, yellow | same       | Chart series on dark widget cards                                |

Every fill has a paired `.on` text token. The pairs are fixed; nothing else goes on a coloured
fill:

| Fill                                   | Text on it          | Ratio       |
| -------------------------------------- | ------------------- | ----------- |
| teal, lime, cyan, yellow, amber, green | ink `#1B1C1D`       | 7.7–15.5    |
| blue, indigo, violet, orange, red      | **black** `#000000` | 5.1–6.3     |
| plum, magenta                          | white               | 6.2 / 4.6   |
| ink, graphite                          | white               | 17.1 / 12.7 |

Black, not ink, goes on the mid tones because ink on violet is only 4.46:1. This lets
the Python identity carry normal-size text, which the earlier contrast table ruled out.

### Rules

**One job per colour.** Status colours never decorate, identity colours never signal state,
brand never fills a call to action, the highlight colour never means anything but "look here".
Lime is KI-Training, not "online"; orange is Robotik, not "paused". A paused room is
`status.warning`.

**Never colour alone.** Status always comes with a word or an icon. A dot with only a `title` is
not a status display.

**Pairs, not shades.** Contrast comes from choosing the right pair above, never from a lighter or
darker variant of a colour. There are none.

**Quiet brand.** Teal appears on well under 10 % of a screen. It marks focus and "this is yours".

**Dark areas inside the light theme.** The header band, the IoT widget cards and dark panels are
subtrees with `data-theme="dark"`; inside them every role switches to its dark value. There is no
beamer theme for now.

## Typography

Two families, both self-hosted variable fonts: **Roboto** (as Campus already ships) for text,
labels and captions, and **Roboto Condensed** (`font.family.condensed`, as in the draft) for
headings (display, h1–h3) and button labels (decided 2026-10-31). Sizes and weights are the same
as in Roboto; the condensed cut only runs narrower, so long German words fit buttons and titles.
Headings stay in sentence case (the draft's uppercase H1/H2 is not adopted), H1 stays 24 on the
scale instead of the draft's 26. One mono stack (`ui-monospace, SFMono-Regular, Menlo, Consolas,
monospace`) serves code, serial output and room codes. Apps load both fonts
(`@fontsource-variable/roboto`, `@fontsource-variable/roboto-condensed`); without the condensed
one the stack falls back to Roboto.

| Style    | Size                            | Weight | Line height | Use                                        |
| -------- | ------------------------------- | ------ | ----------- | ------------------------------------------ |
| display  | clamp(40–61px)                  | 700    | 1.1         | Entry surfaces only, once per page         |
| h1       | 24                              | 600    | 1.2         | Page title                                 |
| h2       | 20                              | 600    | 1.2         | Section, dialog title                      |
| h3       | 18                              | 600    | 1.2         | Panel and card title                       |
| subtitle | 14 uppercase, +0.04em           | 500    | 1.4         | Section label                              |
| body     | 16                              | 400    | 1.4         | Default (prose blocks: 1.5)                |
| label    | 14                              | 500    | 1.4         | Form labels, menu items, segmented control |
| caption  | 12                              | 500    | 1.4         | Badges, timestamps                         |
| action   | 12 / 14 / 16 uppercase, +0.04em | 600    | 1.2         | Button labels s / m / l                    |
| readout  | 32 tabular                      | 700    | 1           | Live machine values (IoT)                  |

Weights are 400/500/600/700 only. The scale replaces 50 distinct sizes in Campus; values within
1px snap to it.

**Back-row rule.** Nothing a teacher reads while standing is below 14px; nothing on a projected
surface (Live Wall, IoT fullscreen) is below 16px. Captions at 12px are for metadata only.

## Space, shape, elevation

- **Spacing** is a 4px grid: 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px (`space.0-5` to
  `space.16`). Component padding defaults to 16; dialogs 24.
- **Pill means press me.** Buttons, chips and switches are pills (`radius.full`).
  **Rounded rectangle means read me:** inputs, segmented control, non-interactive tags 6px
  (`radius.md`, the draft's 5), cards and menus 8px, large panels 12px, dialogs 20px.
  Non-interactive badges are therefore `radius.md`, not pills.
- **Borders:** 1px `border.subtle` for dividers; 1px `border.control` around fields; 2px for
  checkbox, radio, outline buttons (D3) and the accent line.
- **Flat or float.** Only things that float get a shadow: `shadow.menu` (menus, popovers, toasts,
  tooltips) and `shadow.dialog`. Cards at rest have a border, never a shadow or a hover lift.
- **Stacking order:** base 0, raised 1, sticky 10, header 100, dropdown 1000, overlay 1100,
  dialog 1200, toast 1300, tooltip 1400. Nothing above that.

## Focus and interaction

- **Focus ring:** `outline: 2px solid var(focus.ring); outline-offset: 2px` on `:focus-visible`,
  defined once in `styles.css` inside `@layer calliope.base`. Components may change the offset,
  never remove the outline. Contrast: 4.58:1 on white, 3.87:1 on mist, 10.3:1 on black,
  8.4:1 on ink.
- **Links** are coloured, not underlined: `#1D8286` on light (4.58:1 against white, 3.73:1
  against ink body text, which meets the 3:1 link rule of WCAG technique G183), `#42C8C8` on
  dark. On hover and focus they gain an underline, so a link is not told apart by colour alone
  when it is being used.
- **Hover** is a tint (`action.hover`, ink 8 % / white 12 %) or the `inverse-hover` fill.
  Hover never carries information that focus and touch do not also get.
- **Disabled** uses the native `disabled` attribute (or `aria-disabled` when the control must
  stay focusable to explain why), shown at 40 % opacity. Disabled controls are exempt from
  contrast, but a disabled primary action gets a visible reason (FieldHint or Tooltip).
- **Targets:** at least 24×24px hit area for everything (WCAG 2.5.8); icon buttons pad up to the
  control height (D6).
- **Motion:** 150 ms (hover, menus), 200 ms (state change), 300 ms (dialogs), ease. Under
  `prefers-reduced-motion: reduce` everything is instant except the spinner, which keeps turning
  slowly. JS transitions use the library's `prefersReducedMotion` helper. No `transition: all`.

## Components (Waves 1 and 2)

All components: Svelte 5 runes, snippets, callback props; no built-in text (composites take a
`labels` prop with German defaults); every state (default, hover, focus, active, disabled,
loading, error) visible in Storybook; WCAG 2.1 AA checked with addon-a11y plus keyboard and
screen reader.

Built in Waves 1 and 2 (`src/lib/components/`, each with an overview story of all states, Do/Don't and
"use instead", plus Vitest tests of roles, names, keyboard and focus). Composites with a fixed
word take it as a prop with a German default (`closeLabel="Schließen"`,
`cancelLabel="Abbrechen"`). Component CSS sits in `@layer calliope.components`; elements that
bits-ui renders are styled by `.cui-*` class from a plain CSS file next to the component.
`Rezepte/IoT-Dashboard` in Storybook assembles the IoT dashboard from Wave 1 and 2 parts as the
blueprint for its migration in Campus.

### Icon

`<Icon name="download" size="s|m|l" />` with semantic names (16 / 20 / 24px), decorative unless
it gets a `label`. The SVG bodies are baked in by `pnpm icons` (`scripts/build-icons.js`), so
apps need no icon plugin. The library ships Material Symbols Rounded for now (as Campus today);
the set is still to be decided after the PrimeIcons comparison in Storybook (Foundations/Icons);
switching is one constant in the script, and the map there already names the PrimeIcons
equivalent of every semantic name.

### Button

`variant`: primary (ink fill, white text; dark theme: white fill, ink text) ·
secondary (outline, 2px `border.strong`) · ghost (no border, hover tint) · link (`text.link`, no
underline until hover or focus). `tone`: neutral · positive · negative · identity. `size`: s / m / l =
32 / 36 / 40px high, action text 12 / 14 / 16.

- Native `type` stays HTML and defaults to `"button"`.
- Border: 2px at every size (D3). Storybook also shows the comparison variant
  `border-width.button-scaled` (1.5 / 2 / 2.5px for s / m / l, close to the label's stroke).
- Tones only fill: positive = green + ink text, negative = red + black text, identity =
  identity fill + its `.on` text. There is no coloured text on white (lime text was 1.30:1).
- `pressed` turns it into a toggle (`aria-pressed`) with a stable label; the room pause control
  becomes "Raum pausieren" pressed/unpressed plus a separate `status.warning` badge "Pausiert".
- `loading` keeps the width, shows the Spinner, sets `aria-busy`.
- Built API: `icon` / `iconEnd` (icon names), `href` renders an `<a>`, `fullWidth`,
  `focusableWhenDisabled` (keeps a disabled button in the tab order with `aria-disabled` so a
  Tooltip can give the reason), `ref`. `tone` applies to `variant="primary"` only; with
  `tone="identity"`, `identity` picks the fill. Hover on tone fills layers the fixed
  `action.hover` tint instead of a lighter shade.

### IconButton

Required `label` (becomes `aria-label` and the optional Tooltip). Icon is `aria-hidden`. Same
sizes as Button, circular, hit area never below 24px. Variants ghost (default), secondary,
primary. `tooltip` defaults to true and shows the label; turn it off where the meaning is
obvious in context (the dialog's close button). Works as a Menu trigger with its tooltip.

### Dialog, ConfirmDialog (pilot)

bits-ui Dialog: focus moves in on open, is trapped, background is inert, focus returns to the
trigger, Escape closes from anywhere, unique `aria-labelledby`. Surface `surface.raised`,
`radius.dialog`, `shadow.dialog`, scrim `surface.scrim`. Widths 400 / 600 / 800px.
ConfirmDialog replaces every `window.confirm/alert/prompt`, has a destructive tone and a verb on
the confirm button ("Löschen", not "OK").

- Dialog: `open` (bindable) or an optional `trigger` snippet, `title`, `description`,
  `size` s / m / l, `actions` snippet (primary action last), `dismissible={false}` blocks Escape
  and scrim for required choices, `showClose`, `closeLabel`. Focus goes to `initialFocus`, else
  the first form field of the body, else the first focusable element.
- ConfirmDialog is a bits-ui AlertDialog (`role="alertdialog"`), 400px wide. `tone="negative"`
  makes the confirm button red with black text and starts focus on cancel. `onConfirm` may
  return a promise: the button shows the spinner and the dialog closes when it resolves (stays
  open if it rejects). `cancelLabel={null}` gives a one-button notice (`alert`); children add
  content such as a TextField (`prompt`).
- `confirmDialog(options): Promise<boolean>` is the drop-in for `window.confirm`; it needs one
  `<ConfirmDialogHost />` in the app layout and queues concurrent requests.

### Menu, Tooltip

bits-ui DropdownMenu and Tooltip. The trigger is the consumer's own button. Arrow keys,
Home/End, typeahead, Escape returns focus. Selection is `menuitemradio` with a check, never the
disabled style. Tooltip opens on hover and focus, is dismissible with Escape, never holds
interactive content, and never names an icon-only button on its own.

- Menu: `trigger` snippet (spread `props` onto a Button or IconButton), `side`, `align`. Children
  are `MenuItem` (`icon`, `onSelect`, `disabled`, `tone="negative"`: red icon, ink text),
  `MenuRadioGroup` (`value` bindable, visible `label`) with `MenuRadioItem`, `MenuGroup`
  (`label`) and `MenuSeparator`. Items are 36px high, `label` type, hover and keyboard highlight
  share `action.hover`.
- Tooltip: `text`, `trigger` snippet, `side`, `delay` (400ms hover; keyboard focus opens it at
  once). Surface `surface.inverse`, label type (14px, back-row rule), `radius.md`.

### Switch, Checkbox, Radio

Switch: `role="switch"`, 48×28 track, knob position plus fill tell on/off apart. Checkbox and
radio 24px, 2px `border.control`. Checked, on and slider fill use `control.on` (ink on
light, white on dark).
Help text is linked with `aria-describedby`, never nested inside the control.

- Switch (built): bits-ui Switch with a visible `label` and optional `hint`; `labelPosition`
  start / end. Off: 2px `border.control` outline with a 16px knob in the same colour on the left.
  On: `control.on` fill with a 20px `control.on-mark` knob on the right, so position and size
  carry the state as well as fill.
- Checkbox (built): bits-ui Checkbox with `label`, `hint`, `error`, `indeterminate` (bar mark,
  `aria-checked="mixed"`), `required`, `name`/`value`. 2px `border.control`, `radius.sm`; checked
  fills with `control.on` and draws the mark in `control.on-mark`; error turns the boundary red
  and adds the FieldHint disc. Groups use a native `fieldset` + `legend`.
- RadioGroup + Radio (built): bits-ui RadioGroup with a visible group `label` (`aria-labelledby`),
  `hint`, `error`, `orientation`. Radio: `value`, `label`, optional `hint` line, `disabled`.
  Checked = `control.on` ring and a 12px dot. `variant="swatch"` makes 32px colour discs
  (`swatch`: any CSS colour, typically `data.series-*`; `glyph` for one or two characters on the
  outlined "automatic" disc); the label names the disc for assistive tech and as its title, and
  the selection is a 2px `control.on` ring outside a 2px surface gap, so it reads on any fill.

### TextField, Label, FieldHint

Visible label required (placeholder is never the label). 40px high, `surface.default`, 1px
`border.control`, `radius.md`. Hint and error linked via `aria-describedby`; error sets
`aria-invalid` and is announced politely; error text is `text.error` (ink / white) next to a
red icon disc with a black mark.

- Built: `label` (required), `value` (bindable), `type`, `hint`, `error`, an `end` snippet for an
  adornment (show-password IconButton), `ref`; other attributes go to the `<input>`. The error
  sits in an always-present `aria-live="polite"` region and the field gets a 2px red boundary.
  `Label` and `FieldHint` (`tone="error"` draws the disc) are exported for custom controls.

### Select, Combobox

Both look like the TextField (40px, `border.control`, `radius.md`, label, hint, error) and open
the menu surface (`.cui-menu`, `.cui-menu-item`) with a check on the chosen item. Focus stays on
the field (`aria-activedescendant`), so the keyboard-highlighted option gets the focus ring while
the keyboard drives the list. The list is portalled to `<body>` and copies `data-theme` from the
field, so it stays dark inside a dark area.

- Select: bits-ui Select, `items` (`{ value, label, disabled? }`), `value` (bindable,
  undefined until chosen), `placeholder`, `hint`, `error`, `required` (`aria-required` on the
  trigger), `name` (hidden input). For about 4–15 fixed options.
- Combobox: bits-ui Combobox for long lists picked by typing (room-code words). The default
  filter is case-insensitive "contains" with start-of-word matches first; `filter` replaces it.
  `emptyLabel` ("Keine Treffer") shows in the list and is announced by a polite live region.
  Typing the full label and leaving the field picks that item; clearing the text clears the value.

### Slider, ProgressBar

Track 4px (slider, `border.control`) or 8px (progress, `surface.subtle`), fill `control.on`,
`radius.full`. Never a status or identity colour for the fill.

- Slider: bits-ui Slider (single), visible `label` naming the thumb (`aria-labelledby`), `min`,
  `max`, `step`, `showValue` (tabular, at the end of the label row), `formatValue` (also the
  `aria-valuetext`), `onValueCommit` for expensive effects (sending to devices), `hint`, `name`
  (hidden input). Thumb 20px `control.on` with a 2px surface ring; 24px hit area.
- ProgressBar: bits-ui Progress, `label`, `value` (`null` = indeterminate: a sliding 30 %
  segment, a static dashed full-width fill under reduced motion), `max`, `showValue`,
  `formatValue` (default `formatPercent`, "42 %"), `hint`.

### Tabs, SegmentedControl

Tabs switch panels of content; SegmentedControl picks a mode or value from two to four options
and changes the view at once.

- Tabs: compound `Tabs` (`value` bindable, required) > `TabList` (`label`) > `Tab` (`value`,
  `icon`, `disabled`) and `TabPanel`. 40px tabs, label type, inactive `text.muted`; the active tab
  carries the 2px `accent.line` marker. The list scrolls sideways when it does not fit (no
  scrollbar shown); the focus ring sits inside the tab. Arrow keys activate.
- SegmentedControl: bits-ui RadioGroup (one tab stop, arrows move and select). `label`
  (accessible name; `labelVisible` shows it), `options` (`{ value, label, icon?, disabled? }`),
  `size` s / m / l (default l, 40px), `fullWidth`. `radius.md` frame with 1px `border.control`
  and 2px inset; the chosen segment fills with `control.on` and `control.on-mark` text.

### Badge, Chip, StatusDot

- Badge (built): `radius.md` (a non-interactive badge is never a pill), `tone` neutral
  (`surface.subtle`) · success · warning · error · info · highlight · identity (+ `identity`),
  each fill with its paired text. `size` s (12px caption) / m (14px label), optional `icon` and
  `swatch` (8px colour marker for a device colour).
- Chip (built): the pill that is pressed. With `selected` (bindable) it is a filter toggle
  (`aria-pressed`, selected = `control.on` fill with a check); with `onRemove` it is a value with
  a 24px remove button named "<label> entfernen" (`removeLabel`). Optional `icon`, `swatch`.
- StatusDot (built): dot plus a visible word (`label`, required). Each status has its own shape:
  success circle, warning diamond, error square, info circle, neutral ring. `hideLabel` keeps
  the word for assistive tech only (tables with a "Status" column). `size` s / m / l = 12 / 14 /
  16px text; on teacher and projected surfaces at least m / l.

### Spinner, Banner, EmptyState, Toast

Spinner: `role="status"` with a label prop, optional delay (`delay={300}`), one shared keyframe;
without a label it is decorative (inside a busy button). No track ring (it would be a new
shade).

- Banner (built): `tone` info · success · warning · error, `title`, message as children,
  `actions` snippet, `onDismiss` + `dismissLabel`. `role="alert"` for errors, `role="status"`
  otherwise, `live="none"` for a banner present from page load. Neutral surface with a 1px
  `border.subtle` frame, a 4px status stripe on the left and a 24px status icon disc with the
  paired mark colour; text stays `text.default`.
- EmptyState (built): `title` (heading of `level` 2–4), `description`, `icon` on a neutral
  `surface.subtle` disc, `actions` snippet, `compact` (left-aligned, no icon) for tables and small
  panels. No status colour: an empty list is not an error.
- Toast (built): `<Toaster />` once in the layout wraps svelte-sonner unstyled; `toast()` and
  `toast.success/info/warning/error/promise` are re-exported. Same anatomy as the Banner on
  `surface.raised` with `shadow.menu`; neutral toasts have no stripe colour. Action and cancel
  look like Button s secondary / ghost. Errors should pass `duration: Infinity`. Props:
  `position` (bottom-right), `duration` (5s), `closeButton`, `closeLabel`, `label` (region name).

### Popover

bits-ui Popover with the consumer's own trigger (`trigger` snippet), optional `title` (also the
dialog's name), `showClose`, `side`, `align`, `size` s / m / l (16 / 20 / 24rem). Surface like the
menu (`surface.raised`, `radius.lg`, `shadow.menu`), 16px padding. May hold fields and buttons,
unlike the Tooltip; focus moves in and returns to the trigger.

### VisuallyHidden, LiveRegion

VisuallyHidden keeps text in the accessibility tree only (clip-path, not `display: none`).
LiveRegion is present from the first render and puts its `message` in one frame later, so every
change is announced; `politeness` polite (`role="status"`) or assertive (`role="alert"`),
`visible` shows the text too.

## Do and don't

**Do**

- Reference semantic tokens (`--cui-text-default`), never palette tokens or hex.
- Put the paired `.on` colour on every fill.
- Give every status a word or icon; give every icon-only button a label.
- Snap sizes to the type scale and spacing to the 4px grid.
- Design the frame and stop at the iframe boundary.

**Don't**

- Use tints, shades, `color-mix()` or opacity to make new colours. The only exception are the
  fixed alpha neutrals (`text.muted`, `border.control`, `action.hover`, `surface.scrim`).
- Use `outline: none` without an equivalent visible ring.
- Underline links at rest, or colour error text red.
- Use identity colours for state or status colours for identity.
- Put text below 14px on anything a teacher reads at distance.
- Add a shadow to a resting card or lift it on hover.
- Hard-code strings in a library component.

## Decisions

### Settled (owner, 2026-10-29)

| #   | Question                                     | Decision                                                                                                                                                                                                    |
| --- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Mid-grey for secondary text and form borders | Ink / white with fixed alpha: 70 % text, 60 % borders, plus the hover tint and the scrim. No extra grey                                                                                                     |
| D2  | Colour of on / checked / filled controls     | Ink (light) / white (dark). Indigo stays IoT-WiFi only                                                                                                                                                      |
| D3  | Border of outline buttons                    | 2px at every size. Storybook shows a comparison with a border that grows with button size (1.5 / 2 / 2.5px)                                                                                                 |
| D4  | Data series in IoT charts                    | Six palette colours on dark widget cards (cyan, magenta, lime, indigo, orange, yellow), assigned by device serial, always with name and marker shape; status colours excluded                               |
| –   | Non-interactive badges                       | Rounded rectangles (`radius.md`); the pill means "press me"                                                                                                                                                 |
| –   | Tints                                        | None. Notices show their status colour as a stripe or icon                                                                                                                                                  |
| –   | Links                                        | Not underlined; link and focus colour `#1D8286` on light                                                                                                                                                    |
| –   | MakeCode                                     | `#A5289B`; `#E4007E` stays as the highlight colour (`accent.highlight`)                                                                                                                                     |
| –   | Error red                                    | `#E53F4B` (the draft's red). Too light for text on white (4.08:1): error text stays ink next to a red icon, the destructive button has black text (5.1:1)                                                   |
| D5  | Wave order                                   | Wave 1 = tokens, Button/IconButton, Icon, Spinner, Dialog/ConfirmDialog, Menu, Tooltip, TextField, Switch. Checkbox, Radio, Badge move to Wave 2; Combobox, LiveRegion and a chart pattern join the backlog |
| D6  | Minimum touch target                         | 24×24px everywhere (WCAG 2.5.8); pupil-facing views default to size l (40px)                                                                                                                                |
