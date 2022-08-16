<script lang="ts">
    import '@sveltejs/site-kit/base.css'
    import { Icon, Nav, NavItem, PreloadingIndicator } from '@sveltejs/site-kit'
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
        <NavItem external="https://github.com/Hejtmus/svelte-lightbox" title="GitHub Repo">
            <span class="small">GitHub</span>
            <span class="large"><Icon name="github"/></span>
        </NavItem>
    </svelte:fragment>
</Nav>

<main>
    <slot/>
</main>

<style>
    main {
        padding-top: var(--nav-h);
    }
</style>