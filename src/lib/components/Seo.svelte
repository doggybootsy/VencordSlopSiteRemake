<script lang="ts">
    import { page } from "$app/state";
    import { SITE } from "#lib/constants.ts";
    import type { DiscordComponent } from "#lib/discordComponents.ts";

    interface Props {
        title?: string;
        description: string;
        opengraph?: boolean;
        breadcrumbs?: [name: string, url: string][];
        component?: DiscordComponent;
    }

    const { title, description, opengraph = true, breadcrumbs, component }: Props = $props();

    const json = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

    const structuredData = $derived.by(() => {
        const data: any[] = [
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Vencord",
                alternateName: "VC",
                url: SITE,
                // SearchAction should only be on the homepage, according to Google.
                ...(page.url.pathname === "/" && {
                    potentialAction: {
                        "@type": "SearchAction",
                        target: { "@type": "EntryPoint", urlTemplate: `${SITE}/plugins#{plugin_name}` },
                        "query-input": "required name=plugin_name"
                    }
                })
            },
            {
                "@context": "https://schema.org",
                "@type": ["WebApplication", "SoftwareApplication"],
                name: "Vencord",
                operatingSystem: "Windows,macOS,Linux",
                applicationCategory: "UtilitiesApplication",
                browserRequirements: "Requires UserScript or extension support. Requires modern JavaScript support.",
                offers: { "@type": "Offer", price: "0" }
            }
        ];

        if (breadcrumbs)
            data.push({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map(([name, url], i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    name,
                    item: new URL(url, SITE).toString()
                }))
            });

        return data;
    });
</script>

<svelte:head>
    <title>{title ? `${title} | Vencord` : "Vencord"}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={new URL(page.url.pathname, SITE).toString()} />

    {#if opengraph}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title ?? "Vencord"} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={new URL(page.url.pathname, SITE).toString()} />
        <meta property="og:image" content={`${SITE}/assets/logo.png`} />
        {#if title}<meta property="og:site_name" content="Vencord" />{/if}
    {/if}

    {#if component}
        {@html `<script id="discord:component-embed" type="application/json">${json({ component })}</script>`}
    {/if}
    {@html `<script type="application/ld+json">${json(structuredData)}</script>`}
</svelte:head>
