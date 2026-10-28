---
name: calliope-ui
description: Shared design system for Calliope's Svelte apps — a calm light canvas, dark chrome, one fixed palette in which every colour has exactly one job, legible from the back row of a classroom.
status: draft (Phase 0, 2026-10-28). Normative once the open decisions at the end are settled.
tokens: src/lib/tokens/*.tokens.json (DTCG)
colors:
  black: '#000000'
  graphite: '#1B1C1D'
  coal: '#323334'
  mint: '#E8EDEB'
  white: '#FFFFFF'
  cyan: '#42C8C8'
  cyan-strong: '#25A3A7'
  lime: '#98F404'
  aqua: '#34E5DB'
  blue: '#3B82F6'
  lemon: '#EEFF41'
  amber: '#F8C526'
  orange: '#FF4E00'
  magenta: '#E4007E'
  violet: '#8073E4'
  indigo: '#6476FD'
  green: '#3FC663'
  red: '#C8102E'
typography:
  display: { fontFamily: Roboto, fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 700, lineHeight: 1.1 }
  h1: { fontFamily: Roboto, fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.2 }
  h2: { fontFamily: Roboto, fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.2 }
  h3: { fontFamily: Roboto, fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.2 }
  subtitle: { fontFamily: Roboto, fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.4, letterSpacing: '0.04em', textTransform: uppercase }
  body: { fontFamily: Roboto, fontSize: '1rem', fontWeight: 400, lineHeight: 1.4 }
  label: { fontFamily: Roboto, fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.4 }
  caption: { fontFamily: Roboto, fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.4 }
  action: { fontFamily: Roboto, fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.2, letterSpacing: '0.04em', textTransform: uppercase }
  readout: { fontFamily: Roboto, fontSize: '2rem', fontWeight: 700, lineHeight: 1, fontVariantNumeric: tabular-nums }
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

Source of truth is `src/lib/tokens/*.tokens.json` in DTCG format. Phase 1 builds them with Style
Dictionary into `tokens.css` (custom properties, prefix `--calliope-`), `tokens.scss` and
`tokens.ts`.

| File | Contents |
|---|---|
| `palette.tokens.json` | The 18 fixed colours. Components never reference them directly |
| `color.light.tokens.json`, `color.dark.tokens.json` | Semantic colour roles; both themes carry the same keys |
| `typography.tokens.json` | Families, sizes, weights, line heights, tracking, composite text styles |
| `space.tokens.json` | 4px spacing grid |
| `radius.tokens.json`, `border.tokens.json`, `shadow.tokens.json` | Shape, strokes, the two float shadows |
| `motion.tokens.json` | Durations and easings |
| `layout.tokens.json` | z-index scale, breakpoints, control and icon sizes |

Tokens marked `$extensions.calliope.status: "proposed"` depend on an open decision.

## Colours

### The palette

| Group | Values |
|---|---|
| Neutral | `#000000` black · `#1B1C1D` graphite · `#323334` coal · `#E8EDEB` mint · `#FFFFFF` white |
| Brand | `#42C8C8` cyan · `#25A3A7` cyan-strong |
| Colours | `#98F404` lime · `#34E5DB` aqua · `#3B82F6` blue · `#EEFF41` lemon · `#F8C526` amber · `#FF4E00` orange · `#E4007E` magenta · `#8073E4` violet · `#6476FD` indigo · `#3FC663` green |
| Error | `#C8102E` red (errors only) |

Values found in the apps that are not on this list are mapped to the nearest role (see audit §1).
`#FAFAFA` (Chalk) becomes `#FFFFFF`; Steel `#90A4A8` has no successor colour (decision D1).

### Roles

| Role | Light | Dark | Use |
|---|---|---|---|
| `surface.page` | white | black | Page background |
| `surface.default` | white | graphite | Panels, cards, inputs, header band |
| `surface.subtle` | mint | coal | Secondary areas, chips, hover fill |
| `surface.raised` | white | coal | Menus, popovers, dialogs (+ shadow) |
| `surface.inverse` | graphite | white | Primary action, tooltip |
| `text.default` | graphite | white | Text and icons |
| `text.muted` | graphite 70 % | white 70 % | Secondary text, placeholder (D1) |
| `text.link` + `accent.line` | graphite + cyan-strong 2px | cyan | Links, active navigation |
| `text.error` | red | white (red goes to icon/border) | Error messages |
| `border.subtle` | mint | coal | Decorative dividers only |
| `border.control` | graphite 60 % | white 60 % | Input, checkbox, radio, switch boundary (D1) |
| `focus.ring` | cyan-strong | cyan | Focus indicator |
| `brand.default` | cyan | cyan | Brand fill (dark text on it), brand text on dark |
| `status.success` | green | green | Online, connected, done |
| `status.warning` | amber | amber | Warning, **paused** |
| `status.error` | red | red | Error, offline, destructive |
| `status.info` | blue | blue | Information |
| `identity.ki-training` | lime | lime | Product KI-Training |
| `identity.teachable` | lemon | lemon | Product Teachable |
| `identity.iot` | indigo | indigo | Product IoT-WiFi |
| `identity.robotik` | orange | orange | Product Robotik |
| `identity.makecode` | magenta | magenta | Editor MakeCode |
| `identity.python` | violet | violet | Editor Python |
| `identity.blocks` | aqua | aqua | Editor Blocks |
| `identity.markdown` | graphite | coal | Editor Markdown |

Every fill has a paired `.on` text token. The pairs are fixed; nothing else goes on a coloured
fill:

| Fill | Text on it | Ratio |
|---|---|---|
| cyan, lime, aqua, lemon, amber, green | graphite `#1B1C1D` | 7.7–15.5 |
| blue, indigo, violet, orange | **black** `#000000` | 5.5–6.3 |
| red, magenta | white | 5.9 / 4.6 |
| graphite, coal | white | 17.1 / 12.7 |

Black, not graphite, goes on the mid tones because graphite on violet is only 4.46:1. This lets
the Python identity carry normal-size text, which the earlier contrast table ruled out.

### Rules

**One job per colour.** Status colours never decorate, identity colours never signal state,
brand never fills a call to action. Lime is KI-Training, not "online"; orange is Robotik, not
"paused". A paused room is `status.warning`.

**Never colour alone.** Status always comes with a word or an icon. A dot with only a `title` is
not a status display.

**Pairs, not shades.** Contrast comes from choosing the right pair above, never from a lighter or
darker variant of a colour. There are none.

**Quiet brand.** Cyan appears on well under 10 % of a screen. It marks focus and "this is yours".

**Dark areas inside the light theme.** The header band, the IoT widget cards and dark panels are
subtrees with `data-theme="dark"`; inside them every role switches to its dark value. There is no
beamer theme for now.

## Typography

One family, **Roboto** (self-hosted variable font, as Campus already ships), plus one mono stack
(`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`) for code, serial output and room
codes. Roboto Condensed for H1/H2 and uppercase buttons is tested in Storybook before it is
adopted (decided); until then H1 is Roboto 24 instead of the draft's Condensed 26.

| Style | Size | Weight | Line height | Use |
|---|---|---|---|---|
| display | clamp(40–61px) | 700 | 1.1 | Entry surfaces only, once per page |
| h1 | 24 | 600 | 1.2 | Page title |
| h2 | 20 | 600 | 1.2 | Section, dialog title |
| h3 | 18 | 600 | 1.2 | Panel and card title |
| subtitle | 14 uppercase, +0.04em | 500 | 1.4 | Section label |
| body | 16 | 400 | 1.4 | Default (prose blocks: 1.5) |
| label | 14 | 500 | 1.4 | Form labels, menu items, segmented control |
| caption | 12 | 500 | 1.4 | Badges, timestamps |
| action | 12 / 14 / 16 uppercase, +0.04em | 600 | 1.2 | Button labels s / m / l |
| readout | 32 tabular | 700 | 1 | Live machine values (IoT) |

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
  never remove the outline. Contrast: 3.05:1 on white, 10.3:1 on black, 8.4:1 on graphite.
- On `surface.subtle` (mint) the teal ring drops to 2.58:1, so containers that use mint set
  `data-surface="subtle"`, and there `focus.ring` switches to graphite (14.4:1).
- **Hover** is a tint (`action.hover`, graphite 8 % / white 12 %) or the `inverse-hover` fill.
  Hover never carries information that focus and touch do not also get.
- **Disabled** uses the native `disabled` attribute (or `aria-disabled` when the control must
  stay focusable to explain why), shown at 40 % opacity. Disabled controls are exempt from
  contrast, but a disabled primary action gets a visible reason (FieldHint or Tooltip).
- **Targets:** at least 24×24px hit area for everything (WCAG 2.5.8); icon buttons pad up to the
  control height (D6).
- **Motion:** 150 ms (hover, menus), 200 ms (state change), 300 ms (dialogs), ease. Under
  `prefers-reduced-motion: reduce` everything is instant except the spinner, which keeps turning
  slowly. JS transitions use the library's `prefersReducedMotion` helper. No `transition: all`.

## Components (Wave 1 and the pilot)

All components: Svelte 5 runes, snippets, callback props; no built-in text (composites take a
`labels` prop with German defaults); every state (default, hover, focus, active, disabled,
loading, error) visible in Storybook; WCAG 2.1 AA checked with addon-a11y plus keyboard and
screen reader.

### Button

`variant`: primary (graphite fill, white text; dark theme: white fill, graphite text) ·
secondary (outline, 2px `border.strong`) · ghost (no border, hover tint) · link (graphite text,
2px cyan-strong underline). `tone`: neutral · positive · negative · identity. `size`: s / m / l =
32 / 36 / 40px high, action text 12 / 14 / 16.

- Native `type` stays HTML and defaults to `"button"`.
- Tones only fill: positive = green + graphite text, negative = red + white text, identity =
  identity fill + its `.on` text. There is no coloured text on white (lime text was 1.30:1).
- `pressed` turns it into a toggle (`aria-pressed`) with a stable label; the room pause control
  becomes "Raum pausieren" pressed/unpressed plus a separate `status.warning` badge "Pausiert".
- `loading` keeps the width, shows the Spinner, sets `aria-busy`.

### IconButton

Required `label` (becomes `aria-label` and the optional Tooltip). Icon is `aria-hidden`. Same
sizes as Button, circular, hit area never below 24px.

### Dialog, ConfirmDialog (pilot)

bits-ui Dialog: focus moves in on open, is trapped, background is inert, focus returns to the
trigger, Escape closes from anywhere, unique `aria-labelledby`. Surface `surface.raised`,
`radius.dialog`, `shadow.dialog`, scrim `surface.scrim`. Widths 400 / 600 / 800px.
ConfirmDialog replaces every `window.confirm/alert/prompt`, has a destructive tone and a verb on
the confirm button ("Löschen", not "OK").

### Menu, Tooltip

bits-ui DropdownMenu and Tooltip. The trigger is the consumer's own button. Arrow keys,
Home/End, typeahead, Escape returns focus. Selection is `menuitemradio` with a check, never the
disabled style. Tooltip opens on hover and focus, is dismissible with Escape, never holds
interactive content, and never names an icon-only button on its own.

### Switch, Checkbox, Radio

Switch: `role="switch"`, 48×28 track, knob position plus fill tell on/off apart. Checkbox and
radio 24px, 2px `border.control`. Checked, on and slider fill use the control accent (D2).
Help text is linked with `aria-describedby`, never nested inside the control.

### TextField, Label, FieldHint

Visible label required (placeholder is never the label). 40px high, `surface.default`, 1px
`border.control`, `radius.md`. Hint and error linked via `aria-describedby`; error sets
`aria-invalid` and is announced politely; error text is `text.error` with an error icon.

### Badge, StatusDot

Badge: `radius.md`, caption or label size, fill + paired text. StatusDot: 8px dot plus a visible
word (or a distinct shape plus visually hidden text); `title` alone is not allowed. On teacher and
projected surfaces the word is at least 14 / 16px.

### Spinner, Banner, EmptyState, Toast

Spinner: `role="status"` with a label prop, optional 300 ms delay, one shared keyframe. Banner:
`role="status"` or `role="alert"` by severity, status fill as a 4px side stripe or icon disc plus
`text.default` (no tinted backgrounds). EmptyState: title, text, optional primary action.
Toast: thin wrapper around svelte-sonner with the same severities.

## Do and don't

**Do**
- Reference semantic tokens (`--calliope-color-text-default`), never palette tokens or hex.
- Put the paired `.on` colour on every fill.
- Give every status a word or icon; give every icon-only button a label.
- Snap sizes to the type scale and spacing to the 4px grid.
- Design the frame and stop at the iframe boundary.

**Don't**
- Use tints, shades, `color-mix()` or opacity to make new colours (the alpha neutrals in D1 are
  the only exception, if approved).
- Use `outline: none` without an equivalent visible ring.
- Use identity colours for state or status colours for identity.
- Put text below 14px on anything a teacher reads at distance.
- Add a shadow to a resting card or lift it on hover.
- Hard-code strings in a library component.

## Open decisions

Each has a recommendation; the token draft already follows it and marks it `proposed`.

| # | Question | Options | Recommendation |
|---|---|---|---|
| D1 | The palette jumps from coal `#323334` to mint `#E8EDEB`. Secondary text, placeholders and form-control borders (Steel today, ~95 uses) need something in between. | (a) graphite / white with fixed alpha (70 % text = 6.3:1 on white / 5.3:1 on mint, 60 % border = 4.5:1 / 3.8:1) · (b) only coal, differentiate by size and weight · (c) add one grey to the palette | **(a)**: no new colour, the draft already draws its greys this way, passes AA on white and mint |
| D2 | Colour of "on / checked / filled" in switch, checkbox, radio, slider, progress. The draft uses indigo `#6476FD`, which is IoT-WiFi identity. | (a) graphite (neutral) · (b) indigo as in the draft · (c) brand cyan-strong | **(a)**: keeps one job per colour, 17:1, also what the draft's second page shows |
| D3 | Border of outline buttons. Campus: 4px (signature, touch); draft: 2.5 / 2.2 / 1.9. | (a) 2px all sizes · (b) keep 4px · (c) 3px | **(a)**: follows the draft and reads lighter next to filled buttons; the 36–40px height carries the touch target |
| D4 | Colours of data series (several Calliope minis in one IoT chart). Campus DESIGN.md wants four muted derived hues, which a fixed palette does not allow. | (a) six palette colours on the dark widget cards (aqua, magenta, lime, indigo, orange, lemon), assigned by serial number, always with name + marker shape · (b) graphite / coal with line styles only · (c) allow a separate data palette outside the fixed palette | **(a)**: inside a chart the legend names each series, so overlap with product identity is acceptable there; status colours stay excluded |
| D5 | Wave order. The audit's largest P1 clusters are dialogs and menus. | (a) Wave 1 = tokens, Button/IconButton, Icon, Spinner, Dialog/ConfirmDialog, Menu, Tooltip, TextField, Switch; Checkbox/Radio/Badge move to Wave 2 · (b) keep the plan's waves | **(a)**: the pilot is "buttons + dialogs" anyway, and Menu needs Tooltip because Dropdown is misused as a tooltip today |
| D6 | Minimum touch target on pupil surfaces (iPads in use). | (a) 24px everywhere (WCAG 2.2 AA), default control 36–40px · (b) 44px on pupil surfaces | **(a)**, with size l (40px) as the default in pupil-facing views |
