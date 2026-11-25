import { json } from "@sveltejs/kit";

import { SITE } from "#lib/constants.ts";
import { getCollection } from "#lib/server/content.ts";

export function GET() {
    const faq = [...getCollection("support"), ...getCollection("faq")].map(({ title, tags, body }) => ({
        question: title,
        // fix [text](/relativeurl) to have full urls
        answer: body.replace(/\[(.+?)\]\((\/.+?)\)/g, `[$1](${SITE}$2)`),
        tags
    }));

    return json(faq);
}

export const prerender = true;
