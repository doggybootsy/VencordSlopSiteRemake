<script lang="ts">
    import "../app.css";

    import Footer from "#lib/components/Footer.svelte";
    import NavBar from "#lib/components/NavBar.svelte";

    const { children } = $props();
</script>

<NavBar />
<main>
    {@render children()}
</main>
<Footer />

<style>
    main {
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
    }
</style>
