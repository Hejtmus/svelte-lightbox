<div class:svelte-lightbox-thumbnail={true} on:click {...$$restProps}>
    <slot/>
</div>

<style>
    div {
        position: static;
        cursor: zoom-in;
    }
    :global(.svelte-lightbox-thumbnail > *) {
        max-width: 100%;
        height: auto;
    }
</style>