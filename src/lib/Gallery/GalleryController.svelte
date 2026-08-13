<script lang="ts">
    import PreviousImageButton from './PreviousImageButton.svelte'
    import NextImageButton from './NextImageButton.svelte'
    import { toNextImage, toPreviousImage, toSwipedImage } from './navigation'
    import { swipe } from './swipe'
    import type { Writable } from 'svelte/store'
    import type { GalleryArrowsConfig, GallerySwipeConfig } from '$lib/Types'

    export let imagePreset = ''
    export let imageCountStore: Writable<number>
    export let activeImageStore: Writable<number>
    export let arrowsConfigStore: Writable<GalleryArrowsConfig>
    export let swipeConfigStore: Writable<GallerySwipeConfig>

    let dragOffset = 0

    $: navigation = {
        activeImageStore,
        imageCountStore,
        character: $arrowsConfigStore.character
    }

    const previousImage = () => toPreviousImage(navigation)
    const nextImage = () => toNextImage(navigation)

    const handleKey = (event) => {
        if ($arrowsConfigStore.enableKeyboardControl) {
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
    }

    const handleSwipeMove = (event: CustomEvent) => {
        dragOffset = event.detail.offset
    }
    const handleSwipeEnd = (event: CustomEvent) => {
        dragOffset = 0
        toSwipedImage(navigation, event.detail.offset, $swipeConfigStore.threshold)
    }
</script>

<svelte:window on:keydown={ (event) => handleKey(event) }/>

<PreviousImageButton on:click={previousImage} activeImage={$activeImageStore} character={$arrowsConfigStore.character}
    --svelte-lightbox-arrows-color={$arrowsConfigStore.color}/>

<!-- Arrows stay outside the track so the drag does not carry them along -->
<div class="svelte-lightbox-gallery-track" style="--svelte-lightbox-swipe-offset: {dragOffset}px"
    use:swipe={$swipeConfigStore} on:swipemove={handleSwipeMove} on:swipeend={handleSwipeEnd}>
    <slot/>
</div>

<NextImageButton on:click={nextImage} activeImage={$activeImageStore} imageCount={$imageCountStore} character={$arrowsConfigStore.character}
    --svelte-lightbox-arrows-color={$arrowsConfigStore.color}/>

<style>
    /* height: 100% only bites when the body has a definite height, which is what
       lets the size limit reach the image through the extra wrapping */
    div.svelte-lightbox-gallery-track {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        max-height: inherit;
        transform: translateX(var(--svelte-lightbox-swipe-offset, 0px));
    }
</style>
