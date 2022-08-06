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

	export let customization: LightboxCustomization | {} = {}
    // getting universal title and descriptions
    export let title = ''
    export let description = ''
    // exporting duration of fade transition
    export let transitionDuration = 500
    // disables scrolling <body>
    export let noScroll = true
    export let imagePreset: ImagePreset = 'fit'
	export let escapeToClose = true
    export let clickToClose = false
    export let closeButton = true

    export let isVisible = false

    let modalClicked = false

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

	$: fullscreen = imagePreset === 'fullscreen'

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
	<Thumbnail {...(customization?.thumbnailProps || {})} on:click={toggle}>
		<slot name="thumbnail"/>
	</Thumbnail>
{/if}

{#if isVisible}
	<BodyChild>
		<ModalCover {transitionDuration} on:click={coverClick}>
			<Modal {transitionDuration} {fullscreen} on:click={modalClick} {...(customization.lightboxProps || {})}>
				<Header {closeButton} {fullscreen} closeButtonProps={customization.closeButtonProps} {escapeToClose}
						{...(customization.lightboxHeaderProps || {})} on:close={close}/>

				<Body {imagePreset} {fullscreen}>
				<slot/>
				</Body>

				<Footer {title} {description} {...(customization.lightboxFooterProps || {})}/>
			</Modal>
		</ModalCover>
	</BodyChild>
{/if}
