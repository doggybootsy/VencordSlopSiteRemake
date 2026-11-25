import { marked } from "marked";

export interface Article {
    slug: string;
    title: string;
    tags: string[];
    body: string;
    html: string;
}

const files = {
    faq: import.meta.glob("/src/lib/content/faq/*.md", { query: "?raw", import: "default", eager: true }),
    support: import.meta.glob("/src/lib/content/support/*.md", { query: "?raw", import: "default", eager: true })
} as Record<"faq" | "support", Record<string, string>>;

function parse(path: string, raw: string): Article {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    const meta: Record<string, string> = {};
    const body = (match?.[2] ?? raw).trim();

    for (const line of (match?.[1] ?? "").split(/\r?\n/)) {
        const i = line.indexOf(":");
        if (i !== -1) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }

    return {
        slug: path.split("/").pop()!.replace(/\.md$/, ""),
        title: meta.title ?? "",
        tags: (meta.tags ?? "").split(",").map(s => s.trim()).filter(Boolean),
        body,
        html: marked.parse(body, { async: false })
    };
}

/** Articles sorted by their numeric filename prefix (1_foo.md, 2_bar.md, ...) */
export function getCollection(name: keyof typeof files) {
    return Object.entries(files[name])
        .map(([path, raw]) => parse(path, raw))
        .sort((a, b) => parseInt(a.slug) - parseInt(b.slug));
}
