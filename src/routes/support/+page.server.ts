import { getCollection } from "#lib/server/content.ts";

export function load() {
    const strip = ({ slug, title, html }: ReturnType<typeof getCollection>[number]) => ({ slug, title, html });

    return {
        support: getCollection("support").map(strip),
        faq: getCollection("faq").map(strip)
    };
}
