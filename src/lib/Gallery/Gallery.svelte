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
    import type { Writable } from 'svelte/store'
    import type {
        ImagePreset,
        LightboxCustomization,
        GalleryImage,
        GalleryArrowsConfig
    } from '$lib/Types'

    // Lightbox props --------------------------------------------------------------------------------------------------

    export let title = ''
    export let description = ''

    export let imagePreset: ImagePreset = ''

    export let customization: LightboxCustomization | {} = {}
    export let transitionDuration = 300

    export let keepBodyScroll = false
    export let enableImageExpand = false
    export let enableEscapeToClose = true
    export let enableClickToClose = false
    export let showCloseButton = true

    export let isVisible = false

    // Gallery props ---------------------------------------------------------------------------------------------------

    export let activeImage = 0
    export let arrowsConfig: GalleryArrowsConfig = {
        color: 'black',
        character: '',
        enableKeyboardControl: true
    }

    let modalClicked = false
    let images: Array<GalleryImage> = []
    let thumbnailCount = 0

    const imageCountStore: Writable<number> = writable(images.length)
    const activeImageStore: Writable<number> = writable(activeImage)
    const arrowsConfigStore: Writable<GalleryArrowsConfig> = writable(arrowsConfig)

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
        if (!modalClicked || enableClickToClose) {
            close()
        }
        modalClicked = false
    }

    const modalClick = () => {
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
    $: arrowsConfigStore.set(arrowsConfig)
    $: keepOrEmptyImageList(isVisible)
    $: activeImageTitle = images[$activeImageStore]?.title || title || ''
    $: activeImageDescription = images[$activeImageStore]?.description || description || ''
    $: gallery = { imageCount: $imageCountStore, activeImage: $activeImageStore }

    onMount(() => {
        const defaultOverflow = document.body.style.overflow
        toggleScroll = () => {
            if (!keepBodyScroll) {
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
        <ModalCover {transitionDuration} {...(customization.coverProps || {})} on:click={coverClick}>
            <Modal {imagePreset} {transitionDuration} {...(customization.lightboxProps || {})} on:click={modalClick}>
                <Header {imagePreset} {showCloseButton} {enableEscapeToClose} closeButtonProps={customization.closeButtonProps}
                        {...(customization.lightboxHeaderProps || {})} on:close={close}/>

                    <Body {imagePreset} {enableImageExpand}>
                        <GalleryController {imagePreset} {imageCountStore} {activeImageStore} {arrowsConfigStore}>
                            <slot/>
                        </GalleryController>
                    </Body>

                <Footer {imagePreset} {title} {description} {gallery} {...(customization.lightboxFooterProps || {})}/>
            </Modal>
        </ModalCover>
    </BodyChild>
{/if}
