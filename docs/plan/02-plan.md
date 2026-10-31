# Plan: calliope-ui (Entwurf zur Diskussion)

## Ziel

Eine Svelte-5-Komponentenbibliothek mit Storybook, die Campus (inkl. IoT), das
Verbindungs-Widget und weitere Svelte-Apps (calliope-docs, ML/Teachable) auf einen gemeinsamen
Stand bringt. PXT nutzt sie nicht. React-Apps sind optionale Konsumenten, die
Svelte-Komponenten als Custom Elements einbinden können. Umgekehrt kommen keine React-Komponenten
in die Bibliothek.

Grundlage: [01-bestandsaufnahme.md](../01-bestandsaufnahme.md).

## Arbeitspakete

Entsprechen den Phasen in Abschnitt 4. Ein Haken heißt: auf `main` gelandet.

- [x] **W0:** Entscheiden. Design-Audit von Campus + IoT, Token-Entwurf, `DESIGN.md` für calliope-ui
- [x] **W1:** Fundament. Repo-Scaffold, Tokens-Pipeline, Storybook mit Foundations-Seiten, CI,
  Verteilung per gepinntem SHA. Campus bindet `tokens.css` ein, ohne visuelle Änderung
- [ ] **W2:** Welle 1. Primitives, Dialog, Menu, Tooltip inkl. Stories und Tests. Pilot: Campus
  ersetzt `ui/Button`, die `.btn`-Klassen, `Modal` und `Dropdown` (order changed by D5)
- [ ] **W3:** Welle 2. Formulare, Status, Navigation. IoT-Dashboard komplett auf Tokens und
  Bibliothekskomponenten
- [ ] **W4:** Widget. mini-connection-widget nutzt calliope-ui, Dubletten mit Campus aufgelöst
  (breakdown in section 4.1)
- [ ] **W5:** Welle 3 + Ausrollen. Patterns, Header, danach calliope-docs und ML/Teachable
- [x] **W6:** optional. Custom-Element-Build (`/elements`) für React-Hosts, Token-Export für
  Chakra/LESS, nur bei konkretem Bedarf. **Deferred (2026-10-31), not built:** no React host
  (Python editor, Blocks, ml-trainer) and not umo needs it yet. Reopen as a new card once one does

---

## 1. Architektur-Vorschläge

### 1.1 Paketstruktur

Ein Repo, ein Paket `@calliope-edu/ui` mit Subpath-Exports. Eine Aufteilung in mehrere
Pakete lohnt sich erst, wenn ein Konsument tatsächlich nur Teile braucht.

```
calliope-ui/
  src/lib/
    tokens/        # Quelle (JSON, DTCG-Format) → generiert tokens.css, tokens.scss, tokens.ts
    styles/        # reset, base, focus, layers.css
    icons/         # kuratiertes Icon-Set als Svelte-Komponenten
    components/    # Primitives, Overlays, Patterns
    elements/      # (später) Custom-Element-Wrapper für Nicht-Svelte-Hosts
  src/stories/     # Foundations-Seiten (Farben, Typo, Abstände, Icons)
  .storybook/
```

Exports: `@calliope-edu/ui` (Komponenten), `/tokens.css`, `/tokens` (TS-Werte), `/styles.css`,
`/icons`, später `/elements`.

### 1.2 Technik

| Thema | Vorschlag | Begründung |
|---|---|---|
| Svelte | 5, nur Runes, Snippets, Callback-Props | Campus und Widget sind schon so |
| Build | `@sveltejs/package` | Standard für Svelte-Libraries, liefert `.svelte` + `.d.ts` |
| Styling | **Plain CSS** + Custom Properties in `@layer calliope.*` | Konsumenten brauchen kein SCSS. Layer lösen das heutige Problem, dass unlayered Komponenten-CSS den globalen Fokus überschreibt |
| Headless-Basis | **bits-ui** für Dialog, Menu, Popover, Select, Tabs, Tooltip, Slider | Liefert Focus-Trap, Tastaturbedienung und ARIA. Genau das fehlt heute. Ersetzt svelte-floating-ui, svelte-portal und eigene Click-outside-Logik |
| Tokens | DTCG-JSON → **Style Dictionary** → CSS/SCSS/TS (+ optional Chakra-Theme, LESS) | Eine Quelle, aus der auch Python-Editor, umo und pxt-iot-sim Werte ziehen können |
| Theming | semantische Tokens + `data-theme="light/dark"` (+ später `beamer` mit mehr Kontrast) | Der Entwurf zeigt Komponenten auf Schwarz. PRODUCT.md fordert Beamer-Lesbarkeit |
| i18n | keine Paraglide-Abhängigkeit in der Lib. Primitives ohne eigenen Text, Kompositionen mit `labels`-Prop (Default de) | Muster aus dem Widget. Jede App behält ihr i18n |
| Icons | `<Icon name="download" />` mit **semantischen Namen**, dahinter ein kuratiertes Set, zur Build-Zeit über unplugin-icons eingebacken | Konsumenten brauchen kein Vite-Plugin. Das Set bleibt austauschbar |
| Verteilung | zuerst wie das Widget: GitHub-Dependency auf gepinnten SHA + Vite-Alias im Dev. Später GitHub Packages (npm) mit semver | Funktioniert heute schon im Workflow, kein Registry-Setup nötig |
| Qualität | Vitest + `@testing-library/svelte`, Storybook `addon-a11y` + Interaction-Tests, ESLint/Prettier wie Campus | |

### 1.3 Storybook

- Storybook 9, `@storybook/sveltekit`, `addon-svelte-csf` v5 ohne Legacy-Modus, `addon-docs` (autodocs), `addon-a11y`, `addon-themes` (hell/dunkel).
- Gliederung: **Foundations** (Farben, Typo, Abstände, Radien, Schatten, Icons, Motion) → **Primitives** → **Overlays** → **Patterns** (EmptyState, Banner, Formularzeilen) → **Rezepte** (Beispiele aus Campus/IoT).
- Jede Komponenten-Story enthält alle Zustände (default, hover, focus, disabled, loading, error), einen Do/Don't-Abschnitt und den Hinweis, wann man sie nicht verwendet.
- Deployment als statische, öffentliche Seite auf Cloudflare Pages (wie Campus), mit PR-Previews und eigener Subdomain.
- Optional Chromatic für visuelle Regressionstests. Ist in Campus schon als Abhängigkeit vorhanden.

---

## 2. Inhaltliche Vorschläge (Design)

Die folgenden Punkte sind **meine Empfehlungen**. Die Notizen in `docs/input/` und die
`DESIGN.md` aus Campus fließen ein, sind aber nicht bindend.

1. **Feste Palette, keine abgeleiteten Skalen** (entschieden). Grundlage ist die Palette aus
   `Calliope_UX_UI`:

   | Gruppe | Werte |
   |---|---|
   | Neutral | `#000000` `#1B1C1D` `#323334` `#E8EDEB` `#FFFFFF` |
   | Marke | `#42C8C8` `#1D8286` |
   | Farben | `#98F404` `#34E5DB` `#3B82F6` `#EEFF41` `#F8C526` `#FF4E00` `#E4007E` `#A5289B` `#8073E4` `#6476FD` `#3FC663` |

   Diese Werte werden als Basis-Tokens (`palette.*`) angelegt. Alles andere sind semantische Tokens,
   die auf genau diese Werte zeigen (`text.*`, `surface.*`, `border.*`, `focus`, `status.*`,
   `identity.*`). Bestehende Abweichungen (`#42C9CB`, `#98F600`, `#9AF406`, Slate-Hexwerte …)
   werden auf den nächstliegenden Palettenwert gemappt.
   Error red is **`#E53F4B`**, the draft's red swatch (owner decision 2026-10-29; this plan first
   proposed `#C8102E`). Also decided 2026-10-29: `#1D8286` replaces `#25A3A7`, MakeCode gets
   `#A5289B`.

2. **Farbrollen** (entschieden 2026-10-28). Farbe hat drei Aufgaben: Neutral, Status, Identität
   (Regel aus Campus-DESIGN.md). Jeder Wert hat genau eine Rolle.

   | Rolle | Token | Wert |
   |---|---|---|
   | Seitenhintergrund hell | `surface.page` | `#FFFFFF` |
   | Fläche hell / Rahmen | `surface.subtle`, `border.default` | `#E8EDEB` |
   | Text, dunkle Fläche (Header, Primary-Button) | `text.default`, `surface.inverse` | `#1B1C1D` |
   | Dunkle Sekundärfläche, Rahmen auf Dunkel | `surface.inverse-raised` | `#323334` |
   | Dark-Theme-Seitenhintergrund | `surface.page` (dark) | `#000000` |
   | Marke | `brand` | `#42C8C8` |
   | Marke dunkel: Fokusring, Links und Akzentlinie auf Hell | `brand.strong`, `focus`, `text.link` (light) | `#1D8286` |
   | Fokusring auf Dunkel | `focus` (dark) | `#42C8C8` |
   | Erfolg | `status.success` | `#3FC663` |
   | Warnung | `status.warning` | `#F8C526` |
   | Fehler | `status.error` | `#E53F4B` |
   | Info | `status.info` | `#3B82F6` |
   | Produkt KI-Training | `identity.ki-training` | `#98F404` |
   | Produkt Teachable | `identity.teachable` | `#EEFF41` |
   | Produkt IoT-WiFi | `identity.iot` | `#6476FD` |
   | Produkt Robotik | `identity.robotik` | `#FF4E00` |
   | Editor MakeCode | `identity.makecode` | `#A5289B` (heute `#AA278F`) |
   | Highlight (Auszeichnung) | `accent.highlight` | `#E4007E` |
   | Editor Python | `identity.python` | `#8073E4` (heute `#62156D`) |
   | Editor Blocks | `identity.blocks` | `#34E5DB` (heute `#42C8C8`) |
   | Editor Markdown | `identity.markdown` | `#1B1C1D` |

   Status wird nie nur über Farbe vermittelt, sondern immer zusammen mit Icon und Text.

3. **Kontrast über Paarungen statt über Abstufungen.** Gerechnete Werte (WCAG):

   | Farbe | auf Weiß | mit Text `#1B1C1D` | mit Text Weiß | Regel |
   |---|---|---|---|---|
   | `#42C8C8` | 2.0 | 8.4 | 2.0 | nur Fläche mit dunklem Text; Text/Links auf Dunkel |
   | `#1D8286` | 4.58 | 3.73 | 4.58 | Focus ring, links, lines and icons on light; link text without underline (3.73:1 against body text) |
   | `#98F404` `#34E5DB` `#EEFF41` `#F8C526` `#3FC663` | 1.1–2.2 | 7.7–15.5 | – | nur Fläche mit dunklem Text |
   | `#FF4E00` | 3.3 | 5.2 | 3.3 | Fläche mit dunklem Text |
   | `#3B82F6` `#6476FD` | 3.7–3.8 | 4.5–4.6 | 3.7–3.8 | Fläche mit dunklem Text; Weiß nur für große Schrift |
   | `#8073E4` | 3.8 | 4.46 | 3.8 | Fläche nur mit großer/fetter Schrift oder als Akzent (Rand, Icon) |
   | `#E4007E` | 4.57 | 3.7 | 4.57 | Fläche mit **weißem** Text |
   | `#A5289B` | 6.22 | 2.74 | 6.22 | Fill with white text (MakeCode) |
   | `#E53F4B` | 4.08 | 4.18 | 4.08 | Fill with **black** text (5.1:1); never as text. Error text is ink (light) or white (dark) next to a red icon disc |

   **Links and navigation on light** (decided 2026-10-29, replaces the earlier underline rule):
   links are `#1D8286` text without underline; they gain an underline on hover and focus. Active
   navigation keeps a 2px marker in `#1D8286`. On dark, links are `#42C8C8` (8.4:1). The focus
   ring moves from today's `#42C9CB` (1.9:1) to `#1D8286` (4.58:1, 3.87:1 on mist) and
   `#42C8C8` on dark.
4. **Typografie:** Roboto bleibt Basis. Roboto Condensed (Entwurf) empfehle ich nur für H1/H2 und
   Typ-A-Buttons, wenn es nach einem Test auf Beamer und in Schülerhand überzeugt. Sonst gibt es
   nur eine Schrift. Diese Frage entscheiden wir mit einem Vergleich in Storybook.
5. **Button-Familie:** ein `Button` mit `variant` (primary / secondary=outline / ghost / link),
   `tone` (neutral / positive / negative / identity) und `size` (s/m/l). Typ C aus dem Entwurf
   wird `size="s"`, Typ D wird `variant="link"`. Das Prop `type` bleibt HTML vorbehalten.
6. **Icons:** Ich empfehle, das Set erst nach einem Vergleich in Storybook festzulegen. PrimeIcons
   (Entwurf) ist klein und einheitlich, Material Symbols (Campus heute) ist groß und hat Rounded-
   und Weight-Achsen. Weil die API semantische Namen nutzt, ist die Wahl später günstig zu ändern.
7. **Zustände sind Teil jeder Komponente.** Loading, Empty, Error und Disabled sind jeweils
   spezifiziert und in Storybook sichtbar. Dazu kommen gemeinsame Patterns `EmptyState`, `Banner`
   (role status/alert nach dem Muster von `SyncStatusBanner`) und `Spinner`.
8. **Barrierefreiheit:** WCAG 2.1 AA als Abnahmekriterium jeder Komponente, geprüft mit
   addon-a11y plus manuellem Tastatur- und Screenreader-Check. Reduced Motion wird zentral
   über Motion-Tokens geregelt.

---

## 3. Komponenten-Backlog (priorisiert)

Wave order changed after the Phase 0 audit (D5, decided 2026-10-29): dialogs and menus hold the
largest P1 clusters, and the pilot is "buttons + dialogs" anyway.

**Welle 1 – Fundament und Pilot**
Tokens + Styles, `Icon`, `Button`/`IconButton`, `Spinner`, `Dialog` (replaces Modal, with focus
trap), `ConfirmDialog` (replaces `window.confirm/alert/prompt`), `Menu`/`Dropdown`, `Tooltip`
(Dropdown is misused as a tooltip today), `TextField`/`Label`/`FieldHint`, `Switch` (from Toggle).

**Welle 2 – Formulare, Status und Navigation**
`Checkbox`, `Radio` (incl. swatch variant), `Badge`/`Chip`/`StatusDot`, `Popover`, `Toast` (thin
wrapper around svelte-sonner), `Banner`, `EmptyState`, `Tabs`, `SegmentedControl`
(Dashboard/Feeds, Trainieren/Anwenden/Programmieren), `Select`, `Combobox` (room-code words),
`Slider`, `ProgressBar`, `VisuallyHidden`/`LiveRegion`.

**Welle 3 – Patterns und Chrome**
`Card`, `AppHeader` (aus BrandedHeader), `AccountMenu`, `LocaleSwitcher`, `Avatar`, `Toolbar`
(built 2026-10-31, see 4.2). Danach
Chart-Basis: svelteplot or own SVG, including an accessible chart pattern (hidden data table,
keyboard cursor).

Touch targets (D6, decided 2026-10-29): at least 24×24px everywhere (WCAG 2.5.8); pupil-facing
views use size l (40px) as default.

**Bleibt in den Apps:** Editor-Integrationen, ProgramCard, Room, Chat, IoT-Widgets. Diese bauen
künftig auf calliope-ui auf. **Bleibt im Widget:** Verbindungslogik und Verbindungs-UI, die künftig
calliope-ui-Primitives nutzt. Die doppelten `MakeCodeToolbar`, `MakeCodeShareModal` und
`ConnectionChoiceModal` werden dabei auf eine Quelle reduziert.

---

## 4. Phasen

| Phase | Inhalt | Ergebnis |
|---|---|---|
| **0 Entscheiden** | Offene Fragen (Abschnitt 7) klären. Design-Audit von Campus + IoT. Token-Entwurf | Abgestimmte Liste der Design-Entscheidungen, `DESIGN.md` für calliope-ui |
| **1 Fundament** | Repo-Scaffold, Tokens-Pipeline, Storybook mit Foundations-Seiten, CI (lint, check, test, Storybook-Build), Verteilung per gepinntem SHA | Campus kann `tokens.css` einbinden. `colors.scss` wird auf die neuen Tokens gemappt, ohne visuelle Änderung |
| **2 Welle 1** | Primitives, Dialog, Menu, Tooltip inkl. Stories und Tests | Pilot: Campus ersetzt `ui/Button`, die `.btn`-Klassen, `Modal` und `Dropdown` |
| **3 Welle 2** | Formulare, Status, Navigation | **IoT-Dashboard** komplett auf Tokens und Bibliothekskomponenten |
| **4 Widget** | mini-connection-widget nutzt calliope-ui. Dubletten mit Campus aufgelöst | Eine Verbindungs-UI in einer Quelle |
| **5 Welle 3 + Ausrollen** | Patterns, Header. Danach calliope-docs, ML/Teachable (Svelte-5-Upgrade vorausgesetzt) | Weitere Apps im gemeinsamen Stand |
| **6 optional** | Custom-Element-Build (`/elements`) für React-Hosts, z. B. Connect-Button im Python-Editor oder in Blocks. Token-Export für Chakra/LESS | Nur bei konkretem Bedarf. Deferred 2026-10-31 (no consumer yet) |

Migration immer schrittweise: Alt und Neu können nebeneinander laufen, weil die neuen Tokens
zunächst auf die alten Werte gemappt werden. Visuelle Änderungen kommen bewusst in eigenen PRs.

### 4.1 W4 breakdown (2026-10-31)

State: Campus (`rc-v1.1.3`) pins calliope-ui for `tokens.css` only and the widget at `c988e9c`.
The widget UI is about 4,900 lines in 15 Svelte files with about 300 hard-coded hex values and
its own backdrop, card and buttons in every modal. Banner and the six modals hard-code German.

**Duplicates with Campus**

| Piece | Campus | Widget | Resolution |
|---|---|---|---|
| `ConnectionChoiceModal` | fork (2026-06) for Paraglide and the Campus modal look | original, German only | one source in the widget, on calliope-ui `Dialog` + `ChoiceList`, with a label hook; Campus deletes its fork |
| `MakeCodeShareModal` | on Campus `Modal`, toast store | self-contained, `labels` prop, not used by Campus | owner decision (W4 widget card) |
| `MakeCodeToolbar` | newer, built into Campus `EditorHeader` (shared with IoT) | older (2026-08), not used by Campus | owner decision (W4 widget card) |
| MakeCode `driver.ts` | own copy | `/makecode` subpath, not used by Campus | resolved together with the toolbar |
| `Popover` (makecode) / `Dropdown` | Campus `Dropdown` | own popover | calliope-ui `Menu` / `Popover` in both |

**Widget component → calliope-ui**

| Widget | calliope-ui |
|---|---|
| the six modals, `MakeCodeShareModal` | `Dialog` (focus trap, Escape, scrim); "how" choices as `ChoiceList`/`ChoiceItem`; footer `Button` |
| `ConnectionBanner` | `Banner` look (status stripe and icon, no tint) inside the widget's own fixed positioning |
| `ConnectButton` + `ConnectionPanel` | `Button`/`IconButton` trigger, `Popover` for the dropdown; `StatusDot` + word for each transport; `ProgressBar`/`Spinner` while flashing |
| `CommsPanel` | `Tabs` (stream / rows / graph), `IconButton` (pause, clear) |
| inline SVG icons | `Icon` (`bluetooth`, `usb`, `retry`, `download`, `share`, `copy`, `qr-code`, `link` added for W4) |
| hex values | `--cui-*` tokens; transport colours (USB green, BLE blue) become neutral, since green and blue are status colours |

`Rezepte/Verbindungs-Widget` in Storybook shows the modals and banners rebuilt this way.

**Steps** (each a card in its repository)

1. Widget: a `setConnectLabels()` registry so banner and modals can be translated (needs no
   calliope-ui; README roadmap item 5).
2. Widget: UI on calliope-ui as above; `@calliope-edu/ui` becomes a peer dependency, the host
   loads `tokens.css` and `styles.css`. Teachable, the other host, must load them too.
3. Campus: bump both pins, drop its `ConnectionChoiceModal` fork, pass Paraglide labels, resolve
   the MakeCode toolbar/share/driver duplicates as decided in step 2.

---

### 4.2 W5 breakdown (2026-10-31)

Wave 3 in calliope-ui: `Card`, `Avatar`, `AccountMenu` (the user menu of `BrandedHeader`, added
to the backlog), `LocaleSwitcher`, `Toolbar`/`ToolbarSeparator` and `AppHeader`, each with an
overview story and tests (DESIGN.md, Components). Icons `language`, `person`, `login`, `logout`
added. Avatars drop Campus' random hue per user: a neutral fill for everyone, a person's own
colour only as a ring (`swatch`).

Still open, each a card in its repository:

1. calliope-ui: chart base with the accessible chart pattern (svelteplot or own SVG, hidden data
   table, keyboard cursor), the last Wave 3 item.
2. Campus: `BrandedHeader` → `AppHeader` + `AccountMenu` + `LocaleSwitcher`; `UserAvatar` →
   `Avatar`; drop the unused `ui/Card` and `LocaleSwitcher`.
3. calliope-docs (Svelte 5 already): load `tokens.css`/`styles.css`, header and cards from
   calliope-ui.
4. ml-machine (Teachable): Svelte 4 → 5 upgrade first, then tokens and AppHeader.

## 5. Einsatz von Design-Tools (impeccable / intent-Familie)

| Phase | Tool | Wofür konkret |
|---|---|---|
| 0 | `intent` | Projektkontext setzen. PRODUCT.md aus Campus dient als Basis für alle folgenden Skills |
| 0 | `evaluate` | Heuristische Bewertung von Campus + IoT. Liefert priorisierte Probleme (P0–P3), die bestimmen, welche Komponenten zuerst kommen |
| 0 | `impeccable` (audit/extract) | Bestehende Werte aus Campus und IoT in ein Token-System überführen, Drift sichtbar machen |
| 0–1 | `include` | Kontrastprüfung der Palette (Fokusfarbe, Lime auf Weiß, Identitätsfarben), Fokus-Ring-Konzept, Tastatur-/Screenreader-Anforderungen pro Komponente |
| 1 | `impeccable` (typography/color/design system) | Typo-Skala, Condensed-Frage, Farbskalen, Dark-/Beamer-Theme |
| 1 | `organize` | Taxonomie und Navigation des Storybooks, Benennung der Komponenten |
| 2–3 | `specify` | Kurzspezifikation pro Komponente **vor** dem Bauen: API, Varianten, Zustände, ARIA, Do/Don't. Wird zur Storybook-Doku |
| 2–3 | `fortify` | Zustandsinventar je Komponente und Pattern: Loading, Empty, Error, Offline, lange Texte, Englisch |
| 2–3 | `articulate` | Einheitliche Microcopy: Button-Beschriftungen (Speichern/Abbrechen), Fehlermeldungen, Empty States, de/en |
| 2–4 | `impeccable` (critique/polish) | Review jeder Komponente in Storybook und jedes migrierten Screens |
| laufend | Svelte-MCP (`svelte-autofixer`, Doku) | Code-Qualität der Svelte-5-Komponenten |
| Ende jeder Welle | `impeccable-documenter` | `DESIGN.md` aus dem tatsächlich gebauten Stand nachziehen, nicht aus Absichten |

Nicht sinnvoll bzw. nur bei Bedarf: `present`/`storytelling` (nur wenn ein Stakeholder-Deck
gebraucht wird), `measure`, `investigate` (erst für Nutzertests mit Lehrkräften), `localize`
(de/en ist durch `articulate` + `fortify` abgedeckt), `transpose`.

---

## 6. Entscheidungen (Stand 2026-10-28)

| Thema | Entscheidung |
|---|---|
| ML Trainer / Teachable | Sind dieselbe App: **`ml-machine`** (Svelte 4). Sie wird auf Svelte 5 gehoben und dann Konsument |
| React-Apps | Die Bibliothek ist rein Svelte. React-Apps binden höchstens Svelte-Komponenten als Custom Elements ein |
| PXT / MakeCode | außerhalb des Scopes |
| Farben | feste Palette aus `Calliope_UX_UI`, keine abgeleiteten Skalen. 2026-10-29: error red `#E53F4B`, focus/link `#1D8286`, MakeCode `#A5289B`, `#E4007E` as highlight. Rollen siehe 2.2, Kontrastregeln siehe 2.3 |
| Links auf Hell | `#1D8286`, no underline (underline on hover/focus) (2026-10-29) |
| Mid-grey (D1) | ink / white with fixed alpha: 70 % text, 60 % borders (2026-10-29) |
| Control accent (D2) | ink on light, white on dark (2026-10-29) |
| Outline-button border (D3) | 2px; Storybook compares a border growing with button size (2026-10-29) |
| Data series (D4) | six palette colours on dark widget cards, by device serial, with name + marker (2026-10-29) |
| Wave order (D5) | Dialog, ConfirmDialog, Menu, Tooltip move into Wave 1; Checkbox, Radio, Badge into Wave 2; Combobox, LiveRegion and a chart a11y pattern added (2026-10-29) |
| Touch targets (D6) | at least 24px everywhere, size l (40px) as default on pupil surfaces (2026-10-29) |
| Badges, tints | non-interactive badges are rounded rectangles; no tinted backgrounds (2026-10-29) |
| `#000000` | Seitenhintergrund im Dark-Theme |
| KI-Training | ist `ml-trainer` (React/Chakra). Nur optionaler Konsument (Custom Elements, Tokens) |
| Fehler im Dark-Theme | weißer Text, Rot trägt Fläche, Rand oder Icon. Das Icon ist eine rote Scheibe mit weißem Zeichen (5.9:1), damit es nicht am Rot-auf-Dunkel-Kontrast (2.9:1) hängt |
| Themes | **Hell** und **Dunkel** vollständig, dazu **dunkle Bereiche im hellen Theme** (Header, Panels) über `data-theme="dark"` auf einem Teilbaum. Ein Beamer-Theme gibt es vorerst nicht |
| Icon-Set | Vergleich in Storybook (PrimeIcons und Material Symbols mit den 28 Icons aus `icons.txt`, Seite Foundations/Icons), danach Entscheidung |
| Roboto Condensed | für alle Überschriften (display bis h3) und alle Buttons, ohne Großschreibung der Überschriften (2026-10-31) |
| Verteilung | GitHub-Dependency auf gepinnten SHA + Vite-Alias im Dev, wie beim Widget. GitHub Packages später |
| Repo-Einbindung | Submodul `lib/calliope-ui` in `calliope-dev` |
| Storybook-Hosting | öffentlich auf **Cloudflare Pages** (mit PR-Previews). Pages statt Workers, weil eine eigene Subdomain bei Workers nur geht, wenn die ganze Domain bei Cloudflare liegt. Das Repo bleibt privat |
| Pilot | Buttons + Dialoge in ganz Campus. Danach das IoT-Dashboard als erster kompletter Bereich |

## 7. Offene Fragen

Phase 0 (2026-10-28) produced the design audit ([03-design-audit.md](../03-design-audit.md)),
the token draft (`src/lib/tokens/`) and [`DESIGN.md`](../../DESIGN.md). All six questions from it
(D1–D6) were decided on 2026-10-29, see section 6. No open questions.

Taken in Phase 0 without a separate question, because they follow from the colour roles:
"paused" becomes `status.warning` (amber), since orange is Robotik identity; "online" becomes
`status.success` (green), since lime is KI-Training identity; text on blue, indigo, violet, orange
and red fills is black `#000000` (5.1–6.3:1), so Python identity can carry normal-size text.
