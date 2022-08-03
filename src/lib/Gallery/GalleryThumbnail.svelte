<script lang="ts">
    import { getContext } from 'svelte'

    export let id: number

    const openImage: (id: number) => void = getContext('openImage')
    if (!id) {
        id = (getContext('thumbnailCounter'))()
    }
</script>

<button on:click={() => openImage(id)} {...$$restProps}>
    <slot/>
</button>

<style>
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
</style>