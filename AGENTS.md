# AGENTS.md

This file is the durable working brief for future agents and maintainers. Keep it accurate whenever the website, legal details, framework setup, policies, product list, deployment process, or business requirements change.

## Project Purpose

This repository contains the public website for Anthony Poschen.

The website has two primary jobs:

1. Act as Anthony Poschen's public home base for current and future software products.
2. Provide a credible, accurate business website suitable for Stripe account verification.

The site should feel like a real founder-led software business. It should not feel like a fake company, generic agency, or oversized corporate brand.

The tone should be direct, honest, technical, and human:

- Good: "I build software products."
- Good: "Anthony Poschen is an Australian independent software developer building mobile apps, web apps, games, and hosting-related software products."
- Bad: "We are a world-class digital transformation agency delivering enterprise-grade solutions at scale."

## Business Identity Requirements

The public identity is:

```text
Anthony Poschen
```

The legal/business identity is:

```text
Anthony Peter Poschen
```

The business is currently presented as an Australian individual / sole trader.

Current business details:

```text
Public name: Anthony Poschen
Legal business name: Anthony Peter Poschen
Business type: Individual / Sole Trader
ABN: 53 034 942 458
Country: Australia
Contact email: zanven42@gmail.com
Website: https://anthonyposchen.com
GitHub: https://github.com/AnthonyPoschen
X: https://x.com/AnthonyPoschen
```

Do not describe the business as:

```text
Poschen Pty Ltd
```

Do not imply that this is a company, corporation, agency, studio, or team unless Anthony explicitly changes the business structure later.

Do not use Plexus as the umbrella brand for this website.

## Single Source Of Business Details

All reusable business identity values must be defined in:

```text
web/business-details.js
```

That file owns:

- Public name
- Legal name
- ABN
- Country/location
- Contact email
- Social links
- Copyright year
- Business type
- Website URL
- Site title
- Site description

When displaying business details in HTML, prefer `data-business` and `data-business-href` attributes instead of hardcoding repeated legal/contact values across pages.

Example:

```html
<span data-business="legalName"></span>
<a data-business-href="email" data-business="email" href="#"></a>
```

Only `web/business-details.js` should need to change when contact/legal/social identity details change. If a page absolutely needs fallback text for accessibility or no-JS behavior, make sure it still cannot drift from the source of truth.

## Stripe Verification Requirements

Stripe reviewers should be able to clearly understand:

- Who operates the business
- What the business sells or intends to sell
- How customers can contact the business
- What legal/trading identity is associated with the website
- Where to find privacy, terms, and refund policies
- That the website matches the Stripe account details

Expected Stripe setup:

```text
Business type: Individual / Sole Trader
Legal business name: Anthony Peter Poschen
Website: https://anthonyposchen.com
ABN: 53 034 942 458
Country: Australia
```

Do not add claims that would make Stripe verification harder, such as fake products, fake team references, fake addresses, exaggerated scale, or a different legal entity name.

## Business Activities

The website should describe Anthony's work broadly enough to cover current and future software products:

- Mobile apps for iPhone and Android
- Web applications
- Software tools
- Game-related products
- Game server tools
- Hosting-related services
- Video games
- Other digital products

Safe wording:

```text
I build software products including mobile apps, web applications, games, game-server tools, and hosting-related services.
```

Safe wording:

```text
Anthony Poschen is an Australian independent software developer building mobile apps, web apps, games, and hosting-related software products.
```

Do not invent live products. If there are no live products yet, say so honestly.

## Required Pages And Routes

The site is a single-page app with routed page components. These routes should continue to exist unless Anthony explicitly removes them:

```text
/ 
/privacy
/terms
/refund-policy
```

Required route purposes:

- `/`: Introduce Anthony, explain what he builds, show business identity, highlight GitHub and X, list websites/products/tools/repos/free game mods, and include contact/support details.
- `/privacy`: Explain simple personal information handling, email contact, future product data, payment processors such as Stripe, and contact method.
- `/terms`: Set basic terms for using the website and future software products/services.
- `/refund-policy`: Explain refund/cancellation handling for digital products, subscriptions, services, and hosting-related products.

Every page should have access to footer navigation and legal details through the app shell.

## Footer Requirements

Every page must show or inherit a footer containing:

```text
© 2026 Anthony Poschen
Business name: Anthony Peter Poschen
ABN: 53 034 942 458
Australia
Contact: zanven42@gmail.com
```

Footer navigation should include:

- Home
- Privacy Policy
- Terms of Service
- Refund Policy

Use `web/business-details.js` for all reusable identity values.

## Product Listing Rules

The product list must be honest and easy to expand.

Each future product should support:

- Product name
- Short description
- Category
- Status
- Link
- Pricing or availability note if relevant
- Support information if relevant

Supported categories include:

- Mobile App
- Web App
- Game
- Game Server Tool
- Hosting Service
- Developer Tool
- Digital Product
- Other Software

Suggested statuses:

- Live
- In development
- Planned
- Retired

If there are no live products, keep the message simple:

```text
Products will be listed here as they are released.
```

Do not create fake products for credibility.

## Policy Requirements

The policy pages are intentionally simple. Keep them broad enough for future products, but do not overstate what exists today.

Privacy policy should cover:

- Who operates the website
- What information is collected now
- What future products may collect
- How email/support information is used
- Payment processing through third-party providers such as Stripe
- Contact email
- Australian business context

Terms should cover:

- Use of the website
- Use of software products
- Payments and subscriptions
- Product-specific terms
- Service availability
- Limitation of liability
- Contact email

Refund policy should cover:

- Digital products
- Subscriptions
- Services
- Hosting-related services
- How to request a refund
- Australian consumer law
- Contact email

Avoid aggressive "no refunds ever" language. Case-by-case and consumer-law-aware wording is preferred.

## Framework And Code Shape

This project uses Anthony's `basic-web` framework.

The Go module depends on the local framework via:

```text
replace github.com/AnthonyPoschen/basic-web => ../basic-web
```

The framework shape is:

- `main.go` embeds `web/*`.
- In development, `main.go` serves `./web` directly.
- In production, embedded files are minified via `basic-web/pkg/memfs`.
- `util.SetupHttpMux` serves static files and falls back to `index.html` for SPA routes.
- Browser framework scripts are loaded from `/framework/utils.js`, `/framework/loader.js`, and `/framework/router.js`.
- Custom elements are lazy-loaded from `web/elements/**/*.html`.
- Route components are registered in `web/index.html`.
- `<route-view>` renders the matched page element.
- Direct SPA routes need real non-dot marker files under `web/<route>/` because `basic-web` checks whether the route path exists before serving `index.html`, and Go embed ignores dotfiles. Keep files such as `web/privacy/route.txt`, `web/terms/route.txt`, and `web/refund-policy/route.txt`.

Important files:

```text
main.go
go.mod
go.sum
makefile
Dockerfile
.dockerignore
.github/workflows/docker.yml
kustomization/base/kustomization.yaml
kustomization/base/deployment.yaml
kustomization/base/image-automation.yaml
kustomization/base/service.yaml
kustomization/overlays/prod/kustomization.yaml
web/index.html
web/styles.css
web/business-details.js
web/elements/pages/page-home.html
web/elements/pages/page-privacy.html
web/elements/pages/page-terms.html
web/elements/pages/page-refund.html
web/privacy/route.txt
web/terms/route.txt
web/refund-policy/route.txt
```

Page components should render into normal light DOM rather than shadow DOM. This keeps the global stylesheet simple, makes policy pages and business details easier to select/copy, and avoids style/application timing issues with lazily loaded components.

Do not append route content in the custom element constructor. `basic-web`'s router creates already-defined custom elements during SPA navigation, and adding child nodes in the constructor can leave the routed page empty when navigating between pages. Cache the template when the component script loads, then clone it in `connectedCallback()` if the element is empty:

```js
const pageHomeTemplate = document.getElementById('page-home');

customElements.define('page-home', class extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		if (!this.hasChildNodes()) {
			this.appendChild(pageHomeTemplate.content.cloneNode(true));
		}
		window.Business?.apply(this);
	}
});
```

Use optional chaining when applying business details because components may connect before `web/business-details.js` has initialized.

## Development Commands

Install Air if needed:

```sh
make install_air
```

Run the development server:

```sh
make run
```

The `make run` command uses Air.

The Air setup intentionally follows the macOS-safe pattern used by the Plexus website: use a repo-local Go build cache, build a real binary into `./tmp/anthonyposchen-com`, then run that binary with `DEV=1`. Do not switch this back to `air --build.full_bin "go run main.go"` unless there is a specific reason and it has been tested on macOS.

The current Air build command is:

```sh
mkdir -p ./tmp/go-build ./tmp/go-mod && env GOCACHE=$(CURDIR)/tmp/go-build GOMODCACHE=$(CURDIR)/tmp/go-mod go build -o ./tmp/anthonyposchen-com .
```

Air should run the compiled binary with `DEV=1` via `--build.full_bin`, not
`--build.bin`, because current Air versions treat `build.bin` as a binary path.

The local server defaults to:

```text
http://localhost:42069
```

`PORT` can override the default port:

```sh
PORT=3000 go run main.go
```

## Docker And GHCR Publishing

This repository includes:

```text
Dockerfile
.dockerignore
.github/workflows/docker.yml
```

The Docker image builds a static Go binary and runs it from `scratch`.

Runtime defaults:

```text
PORT=42069
EXPOSE 42069
```

The image is published to GitHub Container Registry:

```text
ghcr.io/anthonyposchen/anthonyposchen.com
```

The workflow runs on pushes to `master`, pushes to `main`, version tags matching `v*`, and manual `workflow_dispatch`.

The Docker workflow ignores commits that only change `kustomization/**`. This prevents Flux image automation commits from triggering another Docker build and creating an image-update loop.

For branch builds, the workflow publishes a commit-traceable image tag in this form:

```text
<branch>-<short-git-sha>-<unix-timestamp>
```

For example:

```text
master-5838cfa-1779289200
```

Flux image automation uses this timestamp suffix to select the newest branch build while keeping the selected image tag tied to the Git commit that produced it. Do not replace this with a plain Git SHA policy: SHA tags are identifiers, not orderable versions, so Flux cannot reliably select the newest commit from `sha-*` tags alone.

The app depends on the local `basic-web` framework via:

```text
replace github.com/AnthonyPoschen/basic-web => ../basic-web
```

Because of that replacement, Docker builds require a named build context called `basic-web`.

Local build example:

```sh
docker build --build-context basic-web=../basic-web -t anthonyposchen-com .
```

GitHub Actions checks out `AnthonyPoschen/basic-web` into `./basic-web` and passes it to `docker/build-push-action` as:

```text
build-contexts:
  basic-web=./basic-web
```

If `basic-web` is private, create a repository secret named `BASIC_WEB_READ_TOKEN` with read access to that repository. If it is public, the default GitHub token should be enough.

Do not remove the named build context unless `go.mod` no longer uses the local `replace ../basic-web` dependency.

## Kubernetes And FluxCD

FluxCD should use the production Kustomize entrypoint:

```text
kustomization/overlays/prod
```

The production overlay should include:

```text
kustomization/base
```

The base Kubernetes manifests define:

- A `Deployment` named `anthonyposchen-com`
- A `Service` named `anthonyposchen-com`
- A Gateway API `HTTPRoute` named `anthonyposchen-com`
- The container image `ghcr.io/anthonyposchen/anthonyposchen.com`
- Container port `42069`
- A ClusterIP service exposing port `80` and targeting the deployment's named `http` port
- Routing for `anthonyposchen.com` through the `Gateway` named `ingress` in the `kube-system` namespace
- Flux image automation resources for `ghcr.io/anthonyposchen/anthonyposchen.com`

The Kubernetes setup intentionally does not define the Gateway itself, TLS certificates, or external load balancer details. Assume external/upstream infrastructure provides the `kube-system/ingress` Gateway and sends matching traffic to the service through the `HTTPRoute`.

The cluster is expected to have Flux image automation CRDs and controllers installed:

```text
image-reflector-controller
image-automation-controller
```

The app Flux `Kustomization` applies this repo with `targetNamespace: app-anthonyposchen-com`, so the image automation resources are expected to live in the `app-anthonyposchen-com` namespace even though the source `GitRepository` lives in `flux-system`. `ImageUpdateAutomation` should reference `sourceRef.name: app-anthonyposchen-com` and `sourceRef.namespace: flux-system`. `ImagePolicy` filters `master-<short-git-sha>-<unix-timestamp>` tags, extracts the timestamp, and uses a numerical ascending policy to select the newest image. The deployment image line must keep its inline Flux setter comment:

```yaml
image: ghcr.io/anthonyposchen/anthonyposchen.com:master-5838cfa-1779289200 # {"$imagepolicy": "app-anthonyposchen-com:anthonyposchen-com"}
```

Flux updates files under `./kustomization/base` and commits the changed image reference back to `master`. The image automation commit message includes `[skip ci]`, and the Docker workflow also ignores `kustomization/**`, to prevent digest update commits from triggering another container build.

## Design Direction

The design should remain distinct from Plexus. Do not copy Plexus styling.

Current visual direction:

- Founder-led, dark, programmer-themed, and intentionally designed
- Charcoal terminal-like background with restrained grid/glow texture
- Green command-line accents with small amber highlights
- Monospace/code-inspired typography
- Keep the homepage utilitarian: short intro, highlighted social links, business identity, and a simple hyperlink list of websites/products with one-line descriptions
- Avoid marketing fluff, feature grids, and multiple placeholder cards
- Policy pages should look like polished dark README/legal documents while remaining normal selectable text, not collections of cards
- Clear business identity panel
- Mobile-friendly layout
- Dark mode is the default design

The site should feel credible, calm, maintained, and not lazy. Avoid both extremes: do not make it a loud portfolio circus, and do not reduce it to an unstyled white page with text. Avoid bland template aesthetics and default purple SaaS styling.

Do not add external frontend frameworks unless Anthony explicitly asks. Keep the site small, fast, and easy to maintain.

## Accessibility And Content Quality

Maintain:

- Semantic headings
- Clear link text
- Keyboard-visible focus styles
- Responsive mobile layout
- Sufficient color contrast
- Plain-language policy copy
- Accurate business claims

Avoid:

- Fake testimonials
- Fake customer logos
- Fake company/team language
- Overstated product claims
- Misleading legal identity
- Hardcoded repeated contact/legal details outside the source of truth

## Working With `docs/context.md`

`docs/context.md` may exist locally as temporary planning context, but it is not expected to be checked in.

Do not rely on `docs/context.md` for future work.

This `AGENTS.md` file is the source of project guidance for agents and maintainers.

## Maintenance Requirement

Whenever you make a meaningful change to this website, update `AGENTS.md` in the same change if any of the following changed:

- Business/legal identity
- Contact details
- ABN display requirements
- Stripe verification assumptions
- Website purpose
- Required routes/pages
- Policy wording or policy scope
- Product listing rules
- Framework structure
- Development commands
- Deployment assumptions
- Design direction
- Source-of-truth files

If a change does not require an `AGENTS.md` update, briefly confirm that during handoff.

The goal is that a future agent can open this file and safely continue work without needing private chat history or untracked planning documents.
