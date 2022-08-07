<script lang="ts">
    import PreviousImageButton from './PreviousImageButton.svelte'
    import NextImageButton from './NextImageButton.svelte'
    import type { Writable } from 'svelte/store'

    export let imagePreset = ''
    export let imageCountStore: Writable<number>
    export let activeImageStore: Writable<number>
    export let arrowsColorStore: Writable<string>
    export let arrowsCharacterStore: Writable<string>
    export let keyboardControlStore: Writable<boolean>

    const previousImage = () => {
        if ($activeImageStore === 0) {
            if ($arrowsCharacterStore === 'loop') {
                activeImageStore.set($imageCountStore - 1)
            }
        } else {
            activeImageStore.set($activeImageStore - 1)
        }
    }
    const nextImage = () => {
        if ($activeImageStore === $imageCountStore - 1) {
            if ($arrowsCharacterStore === 'loop') {
                activeImageStore.set(0)
            }
        } else {
            activeImageStore.set($activeImageStore + 1)
        }
    }
    const handleKey = (event) => {
        if (!$keyboardControlStore) {
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

<PreviousImageButton on:click={previousImage} activeImage={$activeImageStore} character={$arrowsCharacterStore}
                     --svelte-lightbox-arrows-color={$arrowsColorStore}/>

<slot/>

<NextImageButton on:click={nextImage} activeImage={$activeImageStore} character={$arrowsCharacterStore} imageCount={$imageCountStore}
                 --svelte-lightbox-arrows-color={$arrowsColorStore}/>
