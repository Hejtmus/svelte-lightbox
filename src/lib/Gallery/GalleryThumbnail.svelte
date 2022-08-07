<script lang="ts">
    import { getContext } from 'svelte'

    export let id: number

    const openImage: (id: number) => void = getContext('openImage')
    if (!id) {
        id = (getContext('thumbnailCounter'))()
    }
</script>

<div class="clickable" on:click={() => openImage(id)} {...$$restProps}>
    <slot/>
</div>

<style>
    div {
        position: static;
        cursor: zoom-in;
    }
</style>