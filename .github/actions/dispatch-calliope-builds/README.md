# dispatch-calliope-builds

Rebuilds the apps that build with `@calliope-edu/ui` and the connection widget, so a new commit
or release of either reaches them without a commit of their own:

| Channel | Starts                                                        | Takes (resolve-calliope-deps)         |
| ------- | ------------------------------------------------------------- | ------------------------------------- |
| `dev`   | each app's build workflow on its dev branch                   | the newest commits on `calliope-main` |
| `live`  | each app's build workflow on its newest release tag (`X.Y.Z`) | the newest release tags               |

Each build is started with `workflow_dispatch` on that branch or tag, so it runs exactly as a
push of it would: a dev build lands on the app's `build-dev`, a live build on its `build-live`
(Campus: the `:main` image campus-dev runs). The apps' workflows need nothing more than a
`workflow_dispatch:` trigger.

Who runs it:

- calliope-ui and the widget, `.github/workflows/dispatch-builds.yml`: every push to
  `calliope-main` starts `dev`.
- Their `release.yml`, as its last step: `dev live` (the release commit and the new tag; a push
  made with the workflow token starts no workflow by itself).
- By hand: `gh workflow run dispatch-builds.yml -R calliope-edu/calliope-ui -f channels="dev live"`.

## The apps: builds.json

```json
{
	"repo": "calliope-edu/ml-trainer",
	"workflow": "calliope-build.yml",
	"dev": { "ref": "calliope-main" },
	"live": { "tagPrefix": "calliope-v" }
}
```

`dev.ref` is the branch the dev build runs on, `live.tagPrefix` the prefix of the app's release
tags (`calliope-v` in forks, `v` in our own repositories); `inputs` (optional, in `dev` or
`live`) are passed to the workflow. An app without `live` gets no live rebuild: Campus takes a new
calliope-ui or widget release with its own next release. Only apps that build with calliope-ui or
the widget belong here (Python, Blocks and Snap! do not yet); a new entry also needs the GitHub
App installed on its repository. One failing app does not stop the others; the run fails at the
end and the job summary names it.

## The GitHub App (once, by an org owner)

The dispatches need a token that may start workflows in other repositories; the workflow token
cannot. A GitHub App gives one for each run.

1. calliope-edu → Settings → Developer settings → GitHub Apps → **New GitHub App**. Name
   `Calliope builds`, homepage `https://github.com/calliope-edu`, **Webhook: Active off**.
   Repository permissions: **Actions: Read and write**, **Contents: Read-only** (Metadata comes
   with it). Installable: only on this account. Create.
2. On the App's page: note the **App ID**; **Generate a private key** (downloads a `.pem`).
3. **Install App** → calliope-edu → Only select repositories: every repository in builds.json
   (today `ml-trainer`, `Teachable-Calliope-Svelte`, `calliope-campus`).
4. calliope-edu → Settings → Secrets and variables → Actions:
   - Variables → New organization variable `CALLIOPE_BUILDS_APP_ID` = the App ID;
   - Secrets → New organization secret `CALLIOPE_BUILDS_APP_KEY` = the whole `.pem` file;
   - both with repository access for `calliope-ui` and `mini-connection-widget`.
     Repository variables and secrets of the same names in both repositories work as well (that
     is how the App `calliope-builds`, ID 5904477, was set up on 2026-11-24:
     `gh variable set` / `gh secret set -R calliope-edu/<repo>`).
5. Try it: `gh workflow run dispatch-builds.yml -R calliope-edu/calliope-ui -f channels=dev`;
   the run's summary lists the builds it started.

Until the App is set up, the action only lists what it would start (a warning in the run, no
failure).

## Use

```yaml
- uses: calliope-edu/calliope-ui/.github/actions/dispatch-calliope-builds@calliope-main
  with:
    channels: dev # dev | live | dev live
    app-id: ${{ vars.CALLIOPE_BUILDS_APP_ID }}
    private-key: ${{ secrets.CALLIOPE_BUILDS_APP_KEY }}
    # dry-run: 'true'   # only list
```

## Locally

```sh
node .github/actions/dispatch-calliope-builds/dispatch-calliope-builds.mjs --channels "dev live" --dry-run
```

`--dry-run` only reads the apps' tags (public repositories need no token) and prints what it
would start; without it, `GITHUB_TOKEN` or `GH_TOKEN` must be allowed to start the workflows.
