<script lang="ts">
    import Icon from "#lib/components/Icon.svelte";
    import Seo from "#lib/components/Seo.svelte";

    const { data } = $props();

    // Same features as the original homepage
    const features = [
        { icon: "light-bulb", title: "Easy Install", description: "Super easy to install thanks to our graphical installer" },
        { icon: "heart", title: "User Friendly", description: "Comes with all plugins preinstalled. Just enable what you like and you're done" },
        { icon: "globe", title: "Excellent Browser Support", description: "Works just as well inside your favourite Browser!" },
        { icon: "locked", title: "Privacy Friendly", description: "Blocks Discord analytics & crash reports out of the box" },
        { icon: "package", title: "Maintained Actively", description: "No more broken plugins! Bugs are usually fixed within a day" },
        { icon: "hammer-and-wrench", title: "Developer Friendly", description: "Flexible and robust plugin system with many APIs empowering you" }
    ];

    const browsers = ["chrome", "brave", "edge", "firefox", "opera", "vivaldi", "chromium", "opera-gx"];

    const pluginCode = `import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "CuteGreeting",
    description: "Says hi whenever Discord starts",
    authors: [Devs.Ven],
    patches: [{
        find: "Messages.WELCOME_BACK",
        replacement: {
            match: /return (\\i)\\.welcome/,
            replace: "return $self.greet($1)"
        }
    }],
    greet(ctx) {
        return ctx.welcome + " :3";
    },
    start() {
        console.log("meow");
    }
});`;
</script>

<Seo description="Vencord is the cutest modification for Discord" />

<section id="home-hero-section">
    <div class="page-section-inner">
        <div id="hero-top-container">
            <img class="cute-logo" src="/assets/cute-logo.webp" alt="Vencord cute wordmark" width="420" />
            <h1 class="title">The cutest Discord client mod</h1>
            <p class="title-description">
                Vencord makes Discord yours. {data.pluginCount} built-in plugins, themes, browser support and privacy out of
                the box. Just install, enable what you like, and you're done.
            </p>
            <div class="btn-container">
                <a class="btn btn-primary btn-lg" href="/download">
                    <Icon name="download" />
                    Download Vencord
                </a>
                <a class="btn btn-secondary btn-lg" href="/discord">
                    <Icon name="discord" />
                    Join our Support Server
                </a>
                <a class="btn btn-secondary btn-lg" href="/github">
                    <Icon name="github" />
                    View on GitHub
                </a>
            </div>
            <div class="stats">
                <strong>{data.pluginCount}</strong> plugins included &middot; free &amp; open source
            </div>
        </div>
        <div id="hero-bottom-container">
            <img
                class="home-img"
                src="/assets/screenshots/vesktop-1-appstream.png"
                alt="Discord running Vencord"
                width="1449"
                height="978"
            />
        </div>
    </div>
</section>

<section id="home-features-section" class="page-section">
    <svg class="section-wave" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 192 C 240 120 480 96 720 144 S 1200 256 1440 160 V320 H0 Z" />
    </svg>
    <div class="page-section-inner features-view">
        <div class="feature" id="feature-1">
            <div class="plugin-showcase" aria-hidden="true">
                <pre><code>{pluginCode}</code></pre>
                <div class="plugin-showcase-inner">
                    <img src="/assets/logo.png" alt="" class="plugin-showcase-logo" />
                </div>
            </div>
            <div class="feature-text">
                <h2 class="title">Plugins</h2>
                <p class="title-description">
                    Every plugin comes preinstalled. No hunting through download links, no outdated files. Browse all
                    {data.pluginCount} of them, then flip a switch in settings to turn them on. Developers get a
                    flexible patching system and plenty of APIs to build their own.
                </p>
                <a class="btn btn-primary btn-lg" href="/plugins">
                    Browse Plugins
                    <Icon name="arrowRight" />
                </a>
            </div>
        </div>

        <div class="feature" id="feature-2">
            <div class="feature-text">
                <h2 class="title">Your browser, too</h2>
                <p class="title-description">
                    Vencord works just as well on Discord Web. Grab the extension from the Chrome Web Store or use the
                    userscript with your favourite userscript manager.
                </p>
                <a class="btn btn-primary btn-lg" href="/download#browser">
                    Get it for your browser
                    <Icon name="arrowRight" />
                </a>
            </div>
            <div class="browser-showcase" aria-hidden="true">
                {#each browsers as b}
                    <div class="browser-tile">
                        <img src={`/assets/browser-logos/${b}.svg`} alt="" width="48" height="48" />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<section id="home-additional-features" class="page-section">
    <div class="page-section-inner">
        <h2 class="title">And More</h2>
        <div id="additional-features">
            {#each features as f}
                <div class="additional-feature">
                    <img class="additional-feature-icon" src={`/assets/${f.icon}.png`} alt="" width="28" height="28" />
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<svg class="wave-separator" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
    <path class="accent-path" d="M0 0 H1440 V120 C 1150 200 900 60 620 120 S 180 200 0 140 Z" />
    <path class="main-path" d="M0 0 H1440 V90 C 1180 170 920 40 640 96 S 200 170 0 110 Z" />
</svg>

<section id="home-download-cta" class="page-section">
    <div class="page-section-inner">
        <h2 class="title">Download Vencord</h2>
        <p class="title-description">
            Available for Windows, macOS, Linux and your browser. Already on Vesktop? Vencord is built in.
        </p>
        <div class="btn-container">
            <a class="btn btn-primary btn-lg" href="/download">
                <Icon name="download" />
                Download
            </a>
            <a class="btn btn-secondary btn-lg" href="/source">
                <Icon name="code" />
                View Source
            </a>
        </div>
    </div>
</section>

<style>
    /* ---------- hero ---------- */

    #home-hero-section {
        display: flex;
        flex-direction: column;
        background-image: radial-gradient(circle at top center, var(--bg3), var(--bg2));
        overflow: hidden;
        min-height: calc(100vh - var(--nav-height));
        max-height: 1100px;
        padding-top: 56px;
    }

    #home-hero-section .page-section-inner {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 0 48px;
    }

    #hero-top-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 48px;
    }

    .cute-logo {
        width: 100%;
        max-width: 420px;
        height: auto;
        margin-bottom: 16px;
    }

    #hero-top-container .title-description {
        max-width: 640px;
        margin-bottom: 24px;
    }

    #hero-top-container .btn-container {
        justify-content: center;
    }

    .stats {
        margin-top: 14px;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-muted);
        font-variant-numeric: tabular-nums;
    }

    .stats strong {
        font-weight: 600;
        color: var(--text-normal);
    }

    #hero-bottom-container {
        display: flex;
        justify-content: center;
    }

    .home-img {
        width: 960px;
        max-width: 100%;
        height: auto;
        aspect-ratio: 960 / 300;
        object-fit: cover;
        object-position: top;
        display: block;
        border: 3px solid var(--bg4);
        border-bottom: none;
        border-radius: 8px 8px 0 0;
        box-shadow:
            0 2px 4px #00000020,
            0 8px 16px #00000039,
            0 32px 64px #00000053,
            0 64px 128px #00000060;
    }

    /* ---------- features ---------- */

    #home-features-section {
        position: relative;
        background: var(--bg3);
        padding: 96px 0;
        overflow: hidden;
    }

    .section-wave {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        fill: var(--bg3-alt);
        pointer-events: none;
    }

    .features-view {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 96px;
    }

    .feature {
        display: grid;
        align-items: center;
        gap: 6%;
    }

    #feature-1 {
        grid-template-columns: 520px auto;
    }

    #feature-2 {
        grid-template-columns: auto 520px;
    }

    .feature-text .title-description {
        margin-bottom: 20px;
    }

    .plugin-showcase,
    .browser-showcase {
        background: var(--bg4);
        box-shadow: var(--shadow-elevated);
        border-radius: 8px;
        height: 340px;
        position: relative;
        overflow: hidden;
    }

    .plugin-showcase pre {
        margin: 0;
        padding: 20px;
        font-size: 13px;
        line-height: 20px;
        color: var(--text-light);
        opacity: 0.18;
        user-select: none;
        white-space: pre;
    }

    .plugin-showcase-inner {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .plugin-showcase-logo {
        width: 140px;
        height: 140px;
        filter: drop-shadow(0 8px 24px #0006);
    }

    .browser-showcase {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        padding: 28px;
        align-content: center;
    }

    .browser-tile {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg3);
        border: 1px solid var(--border-subtle);
        border-radius: 8px;
    }

    /* ---------- additional features ---------- */

    #home-additional-features {
        background: var(--bg2-alt);
    }

    #home-additional-features .page-section-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #additional-features {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
        max-width: 860px;
        width: 100%;
        margin: 40px 0 16px;
        border-radius: 8px;
        overflow: hidden;
    }

    .additional-feature {
        display: flex;
        flex-direction: column;
        padding: 24px;
        background: var(--bg3-alt);
    }

    .additional-feature-icon {
        width: 28px;
        height: 28px;
        object-fit: contain;
        margin-bottom: 12px;
    }

    .additional-feature h3 {
        margin-bottom: 4px;
        color: var(--text-light);
        font-size: 18px;
        font-weight: 600;
    }

    .additional-feature p {
        margin: 0;
        color: var(--text-muted);
        font-weight: 500;
        font-size: 14px;
    }

    /* ---------- CTA ---------- */

    .wave-separator {
        display: block;
        width: 100%;
        height: 18vh;
        max-height: 260px;
        background: var(--bg2);
    }

    .wave-separator .main-path {
        fill: var(--bg2-alt);
    }

    .wave-separator .accent-path {
        fill: var(--accent);
        opacity: 0.25;
    }

    #home-download-cta {
        background: var(--bg2);
        padding: 24px 0 96px;
    }

    #home-download-cta .page-section-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    #home-download-cta .title-description {
        margin-bottom: 24px;
    }

    #home-download-cta .btn {
        min-width: 200px;
    }

    @media screen and (max-width: 1200px) {
        #feature-1,
        #feature-2 {
            grid-template-columns: 1fr;
            gap: 32px;
        }

        #feature-2 .browser-showcase {
            order: -1;
        }

        .plugin-showcase,
        .browser-showcase {
            max-width: 560px;
            width: 100%;
        }
    }

    @media screen and (max-width: 950px) {
        #home-hero-section {
            min-height: 0;
        }

        #home-hero-section .page-section-inner {
            padding: 0 24px;
        }

        .section-wave {
            display: none;
        }

        #additional-features {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media screen and (max-width: 700px) {
        .btn-container,
        .btn-container .btn {
            width: 100%;
        }

        #additional-features {
            grid-template-columns: 1fr;
        }

        .plugin-showcase {
            height: 260px;
        }
    }
</style>
