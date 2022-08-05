<script lang="ts">
	import Thumbnail from './LightboxThumbnail.svelte'
    import Modal from './Modal/Index.svelte'
    import BodyChild from './Modal/BodyChild.svelte'
    import { onMount } from 'svelte'
	import type { LightboxCustomization } from '$lib/Types'

	export let customization: LightboxCustomization | {} = {}
    // getting universal title and descriptions
    export let title = ''
    export let description = ''
    // exporting duration of fade transition
    export let transitionDuration = 500
    // enables portrait mode
    export let portrait = false
	export let fallbackThumbnailEnabled = true
    // disables scrolling <body>
    export let noScroll = true
    export let imagePreset = false
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

{#if $$slots.thumbnail || fallbackThumbnailEnabled}
	<Thumbnail {...(customization?.thumbnailProps || {})} on:click={toggle}>
		{#if $$slots.thumbnail}
			<slot name="thumbnail"/>
		{:else if fallbackThumbnailEnabled}
			<slot/>
		{/if}
	</Thumbnail>
{/if}

{#if isVisible}
	<BodyChild>
		<Modal {transitionDuration} {portrait} {title} {description} {imagePreset} {escapeToClose} {closeButton}
			   {customization} on:close={close} on:topModalClick={coverClick} on:modalClick={modalClick}>
			{#if $$slots.thumbnail}
				<slot name="image"/>
			{:else}
				<slot/>
			{/if}
		</Modal>
	</BodyChild>
{/if}
