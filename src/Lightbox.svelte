<script>
    import { fade } from 'svelte/transition';

    //defining variable that will hold class value, that will be passed into this component's wrapper
    let defaultClasses = '';

    //exporting classes, for passing classes into wrapper
    export {defaultClasses as class};
    export let style = '';
    //number that hold which section is active
    export let activeImage = 0;
    //array with names of section, the most important about this array is that it's hold fullpage's length
    export let gallery = [];
    export let description = '';
    //exporting duration of animation and scroll cooldown
    export let transitionDuration = 500;

    let visible = false;
    const toggle = () => {
        visible = !visible;
    };
    defaultClasses = `${defaultClasses} svelte-lightbox-overlay`
</script>

<div on:click={toggle}>
    <slot />
</div>

{#if visible}
    <div class={defaultClasses} style={style} transition:fade={{duration:transitionDuration}}>
        <div class="svelte-lightbox">
            <div class="svelte-lightbox-header">
                <button on:click={toggle}>
                    ×
                </button>
            </div>
            <div class="svelte-lightbox-body">
                <slot />
            </div>
            <div class="svelte-lightbox-footer">
                <p>
                    {description}
                </p>
                <p>
                    Image {activeImage+1} of {gallery.length-1}
                </p>
            </div>
        </div>
    </div>
{/if}

<style>
    .svelte-lightbox-overlay {
        position: absolute;
        z-index: 999999999;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(44,38,45,0.85);
    }
    .svelte-lightbox {
        background-color: transparent;
        width: 30vw;
        height: auto;
    }
    .svelte-lightbox-header {
        width: inherit;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: end;
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
</style>