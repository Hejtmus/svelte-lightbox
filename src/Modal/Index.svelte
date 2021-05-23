<script>
    import {fade} from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';

    import Header from './LightboxHeader.svelte';
    import Body from './LightboxBody.svelte';
    import Footer from './LightboxFooter.svelte';
    import ModalCover from "./ModalCover.svelte";
    import Modal from "./Modal.svelte";

    const dispatch = createEventDispatcher();

    export let modalClasses = '';
    export let modalStyle = '';
    export let transitionDuration = 500;
    export let image = {};
    export let protect = false;
    export let portrait = false;
    export let title = '';
    export let description = '';
    export let gallery;
    export let activeImage;
    export let fit;
    export let closeButton;
    let actualTitle;
    let actualDescription;

    //let allModalClasses = modalClasses;
    $: allModalClasses = `${modalClasses} svelte-lightbox clearfix`;
    // For variable title and description, we need to define this auxiliary variables
    $: actualTitle = title;
    $: actualDescription = description;

    // If there is not universal title or description for gallery, we will display individual title and description
    $: if (gallery && !title && !description) {
        actualTitle = gallery[activeImage].title;
        actualDescription = gallery[activeImage].description;
    }

</script>

<ModalCover bind:transitionDuration on:click={ () => dispatch('topModalClick') }>
    <Modal bind:allModalClasses bind:modalStyle on:click={ () => dispatch('modalClick') }>
        <Header bind:closeButton on:close={ () => dispatch('close') }/>

        <Body bind:image={image} bind:protect={protect} bind:portrait={portrait} bind:fit={fit}>
        <slot/>
        </Body>


        <Footer bind:title={actualTitle} bind:description={actualDescription} bind:galleryLength={gallery.length}
                bind:activeImage={activeImage}/>
    </Modal>
</ModalCover>


<style>
    .svelte-lightbox-overlay {
        position: relative;
        z-index: 1000001;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }
    .svelte-lightbox {
        background-color: transparent;
        width: auto;
        height: auto;
        max-width: 90vw;
        max-height: 90vh;
    }
    .clearfix::after {
        content: "";
        clear: both;
        display: table;
    }

    /* I need help with styling this */
</style>
