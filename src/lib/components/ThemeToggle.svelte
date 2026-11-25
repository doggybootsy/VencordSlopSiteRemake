<script lang="ts">
    import { onMount } from "svelte";

    import Icon from "./Icon.svelte";

    let theme = $state<"light" | "dark">("dark");

    onMount(() => {
        theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    });

    function toggle() {
        theme = theme === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = theme;
        // same storage format as the original site
        localStorage.theme = theme === "light" ? "Light" : "Dark";
    }

    const label = $derived(theme === "light" ? "Switch to Dark theme" : "Switch to Light theme");
</script>

<button class="social-icon" onclick={toggle} title={label} aria-label={label}>
    <Icon name={theme === "light" ? "moon" : "sun"} />
</button>

<style>
    button {
        all: unset;
        cursor: pointer;
    }
</style>
