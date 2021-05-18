<script>
    import Thumbnail from './LightboxThumbnail.svelte';
    import Modal from './Modal/Index.svelte';
    import InternalGallery from './Gallery/InternalGallery.svelte';
    import {onMount} from 'svelte';
    import {writable} from "svelte/store";
    import ExternalGallery from "./Gallery/ExternalGallery.svelte";

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
    let galleryThumbnail;
    let galleryThumbnailStore = writable(galleryThumbnail);
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

    let visible = false;

    const toggle = () => {
        visible = !visible;
        if (noScroll) {
            mountedT()
        }
    };
    let mountedT = () => {
    };

    onMount(() => {
        let defaultOverflow = document.body.style.overflow;
        mountedT = () => {
            if (visible) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = defaultOverflow;
            }
        };
    })
    $: galleryThumbnailStore.set(galleryThumbnail)

</script>

<Thumbnail bind:thumbnailClasses bind:thumbnailStyle bind:protect on:click={toggle}>
    {#if thumbnail}
        <slot name="thumbnail"/>
    {:else if gallery}
        <div bind:this={galleryThumbnail}>
            <slot name="thumbnail"/>
        </div>
    {:else}
        <slot/>
    {/if}
</Thumbnail>

{#if visible}
    <Modal bind:modalClasses bind:modalStyle bind:transitionDuration bind:image bind:protect
           bind:portrait bind:title bind:description bind:gallery bind:activeImage
           on:close={toggle} on:topModalClick={toggle} on:modalClick={toggle}>
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
