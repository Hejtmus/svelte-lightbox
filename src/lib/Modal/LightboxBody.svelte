<script lang="ts">
    import type { ImagePreset } from '$lib/Types'

	export let imagePreset: ImagePreset
	export let enableExpand: boolean
</script>

<div class="svelte-lightbox-body" class:fullscreen={imagePreset === 'fullscreen'} class:scroll={imagePreset === 'scroll'}
	 class:expand={enableExpand}>
	<slot/>
</div>

<style>
    div.svelte-lightbox-body {
        background-color: transparent;
        width: auto;
        height: auto;
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
    div.svelte-lightbox-body.fullscreen {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
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