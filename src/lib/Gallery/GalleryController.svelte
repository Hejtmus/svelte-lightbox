<script lang="ts">
    import PreviousImageButton from './PreviousImageButton.svelte'
    import NextImageButton from './NextImageButton.svelte'
    import type { Writable } from 'svelte/store'
    import type { GalleryArrowsConfig } from '$lib/Types'

    export let imagePreset = ''
    export let imageCountStore: Writable<number>
    export let activeImageStore: Writable<number>
    export let arrowsConfigStore: Writable<GalleryArrowsConfig>

    const previousImage = () => {
        if ($activeImageStore === 0) {
            if ($arrowsConfigStore.character === 'loop') {
                activeImageStore.set($imageCountStore - 1)
            }
        } else {
            activeImageStore.set($activeImageStore - 1)
        }
    }
    const nextImage = () => {
        if ($activeImageStore === $imageCountStore - 1) {
            if ($arrowsConfigStore.character === 'loop') {
                activeImageStore.set(0)
            }
        } else {
            activeImageStore.set($activeImageStore + 1)
        }
    }
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

    $: fullscreen = imagePreset === 'fullscreen'
</script>

<svelte:window on:keydown={ (event) => handleKey(event) }/>

<PreviousImageButton on:click={previousImage} activeImage={$activeImageStore} character={$arrowsConfigStore.character}
                     --svelte-lightbox-arrows-color={$arrowsConfigStore.color}/>

<slot/>

<NextImageButton on:click={nextImage} activeImage={$activeImageStore} imageCount={$imageCountStore} character={$arrowsConfigStore.character}
                 --svelte-lightbox-arrows-color={$arrowsConfigStore.color}/>
