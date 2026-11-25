# vencord.dev remake (PoC)

A SvelteKit rewrite of [vencord.dev](https://vencord.dev). It has the same pages, content, data sources and URLs, with a
visual style modeled on [betterdiscord.app](https://betterdiscord.app).

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:5173
pnpm check      # svelte-check
pnpm build      # Cloudflare output in .svelte-kit/cloudflare
```

`GITHUB_TOKEN` is optional (see `.env.example`). Without it, plugin data is read from `raw.githubusercontent.com` and
the `/source` and `/releases/*` routes make unauthenticated GitHub API calls, which have a lower rate limit.

## What is the same as the current site

- **Routes:** `/`, `/download`, `/plugins`, `/plugins/[name]`, `/support`, `/cloud`, `/cloud/privacy`, `/cloud/gdpr`,
  `/source`, `/releases/[repo]`, `/faq.json`, and `/install.sh`.
- **Redirects:** `/discord`, `/github`, `/x`, `/donate`, `/faq`, `/install`, and the `/download/vesktop/...` links
  (`src/lib/redirects.ts`).
- **Data:** `plugins.json` and `plugin-readmes.json` from `Vencord/builds`. FAQ and support articles are the original
  markdown files in `src/lib/content`.
- **Behaviour:**
  - `/plugins#query` search with highlighting and the Commands / Desktop / Web filters.
  - The download tab is picked from the URL hash, then the saved choice, then the detected OS.
  - Support questions can be deep-linked by `#Question-Title`.
  - The light/dark toggle uses the same `localStorage.theme` key as the current site.
  - Discord component embeds, JSON-LD and OpenGraph tags are kept.
- **Rendering:** every page is prerendered except `/source` and `/releases/*`, which are rendered on each request and
  edge-cached, as on the current site.

## Design

The tokens in `src/app.css` use BetterDiscord's design system: its neutral scale (`--bg1`…`--bg4`), Inter, 3–4px radii,
flat buttons with focus rings, and 1280px page sections. The page layouts also follow it: a hero with a client
screenshot, alternating feature showcases, an "And More" grid, a wave separator, addon cards, and an addon page with an
info sidebar. The accent is Vencord pink. To change it, edit `--accent` in `src/app.css`.

## Layout

```
src/
  app.css, app.html, env.ts, hooks.server.ts (redirects)
  lib/
    components/        NavBar, Footer, Seo, Callout, CodeBlock, Icon, download tabs
    server/            github.ts (API + raw fallback), data.ts (plugins), content.ts (markdown)
    content/           FAQ + support markdown (unchanged from vencord.dev)
  routes/              one folder per page
```

Built on SvelteKit 3. Shared code is imported as `#lib/...`, which replaces `$lib` in Kit 3.
