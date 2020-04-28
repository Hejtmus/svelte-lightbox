<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    //defining variable that will hold class value, that will be passed into this component's wrapper
    let defaultClasses = '';

    //exporting classes, for passing classes into wrapper
    export {defaultClasses as class};
    export let style = '';
    //number that hold which image is active
    export let activeImage = 0;
    //array with image desctiptions
    export let gallery = [];
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
    export let noScroll = false;

    let visible = false;
    const toggle = () => {
        visible = !visible;
        if (noScroll) {
            mountedT()
        }
    };
    let mountedT = () => {
    };

    defaultClasses = `${defaultClasses} svelte-lightbox-overlay clearfix`;


    onMount(()=>{
        let defaultClass = document.body.style;
        mountedT = () => {
            if (visible) {
                document.body.style = 'overflow: hidden'
            } else {
                document.body.style = defaultClass;
            }
        };
    })
</script>

<div class="clickable" on:click={toggle}>
    <div class:svelte-lightbox-unselectable={protect}>
        <slot/>
    </div>
</div>

{#if visible}
    <div class="cover clearfix">
        <div class={defaultClasses} style={style} transition:fade={{duration:transitionDuration}} on:click={toggle}>
            <div class="svelte-lightbox" on:click={toggle}>
                <div class="svelte-lightbox-header">
                    <button on:click={toggle}>
                        ×
                    </button>
                </div>
                <div class="svelte-lightbox-body" class:svelte-lightbox-unselectable={protect}>
                    {#if image.src}
                        <img src={image.src} alt={image.alt} style={image.style} class={image.class}>
                    {:else}
                        <div class:svelte-lightbox-image-portrait={portrait}>
                            <slot />
                        </div>
                    {/if}
                </div>
                <div class="svelte-lightbox-footer">
                    <h3>
                        {description}
                    </h3>
                    {#if gallery[0]}
                        <p>
                            Image {activeImage+1} of {gallery.length-1}
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .cover {
        position: fixed;
        z-index: 1000000;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .clickable {
        position: static;
        cursor: zoom-in;
    }
    .svelte-lightbox-overlay {
        position: relative;
        z-index: 1000001;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(43, 39, 45, 0.87);
        padding: 1rem;
    }
    .svelte-lightbox {
        position: absolute;
        background-color: transparent;
        width: auto;
        height: auto;
        z-index: 1000002;
    }
    .svelte-lightbox-header {
        width: inherit;
        height: auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .svelte-lightbox-body {
        background-color: transparent;
        width: auto;
        height: auto;
        max-height: 80vh;
    }
    .svelte-lightbox-image-portrait{
        max-width: 90vh;
    }
    .svelte-lightbox-footer {
        background-color: transparent;
        width: inherit;
        height: auto;
    }
    .svelte-lightbox-unselectable {
        user-select: none;
        pointer-events: none;
    }
    h3 {
        color: white;
    }
    button {
        background: transparent;
        font-size: 4rem;
        border: none;
        color: white;
    }
    button:hover {
        color: lightgray;
    }
    .clearfix::after {
        content: "";
        clear: both;
        display: table;
    }
</style>