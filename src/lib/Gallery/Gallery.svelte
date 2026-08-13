<script lang="ts">
    import { createAttachmentKey } from 'svelte/attachments'
    import GalleryController from './GalleryController.svelte'
    import BodyChild from '../Modal/BodyChild.svelte'
    import Header from '../Modal/LightboxHeader.svelte'
    import Body from '../Modal/LightboxBody.svelte'
    import Footer from '../Modal/LightboxFooter.svelte'
    import ModalCover from '../Modal/ModalCover.svelte'
    import Modal from '../Modal/Modal.svelte'
    import { createGallery, DEFAULT_ARROWS_CONFIG, DEFAULT_SWIPE_CONFIG } from './gallery.svelte'
    import { swipeNavigation } from './swipeNavigation.svelte'
    import { lockBodyScroll } from '$lib/bodyScroll.svelte'
    import type { Snippet } from 'svelte'
    import type { GalleryArrowsConfig, GallerySwipeConfig, LightboxOptions } from '$lib/Types'

    interface Props extends LightboxOptions {
        activeImage?: number,
        arrowsConfig?: Partial<GalleryArrowsConfig>,
        swipeConfig?: Partial<GallerySwipeConfig>,
        thumbnail?: Snippet
    }

    let {
        title = '',
        description = '',
        imagePreset = '',
        customization = {},
        transitionDuration = 300,
        keepBodyScroll = false,
        enableImageExpand = false,
        enableEscapeToClose = true,
        enableClickToClose = false,
        showCloseButton = true,
        isVisible = $bindable(false),
        activeImage = $bindable(0),
        arrowsConfig = {},
        swipeConfig = {},
        thumbnail,
        children
    }: Props = $props()

    // A click on the modal reaches the cover underneath it as well, and only the cover can tell them apart
    let modalClicked = false

    export const toggle = () => {
        isVisible = !isVisible
    }
    export const open = () => {
        isVisible = true
    }
    export const close = () => {
        isVisible = false
    }
    export const openImage = (imageId: number) => {
        activeImage = imageId
        isVisible = true
    }

    const gallery = createGallery({
        get activeImage () {
            return activeImage
        },
        set activeImage (imageId: number) {
            activeImage = imageId
        },
        // Merged so callers can override single fields, as the documented defaults promise
        get arrowsConfig () {
            return { ...DEFAULT_ARROWS_CONFIG, ...arrowsConfig }
        },
        get swipeConfig () {
            return { ...DEFAULT_SWIPE_CONFIG, ...swipeConfig }
        },
        openImage
    })

    // The images are direct children of the body, so the body is the surface drags are read from
    const swipeSurface = { [createAttachmentKey()]: swipeNavigation(gallery) }

    const coverClick = () => {
        if (!modalClicked || enableClickToClose) {
            close()
        }
        modalClicked = false
    }

    const modalClick = () => {
        modalClicked = true
    }

    const activeImageTitle = $derived(gallery.images[activeImage]?.title || title)
    const activeImageDescription = $derived(gallery.images[activeImage]?.description || description)
    const galleryState = $derived({ imageCount: gallery.imageCount, activeImage })

    // A closed gallery unmounts its images, which register themselves again on the next opening
    $effect(() => {
        if (!isVisible) {
            gallery.forgetImages()
        }
    })

    lockBodyScroll(() => isVisible && !keepBodyScroll)
</script>

{@render thumbnail?.()}

{#if isVisible}
    <BodyChild>
        <ModalCover {transitionDuration} {...customization.coverProps ?? {}} onclick={coverClick}>
            <Modal {imagePreset} {transitionDuration} {...customization.lightboxProps ?? {}} onclick={modalClick}>
                <Header {imagePreset} {showCloseButton} {enableEscapeToClose} closeButtonProps={customization.closeButtonProps}
                    {...customization.lightboxHeaderProps ?? {}} onclose={close}/>

                <Body {imagePreset} {enableImageExpand} {...swipeSurface}>
                    <GalleryController {gallery}>
                        {@render children?.()}
                    </GalleryController>
                </Body>

                <Footer {imagePreset} title={activeImageTitle} description={activeImageDescription} gallery={galleryState}
                    {...customization.lightboxFooterProps ?? {}}/>
            </Modal>
        </ModalCover>
    </BodyChild>
{/if}
