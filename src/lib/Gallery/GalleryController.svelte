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

<div class="wrapper" class:fullscreen style="--svelte-lightbox-arrows-color: {$arrowsColorStore}">
    <PreviousImageButton on:click={previousImage} activeImage={$activeImageStore} character={$arrowsCharacterStore}/>

    <!-- Image wrapper -->
    <div class="slot">
        <slot>
        </slot>
    </div>

    <NextImageButton on:click={nextImage} activeImage={$activeImageStore} character={$arrowsCharacterStore} imageCount={$imageCountStore}/>
</div>


<style>
    div {
        max-height: inherit;
    }

    div.fullscreen {
        height: 100%;
        width: 100%;
    }

    .wrapper {
        position: relative;
        display: flex;
        width: auto;
        height: auto;
    }

    .slot {
        order: 1;
        display: flex;
        justify-content: center;
    }
</style>