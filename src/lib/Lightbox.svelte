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
    export let imagePreset: ImagePreset = ''
	export let enableExpand = false
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
			<Modal {transitionDuration} {imagePreset} on:click={modalClick} {...(customization.lightboxProps || {})}>
				<Header {closeButton} {imagePreset} closeButtonProps={customization.closeButtonProps} {escapeToClose}
						{...(customization.lightboxHeaderProps || {})} on:close={close}/>

				<Body {imagePreset} {enableExpand}>
				<slot/>
				</Body>

				<Footer {imagePreset} {title} {description} {...(customization.lightboxFooterProps || {})}/>
			</Modal>
		</ModalCover>
	</BodyChild>
{/if}
