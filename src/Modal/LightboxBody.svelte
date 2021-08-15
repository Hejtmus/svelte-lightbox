<script>
    import presets from './presets.json';
    export let image = {};
    export let protect = false;
    export let portrait = false;
    export let imagePreset = false;
    let imageParent;

    $: if (imageParent && imagePreset && presets[imagePreset]) {
        const imageStyle = imageParent.firstChild.style;
        const styles = Object.keys(presets[imagePreset])
        for (let i = 0; i !== styles.length; i++) {
            imageStyle[styles[i]] = presets[imagePreset][i]
        }
    }
    $: console.log('imagePreset:', imagePreset)

    $: imageClass = `${image.class} ${imagePreset ? imagePreset : ''}`
</script>

<div class="svelte-lightbox-body" class:svelte-lightbox-unselectable={protect}>
    {#if image.src}
        <img src={image.src} alt={image.alt} style={image.style} class={imageClass}>
    {:else}
        <div class:svelte-lightbox-image-portrait={portrait} class:expand={imagePreset == 'expand'} class:fit={imagePreset == 'fit'} bind:this={imageParent}>
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
        height: 90vh;
    }
    div.expand {
        width: 90vw;
        height: auto;
        max-height: 90vh;
    }
</style>