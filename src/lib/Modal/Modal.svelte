<script lang="ts">
    import { fade } from 'svelte/transition'
    import { reducedMotionDuration } from '$lib/transitions'
    import { trapFocus } from './focusTrap'
    import type { Snippet } from 'svelte'
    import type { HTMLAttributes } from 'svelte/elements'
    import type { ImagePreset } from '$lib/Types'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        transitionDuration: number,
        imagePreset: ImagePreset,
        // Id of the element that names the dialog for assistive technology, see <LightboxFooter>
        titleId: string,
        children?: Snippet
    }

    let { transitionDuration, imagePreset, titleId, children, ...rest }: Props = $props()

    const effectiveDuration = $derived(reducedMotionDuration(transitionDuration))
</script>

<div class="svelte-lightbox-main" class:fullscreen={imagePreset === 'fullscreen'} class:scroll={imagePreset === 'scroll'}
    transition:fade|global={{ duration: effectiveDuration }} role="dialog" aria-modal="true" aria-labelledby={titleId}
    tabindex="-1" {@attach trapFocus()} {...rest}>
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
