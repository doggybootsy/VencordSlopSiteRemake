import { fetchGithubApi } from "#lib/server/github.ts";

export const prerender = false;

const Repos: Record<string, string> = {
    installer: "Vencord/Installer",
    vencord: "Vendicated/Vencord",
    "vencord-desktop": "Vencord/Desktop"
};

export async function GET({ params }) {
    const repo = Repos[params.repo];

    if (!repo)
        return new Response(null, {
            status: 404,
            headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" }
        });

    try {
        // cache for 5 seconds at the edge so we stay well within GitHub's rate limits
        const data = await fetchGithubApi(`repos/${repo}/releases/latest`, { cacheTtl: 5 });

        return new Response(await data.text(), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=20, s-maxage=20"
            }
        });
    } catch (e) {
        console.error(`GET ${repo}/releases/latest failed:`, e);
        return new Response(null, { status: 502 });
    }
}
