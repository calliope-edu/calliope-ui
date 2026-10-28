# Design audit: Campus + IoT dashboard (Phase 0, 2026-10-28)

Read-only audit of `editors/calliope-campus` at `8edcbd6` (`src/`, 293 files), with the IoT
dashboard reported separately (`editors/Iot*`, `services/iot/*`, 29 files), plus the design drafts
in `docs/input/`. Counts come from regex scripts over the source (comments stripped,
`colors.scss` and `src/paraglide` excluded). The app was not run; findings marked *(verify)*
depend on runtime behaviour. Contrast ratios are computed with the WCAG 2.x formula.

Results feed into [`../DESIGN.md`](../DESIGN.md) (the design system) and the token draft in
[`../src/lib/tokens/`](../src/lib/tokens/).

---

## 1. Value drift (what the tokens have to absorb)

| Area | Campus (without IoT) | IoT dashboard |
|---|---|---|
| Literal colours | **943** in 84 files (165 hex, 105 rgb, 53 hsl distinct) | **227** in 11 files |
| `var(--color-*)` uses | 506 (63 tokens) | **0** – own SCSS variables (`$green: #9af406`, `$bg: #1c1d1f`, three different `$muted`) |
| Undefined `--color-*` names used | 69 uses of 23 names (`neutral-90`, `neutral-60`, `danger` …) | – |
| Tailwind slate / gray, Bootstrap | 165 + 22 literals | – |
| Alpha colours (rgba / hsl with alpha) | 263 + 20 | 56 |
| Distinct font sizes | **50** (0.85/0.9/0.95/0.92rem are the drift) | 16 |
| Spacing values off the 4px grid | 24 % (0.6, 0.4, 0.85, 0.9rem, 6px) | 27 % |
| Distinct radii | 35 | 10 |
| Distinct box-shadows | **48** | 3 |
| Spinner `@keyframes` | **11** copies of the same spin | – |
| z-index values | 20 distinct, up to `999999`; `IframeOverlay` ("below modals") sits above `Modal` | 8 |
| Monospace stacks | 10 | 1 |
| `outline: none` | 31 in 27 files | 0 (but lime focus ring, 1.37:1) |

The mini-connection-widget adds 379 colour literals (113 distinct): GitHub Primer and Tailwind
greys, brand cyan as `#00B8CC` / `#0EA5B7`. It already reads ~20 `--mkc-*` variables that it
never defines, which is the natural hook for calliope-ui tokens.

### Mapping onto the fixed palette

| Today | Uses | Becomes |
|---|---|---|
| Chalk `#FAFAFA`, `#F8FAFC`, `#F8F9FA` | ~60 | `#FFFFFF` (`surface.page`) |
| `#1B1C1D`, `hsl(210 4% 11%)`, slate-900, `#1C1D1F`, `#111827` | ~90 | `#1B1C1D` (`text.default`, `surface.inverse`) |
| Pale Mint `#E8EDEB`, slate-200/300, `#DDD`, `#F1F5F9` | ~70 | `#E8EDEB` (`surface.subtle`, `border.subtle`) |
| slate-700, `#333`, `#475569`, `#343537`, `hsl(210 4% 21%)` | ~35 | `#323334` |
| **Steel `#90A4A8`, slate-400/500, `#666`, `#8E908F`, `hsl(0 0% 35–60%)`** | **~95** | **no palette value** → `text.muted` / `border.control` as graphite with alpha (proposal D1) |
| Signal Cyan `#42C9CB`, sky-400 `#38BDF8` | ~15 | `#42C8C8` (brand) / `#25A3A7` (focus on light) |
| Live Lime `#98F600`, `#9AF406` | ~20 | status "online" → `#3FC663` (`status.success`); lime `#98F404` is now KI-Training identity |
| Alarm Red `#E53F4B`, red-700, `#EF4444`, Bootstrap reds | ~25 | `#C8102E` (`status.error`) |
| Hold Orange `#FF4E00` for "paused" | 6 | `#F8C526` (`status.warning`); `#FF4E00` is now Robotik identity |
| Editor MakeCode `#AA278F`, Python `#62156D` | tokens | `#E4007E`, `#8073E4` (decided) |
| emerald-700 `#047857` (success text), amber tint boxes | 7 + 6 | no tints: status fill + icon + text in `text.default` |
| IoT device colours (`deviceColors.ts`: 8 saturated hues incl. status red/lime, plus an `hsl()` generator) | 50+ | data series palette (proposal D4) |

## 2. UX and accessibility findings

Priorities: **P0** blocks conformance on every surface, **P1** blocks a core task for some users,
**P2** inconsistency or partial barrier, **P3** polish.

### Campus (without IoT)

| # | P | Finding | Evidence | WCAG | Fixed by |
|---|---|---|---|---|---|
| A1 | **P0** | Buttons have no visible focus; the global ring is 1.93:1 | `ui/Button.svelte:70` `outline: none`, no `:focus-visible`; unlayered component CSS beats the layered global ring; 26 components strip the outline, 5 different replacement recipes | 2.4.7, 1.4.11 | tokens `focus.ring`, Button |
| A2 | P1 | `Modal` says `aria-modal` but has no focus move, trap, `inert` or return; Escape only works once focus is inside | `modals/Modal.svelte:53-61`, 21 consumers; plus Overlay family (9), MultiTabWarning, IframeOverlay, 7 native `confirm/alert/prompt` | 2.4.3, 4.1.2 | Dialog, ConfirmDialog |
| A3 | P1 | Custom dropdown is mouse-only | `ui/Dropdown.svelte:232,338` `div role=button`, Enter only, no arrows/Space/`aria-expanded`, portalled out of tab order; 12 triggers nest a `<button>`; 3 more bespoke menus | 2.1.1, 4.1.2 | Menu |
| A4 | P1 | Toggle exposes no state; checked = lime track with white knob (1.30:1); tooltip is a menu nested in the button | `ui/Toggle.svelte:34-53`, 7 files | 4.1.2, 1.4.11 | Switch, Tooltip |
| A5 | P1 | Pause control mixes action and state ("Pausieren"/"Pausiert", "Fortsetzen" on hover only); white on `#FF4E00` 3.31:1 | `ui/ClassroomHeader.svelte:128-183` | 1.4.3, 4.1.2 | Button (pressed), Badge |
| A6 | P1 | Live Wall / participant list: status by colour, opacity or `title` only, type down to 0.6rem | `admin/MiniEditorReadOnly.svelte:47-193`, `admin/UserListItem.svelte:152` | 1.4.1, 1.4.3 | StatusDot, Badge, Avatar |
| A7 | P1 | 17 fields labelled by placeholder only (incl. pupil join words, chat, user search); join suggestions have no listbox semantics | `room/ParticipantJoin.svelte:380-405`, `chat/MessageControls.svelte:111` | 1.3.1, 3.3.2, 4.1.3 | TextField, **Combobox** |
| A8 | P1 | Text colours fail contrast: Steel 2.50:1 (36 declarations), primary hover white on Steel 2.50:1, lime text on white 1.30:1, white on Blocks teal 1.95:1 | `ui/Button.svelte:171-190`, `chat/MessageBubble.svelte:216` | 1.4.3 | tokens (`text.muted`, `*.on` pairs) |
| A9 | P2 | 168 of 415 font sizes below 0.875rem; Button `small` is 0.75rem | `room/RoomSettings`, `admin/MiniEditor` (10–11px) | 1.4.4 | type scale |
| A10 | P2 | State changes not announced: 4 `aria-live`, 6 `role=status/alert` app-wide; chat has no `role=log`; toast texts hard-coded in two languages | `stores/toastStore.ts`, `ui/overlays/Overlay.svelte:75` | 4.1.3, 3.1.2 | Toast, Banner |
| A11 | P2 | Loading / empty / error: 11 spinners, 16 empty-state variants, German-only editor error | `editors/MakeCode.svelte:1766` | – | Spinner, EmptyState, Banner |
| A12 | P2 | Tooltips are hover menus; 5 icon buttons named only by `title` | `program-card/ProgramRenameForm.svelte:95` | 1.4.13, 4.1.2 | Tooltip, IconButton |
| A13 | P2 | 64 `<Button>` vs 177 raw `<button>`, 46 ad-hoc button classes; `type` prop shadows HTML `type`; disabled = opacity in 29 rules; selected menu item looks disabled | `ui/DropdownItem.svelte`, `editors/ProgramCard.svelte:121` | 4.1.2 | Button, Menu |
| A14 | P3 | Small targets (chat ⋮ 24px, done indicator 20px) | `chat/MessageBubble` | 2.5.8 (2.2) | IconButton |
| A15 | P3 | Reduced motion handled globally in `reset.scss`, but not for Svelte JS transitions and hover lifts | `admin/UserDropdown.svelte`, `ui/Card.svelte` | 2.3.3 | motion tokens + helper |

### IoT dashboard

| # | P | Finding | Evidence | WCAG | Fixed by |
|---|---|---|---|---|---|
| B1 | P1 | German only: 114 literal UI strings, 6 of 8 files without Paraglide, hand-built plurals | `IotDevices.svelte:319` | 3.1.2 | i18n contract (labels props) |
| B2 | P1 | Two `div role=dialog` without focus management, one correct native `<dialog>`, deletes via `confirm()` | `IotWidgetEditor.svelte:146`, `IotFeedsTab.svelte:684`, `IotDashboard.svelte:475` | 2.4.3 | Dialog, ConfirmDialog |
| B3 | P1 | Status lamp widget is colour-only, on/off colours can be identical | `IotWidget.svelte:556-582` | 1.4.1 | StatusDot rule |
| B4 | P1 | Device palette: 8 saturated hues incl. status red/lime, assigned by first-seen order; contradicts Campus DESIGN.md "Data Identity" | `services/iot/deviceColors.ts:13-42` | 1.4.1 | data series tokens (D4) |
| B5 | P1 | Three focus looks, one in lime on white (1.37:1) | `IotWidgetEditor.svelte:533` | 2.4.7, 1.4.11 | `focus.ring` |
| B6 | P1 | Feeds/Dashboard tabs: `role=tab` without panels, roving tabindex or arrows; selected differs by lime vs white text (1.31:1) | `IotDashboard.svelte:683-925` | 4.1.2, 1.4.1 | Tabs / SegmentedControl |
| B7 | P2 | Widgets reorder by pointer only (resize has keys) | `IotWidget.svelte:416` | 2.1.1 | Menu items "move earlier/later" |
| B8 | P2 | Own button system: 56 raw buttons, `.btn` defined 4×, lime CTA, white on blue 3.67:1, square corners | `IotDashboard.svelte:978` | 1.4.3 | Button |
| B9 | P2 | Icon buttons 18–26px; colour swatches read hex codes aloud, toggles instead of a radio group | `IotWidgetEditor.svelte:351-375` | 1.3.1, 2.5.8 | IconButton, Radio (swatch) |
| B10 | P2 | Charts: `aria-label="Liniendiagramm"` only, values on pointer hover only | `IotChart.svelte:234` | 1.1.1 | chart a11y pattern (new) |
| B11 | P2 | Loading/error text without live regions; "kopiert" feedback invisible until hover | `IotDashboard.svelte:676,724` | 4.1.3 | Spinner, Toast |
| B12 | P3 | 18 of 77 font sizes below 0.875rem on a beamer surface | `IotProgramChip`, `IotChart` | – | type scale |
| B13 | P3 | `node.animate()` ignores reduced motion | `IotDashboard.svelte:636` | 2.3.3 | motion helper |

**Keep from IoT:** device status chips with words, the switch widget (`role=switch`,
`aria-checked`), the native `<dialog>`, keyboard resize, `role=alert` on load errors,
IotProgramChip's full Paraglide use.

## 3. The drafts in `docs/input/`

- Button fills in `Calliope_UX_UI 3` are `#231F20` (Illustrator rich black), not `#1B1C1D`.
  The red swatch is `#E53F4B` (labelled "e8edeb"); `#C8102E` appears in no draft.
- The draft uses **`#6476FD` as control accent** (switch on, checkbox checked, slider and progress
  fill), which the colour roles give to IoT-WiFi identity (decision D2).
- Product pills IoT-WiFi and Robotik carry white text: 3.8:1 and 3.3:1, below 4.5:1 at 16px.
  Text link Typ D `#25A3A7` on white is 3.05:1 (already resolved: dark text + teal underline).
- Draft greys are drawn as `#1B1C1D` / white at 25–50 % opacity (checkbox border, slider track,
  switch track). The palette has no mid-grey either way (decision D1).
- Measures used for the token draft: buttons L/M/S 39/34/30 px high with 16/14/12 text and
  2.5/2.2/1.9 outline; radius 5 for everything that is not a pill; segmented control 32 high;
  checkbox 28, radio 27, switch 56×27, slider thumb 24 / track 5, progress 12 and 24 high.
- Spec and file disagree on weights (SemiBold vs Medium/Bold); hover, focus and disabled are drawn
  nowhere ("tbd."). The IoT PDF is the current app with overlays, not a new design.

## 4. Consequences for the backlog

| Rank | Component | P0/P1 it fixes | Instances replaced |
|---|---|---|---|
| 1 | Tokens + styles (focus ring, on-colour pairs, type floor, data palette) | A1, A8, A6, B4, B5 | all |
| 2 | Button / IconButton | A1, A5 | 64 `<Button>` + 233 raw `<button>` |
| 3 | Dialog / ConfirmDialog | A2, B2 | 21 Modal consumers, 4 bespoke dialogs, 11 native confirms |
| 4 | Menu (+ Tooltip, which Dropdown is misused as today) | A3, A4 | 15 Dropdown consumers + 3 menus |
| 5 | Badge / StatusDot | A5, A6, B3 | Live Wall, user list, pause, lamp |
| 6 | TextField / Label / FieldHint (+ Combobox) | A7 | 17 placeholder-only fields |
| 7 | Switch | A4 | 7 files |
| 8 | Tabs / SegmentedControl | B6 | IoT tabs, MakeCode toolbar |

Missing from the backlog: **Combobox** (room-code word entry), **VisuallyHidden / LiveRegion**,
a **chart accessibility pattern** (hidden data table, keyboard cursor), and an explicit **i18n
contract** (no built-in strings; `labels` prop with German default).
