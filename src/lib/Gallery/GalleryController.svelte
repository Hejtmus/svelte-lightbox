<script lang="ts">
    import { onDestroy } from 'svelte'
    import PreviousImageButton from './PreviousImageButton.svelte'
    import NextImageButton from './NextImageButton.svelte'
    import { toNextImage, toPreviousImage, toSwipedImage } from './navigation'
    import { swipe } from './swipe'
    import type { SwipeGesture } from './swipe'
    import type { Writable } from 'svelte/store'
    import type { GalleryArrowsConfig, GallerySwipeConfig } from '$lib/Types'

    export let imagePreset = ''
    export let imageCountStore: Writable<number>
    export let activeImageStore: Writable<number>
    export let arrowsConfigStore: Writable<GalleryArrowsConfig>
    export let swipeConfigStore: Writable<GallerySwipeConfig>
    // The images are direct children of the body, so the body is the drag surface
    export let bodyElement: HTMLDivElement | null = null

    const SWIPING_CLASS = 'svelte-lightbox-swiping'
    const OFFSET_PROPERTY = '--svelte-lightbox-swipe-offset'

    let gesture: SwipeGesture | null = null
    let surface: HTMLDivElement | null = null

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

    const showOffset = (offset: number) => {
        surface.style.setProperty(OFFSET_PROPERTY, `${offset}px`)
    }

    const handleSwipeStart = () => {
        surface.classList.add(SWIPING_CLASS)
    }
    const handleSwipeMove = (event: CustomEvent) => {
        showOffset(event.detail.offset)
    }
    const handleSwipeEnd = (event: CustomEvent) => {
        surface.classList.remove(SWIPING_CLASS)
        showOffset(0)
        toSwipedImage(navigation, event.detail.offset, $swipeConfigStore.threshold)
    }

    const listen = (element: HTMLDivElement) => {
        element.addEventListener('swipestart', handleSwipeStart)
        element.addEventListener('swipemove', handleSwipeMove)
        element.addEventListener('swipeend', handleSwipeEnd)
    }
    const stopListening = (element: HTMLDivElement) => {
        element.removeEventListener('swipestart', handleSwipeStart)
        element.removeEventListener('swipemove', handleSwipeMove)
        element.removeEventListener('swipeend', handleSwipeEnd)
    }

    const release = () => {
        if (!surface) {
            return
        }
        gesture.destroy()
        stopListening(surface)
        surface.classList.remove(SWIPING_CLASS)
        surface.style.removeProperty(OFFSET_PROPERTY)
        surface = null
        gesture = null
    }

    // The body element only exists after the modal mounts, and can be swapped out
    const bindGesture = (element: HTMLDivElement | null, config: GallerySwipeConfig) => {
        if (element === surface) {
            gesture?.update(config)
            return
        }
        release()

        if (element) {
            gesture = swipe(element, config)
            listen(element)
            surface = element
        }
    }

    $: bindGesture(bodyElement, $swipeConfigStore)

    onDestroy(release)
</script>

<svelte:window on:keydown={ (event) => handleKey(event) }/>

<PreviousImageButton on:click={previousImage} activeImage={$activeImageStore} character={$arrowsConfigStore.character}
    --svelte-lightbox-arrows-color={$arrowsConfigStore.color}/>

<slot/>

<NextImageButton on:click={nextImage} activeImage={$activeImageStore} imageCount={$imageCountStore} character={$arrowsConfigStore.character}
    --svelte-lightbox-arrows-color={$arrowsConfigStore.color}/>

<style>
    /* Every child moves together, so the dragged image and its neighbours stay in step */
    :global(div.svelte-lightbox-body.svelte-lightbox-swiping > *) {
        transform: translateX(var(--svelte-lightbox-swipe-offset, 0px));
    }
</style>
