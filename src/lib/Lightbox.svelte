<script lang="ts">
	import Thumbnail from './LightboxThumbnail.svelte'
    import BodyChild from './Modal/BodyChild.svelte'
	import Header from './Modal/LightboxHeader.svelte'
	import Body from './Modal/LightboxBody.svelte'
	import Footer from './Modal/LightboxFooter.svelte'
	import ModalCover from './Modal/ModalCover.svelte'
	import Modal from './Modal/Modal.svelte'
	import { onMount } from 'svelte'
	import type { LightboxCustomization, ImagePreset } from '$lib/Types'

    export let title = ''
    export let description = ''

    export let imagePreset: ImagePreset = ''

	export let customization: LightboxCustomization | {} = {}
	export let transitionDuration = 300

	export let keepBodyScroll = false
	export let enableImageExpand = false
	export let enableFallbackThumbnail = true
	export let enableEscapeToClose = true
    export let enableClickToClose = false
    export let showCloseButton = true

    export let isVisible = false

    let modalClicked = false

    const toggle = () => {
        isVisible = !isVisible
        toggleScroll()
    }

	const open = () => {
		isVisible = true
		toggleScroll()
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

    let toggleScroll = () => {
    }

	export const programmaticController = {
		toggle,
		open,
		close
	}

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

{#if $$slots.thumbnail || enableFallbackThumbnail}
	<Thumbnail {...(customization?.thumbnailProps || {})} on:click={toggle}>
		{#if $$slots.thumbnail}
			<slot name="thumbnail"/>
		{:else}
			<slot/>
		{/if}
	</Thumbnail>
{/if}

{#if isVisible}
	<BodyChild>
		<ModalCover {transitionDuration} on:click={coverClick}>
			<Modal {imagePreset} {transitionDuration} on:click={modalClick} {...(customization.lightboxProps || {})}>
				<Header {imagePreset} {showCloseButton} {enableEscapeToClose} closeButtonProps={customization.closeButtonProps}
						{...(customization.lightboxHeaderProps || {})} on:close={close}/>

				<Body {imagePreset} {enableImageExpand}>
				<slot/>
				</Body>

				<Footer {imagePreset} {title} {description} {...(customization.lightboxFooterProps || {})}/>
			</Modal>
		</ModalCover>
	</BodyChild>
{/if}
