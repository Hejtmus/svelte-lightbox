<script>
    // Gives option for user to control displayed image
    import { getContext, setContext } from 'svelte'
    import { writable } from 'svelte/store'

    export let imagePreset = ''
    const activeImageStore = getContext('svelte-lightbox-activeImage')
    const arrowsColorStore = writable('black')
    const arrowsCharacterStore = writable('unset')
    const keyboardControlStore = writable(false)
    // Here will be stored markup that will user put inside of this component
    let slotContent
    // Auxiliary variable for storing elements with image that user has provided
    let images

    const previousImage = () => {
        if (activeImage === 0) {
            if (galleryArrowsCharacter === 'loop') {
                activeImageStore.set(images.length - 1)
            }
        } else {
            activeImageStore.set(activeImage - 1)
        }
    }
    const nextImage = () => {
        if (activeImage === images.length - 1) {
            if (galleryArrowsCharacter === 'loop') {
                activeImageStore.set(0)
            }
        } else {
            activeImageStore.set(activeImage + 1)
        }
    }
    const handleKey = (event) => {
        if (!disableKeyboardArrowsControl) {
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

    setContext('svelte-lightbox-galleryArrowsColor', arrowsColorStore)
    setContext('svelte-lightbox-galleryArrowsCharacter', arrowsCharacterStore)
    setContext('svelte-lightbox-disableKeyboardArrowsControl', keyboardControlStore)

    $: activeImage = $activeImageStore
    $: galleryArrowsColor = $arrowsColorStore
    $: galleryArrowsCharacter = $arrowsCharacterStore
    $: disableKeyboardArrowsControl = $keyboardControlStore
    // Every time, when contents of this component changes, images will be updated
    $: images = slotContent?.children

    $: {
        /*
        When activeImage or images array changes, checks if active image points to existing image and then displays it,
        if selected image doesn't exist, then logs out error, these error normally does not occur, only in cases when
        activeImage is controlled programmatically
         */
        if (images && activeImage < images.length) {
            Object.values(images).forEach(img => {
                img.hidden = true
                return img
            })
            if (!fullscreen) {
                images[activeImage].hidden = false
            }
        } else if (images && activeImage >= images.length) {
            console.error('LightboxGallery: Selected image doesn\'t exist, invalid activeImage')
        }
    }

    $: fullscreen = imagePreset === 'fullscreen'
</script>

<svelte:window on:keydown={ (event) => handleKey(event) }/>

<div class="wrapper" class:fullscreen style="--svelte-lightbox-arrows-color: {galleryArrowsColor}">
    <!-- Left arrow -->
    <button on:click={previousImage} disabled={galleryArrowsCharacter !== 'loop' && activeImage === 0}
            class="previous-button" class:hideDisabled={galleryArrowsCharacter === 'hide'}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path class="arrow" d="M8.7,7.22,4.59,11.33a1,1,0,0,0,0,1.41l4,4"/>
            </g>
        </svg>
    </button>

    <!-- Image wrapper -->
    <div bind:this={slotContent} class="slot">
        <slot>
        </slot>
    </div>

    <!-- Right arrow -->
    <button on:click={nextImage} disabled={galleryArrowsCharacter !== 'loop' && activeImage === images?.length - 1}
            class="next-button" class:hideDisabled={galleryArrowsCharacter === 'hide'}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="M15.3,16.78l4.11-4.11a1,1,0,0,0,0-1.41l-4-4" class="arrow"/>
            </g>
        </svg>
    </button>
</div>


<style>
    div {
        max-height: inherit;
    }

    div.fullscreen {
        height: 100%;
        width: 100%;
    }

    .arrow {
        fill: none;
        stroke: var(--svelte-lightbox-arrows-color);
        stroke-linecap: round;
        stroke-linejoin: bevel;
        stroke-width: 1.5px;
        margin: 10px;
    }

    button {
        background: transparent;
        border: none;
        font-size: 1rem;
        width: 50%;
        height: 100%;
    }

    button:active {
        background: transparent;
    }

    button:disabled {
        color: gray;
    }

    button:disabled.hideDisabled {
        visibility: hidden;
    }

    .wrapper {
        position: relative;
        display: flex;
        width: auto;
        height: auto;
    }

    .previous-button {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 50%;
        z-index: 4;
        text-align: left;
    }

    .slot {
        order: 1;
        display: flex;
        justify-content: center;
    }

    .next-button {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 4;
        text-align: right;
    }

    svg {
        height: 5rem;
    }
</style>