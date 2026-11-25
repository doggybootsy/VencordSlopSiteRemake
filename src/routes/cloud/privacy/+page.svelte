<script lang="ts">
    import Seo from "#lib/components/Seo.svelte";

    import LegalPage from "../LegalPage.svelte";

    const sections: [string, string][] = [
        ["intro", "Introduction"],
        ["information-stored", "The information we store"],
        ["usage", "How we use your information"],
        ["retention", "Data Retention"],
        ["changes", "Changes to this Privacy Policy"]
    ];
    const [intro, stored, usage, retention, changes] = sections;
</script>

<Seo
    title="Cloud Privacy Policy"
    description="Privacy policy regarding Vencord's cloud services"
    breadcrumbs={[
        ["Cloud", "/cloud"],
        ["Privacy", "/cloud/privacy"]
    ]}
/>

<LegalPage title="Vencord Cloud Privacy Policy" updated="26/03/2023" toc={sections}>
    <section id={intro[0]}>
        <h2><a href={`#${intro[0]}`}>{intro[1]}</a></h2>
        <p>
            This privacy policy applies to our cloud services, which you need to explicitly enable. If you don't enable
            the cloud, Vencord will not collect any data about you whatsoever. Our website (the one you are currently on)
            might collect data about you via our hosting provider Vercel. You can find out more about this in our GDPR
            policy linked below.
        </p>
        <p>
            We take your privacy very seriously! As such, we collect as little information as possible and only use it for
            the purposes absolutely necessary to provide our services to you.
        </p>
        <p>
            This is a very simple summary for normal people. We also have a proper <a href="/cloud/gdpr">GDPR policy</a>.
            You might want to read that as well.
        </p>
    </section>

    <section id={stored[0]}>
        <h2><a href={`#${stored[0]}`}>{stored[1]}</a></h2>
        <p>We only store information you provide to us. This includes</p>
        <ul>
            <li>The sha1 hash of your Discord user id. This is necessary to uniquely identify your data</li>
            <li>
                Your Vencord settings, stored as JSON plain text. This is necessary to synchronise your settings between
                multiple clients as part of our Settings Sync feature.
            </li>
        </ul>
    </section>

    <section id={usage[0]}>
        <h2><a href={`#${usage[0]}`}>{usage[1]}</a></h2>
        <p>
            We will only use your data for the aforementioned purposes. We will never share your data with any third
            parties, unless we are required to do so by law.
        </p>
    </section>

    <section id={retention[0]}>
        <h2><a href={`#${retention[0]}`}>{retention[1]}</a></h2>
        <p>We will retain your data until it is no longer necessary for the aforementioned purposes.</p>
        <p>
            You can delete all your data permamently at any time by using the <b>Erase All Data</b> button in the Vencord
            Cloud settings section or by emailing us at privacy@vencord.dev.
        </p>
    </section>

    <section id={changes[0]}>
        <h2><a href={`#${changes[0]}`}>{changes[1]}</a></h2>
        <p>
            We will update this Privacy Policy if necessary, for example if we start storing more data as part of a new
            Service. If we do so, you will be notified via the announcements channel on our Discord Server. The last
            update date will also always be present at the very top of this Privacy Policy.
        </p>
    </section>
</LegalPage>
