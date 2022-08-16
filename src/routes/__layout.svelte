<script lang="ts">
    import '@sveltejs/site-kit/base.css'
    import { Nav, NavItem, PreloadingIndicator } from '@sveltejs/site-kit'
    import { page, navigating } from '$app/stores'
</script>

{#if $navigating}
    <PreloadingIndicator />
{/if}

<Nav {page} logo="/img/logo.svg">
    <svelte:fragment slot="nav-center">
        <NavItem href="/docs">
            Docs
        </NavItem>
        <NavItem href="/examples">
            Examples
        </NavItem>
    </svelte:fragment>
    <svelte:fragment slot="nav-right">
        <NavItem external="https://www.npmjs.com/package/svelte-lightbox" title="GitHub Repo">
            <i class="bi bi-box-seam"></i>
        </NavItem>
        <NavItem external="https://github.com/Hejtmus/svelte-lightbox" title="GitHub Repo">
            <i class="bi bi-github"></i>
        </NavItem>
    </svelte:fragment>
</Nav>

<main>
    <slot/>
</main>

<style global>
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css");
    @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css");
    body {
        overflow-x: hidden;
    }
    main {
        padding-top: var(--nav-h);
    }
</style>