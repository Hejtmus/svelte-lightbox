<script>
    import {fade} from 'svelte/transition';
    import {createEventDispatcher, setContext} from 'svelte';

    import Header from './LightboxHeader.svelte';
    import Body from './LightboxBody.svelte';
    import Footer from './LightboxFooter.svelte';
    import ModalCover from "./ModalCover.svelte";
    import Modal from "./Modal.svelte";
    import {writable} from "svelte/store";

    const dispatch = createEventDispatcher();

    export let modalClasses = '';
    export let modalStyle = '';
    export let transitionDuration = 500;
    export let image = {};
    export let protect = false;
    export let portrait = false;
    export let title = '';
    export let description = '';
    export let gallery = [];
    export let imagePreset;
    export let closeButton;
    const activeImageStore = new writable(0);
    let actualTitle;
    let actualDescription;

    setContext('svelte-lightbox-activeImage', activeImageStore)
    // For variable title and description, we need to define this auxiliary variables
    $: actualTitle = title;
    $: actualDescription = description;

    // If there is not universal title or description for gallery, we will display individual title and description
    $: if (gallery && !title && !description) {
        actualTitle = gallery[$activeImageStore].title;
        actualDescription = gallery[$activeImageStore].description;
    }
    $: fullscreen = imagePreset === 'fullscreen';
</script>

<ModalCover bind:transitionDuration on:click={ () => dispatch('topModalClick') }>
    <Modal bind:modalClasses bind:modalStyle bind:transitionDuration {fullscreen} on:click={ () => dispatch('modalClick') }>
        <Header bind:closeButton {fullscreen} on:close={ () => dispatch('close') }/>

        <Body bind:image={image} bind:protect={protect} bind:portrait={portrait} {imagePreset} {fullscreen} gallery={!!gallery.length}>
        <slot/>
        </Body>


        <Footer bind:title={actualTitle} bind:description={actualDescription} galleryLength={gallery ? gallery.length : false}
                bind:activeImage={$activeImageStore}/>
    </Modal>
</ModalCover>

