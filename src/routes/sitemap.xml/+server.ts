import { SITE } from "#lib/constants.ts";
import { fetchPlugins } from "#lib/server/data.ts";

const staticPages = ["/", "/download", "/plugins", "/support", "/cloud", "/cloud/privacy", "/cloud/gdpr", "/source", "/discord", "/github"];

export async function GET() {
    const plugins = (await fetchPlugins()).map(p => `/plugins/${encodeURIComponent(p.name)}`);

    const urls = [...staticPages, ...plugins]
        .map(path => `<url><loc>${SITE}${path === "/" ? "/" : path}</loc></url>`)
        .join("");

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
        { headers: { "Content-Type": "application/xml" } }
    );
}

export const prerender = true;
