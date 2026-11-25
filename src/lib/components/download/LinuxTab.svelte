<script lang="ts">
    import { DOWNLOAD_BASE, DownloadFileNames, SITE } from "#lib/constants.ts";

    import Callout from "../Callout.svelte";
    import CodeBlock from "../CodeBlock.svelte";
    import Actions from "./Actions.svelte";
</script>

<p>Open your terminal and run the following command. Then follow the instructions in your terminal.</p>

<CodeBlock code={`sh -c "$(curl -sS ${SITE}/install.sh)"`} />

<p>Alternatively, download the installer, make it executable and run it in a terminal.</p>

<Actions
    links={[
        { href: DOWNLOAD_BASE + DownloadFileNames.linux, label: "Download CLI installer", title: "Download VencordInstallerCli-linux" }
    ]}
/>

<Callout kind="warning" title="Discord installed via snap is not supported">
    <p>Instead, use one of the following:</p>
    <ul>
        <li><a href="https://flathub.org/apps/details/com.discordapp.Discord">Discord Flatpak</a></li>
        <li><a href="https://discord.com/download">Discord's official .deb package</a></li>
    </ul>
</Callout>
