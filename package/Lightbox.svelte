<script>import Thumbnail from './LightboxThumbnail.svelte';
import Modal from './Modal/Index.svelte';
import BodyChild from './Modal/BodyChild.svelte';
import { onMount } from 'svelte';
// exporting classes, for passing classes into thumbnail
export let thumbnailClasses = '';
export let thumbnailStyle = '';
// exporting classes, for passing classes into wrapper
export let modalClasses = '';
export let modalStyle = '';
// getting universal title and descriptions
export let title = '';
export let description = '';
// exporting duration of fade transition
export let transitionDuration = 500;
// bool that enables drag n drop protection
export let protect = false;
// enables portrait mode
export let portrait = false;
// disables scrolling <body>
export let noScroll = true;
export let imagePreset = false;
export let escapeToClose = true;
export let clickToClose = false;
export let closeButton = true;
export let isVisible = false;
let modalClicked = false;
const toggle = () => {
    isVisible = !isVisible;
    toggleScroll();
};
const close = () => {
    isVisible = false;
    toggleScroll();
};
const coverClick = () => {
    // console.log('coverClick')
    if (!modalClicked || clickToClose) {
        close();
    }
    modalClicked = false;
};
const modalClick = () => {
    // console.log('modalClick')
    modalClicked = true;
};
let toggleScroll = () => {
};
onMount(() => {
    const defaultOverflow = document.body.style.overflow;
    toggleScroll = () => {
        if (noScroll) {
            if (isVisible) {
                document.body.style.overflow = 'hidden';
            }
            else {
                document.body.style.overflow = defaultOverflow;
            }
        }
    };
});
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
		<Modal bind:modalClasses bind:modalStyle bind:transitionDuration bind:protect bind:portrait
			   bind:title bind:description bind:imagePreset bind:escapeToClose bind:closeButton
		       on:close={close} on:topModalClick={coverClick} on:modalClick={modalClick}>
			{#if $$slots.thumbnail}
				<slot name="image"/>
			{:else}
				<slot/>
			{/if}
		</Modal>
	</BodyChild>
{/if}
