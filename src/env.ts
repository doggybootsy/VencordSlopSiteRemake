import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
    GITHUB_TOKEN: {
        description: "Optional GitHub token. Raises API rate limits for /source and /releases/*",
        // optional: without it, requests are unauthenticated
        schema: value => value || undefined
    }
});
