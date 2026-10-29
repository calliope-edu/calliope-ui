# calliope-ui

Gemeinsame Svelte-Komponentenbibliothek (inkl. Storybook) für die Calliope-Editoren und -Apps
(Campus, IoT-Dashboard, Teachable, ML Trainer, …).

Status: Fundament im Aufbau (Library-Scaffold, Storybook, Foundations-Seiten).

- `docs/input/` – vorhandene Konzept-/Vorab-Dokumente
- `docs/01-bestandsaufnahme.md` – Analyse der bestehenden UI über alle Projekte
- `docs/plan/02-plan.md` – Architektur, Backlog, Phasen, Tool-Einsatz, offene Fragen (Entwurf)
- `docs/03-design-audit.md` – design audit of Campus + IoT (Phase 0)
- `DESIGN.md` – design system (draft); token source in `src/lib/tokens/*.tokens.json`

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

### Deploying Storybook

Storybook is published on Cloudflare Pages (project `calliope-ui`, config in `wrangler.jsonc`,
output `storybook-static/`). Pages rather than Workers because a Pages project can get a custom
subdomain through a CNAME record at any DNS provider, while a Worker custom domain needs the whole
zone on Cloudflare.

The Pages project is connected to the GitHub repo (Git integration) with these build settings:

- Framework preset: none
- Build command: `pnpm build-storybook` (must be set: without it nothing is built and there is no
  `storybook-static/` to publish)
- Build output directory: `storybook-static`
- Production branch: `main`; other branches and pull requests get a preview URL

The build image takes the pnpm version from the `packageManager` field in `package.json`
(`pnpm@10.11.1`; `engines` requires pnpm >= 10). Without it the image may pick pnpm 9 and
`pnpm install --frozen-lockfile` fails with `ERR_PNPM_UNSUPPORTED_ENGINE`. If a build still picks
the wrong version, set the environment variable `PNPM_VERSION=10.11.1` in the Pages build settings.
Keep both in step when upgrading pnpm.

```sh
pnpm run deploy   # build and deploy manually (needs `wrangler login`; `pnpm deploy` is a pnpm built-in)
```
