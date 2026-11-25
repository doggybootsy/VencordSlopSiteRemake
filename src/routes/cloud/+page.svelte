<script lang="ts">
    import Icon from "#lib/components/Icon.svelte";
    import PageHeader from "#lib/components/PageHeader.svelte";
    import Seo from "#lib/components/Seo.svelte";
    import { VENCORD_CLOUD_SOURCE_CODE_URL } from "#lib/constants.ts";

    const steps = [
        "Open Discord and head over to the Vencord settings section",
        'Check the "Enable Cloud Integrations" switch',
        "Authorise Vencord Cloud",
        "Enable the specific features you want on the same page"
    ];
</script>

<Seo title="Cloud" description="Yes, we have cloud services! Ain't that cool?" breadcrumbs={[["Cloud", "/cloud"]]} />

<PageHeader title="Cloud" description="Now in your Vencord!!" />

<section class="page-section">
    <div class="page-section-inner">
        <p class="lead">
            Vencord has a cloud integration that powers additional features. It's completely optional and honours your
            privacy!
        </p>

        <div class="cloud-grid">
            <div class="panel card">
                <h2 class="section-heading">Features</h2>
                <ul class="features">
                    <li>
                        <span class="feature-icon"><Icon name="cloud" /></span>
                        <div>
                            <strong>Settings Sync</strong>
                            <p>Easily synchronise your settings across Devices</p>
                        </div>
                    </li>
                    <li>
                        <span class="feature-icon muted"><Icon name="star" /></span>
                        <div>
                            <strong>More soon</strong>
                            <p>Stay tuned for more future features!</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="panel card">
                <h2 class="section-heading">Getting Started</h2>
                <ol class="steps">
                    {#each steps as step}
                        <li>{step}</li>
                    {/each}
                </ol>
                <p class="done">After authorising, you're good to go!</p>
            </div>
        </div>

        <h2 class="section-heading links-heading">Links</h2>
        <div class="btn-container">
            <a class="btn btn-secondary btn-lg" href={VENCORD_CLOUD_SOURCE_CODE_URL}>
                <Icon name="github" />
                Source Code
            </a>
            <a class="btn btn-secondary btn-lg" href="/cloud/privacy">Privacy Policy</a>
            <a class="btn btn-secondary btn-lg" href="/cloud/gdpr">GDPR Policy</a>
        </div>
    </div>
</section>

<style>
    .lead {
        font-size: 18px;
        color: var(--text-normal);
        max-width: 720px;
        margin-bottom: 32px;
    }

    .cloud-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .card {
        padding: 28px 32px;
    }

    .features {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .features li {
        display: flex;
        gap: 14px;
    }

    .features strong {
        color: var(--text-light);
    }

    .features p {
        margin: 2px 0 0;
        color: var(--text-muted);
        font-size: 14px;
    }

    .feature-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background: var(--accent-soft);
        color: var(--accent);
    }

    .feature-icon.muted {
        background: var(--bg4);
        color: var(--text-muted);
    }

    .steps {
        counter-reset: step;
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .steps li {
        counter-increment: step;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .steps li::before {
        content: counter(step);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--bg4);
        color: var(--text-light);
        font-weight: 700;
        font-size: 13px;
    }

    .done {
        margin: 16px 0 0;
        color: var(--text-muted);
    }

    .links-heading {
        margin-top: 40px;
    }

    @media screen and (max-width: 950px) {
        .cloud-grid {
            grid-template-columns: 1fr;
        }

        .card {
            padding: 20px;
        }
    }
</style>
