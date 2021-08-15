<script>
    import {getContext, hasContext} from "svelte";
    import {writable} from "svelte/store";

	// Possible any CSS color
    export let galleryArrowsColor = 'black';
    // Possible string with value: 'unset', 'loop', 'hide'
    export let galleryArrowsCharacter = 'unset';
    // Disables controlling gallery with keyboard
    export let disableKeyboardArrowsControl = false;

    const arrowsColorStore = getContext('svelte-lightbox-galleryArrowsColor');
    const arrowsCharacterStore = getContext('svelte-lightbox-galleryArrowsCharacter');
    const keyboardControlStore = getContext('svelte-lightbox-disableKeyboardArrowsControl');

	$: arrowsColorStore.set(galleryArrowsColor);
	$: arrowsCharacterStore.set(galleryArrowsCharacter);
	$: keyboardControlStore.set(disableKeyboardArrowsControl);
	$: console.log($arrowsColorStore, $arrowsCharacterStore, $keyboardControlStore)
</script>

<slot {...$$restProps}>
</slot>