<script lang="ts">
    import {getContext, hasContext, onMount, setContext} from 'svelte'
    import { writable} from 'svelte/store'
    import BodyChild from '../Modal/BodyChild.svelte'
    import Modal from '../Modal/Index.svelte'
    import GalleryController from './GalleryController.svelte'
    import Thumbnail from '../LightboxThumbnail.svelte'
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

    export let isVisible =true

    // Gallery props ---------------------------------------------------------------------------------------------------

    export let activeImage = 0
    // Possible any CSS color
    export let arrowsColor = 'black'
    // Possible string with value: 'unset', 'loop', 'hide'
    export let arrowsCharacter = 'unset'
    // Disables controlling gallery with keyboard
    export let disableKeyboardArrowsControl = false

    // TODO: finish managing gallery IDs (controller and images)
    const galleryId: number = (() => {
        const galleryContext = 'svelte-lightbox-galleryCount'
        if (hasContext(galleryContext)) {
            const galleryStore = getContext(galleryContext)
            return $galleryStore++
        } else {
            setContext(galleryContext, writable(0))
            return 0
        }
    })()

    let modalClicked = false
    let images: Array<GalleryImage> = []

    const galleryImageCountStore: Writable<number> = writable(images.length)
    const activeImageStore: Writable<number> = writable(activeImage)
    const arrowsColorStore: Writable<string> = writable(arrowsColor)
    const arrowsCharacterStore: Writable<string> = writable(arrowsCharacter)
    const keyboardControlStore: Writable<boolean> = writable(disableKeyboardArrowsControl)

    const toggle = () => {
        isVisible = !isVisible
        toggleScroll()
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

    let toggleScroll = () => {
    }

    setContext('svelte-lightbox-galleryImageCounter', (image: GalleryImage) => {
        image.id = images.length
        images = [
            ...images,
            image
        ]
        $galleryImageCountStore = images.length
        return $galleryImageCountStore - 1
    })
    setContext('svelte-lightbox-galleryImageCount', galleryImageCountStore)
    setContext('svelte-lightbox-activeImage', activeImageStore)
    setContext('svelte-lightbox-galleryArrowsColor', arrowsColorStore)
    setContext('svelte-lightbox-galleryArrowsCharacter', arrowsCharacterStore)
    setContext('svelte-lightbox-disableKeyboardArrowsControl', keyboardControlStore)

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
    <Thumbnail bind:class={thumbnailClasses} bind:style={thumbnailStyle} bind:protect on:click={toggle}>
        <slot name="thumbnail"/>
    </Thumbnail>
{:else}
    <FallbackThumbnailGenerator bind:isVisible bind:activeImage {images}/>
{/if}

<BodyChild>
    <div style="display: {isVisible?'block':'none'}">
        <Modal bind:modalClasses bind:modalStyle bind:transitionDuration bind:image bind:protect bind:portrait
               bind:title bind:description bind:imagePreset bind:escapeToClose bind:closeButton
               on:close={close} on:topModalClick={coverClick} on:modalClick={modalClick}>
            <GalleryController id={galleryId}>
                <slot {...$$restProps}>
                </slot>
            </GalleryController>
        </Modal>
    </div>
</BodyChild>
