<script lang="ts" context="module">
    export async function load ({ stuff, params }) {
        let section
        for (const stuffSection of stuff.sections) {
            if (stuffSection.slug === params.section) {
                section = stuffSection
            }
        }
        if (section) {
            return {
                props: {
                    section
                }
            }
        } else {
            return {
                code: 404
            }
        }
    }
</script>


<script lang="ts">
    import { Section } from '@sveltejs/site-kit/docs'

    export let section
</script>

<Section {section} edit={section.edit}/>
