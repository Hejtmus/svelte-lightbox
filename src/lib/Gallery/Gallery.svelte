<script lang="ts">
    import { onMount, setContext} from 'svelte'
    import { writable} from 'svelte/store'
    import GalleryController from './GalleryController.svelte'
    import BodyChild from '../Modal/BodyChild.svelte'
    import Header from '../Modal/LightboxHeader.svelte'
    import Body from '../Modal/LightboxBody.svelte'
    import Footer from '../Modal/LightboxFooter.svelte'
    import ModalCover from '../Modal/ModalCover.svelte'
    import Modal from '../Modal/Modal.svelte'
    import type { Writable} from 'svelte/store'
    import type { LightboxCustomization, GalleryImage, GalleryArrowCharacter, ImagePreset } from '$lib/Types'

    // Lightbox props --------------------------------------------------------------------------------------------------

    export let customization: LightboxCustomization | {} = {}
    // getting universal title and descriptions
    export let title = ''
    export let description = ''
    // exporting duration of fade transition
    export let transitionDuration = 500
    // disables scrolling <body>
    export let noScroll = true
    export let imagePreset: ImagePreset = ''
    export let enableExpand = false
    export let escapeToClose = true
    export let clickToClose = false
    export let closeButton = true

    export let isVisible = false

    // Gallery props ---------------------------------------------------------------------------------------------------

    export let activeImage = 0
    // Possible any CSS color
    export let arrowsColor = 'black'
    // Possible string with value: 'unset', 'loop', 'hide'
    export let arrowsCharacter: GalleryArrowCharacter = ''
    // Disables controlling gallery with keyboard
    export let disableKeyboardArrowsControl = false

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

    const keepOrEmptyImageList = (isVisible) => {
        if (!isVisible) images = []
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
    $: keepOrEmptyImageList(isVisible)
    $: activeImageTitle = images[$activeImageStore]?.title || title || ''
    $: activeImageDescription = images[$activeImageStore]?.description || description || ''
    $: gallery = { imageCount: $imageCountStore, activeImage: $activeImageStore }

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
{/if}

{#if isVisible}
    <BodyChild>
        <ModalCover {transitionDuration} on:click={coverClick}>
            <Modal {transitionDuration} {imagePreset} on:click={modalClick} {...(customization.lightboxProps || {})}>
                <Header {closeButton} {imagePreset} closeButtonProps={customization.closeButtonProps} {escapeToClose}
                        {...(customization.lightboxHeaderProps || {})} on:close={close}/>

                <GalleryController {imagePreset} {imageCountStore} {activeImageStore} {arrowsCharacterStore}
                                   {arrowsColorStore} {keyboardControlStore}>
                    <Body {imagePreset} {enableExpand}>
                    <slot/>
                    </Body>
                </GalleryController>

                <Footer {title} {description} {gallery} {...(customization.lightboxFooterProps || {})}/>
            </Modal>
        </ModalCover>
    </BodyChild>
{/if}
