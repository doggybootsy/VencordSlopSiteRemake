<script lang="ts">
    import { CHROME_WEBSTORE_URL, USERSCRIPT_URL } from "#lib/constants.ts";

    import Callout from "../Callout.svelte";
    import Actions from "./Actions.svelte";

    const Chromiums = ["brave", "chrome", "chromium", "edge", "opera", "opera-gx", "vivaldi"];
    const browserName = (b: string) =>
        b
            .split("-")
            .map(w => (w === "gx" ? "GX" : w[0].toUpperCase() + w.slice(1)))
            .join(" ");
</script>

{#snippet logo(browser: string)}
    <img class="browser-logo" src={`/assets/browser-logos/${browser}.svg`} alt={browserName(browser)} title={browserName(browser)} width="32" height="32" />
{/snippet}

<Actions
    links={[
        { href: CHROME_WEBSTORE_URL, label: "Add to Chrome", primary: true },
        { href: USERSCRIPT_URL, label: "Install Userscript", title: "Download Vencord.user.js" }
    ]}
/>

<Callout kind="warning">
    <p>The CSS Editor, custom themes and plugins that use external scripts will not work with the Userscript.</p>
</Callout>

<h3 class="guide-heading">How to install</h3>

<div class="browser-rows">
    <div class="browser-row">
        <div class="browser-logos">
            {#each Chromiums as c}{@render logo(c)}{/each}
        </div>
        <div class="browser-info">
            <h4>Chromium-based browsers</h4>
            <p>Install the extension from the <a href={CHROME_WEBSTORE_URL}>Chrome Webstore</a>.</p>
            <p>
                Alternatively, install a userscript manager like
                <a href="https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag">Violentmonkey</a>
                or
                <a href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo">Tampermonkey</a>.
                Then open the <a href={USERSCRIPT_URL}>Vencord.user.js</a> link and your userscript manager should prompt you
                to install it.
            </p>
        </div>
    </div>

    <div class="browser-row">
        <div class="browser-logos">{@render logo("firefox")}</div>
        <div class="browser-info">
            <h4>Firefox</h4>
            <ol>
                <li>
                    Install the Tampermonkey extension
                    <a href="https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/">from the Firefox Add-ons store</a>.
                    (Other Userscript managers like Violentmonkey are sadly not supported due to a Firefox bug that only
                    Tampermonkey works around)
                </li>
                <li>Open the <a href={USERSCRIPT_URL}>Vencord.user.js</a> link and Tampermonkey should prompt you to install it</li>
            </ol>
            <p>
                Unfortunately, publishing to the Mozilla extension store is a nightmare and forces us to limit Vencord's
                features due to their strict guidelines. Firefox does not let you install third party extensions unless
                they are signed (which also requires store approval). As such, it is no longer possible for us to offer a
                Firefox extension.
            </p>
        </div>
    </div>

    <div class="browser-row">
        <div class="browser-logos">{@render logo("safari")}</div>
        <div class="browser-info">
            <h4>Safari</h4>
            <p>
                We do not currently support Safari, sorry. Please use a different browser if you are interested in using
                Vencord Web.
            </p>
        </div>
    </div>
</div>

<Callout kind="error">
    <p>
        If the extension is ever broken, please use our <a href="/discord">support channel</a> instead of leaving a negative
        review on the Chrome Web Store. We are likely already working on fixing it, or even just waiting for Google to approve
        the update. Receiving negative reviews for a temporary breakage that we have no control over is very frustrating.
    </p>
    <p>
        Additionally, don't use the support hub on the Chrome Web Store. We will not answer there. Instead, use our
        <a href="/discord">Discord server</a>.
    </p>
</Callout>

<style>
    .guide-heading {
        font-size: 18px;
        margin: 28px 0 16px;
    }

    .browser-rows {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--bg4);
        border-radius: 8px;
        overflow: hidden;
    }

    .browser-row {
        display: grid;
        grid-template-columns: 11rem minmax(0, 1fr);
        gap: 20px;
        padding: 20px;
        background: var(--bg3-alt);
    }

    .browser-row + .browser-row {
        border-top: 1px solid var(--bg4);
    }

    .browser-logos {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-content: flex-start;
    }

    .browser-logo {
        width: 32px;
        height: 32px;
    }

    h4 {
        font-size: 16px;
        margin-bottom: 6px;
    }

    .browser-info p:last-child {
        margin-bottom: 0;
    }

    ol {
        padding-left: 1.25em;
        margin: 0 0 12px;
    }

    @media screen and (max-width: 600px) {
        .browser-row {
            grid-template-columns: 1fr;
            gap: 12px;
        }
    }
</style>
