# dell-playwright-ci

![Tests](https://github.com/avilevicode/dell-playwright-ci/actions/workflows/tests.yml/badge.svg)

A Jenkins-to-GitHub-Actions migration demo built around a real 15-test Playwright suite targeting [Dell UK](https://www.dell.com/en-uk).
The goal is to show the translation patterns, platform building blocks, and security practices that make a migration like this work at scale — not just for one repo, but for the long tail of teams consuming it.

## Migration: before and after

The original Jenkins pipeline lives in [`Jenkinsfile`](./Jenkinsfile) at the repo root.
The GitHub Actions equivalent is in [`.github/workflows/`](./.github/workflows/).

| Jenkins | GitHub Actions |
|---------|---------------|
| `@Library('dell-ci-shared') _` + `call()` | `workflow_call` reusable workflow |
| `agent { label 'playwright-runner' }` | `runs-on: [self-hosted, playwright-runner]` |
| `parallel { stage(...) }` 15 times | `strategy.matrix` — one job definition, 15 parallel runs |
| `post { always }` / `post { failure }` | `if: always()` / `if: failure()` on steps or jobs |
| `parameters { choice / string }` | `workflow_dispatch` inputs |
| `triggers { cron }` | `schedule` |
| `credentials('dell-email')` | `secrets: inherit` passed to reusable workflow |
| `publishHTML` | `upload-pages-artifact` + `deploy-pages` → GitHub Pages |
| `slackSend(...)` | `slackapi/slack-github-action` |

## Platform architecture

This repo demonstrates two layers of reuse — the same distinction a platform team ships to downstream consumers:

```
tests.yml                   ← caller: sets policy, passes inputs/secrets
  └── run-tests.yml         ← reusable workflow (workflow_call): golden path for self-hosted runs
        └── setup-playwright ← composite action: step-level building block (checkout, deps, browsers)
  └── run-tests-docker.yml  ← reusable workflow: alternative path using Docker image
```

**Composite action** (`.github/actions/setup-playwright/action.yml`) — runs inside the calling job, shares its runner.
Use for step-level reuse: checkout, install, cache.

**Reusable workflow** (`run-tests.yml`, `run-tests-docker.yml`) — runs as its own job(s) on its own runner.
Use for full pipeline reuse: the entire build-test-report sequence.

Rule of thumb: steps → composite action. Jobs → reusable workflow.

## Runner strategy

Two execution paths routed through `workflow_dispatch` input:

- **Docker path** (`run-tests-docker.yml`): GitHub-hosted `ubuntu-latest`, containerised with the official Playwright image (`mcr.microsoft.com/playwright`). No browser install needed.
- **Self-hosted path** (`run-tests.yml`): internal VM runner with browser caching. Falls back to `ubuntu-latest` after 60 s if no idle self-hosted runner is available.

The self-hosted runner was provisioned via a Hyper-V VM using [`scripts/01-create-vm.ps1`](./scripts/) and registered with the GitHub Actions runner agent.

## Security practices

- **SHA-pinned actions** — all third-party actions are pinned by commit SHA, not tag. Tags are mutable; a compromised tag can silently swap in malicious code. SHAs are immutable. See `.github/actions/setup-playwright/action.yml` for the pattern; Dependabot keeps them current.
- **`id-token: write`** — the report job declares OIDC token permission. In a signing workflow this is what you'd exchange with a KMS for short-lived credentials, enabling keyless signing with no static key on the runner.
- **`secrets: inherit`** — secrets flow from caller to reusable workflow without being exposed as plain inputs.
- **Least-privilege permissions** — each job declares only the permissions it needs (`pages: write`, `actions: read`, `id-token: write`). Default `contents: read` everywhere else.
- **Dependabot** — `.github/dependabot.yml` keeps action SHAs current automatically.

## Tests

| Job | Covers |
|-----|--------|
| 01-homepage | Title, header, footer |
| 02-navigation | Nav structure, laptops section |
| 03-search | Search bar, results page |
| 04-search-results-filter | Facet/filter panel |
| 05-product-listing | Product grid, prices |
| 06-product-detail | Product name, price, description |
| 07-add-to-cart | Add to cart button, cart indicator |
| 08-cart-page | Cart page loads, checkout button |
| 09-cookie-consent | GDPR banner appears and dismisses |
| 10-login | Sign in flow |
| 11-account-dashboard | Account page post-login |
| 12-order-history | Orders page post-login |
| 13-breadcrumbs | Breadcrumb trail on product pages |
| 14-product-gallery | Product images and thumbnails |
| 15-404-handling | Non-existent page error handling |

## Setup

### GitHub Secrets

| Secret | Value |
|--------|-------|
| `DELL_EMAIL` | Your Dell account email |
| `DELL_PASSWORD` | Your Dell account password |

### Running locally

```bash
npm ci
npx playwright install chromium
DELL_EMAIL=your@email.com DELL_PASSWORD=yourpassword npm test
```

To run a single test:

```bash
npx playwright test tests/01-homepage.spec.ts
```

To open the HTML report after a run:

```bash
npm run test:report
```
