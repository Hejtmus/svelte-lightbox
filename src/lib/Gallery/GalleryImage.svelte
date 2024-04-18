<script lang="ts">
    import { getContext } from 'svelte'

    export let title: string = ''
    export let description: string = ''

    const activeImageStore = getContext('activeImage')
    const imageId = (getContext('imageCounter'))({
        title,
        description
    })

</script>

{#if $activeImageStore === imageId}
    <slot {...$$restProps}/>
{/if}
