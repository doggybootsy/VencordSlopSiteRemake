import { redirect } from "@sveltejs/kit";
import type { Handle } from "@sveltejs/kit/hooks";

import { Redirects } from "#lib/redirects.ts";

export const handle: Handle = async ({ event, resolve }) => {
    const path = event.url.pathname.replace(/\/+$/, "") || "/";
    const target = Redirects[path];
    // all targets come from our own fixed list, so external redirects are fine
    if (target) redirect(302, target, { external: true });

    return resolve(event);
};
