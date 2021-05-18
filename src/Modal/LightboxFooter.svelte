<script>
    export let title = '';
    export let description = '';
    export let galleryLength;
    export let activeImage;

    export let classes = '';
    export let style = '';
</script>

<div class={"svelte-lightbox-footer " + classes} {style}>
    <h2>
        {@html title}
    </h2>
    <h5>
        {@html description}
    </h5>
    {#if galleryLength}
        <p>
            Image {activeImage+1} of {galleryLength}
        </p>
    {/if}
</div>

<style>
    div.svelte-lightbox-footer {
        background-color: transparent;
        color: white;
        text-align: left;
        width: inherit;
        height: auto;
    }
</style>