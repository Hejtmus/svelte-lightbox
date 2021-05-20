<script>
    export let image = {};
    export let protect = false;
    export let portrait = false;
    export let fit = false;
    $: console.log('fit', fit)
</script>

<div class="svelte-lightbox-body" class:svelte-lightbox-unselectable={protect}>
    {#if image.src}
        <img src={image.src} alt={image.alt} style={image.style} class={image.class} class:fit={fit}>
    {:else}
        <div class:svelte-lightbox-image-portrait={portrait}>
            <slot />
        </div>
    {/if}
</div>

<style>
    div.svelte-lightbox-body {
        background-color: transparent;
        width: auto;
        height: auto;
        max-height: 80vh;
    }
    div.svelte-lightbox-unselectable {
        user-select: none;
        pointer-events: none;
    }
    div.svelte-lightbox-image-portrait{
        max-width: 90vh;
    }
    div.fit {

    }
    img.fit {
        max-width: 90vw;
        max-height: 90vh;
    }
</style>