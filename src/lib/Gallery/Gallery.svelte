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
    import { flightTiming } from '$lib/transitions'
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
        transitionPreset = '',
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

    // Points the dialog's aria-labelledby at the title the footer renders
    const titleId = $props.id()

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

    // The image travels to and from the thumbnail standing for it, which the reader can walk away from
    const openedThumbnail = $derived(transitionPreset === 'crossfade' ? gallery.thumbnailOf(activeImage) : null)
    const expandFrom = $derived(openedThumbnail === null ? null : () => gallery.thumbnailOf(activeImage))
    // Fading the modal on top of the flight would only dim the image on its way over
    const modalTransitionDuration = $derived(openedThumbnail === null ? transitionDuration : 0)
    // The image travels inside the cover, so the cover has to be there for exactly as long
    const coverTiming = $derived(openedThumbnail === null ? null : flightTiming(transitionDuration))

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
        <ModalCover {transitionDuration} timing={coverTiming} {...customization.coverProps ?? {}} onclick={coverClick}>
            <Modal {imagePreset} transitionDuration={modalTransitionDuration} {titleId} {...customization.lightboxProps ?? {}} onclick={modalClick}>
                <Header {imagePreset} {showCloseButton} {enableEscapeToClose} closeButtonProps={customization.closeButtonProps}
                    {...customization.lightboxHeaderProps ?? {}} onclose={close}/>

                <Body {imagePreset} {enableImageExpand} {expandFrom} {transitionDuration} {...swipeSurface}>
                    <GalleryController {gallery}>
                        {@render children?.()}
                    </GalleryController>
                </Body>

                <Footer {imagePreset} title={activeImageTitle} description={activeImageDescription} gallery={galleryState}
                    {titleId} {...customization.lightboxFooterProps ?? {}}/>
            </Modal>
        </ModalCover>
    </BodyChild>
{/if}
