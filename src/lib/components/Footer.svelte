<script lang="ts">
    import Icon from "./Icon.svelte";
    import ThemeToggle from "./ThemeToggle.svelte";

    const columns = [
        {
            title: "Community",
            links: [
                ["Discord", "/discord"],
                ["X (Twitter)", "/x"],
                ["GitHub", "/github"],
                ["Donate", "/donate"]
            ]
        },
        {
            title: "Content",
            links: [
                ["Download", "/download"],
                ["Plugins", "/plugins"],
                ["Vesktop", "/vesktop"],
                ["Cloud", "/cloud"]
            ]
        },
        {
            title: "Help",
            links: [
                ["Support & FAQ", "/support"],
                ["Source Code", "/source"],
                ["Cloud Privacy", "/cloud/privacy"],
                ["GDPR", "/cloud/gdpr"]
            ]
        }
    ];
</script>

<footer id="section-footer">
    <div class="page-section-inner">
        <div class="footer-top">
            <div class="footer-brand">
                <a href="/" aria-label="Vencord Home">
                    <img src="/assets/logo-nav.webp" alt="Vencord" height="27" />
                </a>
                <p class="footer-tagline">The cutest Discord client mod</p>
                <div class="socials">
                    <a class="social-icon" href="/discord" title="Join Vencord's Discord Server">
                        <Icon name="discord" title="Discord" />
                    </a>
                    <a class="social-icon" href="/github" title="Vencord Source Code">
                        <Icon name="github" title="GitHub" />
                    </a>
                    <a class="social-icon" href="/x" title="Vencord on X (formerly Twitter)">
                        <Icon name="x" size={18} title="X" />
                    </a>
                    <a class="social-icon" href="/donate" title="Support Vencord's Development">
                        <Icon name="heart" title="Donate" />
                    </a>
                    <ThemeToggle />
                </div>
            </div>

            <div class="footer-columns">
                {#each columns as col}
                    <div class="footer-column">
                        <h2 class="footer-column-header">{col.title}</h2>
                        {#each col.links as [label, href]}
                            <a class="footer-column-item" {href}>{label}</a>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>

        <div class="footer-bottom">
            <span>
                <a href="/source">source code</a> &mdash; Discord is trademark of Discord Inc. Vencord is not affiliated
                with or endorsed by Discord Inc.
            </span>
        </div>
    </div>
</footer>

<style>
    #section-footer {
        background: var(--bg1);
        margin-top: auto;
        padding: 48px 0 32px;
    }

    .footer-top {
        display: flex;
        justify-content: space-between;
        gap: 48px;
        flex-wrap: wrap;
    }

    .footer-brand img {
        height: 27px;
        width: auto;
        display: block;
    }

    .footer-tagline {
        color: var(--text-muted);
        font-weight: 500;
        margin: 12px 0 16px;
    }

    .socials {
        display: flex;
        gap: 4px;
        margin-left: -6px;
    }

    .socials :global(.social-icon) {
        border-radius: 3px;
        color: var(--text-normal);
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.15s ease;
    }

    .socials :global(.social-icon:hover) {
        color: var(--accent);
    }

    .footer-columns {
        display: flex;
        gap: 72px;
        flex-wrap: wrap;
    }

    .footer-column-header {
        color: var(--text-light);
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: 700;
    }

    .footer-column-item {
        display: block;
        width: fit-content;
        color: var(--text-muted);
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 4px;
        transition: 0.15s ease;
    }

    .footer-column-item:hover {
        color: var(--text-normal);
        text-decoration: none;
    }

    .footer-bottom {
        margin-top: 40px;
        padding-top: 24px;
        border-top: 1px solid var(--border-subtle);
        color: var(--text-muted);
        font-size: 14px;
        font-weight: 500;
    }

    @media screen and (max-width: 700px) {
        .footer-columns {
            gap: 40px;
        }
    }
</style>
