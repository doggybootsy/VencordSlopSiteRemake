<script lang="ts">
    import { onMount } from "svelte";

    import Icon from "#lib/components/Icon.svelte";
    import PageHeader from "#lib/components/PageHeader.svelte";
    import Seo from "#lib/components/Seo.svelte";

    const { data } = $props();

    const sections = $derived([
        { id: "troubleshooting", title: "Troubleshooting", items: data.support },
        { id: "faq", title: "Frequently Asked Questions", items: data.faq }
    ]);

    // the original site's anchor format: question title with spaces replaced by dashes
    const anchor = (title: string) => title.replaceAll(" ", "-");

    const structuredData = $derived(
        JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [...data.faq, ...data.support].map(f => ({
                "@type": "Question",
                name: f.title,
                acceptedAnswer: { "@type": "Answer", text: f.html }
            }))
        }).replace(/</g, "\\u003c")
    );

    onMount(() => {
        const faqs = [...document.querySelectorAll<HTMLDetailsElement>("details[data-faq-title]")];

        let target = "";
        try {
            target = decodeURIComponent(location.hash.slice(1));
        } catch {}
        const faq = faqs.find(f => f.dataset.faqTitle === target);
        if (faq) {
            faq.open = true;
            faq.scrollIntoView({ behavior: "smooth" });
        }

        const onToggle = () => {
            const open = faqs.filter(f => f.open);
            const hash = open.length === 1 ? `#${open[0].dataset.faqTitle}` : "";
            history.replaceState(history.state, "", hash || location.pathname);
        };

        faqs.forEach(f => f.addEventListener("toggle", onToggle));
        return () => faqs.forEach(f => f.removeEventListener("toggle", onToggle));
    });
</script>

<Seo
    title="Support & FAQ"
    description="Browse support articles and frequently asked questions about Vencord"
    breadcrumbs={[["Support & FAQ", "/support"]]}
/>

<svelte:head>
    {@html `<script type="application/ld+json">${structuredData}</script>`}
</svelte:head>

<PageHeader title="Support & FAQ" description="Questions that we're asked often." />

<section class="page-section">
    <div class="page-section-inner support-layout">
        <nav class="toc" aria-label="Sections">
            {#each sections as s}
                <a href={`#${s.id}`} class="toc-item">{s.title}</a>
            {/each}
            <a href="/discord" class="btn btn-primary toc-cta">
                <Icon name="discord" />
                Ask on Discord
            </a>
        </nav>

        <div class="sections">
            {#each sections as s}
                <section id={s.id} class="faq-section">
                    <h2 class="section-heading">{s.title}</h2>
                    <div class="questions">
                        {#each s.items as f}
                            <details class="question" data-faq-title={anchor(f.title)}>
                                <summary>
                                    <span>{f.title}</span>
                                    <Icon name="chevronDown" class="chevron" />
                                </summary>
                                <div class="answer prose">{@html f.html}</div>
                            </details>
                        {/each}
                    </div>
                </section>
            {/each}

            <div class="panel still-lost">
                <div>
                    <h2>Still lost?</h2>
                    <p>Visit our <a href="/discord">support server</a> for more assistance! We're happy to help.</p>
                </div>
                <a href="/discord" class="btn btn-primary btn-lg">
                    <Icon name="discord" />
                    Join the Support Server
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    .support-layout {
        display: grid;
        grid-template-columns: 220px minmax(0, 1fr);
        gap: 40px;
        align-items: start;
    }

    .toc {
        position: sticky;
        top: calc(var(--nav-height) + 24px);
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .toc-item {
        color: var(--text-muted);
        padding: 8px 12px;
        border-radius: 3px;
        font-size: 15px;
        transition: 0.15s ease;
    }

    .toc-item:hover {
        color: var(--text-light);
        background: var(--bg3);
        text-decoration: none;
    }

    .toc-cta {
        margin-top: 16px;
    }

    .faq-section + .faq-section {
        margin-top: 40px;
    }

    .faq-section {
        scroll-margin-top: calc(var(--nav-height) + 24px);
    }

    .questions {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .question {
        background: var(--bg3);
        border: 1px solid var(--bg4);
        border-radius: 8px;
        overflow: hidden;
        transition: 0.15s ease border-color;
        scroll-margin-top: calc(var(--nav-height) + 24px);
    }

    .question:hover {
        border-color: var(--border-strong);
    }

    .question[open] {
        border-color: var(--accent-faded);
    }

    summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 16px 20px;
        color: var(--text-light);
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        list-style: none;
        user-select: none;
    }

    summary::-webkit-details-marker {
        display: none;
    }

    summary :global(.chevron) {
        flex-shrink: 0;
        color: var(--text-muted);
        transition: 0.2s ease transform;
    }

    .question[open] summary :global(.chevron) {
        transform: rotate(180deg);
        color: var(--accent);
    }

    .answer {
        padding: 16px 20px 20px;
        border-top: 1px solid var(--bg4);
        background: var(--bg3-alt);
        font-size: 15px;
    }

    .answer :global(h3) {
        font-size: 16px;
    }

    .still-lost {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        flex-wrap: wrap;
        margin-top: 40px;
        padding: 28px 32px;
        background-image: radial-gradient(circle at top left, var(--accent-soft), transparent 60%);
    }

    .still-lost h2 {
        font-size: 22px;
        margin-bottom: 4px;
    }

    .still-lost p {
        margin: 0;
    }

    @media screen and (max-width: 950px) {
        .support-layout {
            grid-template-columns: 1fr;
        }

        .toc {
            position: static;
            flex-direction: row;
            flex-wrap: wrap;
        }

        .toc-cta {
            display: none;
        }
    }
</style>
