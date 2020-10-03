<script>
    import {fade} from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import Header from './LightboxHeader.svelte';
    import Body from './LightboxBody.svelte';
    import Footer from './LightboxFooter.svelte';

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

    //let allModalClasses = modalClasses;
    $: allModalClasses = `${modalClasses} svelte-lightbox-overlay clearfix`;
</script>

<div class="cover clearfix">

    <div class={allModalClasses} style={modalStyle} transition:fade={{duration:transitionDuration}} on:click={ () => dispatch('topModalClick') }>

        <div class="svelte-lightbox" on:click={ () => dispatch('modalClick') }>

            <Header on:close={ () => dispatch('close') }/>

            <Body bind:image={image} bind:protect={protect} bind:portrait={portrait}/>

            <Footer bind:title={title} bind:description={description} bind:gallery={gallery}
                    bind:activeImage={activeImage}/>

        </div>

    </div>

</div>


<style>
    .cover {
        position: fixed;
        z-index: 1000000!important;
        background-color: rgba(43, 39, 45, 0.87);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
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
        position: absolute;
        background-color: transparent;
        width: auto;
        height: auto;
        max-width: 90%;
        max-height: 90%;
        z-index: 1000002;
    }
    .clearfix::after {
        content: "";
        clear: both;
        display: table;
    }
    /* I need help with styling this */
</style>
