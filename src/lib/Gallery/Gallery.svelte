<script>
    import { onMount, setContext } from 'svelte'
    import { writable } from 'svelte/store'
    import BodyChild from '../Modal/BodyChild.svelte'
    import Modal from '../Modal/Index.svelte'
    import InternalGallery from './InternalGallery.svelte'
    import Thumbnail from '../LightboxThumbnail.svelte'

    // Lightbox props --------------------------------------------------------------------------------------------------

    // exporting classes, for passing classes into thumbnail
    export let thumbnailClasses = ''
    export let thumbnailStyle = ''
    // exporting classes, for passing classes into wrapper
    export let modalClasses = ''
    export let modalStyle = ''
    // getting universal title and descriptions
    export let title = ''
    export let description = ''
    // exporting duration of fade transition
    export let transitionDuration = 500
    // bool that enables drag n drop protection
    export let protect = false
    // enables other image than in slot
    export let image = {}
    // enables portrait mode
    export let portrait = false
    // disables scrolling <body>
    export let noScroll = true
    export let thumbnail = false
    export let imagePreset = false
    export let escapeToClose = true
    export let clickToClose = false
    export let closeButton = true

    export let isVisible = false

    // Gallery props ---------------------------------------------------------------------------------------------------

    export let activeImage = 0
    // Possible any CSS color
    export let arrowsColor = 'black'
    // Possible string with value: 'unset', 'loop', 'hide'
    export let arrowsCharacter = 'unset'
    // Disables controlling gallery with keyboard
    export let disableKeyboardArrowsControl = false
    let galleryImageCount = 0
    let modalClicked = false

    const galleryImageCountStore = writable(galleryImageCount)
    const activeImageStore = writable(activeImage)
    const arrowsColorStore = writable(arrowsColor)
    const arrowsCharacterStore = writable(arrowsCharacter)
    const keyboardControlStore = writable(disableKeyboardArrowsControl)

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

    setContext('svelte-lightbox-galleryImageCounter', () => {
        $galleryImageCountStore++
        return $galleryImageCountStore - 1
    })
    setContext('svelte-lightbox-galleryImageCount', galleryImageCountStore)
    setContext('svelte-lightbox-activeImage', activeImageStore)
    setContext('svelte-lightbox-galleryArrowsColor', arrowsColorStore)
    setContext('svelte-lightbox-galleryArrowsCharacter', arrowsCharacterStore)
    setContext('svelte-lightbox-disableKeyboardArrowsControl', keyboardControlStore)

    $: activeImageStore.set(activeImage)
    $: arrowsColorStore.set(arrowsColor)
    $: arrowsCharacterStore.set(arrowsCharacter)
    $: keyboardControlStore.set(disableKeyboardArrowsControl)

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

<Thumbnail bind:class={thumbnailClasses} bind:style={thumbnailStyle} bind:protect on:click={toggle}>
    {#if $$slots.thumbnail}
        <slot name="thumbnail"/>
    {:else}
        <slot/>
    {/if}
</Thumbnail>

{#if isVisible}
    <BodyChild>
        <Modal bind:modalClasses bind:modalStyle bind:transitionDuration bind:image bind:protect bind:portrait
               bind:title bind:description bind:imagePreset bind:escapeToClose bind:closeButton
               on:close={close} on:topModalClick={coverClick} on:modalClick={modalClick}>
            <InternalGallery>
                <slot {...$$restProps}>
                </slot>
            </InternalGallery>
        </Modal>
    </BodyChild>
{/if}