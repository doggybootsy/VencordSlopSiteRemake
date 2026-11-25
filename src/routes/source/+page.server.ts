import { fetchGithubJson } from "#lib/server/github.ts";

// live data, rendered on request and cached at the edge (like the original)
export const prerender = false;

const Repos = [
    { name: "Vencord", description: "Vencord's main repository containing all inbuilt plugins", repo: "Vendicated/Vencord" },
    { name: "Vencord Installer", description: "Vencord's Installer", repo: "Vencord/Installer" },
    { name: "vencord.dev", description: "Vencord's official website (the one you're currently on)", repo: "Vencord/vencord.dev" },
    {
        name: "Vesktop",
        description: "Vencord's standalone desktop app, offering you a more lightweight, faster and more secure solution for using Vencord",
        repo: "Vencord/Vesktop"
    },
    { name: "Vencloud", description: "Vencord's Backend providing you with features like settings sync", repo: "Vencord/Vencloud" },
    { name: "venmic", description: "Native node module that powers Linux Audio screenshare on Vesktop", repo: "Vencord/venmic" }
];

interface GithubRepo {
    language: string | null;
    stargazers_count: number;
    html_url: string;
    owner: { login: string; avatar_url: string };
}

export async function load({ setHeaders }) {
    const repos = await Promise.all(
        Repos.map(async ({ repo, ...info }) => {
            try {
                const data = await fetchGithubJson<GithubRepo>(`repos/${repo}`);
                const avatar = new URL(data.owner.avatar_url);
                avatar.searchParams.set("size", "64");

                return {
                    ...info,
                    url: data.html_url,
                    language: data.language,
                    stars: data.stargazers_count,
                    owner: data.owner.login,
                    avatar: avatar.toString()
                };
            } catch (e) {
                console.error(e);
                // still show the repo if GitHub is unavailable / rate limited
                return { ...info, url: `https://github.com/${repo}`, language: null, stars: null, owner: repo.split("/")[0], avatar: null };
            }
        })
    );

    setHeaders({ "Cache-Control": "public, max-age=1200, s-maxage=1200" });

    return { repos };
}
