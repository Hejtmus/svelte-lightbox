<script lang="ts">
    import { fade } from 'svelte/transition'
    import type { Snippet } from 'svelte'
    import type { HTMLAttributes } from 'svelte/elements'
    import type { ImagePreset } from '$lib/Types'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        transitionDuration: number,
        imagePreset: ImagePreset,
        children?: Snippet
    }

    let { transitionDuration, imagePreset, children, ...rest }: Props = $props()
</script>

<div class="svelte-lightbox-main" class:fullscreen={imagePreset === 'fullscreen'} class:scroll={imagePreset === 'scroll'}
    transition:fade|global={{ duration: transitionDuration }} aria-label="Modal" role="presentation" {...rest}>
    {@render children?.()}
</div>

<style>
    div.svelte-lightbox-main {
        position: relative;
        max-width: 100%;
        max-height: 100%;
        height: auto;
        width: auto;
        background-color: transparent;
    }
    div.svelte-lightbox-main.fullscreen {
        height: inherit;
        width: inherit;
        max-height: inherit;
        max-width: inherit;
    }
</style>
