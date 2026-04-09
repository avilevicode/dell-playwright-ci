# dell-playwright-ci

![Tests](https://github.com/avilevicode/dell-playwright-ci/actions/workflows/tests.yml/badge.svg)

End-to-end test suite for [Dell UK](https://www.dell.com/en-uk) using Playwright, running as 15 parallel GitHub Actions jobs on `ubuntu-latest`.

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

Add these in **Settings > Secrets and variables > Actions**:

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
