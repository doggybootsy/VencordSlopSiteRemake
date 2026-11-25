<script lang="ts">
    import { DOWNLOAD_BASE, DownloadFileNames } from "#lib/constants.ts";

    import Actions from "./Actions.svelte";
</script>

<Actions
    links={[
        { href: DOWNLOAD_BASE + DownloadFileNames.macOS, label: "Download for macOS", title: "Download VencordInstaller.dmg", primary: true }
    ]}
/>

<p>
    Open the downloaded disk image and drag <code>VencordInstaller.app</code> into your Applications folder. Then open it
    and follow the instructions.
</p>
