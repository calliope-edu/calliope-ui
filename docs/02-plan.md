# Plan: calliope-ui (Entwurf zur Diskussion)

Ziel: eine Svelte-5-Komponentenbibliothek mit Storybook, die Campus (inkl. IoT), das
Verbindungs-Widget und weitere Svelte-Apps (calliope-docs, ML/Teachable) auf einen gemeinsamen
Stand bringt. PXT nutzt sie nicht. React-Apps sind optionale Konsumenten, die
Svelte-Komponenten als Custom Elements einbinden können. Umgekehrt kommen keine React-Komponenten
in die Bibliothek.

Grundlage: [01-bestandsaufnahme.md](01-bestandsaufnahme.md).

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
- Deployment als statische Seite (Cloudflare Pages wie Campus oder GitHub Pages), PR-Previews.
- Optional Chromatic für visuelle Regressionstests. Ist in Campus schon als Abhängigkeit vorhanden.

---

## 2. Inhaltliche Vorschläge (Design)

Die folgenden Punkte sind **meine Empfehlungen**. Die Notizen in `docs/input/` und die
`DESIGN.md` aus Campus fließen ein, sind aber nicht bindend.

1. **Eine Markenfarbe, eine Skala.** Aus den fünf Cyan-Varianten wird eine Skala (z. B. 50…900).
   Vorschlag: `#42C8C8` als Markenton (Python-Editor und Entwurf liegen dort), `#25A3A7` als
   dunkle Stufe für Text und Links auf Hell. Die Fokusfarbe wird so gewählt, dass sie ≥ 3:1 erreicht
   (heute 1.9:1).
2. **Ein Identitätssystem statt zwei.** Produktfarben (KI-Training, Teachable, IoT, Robotik) und
   Editorfarben (MakeCode, Python, Blocks, Markdown) werden eine Token-Familie `identity.*`.
   Dazu gehört die Regel aus DESIGN.md: Farbe hat drei Aufgaben (Status, Identität, Neutral).
3. **Statusfarben vereinheitlichen.** Ein Grün statt drei. Zu jeder Statusfarbe gibt es ein
   definiertes Vordergrund-Paar, z. B. Lime nur mit Graphit-Text.
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

**Welle 1 – Fundament** (größte Streuung, schnellster Effekt)
Tokens + Styles, `Icon`, `Button`/`IconButton`, `Spinner`, `Badge`/`Chip`/`StatusDot`,
`TextField`/`Label`/`FieldHint`, `Switch` (aus Toggle), `Checkbox`, `Radio`.

**Welle 2 – Overlays und Navigation**
`Dialog` (ersetzt Modal, mit Focus-Trap), `ConfirmDialog`, `Menu`/`Dropdown`, `Popover`, `Tooltip`,
`Toast` (dünner Wrapper um svelte-sonner), `Tabs`, `SegmentedControl` (Dashboard/Feeds,
Trainieren/Anwenden/Programmieren), `Select`, `Slider`, `ProgressBar`.

**Welle 3 – Patterns und Chrome**
`EmptyState`, `Banner`, `Card`, `AppHeader` (aus BrandedHeader), `LocaleSwitcher`, `Avatar`,
`Toolbar`. Danach Chart-Basis: Entscheidung zwischen svelteplot und eigenem SVG.

**Bleibt in den Apps:** Editor-Integrationen, ProgramCard, Room, Chat, IoT-Widgets. Diese bauen
künftig auf calliope-ui auf. **Bleibt im Widget:** Verbindungslogik und Verbindungs-UI, die künftig
calliope-ui-Primitives nutzt. Die doppelten `MakeCodeToolbar`, `MakeCodeShareModal` und
`ConnectionChoiceModal` werden dabei auf eine Quelle reduziert.

---

## 4. Phasen

| Phase | Inhalt | Ergebnis |
|---|---|---|
| **0 Entscheiden** | Offene Fragen (Abschnitt 6) klären. Design-Audit von Campus + IoT. Token-Entwurf | Abgestimmte Liste der Design-Entscheidungen, `DESIGN.md` für calliope-ui |
| **1 Fundament** | Repo-Scaffold, Tokens-Pipeline, Storybook mit Foundations-Seiten, CI (lint, check, test, Storybook-Build), Verteilung per gepinntem SHA | Campus kann `tokens.css` einbinden. `colors.scss` wird auf die neuen Tokens gemappt, ohne visuelle Änderung |
| **2 Welle 1** | Primitives inkl. Stories und Tests | Pilot: Campus ersetzt `ui/Button` und die `.btn`-Klassen |
| **3 Welle 2** | Overlays/Navigation auf bits-ui | Pilot: Campus-Modals und Dropdown migriert, **IoT-Dashboard** komplett auf Tokens und Bibliothekskomponenten |
| **4 Widget** | mini-connection-widget nutzt calliope-ui. Dubletten mit Campus aufgelöst | Eine Verbindungs-UI in einer Quelle |
| **5 Welle 3 + Ausrollen** | Patterns, Header. Danach calliope-docs, ML/Teachable (Svelte-5-Upgrade vorausgesetzt) | Weitere Apps im gemeinsamen Stand |
| **6 optional** | Custom-Element-Build (`/elements`) für React-Hosts, z. B. Connect-Button im Python-Editor oder in Blocks. Token-Export für Chakra/LESS | Nur bei konkretem Bedarf |

Migration immer schrittweise: Alt und Neu können nebeneinander laufen, weil die neuen Tokens
zunächst auf die alten Werte gemappt werden. Visuelle Änderungen kommen bewusst in eigenen PRs.

---

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

## 6. Offene Fragen

1. **Teachable:** Wo liegt es, und in welcher Technik ist es gebaut? Und **ML Trainer**: Ist
   `ml-trainer` (React/Chakra) gemeint oder `ml-machine` (Svelte 4)?
2. **Icon-Set:** PrimeIcons, Material Symbols oder ein Vergleich in Storybook?
3. **Roboto Condensed** für Überschriften und Typ-A-Buttons: ja, nein oder testen?
4. **Markenfarbe:** Ist der Vorschlag `#42C8C8` / `#25A3A7` als Basis in Ordnung?
5. **Verteilung:** Reicht zunächst eine GitHub-Dependency mit gepinntem SHA (wie beim Widget), oder
   sollen wir gleich auf GitHub Packages veröffentlichen?
6. **Submodul:** Soll `calliope-ui` als Submodul in `calliope-dev` eingetragen werden, wie
   `mini-connection-widget`?
7. **Storybook-Hosting:** öffentlich oder hinter Login?
8. **Pilot:** Starten wir mit dem **IoT-Dashboard** (am stärksten abweichend, hat schon Stories)
   oder mit **Buttons + Dialogen** in ganz Campus (größte Streuung)? Ich empfehle Buttons + Dialoge
   als Pilot und das IoT-Dashboard als ersten kompletten Bereich.
