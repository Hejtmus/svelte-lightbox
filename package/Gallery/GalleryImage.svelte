<script>import { getContext } from 'svelte';
export let thumbnailProps = {};
export let title = '';
export let description = '';
const activeImageStore = getContext('activeImage');
const imageId = (getContext('imageCounter'))({
    thumbnailProps: {
        ...$$restProps,
        ...thumbnailProps
    },
    title,
    description
});
</script>

{#if $activeImageStore === imageId}
    <slot {...$$restProps}/>
{/if}

<style>
	div {
		max-height: inherit;
		display: flex;
		justify-content: center;
	}

</style>