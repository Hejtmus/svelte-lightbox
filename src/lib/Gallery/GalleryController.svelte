<script lang="ts">
    import PreviousImageButton from './PreviousImageButton.svelte'
    import NextImageButton from './NextImageButton.svelte'
    import { toNextImage, toPreviousImage } from './navigation'
    import type { Writable } from 'svelte/store'
    import type { GalleryArrowsConfig } from '$lib/Types'

    export let imagePreset = ''
    export let imageCountStore: Writable<number>
    export let activeImageStore: Writable<number>
    export let arrowsConfigStore: Writable<GalleryArrowsConfig>

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
</script>

<svelte:window on:keydown={ (event) => handleKey(event) }/>

<PreviousImageButton on:click={previousImage} activeImage={$activeImageStore} character={$arrowsConfigStore.character}
    --svelte-lightbox-arrows-color={$arrowsConfigStore.color}/>

<slot/>

<NextImageButton on:click={nextImage} activeImage={$activeImageStore} imageCount={$imageCountStore} character={$arrowsConfigStore.character}
    --svelte-lightbox-arrows-color={$arrowsConfigStore.color}/>
