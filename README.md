# calliope-ui

Gemeinsame Svelte-Komponentenbibliothek (inkl. Storybook) für die Calliope-Editoren und -Apps
(Campus, IoT-Dashboard, Teachable, ML Trainer, …).

Status: Fundament im Aufbau (Library-Scaffold, Storybook, Foundations-Seiten).

- `docs/input/` – vorhandene Konzept-/Vorab-Dokumente
- `docs/01-bestandsaufnahme.md` – Analyse der bestehenden UI über alle Projekte
- `docs/plan/02-plan.md` – Architektur, Backlog, Phasen, Tool-Einsatz, offene Fragen (Entwurf)

## Development

Requires Node 22+ and pnpm 10+.

```sh
pnpm install
pnpm storybook        # Storybook on http://localhost:6006
pnpm build-storybook  # static Storybook in storybook-static/
pnpm package          # library build into dist/ (svelte-package + publint)
pnpm check            # svelte-check
```

- `src/lib/` – the library (`@calliope-edu/ui`): tokens (`tokens/`), base styles (`styles/`)
- `src/stories/` – Storybook pages, starting with Foundations (colours, typography)

Exports: `@calliope-edu/ui`, `@calliope-edu/ui/tokens`, `@calliope-edu/ui/tokens.css`,
`@calliope-edu/ui/styles.css` (tokens plus base styles in `@layer calliope.*`).
