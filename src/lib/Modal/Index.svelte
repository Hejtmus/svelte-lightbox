<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    import Header from './LightboxHeader.svelte'
    import Body from './LightboxBody.svelte'
    import Footer from './LightboxFooter.svelte'
    import ModalCover from './ModalCover.svelte'
    import Modal from './Modal.svelte'
    import type { GalleryState } from '$lib/Types'

    const dispatch = createEventDispatcher()

    export let modalClasses = ''
    export let modalStyle = ''
    export let transitionDuration = 500
    export let image = {}
    export let gallery: GalleryState = null
    export let protect = false
    export let portrait = false
    export let title = ''
    export let description = ''
    export let imagePreset
    export let escapeToClose
    export let closeButton

    const handleKey = (event) => {
        if (escapeToClose && event.key === 'Escape') {
            dispatch('close')
        }
    }

    $: fullscreen = imagePreset === 'fullscreen'
</script>

<svelte:window on:keydown={ (event) => handleKey(event) }/>

<ModalCover bind:transitionDuration on:click={ () => dispatch('topModalClick') }>
    <Modal bind:modalClasses bind:modalStyle bind:transitionDuration {fullscreen} on:click={ () => dispatch('modalClick') }>
        <Header bind:closeButton {fullscreen} on:close/>

        <Body bind:image={image} bind:protect={protect} bind:portrait={portrait} {imagePreset} {fullscreen}>
        <slot/>
        </Body>

        <Footer {title} {description} {gallery}/>
    </Modal>
</ModalCover>

