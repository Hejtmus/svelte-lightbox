<script>export let title = '';
export let description = '';
export let gallery = null;
</script>

<div {...$$restProps}>
    <h2>
        {@html title}
    </h2>
    <h5>
        {@html description}
    </h5>
    {#if gallery !== null}
        <p>
            Image {gallery.activeImage + 1} of {gallery.imageCount}
        </p>
    {/if}
</div>

<style>
    div {
        position: absolute;
        background-color: transparent;
        color: white;
        text-align: left;
        width: inherit;
        height: auto;
    }
</style>