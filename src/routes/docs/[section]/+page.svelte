<script lang="ts">
    import { Section } from '@sveltejs/site-kit/docs'

    export let data
    const section = data.section
</script>

<svelte:head>
    <title>
        svelte-lightbox | Docs - {data.title}
    </title>
    <meta name="description" content="Documentation of svelte-lightbox section {data.title}">
</svelte:head>

<Section {section} edit={section.edit}/>
