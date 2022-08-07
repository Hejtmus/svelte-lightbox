<script>export let imagePreset;
export let enableImageExpand;
</script>

<div class="svelte-lightbox-body" class:fullscreen={imagePreset === 'fullscreen'} class:scroll={imagePreset === 'scroll'}
	 class:expand={enableImageExpand}>
	<slot/>
</div>

<style>
    div.svelte-lightbox-body {
		position: relative;
        width: auto;
        height: auto;
		/* TODO: mitigate this hardcode by using flexbox in lightbox modal <Modal.svelte> */
        max-height: 80vh;
    }
	:global(div.svelte-lightbox-body > *) {
		max-width: 100%;
		max-height: inherit;
		height: auto;
		width: auto;
		object-fit: contain;
	}
	:global(div.svelte-lightbox-body.scroll > *) {
		max-height: 100%;
	}
	:global(div.svelte-lightbox-body.expand > *) {
		flex-grow: 1;
	}
    div.fullscreen {
        width: inherit;
	    max-width: inherit;
        height: inherit;
		max-height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
    }
    div.scroll {
		overflow: scroll;
    }
</style>