<script lang="ts">
    import PreviousImageButton from './PreviousImageButton.svelte'
    import NextImageButton from './NextImageButton.svelte'
    import { toNextImage, toPreviousImage } from './navigation'
    import type { Snippet } from 'svelte'
    import type { Gallery } from './gallery.svelte'

    interface Props {
        gallery: Gallery,
        children?: Snippet
    }

    let { gallery, children }: Props = $props()

    const previousImage = () => toPreviousImage(gallery)
    const nextImage = () => toNextImage(gallery)

    const handleKey = (event: KeyboardEvent) => {
        if (!gallery.arrowsConfig.enableKeyboardControl) {
            return
        }

        switch (event.key) {
            case 'ArrowLeft': {
                previousImage()
                break
            }
            case 'ArrowRight': {
                nextImage()
                break
            }
        }
    }
</script>

<svelte:window onkeydown={handleKey}/>

<PreviousImageButton onclick={previousImage} activeImage={gallery.activeImage} character={gallery.character}
    --svelte-lightbox-arrows-color={gallery.arrowsConfig.color}/>

{@render children?.()}

<NextImageButton onclick={nextImage} activeImage={gallery.activeImage} imageCount={gallery.imageCount}
    character={gallery.character} --svelte-lightbox-arrows-color={gallery.arrowsConfig.color}/>

<style>
    /* Every child moves together, so the dragged image and its neighbours stay in step */
    :global(div.svelte-lightbox-body.svelte-lightbox-swiping > *) {
        transform: translateX(var(--svelte-lightbox-swipe-offset, 0px));
    }
</style>
