<script>
    import { getContext } from 'svelte'

    export let thumbnailProps

    const activeImageStore = getContext('activeImage')
    const imageId = (getContext('imageCounter'))({
        thumbnailProps: {
            ...$$restProps,
            ...thumbnailProps
        }
    })

</script>

{#if $activeImageStore === imageId}
    <img {...$$restProps}/>
{/if}

<style>
	div {
		max-height: inherit;
		display: flex;
		justify-content: center;
	}

</style>