<script>
    import { fade } from 'svelte/transition';

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

    let visible = false;
    const toggle = () => {
        visible = !visible;
    };

    defaultClasses = `${defaultClasses} svelte-lightbox-overlay`;
</script>

<div on:click={toggle}>
    <div class:svelte-lightbox-unselectable={protect}>
        <slot/>
    </div>
</div>

{#if visible}
    <div class={defaultClasses} style={style} transition:fade={{duration:transitionDuration}} on:click={toggle}>
        <div class="svelte-lightbox" on:click={toggle}>
            <div class="svelte-lightbox-header">
                <button on:click={toggle}>
                    ×
                </button>
            </div>
            <div class="svelte-lightbox-body" class:svelte-lightbox-unselectable={protect}>
                <slot />
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
{/if}

<style>
    .svelte-lightbox-overlay {
        position: fixed;
        z-index: 999999999;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(43, 39, 45, 0.87);
        padding: 1rem;
    }
    .svelte-lightbox {
        background-color: transparent;
        width: auto;
        height: auto;
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
</style>