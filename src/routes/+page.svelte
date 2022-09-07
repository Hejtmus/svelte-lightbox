<script lang="ts">
    import { Blurb } from '@sveltejs/site-kit'
</script>

<svelte:head>
    <title>
        svelte-lightbox
    </title>
    <meta name="description" content="Lightweight lightbox library for Svelte">
</svelte:head>

<div class="row py-4 bg-light text-center">
    <div class="col">
        <h1>
                <span class="w-auto bg-black text-white title">
                    svelte-lightbox
                </span>
        </h1>
        <p>
            <img src="https://img.shields.io/github/workflow/status/Hejtmus/svelte-lightbox/Node.js%20CI"
                 alt="workflow status">
            <img src="https://img.shields.io/npm/v/svelte-lightbox" alt="version">
            <img src="https://img.shields.io/bundlephobia/minzip/svelte-lightbox" alt="bundle size">
            <img src="https://img.shields.io/github/license/Hejtmus/svelte-lightbox" alt="MIT">
            <img src="https://img.shields.io/github/issues/Hejtmus/svelte-lightbox" alt="issues count">
            <img src="https://img.shields.io/npm/dw/svelte-lightbox" alt="downloads">
        </p>
        <p>
            This library is <strong>not</strong> affiliated with the Svelte project.
        </p>
    </div>
</div>

<Blurb>
    <svelte:fragment slot="one">
        <h2>
            Lightweight
        </h2>
        <p>
            Developed without any dependencies (expect devDependencies and peerDependencies) and minimal design
        </p>
        <a href="https://bundlephobia.com/package/svelte-lightbox" target="_blank" rel="external" class="cta">
            Bundlephobia
        </a>
    </svelte:fragment>
    <svelte:fragment slot="two">
        <h2>
            Highly customizable
        </h2>
        <p>
            Allows you to customize single elements of lightbox and provides set of building blocks for composing custom
            lightboxes
        </p>
        <a href="/docs" class="cta">
            see documentation
        </a>
    </svelte:fragment>
    <svelte:fragment slot="three">
        <h2>
            Easy to use
        </h2>
        <p>
            Highly expressive usage and minimal boilerplate
        </p>
        <a href="/examples" class="cta">
            try out examples
        </a>
    </svelte:fragment>
    <svelte:fragment slot="what">
        <p>
            svelte-lightbox is simple customizable lightbox component library for Svelte written entirely in svelte. Allow you
            to make clickable images which expand (lightboxes) and lightbox galleries, which user can list through.
        </p>
    </svelte:fragment>
    <svelte:fragment slot="how">
        <pre>
        <code>
            npm i svelte-lightbox -D
        </code>
        </pre>
    </svelte:fragment>
</Blurb>

<style>
    pre {
        white-space: inherit;
    }
</style>
