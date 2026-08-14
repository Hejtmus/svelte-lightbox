<script lang="ts">
    import Thumbnail from './LightboxThumbnail.svelte'
    import BodyChild from './Modal/BodyChild.svelte'
    import Header from './Modal/LightboxHeader.svelte'
    import Body from './Modal/LightboxBody.svelte'
    import Footer from './Modal/LightboxFooter.svelte'
    import ModalCover from './Modal/ModalCover.svelte'
    import Modal from './Modal/Modal.svelte'
    import { lockBodyScroll } from './bodyScroll.svelte'
    import { flightTiming } from './transitions'
    import type { Snippet } from 'svelte'
    import type { LightboxOptions } from '$lib/Types'

    interface Props extends LightboxOptions {
        enableFallbackThumbnail?: boolean,
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
        enableFallbackThumbnail = true,
        enableEscapeToClose = true,
        enableClickToClose = false,
        showCloseButton = true,
        isVisible = $bindable(false),
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

    const coverClick = () => {
        if (!modalClicked || enableClickToClose) {
            close()
        }
        modalClicked = false
    }

    const modalClick = () => {
        modalClicked = true
    }

    // The thumbnail stays where it is, since the image lands on top of it rather than replacing it
    let thumbnailElement: HTMLDivElement | null = $state(null)

    const hasThumbnail = $derived(thumbnail !== undefined || enableFallbackThumbnail)
    const isGrowingOutOfThumbnail = $derived(transitionPreset === 'crossfade' && thumbnailElement !== null)
    const expandFrom = $derived(isGrowingOutOfThumbnail ? () => thumbnailElement : null)
    // Fading the modal on top of the flight would only dim the image on its way over
    const modalTransitionDuration = $derived(isGrowingOutOfThumbnail ? 0 : transitionDuration)
    // The image travels inside the cover, so the cover has to be there for exactly as long
    const coverTiming = $derived(isGrowingOutOfThumbnail ? flightTiming(transitionDuration) : null)

    lockBodyScroll(() => isVisible && !keepBodyScroll)
</script>

{#if hasThumbnail}
    <Thumbnail bind:element={thumbnailElement} {...customization.thumbnailProps ?? {}} onclick={toggle}>
        {@render (thumbnail ?? children)?.()}
    </Thumbnail>
{/if}

{#if isVisible}
    <BodyChild>
        <ModalCover {transitionDuration} timing={coverTiming} {...customization.coverProps ?? {}} onclick={coverClick}>
            <Modal {imagePreset} transitionDuration={modalTransitionDuration} {...customization.lightboxProps ?? {}} onclick={modalClick}>
                <Header {imagePreset} {showCloseButton} {enableEscapeToClose} closeButtonProps={customization.closeButtonProps}
                    {...customization.lightboxHeaderProps ?? {}} onclose={close}/>

                <Body {imagePreset} {enableImageExpand} {expandFrom} {transitionDuration}>
                    {@render children?.()}
                </Body>

                <Footer {imagePreset} {title} {description} {...customization.lightboxFooterProps ?? {}}/>
            </Modal>
        </ModalCover>
    </BodyChild>
{/if}
