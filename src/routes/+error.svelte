<script lang="ts">
    import { page } from "$app/state";
    import Seo from "#lib/components/Seo.svelte";
</script>

<Seo title={String(page.status)} description="Uh oh" opengraph={false} />

<section class="error-page">
    <img src="/assets/oneko-jump.png" alt="" width="100" height="100" />
    <h1>{page.status}</h1>
    {#if page.status === 404}
        <p class="sub dark-only">are you lost?</p>
        <p class="sub light-only">it's dark here...</p>
    {:else}
        <p class="sub">{page.error?.message ?? "something went wrong"}</p>
    {/if}
    <a class="btn btn-primary btn-lg" href="/">let's go home...</a>
</section>

<style>
    @font-face {
        font-family: "Minecraft";
        src: url("/fonts/Minecraft-Regular.woff") format("woff");
        font-display: swap;
    }

    .error-page {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 72px 24px;
        text-align: center;
        background-image: radial-gradient(circle at top center, var(--bg3), var(--bg2) 70%);
    }

    img {
        image-rendering: pixelated;
    }

    h1,
    .sub {
        font-family: Minecraft, Inter, system-ui, sans-serif;
    }

    h1 {
        font-size: 96px;
        line-height: 1;
        margin: 8px 0 0;
    }

    .sub {
        font-size: 36px;
        color: var(--accent);
        margin: 8px 0 32px;
    }

    :global([data-theme="light"]) .dark-only,
    :global([data-theme="dark"]) .light-only {
        display: none;
    }
</style>
