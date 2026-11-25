import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        sveltekit({
            adapter: adapter(),
            paths: {
                // used as url.origin while prerendering
                origin: "https://vencord.dev"
            },
            prerender: {
                // not linked from any page, so the crawler wouldn't find them
                entries: ["*", "/faq.json", "/sitemap.xml"],
                // external links (discord, github...) are redirects, don't fail the build on them
                handleHttpError: "warn",
                // hashes on /download (#linux) and /plugins (#search) are app state, not element ids
                handleMissingId: "ignore"
            }
        })
    ]
});
