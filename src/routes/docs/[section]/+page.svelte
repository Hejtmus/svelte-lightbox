<script lang="ts">
    import { Section } from '@sveltejs/site-kit/docs'

    export let data
    const section = data.section
</script>

<Section {section} edit={section.edit}/>
