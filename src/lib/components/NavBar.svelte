<script lang="ts">
    import { page } from "$app/state";
    import { NAV_LINKS } from "#lib/constants.ts";

    import Icon from "./Icon.svelte";

    let open = $state(false);

    const isActive = (href: string) => page.url.pathname === href || page.url.pathname.startsWith(href + "/");

    $effect(() => {
        // close the mobile menu whenever we navigate
        page.url.pathname;
        open = false;
    });
</script>

<nav id="navbar" class:open>
    <div class="navbar-inner">
        <a href="/" class="logo" aria-label="Vencord Home">
            <img src="/assets/logo-nav.webp" alt="Vencord" height="27" />
            <span id="oneko" aria-hidden="true"></span>
        </a>

        <ul class="nav-links">
            {#each NAV_LINKS as { href, label }}
                <li>
                    <a {href} class="nav-item" class:active={isActive(href)} aria-current={isActive(href) ? "page" : undefined}>
                        {label}
                    </a>
                </li>
            {/each}
        </ul>

        <div class="nav-actions">
            <a class="nav-icon" href="/github" title="Vencord Source Code" aria-label="Vencord on GitHub">
                <Icon name="github" size={22} />
            </a>
            <a class="nav-icon" href="/discord" title="Join Vencord's Discord Server" aria-label="Vencord's Discord Server">
                <Icon name="discord" size={24} />
            </a>
            <a class="btn btn-primary nav-download" href="/download">
                <Icon name="download" />
                Download
            </a>
            <button class="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onclick={() => (open = !open)}>
                <Icon name={open ? "close" : "menu"} size={24} />
            </button>
        </div>
    </div>
</nav>

<style>
    #navbar {
        position: sticky;
        top: 0;
        z-index: 100;
        flex: 0 0 auto;
        height: var(--nav-height);
        background: var(--bg1);
        border-bottom: 1px solid var(--border-subtle);
    }

    .navbar-inner {
        display: flex;
        align-items: center;
        height: 100%;
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 48px;
        gap: 24px;
    }

    .logo {
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 24px;
    }

    .logo img {
        height: 27px;
        width: auto;
        display: block;
    }

    .nav-links {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        flex: 1;
    }

    .nav-item {
        display: block;
        color: var(--text-normal);
        font-weight: 500;
        font-size: 15px;
        padding: 12px;
        margin: 0 2px;
        border-radius: 3px;
        white-space: nowrap;
        position: relative;
        transition: 0.15s ease color;
    }

    .nav-item:hover {
        color: var(--text-light);
        text-decoration: none;
    }

    .nav-item.active {
        color: var(--text-light);
    }

    .nav-item.active::after {
        content: "";
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: -14px;
        height: 3px;
        border-radius: 3px 3px 0 0;
        background: var(--accent);
    }

    .nav-actions {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .nav-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        color: var(--text-normal);
        border-radius: 3px;
        transition: 0.15s ease color;
    }

    .nav-icon:hover {
        color: var(--text-light);
    }

    .nav-download {
        margin-left: 8px;
        height: 40px;
        padding: 0 16px;
    }

    .nav-toggle {
        display: none;
        background: none;
        border: none;
        color: var(--text-light);
        width: 40px;
        height: 40px;
        cursor: pointer;
        align-items: center;
        justify-content: center;
    }

    /* oneko, sleeping next to the logo (from the original site) */
    #oneko {
        position: absolute;
        top: -6px;
        right: -26px;
        width: 32px;
        height: 32px;
        image-rendering: pixelated;
        background-image: url("/assets/oneko.gif");
        animation: sleep 1s steps(1) infinite;
        cursor: pointer;
    }

    #oneko:hover {
        animation: 2.5s 1 steps(1) forwards wakeup;
    }

    @media (prefers-reduced-motion) {
        #oneko {
            display: none;
        }
    }

    @keyframes sleep {
        0%,
        50% {
            background-position: -64px 0;
        }
        50%,
        100% {
            background-position: -64px -32px;
        }
    }

    @keyframes wakeup {
        0%,
        20% {
            background-position: -160px 0;
        }
        20%,
        40% {
            background-position: -192px 0;
        }
        40%,
        60% {
            background-position: -224px 0;
        }
        60%,
        80% {
            background-position: -96px -64px;
        }
        80%,
        100% {
            background-position: -96px -96px;
        }
    }

    @media screen and (max-width: 950px) {
        .navbar-inner {
            padding: 0 24px;
        }

        .nav-toggle {
            display: flex;
        }

        .nav-icon {
            display: none;
        }

        .nav-links {
            display: none;
            position: absolute;
            top: var(--nav-height);
            left: 0;
            right: 0;
            flex-direction: column;
            align-items: stretch;
            padding: 8px 16px 16px;
            background: var(--bg1);
            border-bottom: 1px solid var(--border-subtle);
            box-shadow: var(--shadow-card);
        }

        .open .nav-links {
            display: flex;
        }

        .nav-item.active {
            background: var(--bg3);
        }

        .nav-item.active::after {
            display: none;
        }

        .logo {
            margin-right: auto;
        }
    }

    @media screen and (max-width: 420px) {
        .nav-download {
            display: none;
        }
    }
</style>
