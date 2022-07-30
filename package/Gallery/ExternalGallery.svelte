<script>
    import { getContext, hasContext } from 'svelte'
    import { writable } from 'svelte/store'

    export let activeImage = 0
    // Possible any CSS color
    export let galleryArrowsColor = 'black'
    // Possible string with value: 'unset', 'loop', 'hide'
    export let galleryArrowsCharacter = 'unset'
    // Disables controlling gallery with keyboard
    export let disableKeyboardArrowsControl = false

    const activeImageStore = getContext('svelte-lightbox-activeImage')
    const arrowsColorStore = getContext('svelte-lightbox-galleryArrowsColor')
    const arrowsCharacterStore = getContext('svelte-lightbox-galleryArrowsCharacter')
    const keyboardControlStore = getContext('svelte-lightbox-disableKeyboardArrowsControl')

    $: activeImageStore.set(activeImage)
    $: arrowsColorStore.set(galleryArrowsColor)
    $: arrowsCharacterStore.set(galleryArrowsCharacter)
    $: keyboardControlStore.set(disableKeyboardArrowsControl)
</script>

<slot {...$$restProps}>
</slot>