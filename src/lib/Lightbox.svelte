<script lang="ts">
    import Thumbnail from './LightboxThumbnail.svelte'
    import BodyChild from './Modal/BodyChild.svelte'
    import Header from './Modal/LightboxHeader.svelte'
    import Body from './Modal/LightboxBody.svelte'
    import Footer from './Modal/LightboxFooter.svelte'
    import ModalCover from './Modal/ModalCover.svelte'
    import Modal from './Modal/Modal.svelte'
    import { lockBodyScroll } from './bodyScroll.svelte'
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

    lockBodyScroll(() => isVisible && !keepBodyScroll)
</script>

{#if thumbnail || enableFallbackThumbnail}
    <Thumbnail {...customization.thumbnailProps ?? {}} onclick={toggle}>
        {@render (thumbnail ?? children)?.()}
    </Thumbnail>
{/if}

{#if isVisible}
    <BodyChild>
        <ModalCover {transitionDuration} {...customization.coverProps ?? {}} onclick={coverClick}>
            <Modal {imagePreset} {transitionDuration} {...customization.lightboxProps ?? {}} onclick={modalClick}>
                <Header {imagePreset} {showCloseButton} {enableEscapeToClose} closeButtonProps={customization.closeButtonProps}
                    {...customization.lightboxHeaderProps ?? {}} onclose={close}/>

                <Body {imagePreset} {enableImageExpand}>
                    {@render children?.()}
                </Body>

                <Footer {imagePreset} {title} {description} {...customization.lightboxFooterProps ?? {}}/>
            </Modal>
        </ModalCover>
    </BodyChild>
{/if}
