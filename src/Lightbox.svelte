<script>
    import Thumbnail from './LightboxThumbnail.svelte';
    import Modal from './Modal/Index.svelte';
    import InternalGallery from './Gallery/InternalGallery.svelte';
    import {onMount} from 'svelte';

    //exporting classes, for passing classes into thumbnail
    export let thumbnailClasses = '';
    export let thumbnailStyle = '';
    //exporting classes, for passing classes into wrapper
    export let modalClasses = '';
    export let modalStyle = '';
    //number that hold which image is active
    export let activeImage = 0;
    //array with image descriptions
    export let gallery = false;
    //getting universal title and descriptions
    export let title = '';
    export let description = '';
    //exporting duration of fade transition
    export let transitionDuration = 500;
    //bool that enables drag n drop protection
    export let protect = false;
    //enables other image than in slot
    export let image = {};
    //enables portrait mode
    export let portrait = false;
    //disables scrolling <body>
    export let noScroll = true;
    export let thumbnail = false;
    export let imagePreset = false;
    export let clickToClose = false;
    export let closeButton = true;

    let visible = false;

    let modalClicked = false;

    const toggle = () => {
        visible = !visible;
        toggleScroll()
    };

    const close = () => {
        visible = false;
        toggleScroll()
    };

    const coverClick = () => {
        // console.log('coverClick')
        if (!modalClicked || clickToClose) {
            close()
        }
        modalClicked = false;
    }

    const modalClick = () => {
        // console.log('modalClick')
        modalClicked = true;
    }

    let toggleScroll = () => {
    };

    onMount(() => {
        let defaultOverflow = document.body.style.overflow;
        toggleScroll = () => {
            if (noScroll) {
                if (visible) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = defaultOverflow;
                }
            }
        };
    })

</script>

<Thumbnail bind:thumbnailClasses bind:thumbnailStyle bind:protect on:click={toggle}>
    {#if thumbnail || gallery}
        <slot name="thumbnail"/>
    {:else}
        <slot/>
    {/if}
</Thumbnail>

{#if visible}
    <Modal bind:modalClasses bind:modalStyle bind:transitionDuration bind:image bind:protect
           bind:portrait bind:title bind:description bind:gallery bind:activeImage bind:imagePreset bind:closeButton
           on:close={close} on:topModalClick={coverClick} on:modalClick={modalClick}>
        {#if thumbnail}
            <slot name="image"/>
        {:else if gallery}
            <InternalGallery bind:activeImage>
                <slot name="thumbnail"/>
                <slot>
                </slot>
            </InternalGallery>
        {:else}
            <slot/>
        {/if}
    </Modal>
{/if}
