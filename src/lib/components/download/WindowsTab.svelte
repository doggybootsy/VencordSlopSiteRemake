<script lang="ts">
    import { DOWNLOAD_BASE, DownloadFileNames } from "#lib/constants.ts";

    import Callout from "../Callout.svelte";
    import Actions from "./Actions.svelte";
</script>

<Actions
    links={[
        { href: DOWNLOAD_BASE + DownloadFileNames.windows, label: "Download for Windows", title: "Download VencordInstaller.exe", primary: true },
        { href: DOWNLOAD_BASE + DownloadFileNames.windowsCli, label: "Command-line installer", title: "Download VencordInstallerCli.exe" }
    ]}
/>

<p>
    Run the downloaded installer. It will list all Discord installations on your system. Pick the one you would like to
    patch and press Install.
</p>

<p>
    If the installer does not open for you, use the command-line installer instead. Run it and a terminal window should
    open. Just follow the instructions in the terminal.
</p>

<Callout kind="warning" title="Do not run the installer as an Administrator!">
    <p>
        <strong>If you get a SmartScreen warning that the app cannot be opened:</strong> click "Run Anyways". You may
        need to click "more info" to see this option.
    </p>
    <p>
        This warning is entirely harmless and only shows because the app is not signed. Signing it would cost us upwards
        of 300€/year.
    </p>
</Callout>
