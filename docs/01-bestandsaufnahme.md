# Bestandsaufnahme UI (Stand 2026-10-28)

Grundlage: Code-Analyse von `calliope-campus` (inkl. IoT-Dashboard), `lib/mini-connection-widget`,
den Editoren unter `calliope-dev/editors/*`, dem Vorgänger `D:\GIT\svelte\calliope_campus` und den
Repos in `github.com/calliope-edu`. Die Dateien in `docs/input/` sind als **Entwurf/Notizen** gelesen,
nicht als Entscheidung.

`C:\GIT\calliope-stack` bzw. `D:\GIT\calliope-stack` ist leer. ML Trainer und Teachable sind
dieselbe App: `ml-machine` (Svelte 4, nur auf GitHub, nicht lokal geprüft).

## 1. Wer kommt als Konsument in Frage?

| Projekt | Technik | Styling heute | Rolle für calliope-ui |
|---|---|---|---|
| **calliope-campus** (inkl. IoT-Dashboard) | SvelteKit 2, Svelte 5 (Runes durchgängig) | SCSS + CSS-Custom-Properties (HSL-Tripel), `@layer` | **Hauptkonsument, Quelle der meisten Komponenten** |
| **mini-connection-widget** | Svelte 5 + framework-agnostischer TS-Store | Scoped CSS, viele harte Hex-Werte, `--mkc-*` nur im MakeCode-Teil | **Konsument + Quelle** der Geräte-Verbindungs-UI |
| **calliope-docs** (GitHub) | SvelteKit, Svelte 5, Storybook 9 | – (nicht lokal geprüft) | Konsument |
| **ml-machine** = ML Trainer / Teachable (GitHub) | Svelte **4** | – | Konsument nach Svelte-5-Upgrade |
| pxt-iot-sim | Vanilla TS + Vite | CSS-Vars | nur Tokens (kann Svelte mounten) |
| umo (Vue-Fork) | Vue 3 + TDesign | LESS, `--umo-*` | höchstens Tokens |
| Python-Editor, scratch-gui (Blocks), ml-trainer (React-Variante) | React | Chakra / CSS-Modules | **optional**: Svelte-Komponenten als Custom Element einbinden; keine React-Komponenten in der Bibliothek |
| pxt-calliope / MakeCode | PXT | Semantic UI / LESS | **außerhalb des Scopes** |
| code4maus, Svelte-3-Stubs, SvelteKit-Scaffolds | – | – | ignorieren |

## 2. Was es in Campus gibt

Rund 135 `.svelte`-Dateien, ~39k LOC in `src/lib/components/`. Keine Headless-Bibliothek
(kein bits-ui/melt), stattdessen Einzelhelfer: `svelte-floating-ui`, `svelte-portal`, `runed`,
`svelte-sonner`, `svelte-splitpanes`.

### Vorhandene, wiederverwendbare Bausteine

| Gruppe | Komponenten | Zustand |
|---|---|---|
| Primitives | `ui/Button` (variant × type × size), `ui/Toggle`, `ui/Chevron`, `ui/UserAvatar` | Button hat vermutlich **keinen sichtbaren Fokus** (`outline:none`, unlayered CSS schlägt den globalen `:focus-visible`). 67× `<Button>` gegenüber **194 rohen `<button>`**. Prop `type` überschattet HTML-`type`. |
| Ungenutzt | `ui/Card`, `ui/PasswordInput`, `ui/PasswordDisplay`, `LocaleSwitcher` | 0 Imports, Card mit fremder Schrift/Farbe |
| Overlays | `modals/Modal` (~20 Ableitungen), `ui/overlays/Overlay` (+8 Varianten), `ui/Dropdown` (616 Zeilen, ~20 Props), `MultiTabWarningOverlay`, `IframeOverlay`, Toasts via svelte-sonner | Modal: `role=dialog`, Esc, **kein Focus-Trap** |
| Chrome | `BrandedHeader`, `ClassroomHeader`, `Footer`, `StandaloneEditorShell`, Splitpanes-Theme | Tabs gibt es nicht als Komponente (3 Ad-hoc-Varianten) |
| Daten | `admin/TrendChart` (svelteplot), `editors/IotChart` (eigenes SVG), Stat-Kacheln | zwei Chart-Stacks |
| Domäne | Editoren, ProgramCard & Co., Room, Chat, IoT-Widgets | bleiben in den Apps |

**Fehlt komplett als Komponente** (inline in vielen Dateien): Input/TextField, Select, Checkbox,
Radio, Badge/Chip (~20 Dateien), StatusDot, Tooltip, Icon-Wrapper, Tabs/SegmentedControl,
EmptyState (14 Dateien), Spinner (8× eigenes `@keyframes spin`), Slider, ProgressBar.

### Dubletten und Drift

- **Buttons:** `ui/Button` vs. lokale `.btn`/`.btn-primary`-Klassen in 18 Dateien; `modals/README.md` dokumentiert noch veraltete blaue/graue Buttons.
- **Dialoge:** `Modal` vs. IoT-eigene `.scrim/.sheet`, `.modal`, natives `<dialog>` vs. `MultiTabWarningOverlay` vs. Widget-Modals.
- **Menüs:** `Dropdown` vs. Admin-`UserContextMenu`/`UserDropdown` vs. Widget-`Popover`.
- **Campus ↔ Widget:** `MakeCodeToolbar`, `MakeCodeShareModal`, `ConnectionChoiceModal` existieren doppelt (Campus nutzt eigene Kopien).
- **Charts:** svelteplot vs. Hand-SVG.

### IoT-Dashboard

Lebt als Editor-Typ `iot` in Campus (`editors/Iot*`, zusammen ~6.600 Zeilen). Stilistisch ein eigenes
System: nutzt **keinen** globalen Token, definiert pro Datei eigene SCSS-Variablen (`$green: #9af406`
≠ Token `#98F600`, 34 Hex-Werte allein im WidgetEditor), eigene Buttons, eigene Sheet-Dialoge,
Header in anderem Grau, Texte meist hart deutsch statt Paraglide. Gleichzeitig der **einzige Bereich
mit Storybook-Stories** (17 Stories) und mit sauberen `role=tablist`/`role=switch`-Mustern.

## 3. Tokens heute

- **Campus** `src/scss/colors.scss`: Hue-basiertes System (`--color-*-hue`), Skalen 10/50/100/200,
  semantische Tokens (`--color-text-*`, `--color-bg-*`, `--color-interactive-*`, `--color-border-*`),
  Editorfarben (MakeCode `#AA278F`, Python `#62156D`, Blocks `#42C8C8`), `.theme-dark` angelegt aber kaum genutzt.
- **Keine** Tokens für Abstände, Radien, Typografie, Schatten, Motion – nur in `DESIGN.md` beschrieben und von Hand kopiert.
- `#FAFAFA / #E8EDEB / #1B1C1D / #90A4A8` stehen 80+ mal hart im Code, dazu Tailwind-Slate-Hexwerte in ~15 Komponenten.

### Markenfarbe in fünf Varianten

| Wert | Wo |
|---|---|
| `#42C9CB` | Campus „Signal Cyan“ |
| `#42C8C8` | Python-Editor brand-500, Campus Blocks-Farbe |
| `#3CB5B5` / `#43C9C9` / `#54C9C9` | MakeCode |
| `#00B8CC` | Widget |
| `hsl(184 64% 38%)` ≈ `#239AA0` | pxt-iot-sim |
| `#25A3A7` | Python 600, Entwurf „Text Navigation“ |

Auch Grün driftet: `#98F600` (Campus), `#98F404` (Entwurf), `#9AF406` (IoT).
`#1B1C1D` als dunkles Neutral ist dagegen schon de facto gemeinsam.

### Typo und Icons

- Schrift: Campus Roboto Variable (self-hosted), Python-Editor Roboto, Widget Systemschrift.
- Icons: Campus **Material Symbols** (~70 Nutzungen via unplugin-icons) + viele Inline-SVGs; `@lucide/svelte` installiert aber ungenutzt; Widget nur Inline-SVG.

## 4. Barrierefreiheit und Zustände

- Globaler Fokus: 2px Cyan-Outline, laut DESIGN.md nur **1.9:1 auf Chalk** (unter WCAG-AA 3:1 für Non-Text).
- 26 Dateien setzen `outline:none`, nur 17 definieren eigenen `:focus-visible`.
- **Keine Focus-Traps** in Dialogen. `prefers-reduced-motion` nur im Reset.
- Gutes Muster: `SyncStatusBanner` (`role=status`/`role=alert`, `aria-live`). Sonst Lade-/Leer-/Fehlerzustände ad hoc.
- Anforderungen aus `PRODUCT.md`: BITV 2.0 / WCAG 2.1 AA, Beamer-Lesbarkeit, zwei gleichwertige Zielgruppen (Lehrkraft, Schüler:in), Deutsch primär + Englisch.

## 5. Storybook heute

- Campus: Storybook 9 (`@storybook/sveltekit`, `addon-svelte-csf` im Legacy-Modus, Versionsmix bei `addon-docs`), **eine** Story-Datei (IoT-Galerie).
- Vorgänger `D:\GIT\svelte\calliope_campus`: Storybook 9 mit Stories für BrandedHeader, Dropdown, LocaleSwitcher, Chat – gute Vorlage.
- calliope-docs: Storybook 9.
- makecode-embed: React-Storybook (nur Referenz).

## 6. Der Design-Entwurf (`docs/input/`) im Vergleich

| Thema | Entwurf | Campus heute | Bewertung |
|---|---|---|---|
| Button-Typen | A: Roboto **Condensed** SemiBold, Uppercase, 16/14/12; B: wie A ohne Uppercase; C: Roboto Medium 14 (klein, gefüllt); D: Textlink `#25A3A7`; secondary = Outline | Roboto 600 Uppercase, 4px-Border, Pillen | Kern stimmt überein (Pille, Outline-Secondary). Offen: Condensed ja/nein, Typ C/D als eigene Varianten |
| Überschriften | H1/H2 Roboto Condensed SemiBold Uppercase 26/20, H3 Roboto SemiBold 18 | Nur Roboto, Skala 0.75–1.5rem | Condensed wäre neu und bräuchte eine weitere Webfont |
| Produktfarben | KI-Training Lime, Teachable Türkis, IoT-WiFi Blau, Robotik Orange | Editor-Identität (MakeCode/Python/Blocks/Markdown) | **Zwei Identitätssysteme** – müssen zu einer Token-Familie zusammengeführt werden |
| Icons | PrimeIcons (28 Stück gelistet), Frage „welches Set?“ | Material Symbols | Entscheidung offen |
| Bausteine | Segmented Control (Trainieren/Anwenden/Programmieren, Dashboard/Feeds), Pulldown, Toggle-Liste, Checkbox/Radio hell+dunkel, Slider, Progress, Status-Tag | teils vorhanden, meist ad hoc | Gute Liste für Phase 2 |
| Dunkle Flächen | Komponenten auch auf Schwarz | `.theme-dark` angelegt | Spricht für echtes Theming (hell/dunkel) über semantische Tokens |
