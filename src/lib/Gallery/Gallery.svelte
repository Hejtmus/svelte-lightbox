<script lang="ts">
    import { onMount, setContext} from 'svelte'
    import { writable} from 'svelte/store'
    import BodyChild from '../Modal/BodyChild.svelte'
    import Modal from '../Modal/Index.svelte'
    import GalleryController from './GalleryController.svelte'
    import FallbackThumbnailGenerator from './FallbackThumbnailGenerator.svelte'
    import type { Writable} from 'svelte/store'
    import type { GalleryImage } from './Types'

    // Lightbox props --------------------------------------------------------------------------------------------------

    // exporting classes, for passing classes into thumbnail
    export let thumbnailClasses = ''
    export let thumbnailStyle = ''
    // exporting classes, for passing classes into wrapper
    export let modalClasses = ''
    export let modalStyle = ''
    // getting universal title and descriptions
    export let title = ''
    export let description = ''
    // exporting duration of fade transition
    export let transitionDuration = 500
    // bool that enables drag n drop protection
    export let protect = false
    // enables other image than in slot
    export let image = {}
    // enables portrait mode
    export let portrait = false
    // disables scrolling <body>
    export let noScroll = true
    export let thumbnail = false
    export let imagePreset = false
    export let escapeToClose = true
    export let clickToClose = false
    export let closeButton = true

    export let isVisible = false

    // Gallery props ---------------------------------------------------------------------------------------------------

    export let activeImage = 0
    // Possible any CSS color
    export let arrowsColor = 'black'
    // Possible string with value: 'unset', 'loop', 'hide'
    export let arrowsCharacter = 'unset'
    // Disables controlling gallery with keyboard
    export let disableKeyboardArrowsControl = false
    export let generateFallbackThumbnails = true

    let modalClicked = false
    let images: Array<GalleryImage> = []
    let thumbnailCount = 0

    const imageCountStore: Writable<number> = writable(images.length)
    const activeImageStore: Writable<number> = writable(activeImage)
    const arrowsColorStore: Writable<string> = writable(arrowsColor)
    const arrowsCharacterStore: Writable<string> = writable(arrowsCharacter)
    const keyboardControlStore: Writable<boolean> = writable(disableKeyboardArrowsControl)

    const toggle = () => {
        isVisible = !isVisible
        toggleScroll()
    }

    const open = () => {
        isVisible = true
        toggleScroll()
    }
    const openImage = (imageId) => {
        open()
        activeImage = imageId
    }

    const close = () => {
        isVisible = false
        toggleScroll()
    }

    const coverClick = () => {
        // console.log('coverClick')
        if (!modalClicked || clickToClose) {
            close()
        }
        modalClicked = false
    }

    const modalClick = () => {
        // console.log('modalClick')
        modalClicked = true
    }

    let toggleScroll = () => {}

    export const programmaticController = {
        toggle,
        open,
        close,
        openImage
    }
    setContext('activeImage', activeImageStore)
    setContext('imageCounter', (image: GalleryImage) => {
        image.id = images.length
        images = [
            ...images,
            image
        ]
        $imageCountStore = images.length
        return $imageCountStore - 1
    })
    setContext('thumbnailCounter', () => {
        return thumbnailCount++
    })
    setContext('openImage', openImage)

    $: activeImageStore.set(activeImage)
    $: arrowsColorStore.set(arrowsColor)
    $: arrowsCharacterStore.set(arrowsCharacter)
    $: keyboardControlStore.set(disableKeyboardArrowsControl)

    onMount(() => {
        const defaultOverflow = document.body.style.overflow
        toggleScroll = () => {
            if (noScroll) {
                if (isVisible) {
                    document.body.style.overflow = 'hidden'
                } else {
                    document.body.style.overflow = defaultOverflow
                }
            }
        }
    })
</script>

{#if $$slots.thumbnail}
    <slot name="thumbnail"/>
{:else if generateFallbackThumbnails}
    <FallbackThumbnailGenerator bind:isVisible bind:activeImage {images}/>
{/if}

<BodyChild>
    <div style="display: {isVisible ? 'block' : 'none'}">
        <Modal bind:modalClasses bind:modalStyle bind:transitionDuration bind:image bind:protect bind:portrait
               title={images[$activeImageStore]?.title || ''} description={images[$activeImageStore]?.description || ''}
               bind:imagePreset bind:escapeToClose bind:closeButton
               on:close={close} on:topModalClick={coverClick} on:modalClick={modalClick}>
            <GalleryController {imagePreset} {imageCountStore} {activeImageStore} {arrowsCharacterStore}
                               {arrowsColorStore} {keyboardControlStore}>
                {#if $$slots.lightbox}
                    <slot name="lightbox"/>
                {:else}
                    <slot {...$$restProps}/>
                {/if}
            </GalleryController>
        </Modal>
    </div>
</BodyChild>
