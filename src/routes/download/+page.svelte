<script lang="ts">
    import { onMount } from "svelte";

    import BrowserTab from "#lib/components/download/BrowserTab.svelte";
    import LinuxTab from "#lib/components/download/LinuxTab.svelte";
    import MacTab from "#lib/components/download/MacTab.svelte";
    import WindowsTab from "#lib/components/download/WindowsTab.svelte";
    import Icon from "#lib/components/Icon.svelte";
    import type { IconName } from "#lib/components/icons.ts";
    import PageHeader from "#lib/components/PageHeader.svelte";
    import Seo from "#lib/components/Seo.svelte";
    import { CHROME_WEBSTORE_URL, DOWNLOAD_BASE, DownloadFileNames, SITE } from "#lib/constants.ts";
    import { ButtonStyle, ComponentType, EMBED_ACCENT } from "#lib/discordComponents.ts";

    const options = [
        { label: "Windows", hint: "Graphical installer", icon: "desktop", Tab: WindowsTab },
        { label: "Linux", hint: "Install script", icon: "terminal", Tab: LinuxTab },
        { label: "macOS", hint: "Disk image", icon: "desktop", Tab: MacTab },
        { label: "Browser", hint: "Extension & userscript", icon: "globe", Tab: BrowserTab }
    ] as const satisfies { label: string; hint: string; icon: IconName; Tab: unknown }[];

    type Platform = (typeof options)[number]["label"];

    function normalizePlatform(value: string | null | undefined): Platform | undefined {
        if (!value) return undefined;
        const lower = value.toLowerCase();
        if (lower === "mac") return "macOS";
        return options.find(o => o.label.toLowerCase() === lower)?.label;
    }

    let selected = $state<Platform>("Windows");

    function select(platform: Platform, push = true) {
        selected = platform;
        localStorage.platform = platform;
        const url = `#${platform.toLowerCase()}`;
        if (push) history.pushState(history.state, "", url);
        else history.replaceState(history.state, "", url);
    }

    onMount(() => {
        const detected =
            normalizePlatform(location.hash.slice(1)) ??
            normalizePlatform(localStorage.platform) ??
            (() => {
                const platform = navigator.platform.toLowerCase();
                if (platform.includes("linux")) return "Linux";
                if (platform.includes("mac")) return "macOS";
                return "Windows";
            })();

        select(detected, false);

        const onNavigate = () => {
            const match = normalizePlatform(location.hash.slice(1));
            if (match) selected = match;
        };

        window.addEventListener("popstate", onNavigate);
        window.addEventListener("hashchange", onNavigate);
        return () => {
            window.removeEventListener("popstate", onNavigate);
            window.removeEventListener("hashchange", onNavigate);
        };
    });

    function onKeydown(e: KeyboardEvent, i: number) {
        const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (!delta) return;
        e.preventDefault();
        const next = options[(i + delta + options.length) % options.length];
        select(next.label);
        document.getElementById(`tab-${next.label}`)?.focus();
    }

    const downloads = [
        { url: DOWNLOAD_BASE + DownloadFileNames.windows, os: "Windows", emojiId: "1550565763583180831" },
        { url: DOWNLOAD_BASE + DownloadFileNames.macOS, os: "macOS", emojiId: "1550560986266738709" },
        { url: DOWNLOAD_BASE + DownloadFileNames.linux, os: "Linux", emojiId: "815091849458614272" },
        { url: CHROME_WEBSTORE_URL, os: "Chrome Web Store", emojiId: "1550562771878420590" }
    ];

    const component = {
        type: ComponentType.Container,
        accent_color: EMBED_ACCENT,
        components: [
            { type: ComponentType.TextDisplay, content: `## [Download Vencord](${SITE}/download)\nDownload Vencord for Desktop or your favourite Browser!` },
            { type: ComponentType.Separator, divider: false },
            ...downloads.flatMap(({ url, os, emojiId }, i) => [
                ...(i === 0 ? [] : [{ type: ComponentType.Separator }]),
                {
                    type: ComponentType.Section,
                    components: [{ type: ComponentType.TextDisplay, content: os }],
                    accessory: { type: ComponentType.Button, style: ButtonStyle.Link, url, label: "Download", emoji: { name: os, id: emojiId } }
                }
            ])
        ]
    };
</script>

<Seo
    title="Download"
    description="Download Vencord for Desktop or your favourite Browser"
    breadcrumbs={[["Download", "/download"]]}
    {component}
/>

<PageHeader title="Download Vencord" description="Choose your platform to see installation instructions." />

<section class="page-section">
    <div class="page-section-inner">
        <div class="platforms" role="tablist" aria-label="Platform">
            {#each options as o, i}
                <button
                    id={`tab-${o.label}`}
                    class="platform"
                    class:active={selected === o.label}
                    role="tab"
                    aria-selected={selected === o.label}
                    aria-controls={`panel-${o.label}`}
                    tabindex={selected === o.label ? 0 : -1}
                    onclick={() => select(o.label)}
                    onkeydown={e => onKeydown(e, i)}
                >
                    <Icon name={o.icon} size={22} />
                    <span class="platform-text">
                        <span class="platform-name">{o.label}</span>
                        <span class="platform-hint">{o.hint}</span>
                    </span>
                </button>
            {/each}
        </div>

        {#each options as o}
            <div
                id={`panel-${o.label}`}
                class="panel download-panel"
                role="tabpanel"
                aria-labelledby={`tab-${o.label}`}
                hidden={selected !== o.label}
            >
                <h2 class="section-heading">{o.label}</h2>
                <o.Tab />
            </div>
        {/each}

        <p class="vesktop-note">
            Looking for a standalone app? <a href="/vesktop">Vesktop</a> is a custom Discord desktop app with Vencord built
            in.
        </p>
    </div>
</section>

<style>
    .platforms {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-bottom: 24px;
    }

    .platform {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        border-radius: 8px;
        border: 2px solid var(--bg4);
        background: var(--bg3);
        color: var(--text-muted);
        font: inherit;
        text-align: left;
        cursor: pointer;
        transition: 0.15s ease;
    }

    .platform:hover {
        border-color: var(--border-strong);
        color: var(--text-normal);
    }

    .platform.active {
        border-color: var(--accent);
        background: var(--accent-soft);
        color: var(--accent);
    }

    .platform-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
    }

    .platform-name {
        color: var(--text-light);
        font-weight: 600;
        font-size: 16px;
    }

    .platform-hint {
        font-size: 13px;
        font-weight: 500;
        color: var(--text-muted);
    }

    .download-panel {
        padding: 28px 32px;
        animation: fade-in 150ms ease-out;
    }

    .download-panel[hidden] {
        display: none;
    }

    .download-panel :global(p) {
        line-height: 1.65;
    }

    .vesktop-note {
        margin-top: 24px;
        color: var(--text-muted);
        font-weight: 500;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
    }

    @media screen and (max-width: 900px) {
        .platforms {
            grid-template-columns: repeat(2, 1fr);
        }

        .download-panel {
            padding: 20px;
        }
    }

    @media screen and (max-width: 420px) {
        .platform-hint {
            display: none;
        }
    }
</style>
