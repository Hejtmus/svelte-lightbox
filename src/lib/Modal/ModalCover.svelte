<script lang="ts">
    import { fade } from 'svelte/transition'
    import type { Snippet } from 'svelte'
    import type { HTMLAttributes } from 'svelte/elements'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        transitionDuration: number,
        children?: Snippet
    }

    let { transitionDuration, children, ...rest }: Props = $props()
</script>

<div class="svelte-lightbox-overlay" aria-label="overlay" role="presentation"
    in:fade={{ duration: transitionDuration * 2 }} out:fade={{ duration: transitionDuration / 2 }} {...rest}>
    {@render children?.()}
</div>

<style>
    div.svelte-lightbox-overlay {
        position: fixed;
        z-index: 1000000!important;
        background-color: rgba(43, 39, 45, 0.87);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div.svelte-lightbox-overlay::before {
        content: '';
        position: absolute;
        top: 0; bottom: 0; left: 0; right: 0;
        opacity: 0;
        z-index: -1;
    }
    div.svelte-lightbox-overlay::after {
        content: "";
        clear: both;
        display: table;
    }
</style>
