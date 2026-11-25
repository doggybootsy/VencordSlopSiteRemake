import { GITHUB_TOKEN } from "$app/env/private";

import { SOURCE_CODE } from "#lib/constants.ts";

const GITHUB_API_BASE_URL = "https://api.github.com/";

export type GithubRequestInit = RequestInit & {
    /** How long Cloudflare should cache the response for, in seconds. */
    cacheTtl?: number;
};

export async function fetchGithubApi(path: string, { cacheTtl, headers, ...init }: GithubRequestInit = {}) {
    const requestHeaders = new Headers(headers);
    requestHeaders.set("User-Agent", SOURCE_CODE);
    // optional: without a token requests are unauthenticated and have a lower rate limit
    if (GITHUB_TOKEN) requestHeaders.set("Authorization", `Bearer ${GITHUB_TOKEN}`);
    if (!requestHeaders.has("Accept")) requestHeaders.set("Accept", "application/vnd.github+json");

    const url = new URL(path, GITHUB_API_BASE_URL);

    const res = await fetch(url, {
        ...init,
        headers: requestHeaders,
        ...(cacheTtl !== undefined && { cf: { cacheEverything: true, cacheTtl } })
    } as RequestInit);

    if (!res.ok) {
        const body = await res.text().catch(() => "Unknown Error");
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}\n${body}`);
    }

    return res;
}

export function fetchGithubFile(path: string, init: GithubRequestInit = {}) {
    // without a token, read repo files from raw.githubusercontent.com to avoid API rate limits
    const contents = !GITHUB_TOKEN && path.match(/^repos\/([^/]+)\/([^/]+)\/contents\/(.+)$/);
    if (contents) {
        const [, owner, repo, file] = contents;
        return fetch(`https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${file}`).then(res => {
            if (!res.ok) throw new Error(`Failed to fetch ${file} from ${owner}/${repo}: ${res.status}`);
            return res;
        });
    }

    const headers = new Headers(init.headers);
    headers.set("Accept", "application/vnd.github.raw+json");
    return fetchGithubApi(path, { ...init, headers });
}

export async function fetchGithubJson<T>(path: string, init?: GithubRequestInit) {
    return (await fetchGithubApi(path, init)).json() as Promise<T>;
}

export async function fetchGithubFileJson<T>(path: string, init?: GithubRequestInit) {
    return (await fetchGithubFile(path, init)).json() as Promise<T>;
}
