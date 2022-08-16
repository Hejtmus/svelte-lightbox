<script lang="ts" context="module">
    import { marked } from 'marked'
    import { markdownToSectionStructure } from '$utils/markdown'

    interface SectionLink {
        title: string,
        edit: string,
    }
    interface Section extends SectionLink {
        slug: string,
        path: string,
        content: string,
        sections: Array<Section>
    }
    const getSectionLinks = async ({ fetch }): Promise<Array<SectionLink>> => {
        const docsRequest = await fetch('https://raw.githubusercontent.com/Hejtmus/svelte-lightbox/master/documentation/docs/index.json')
        return (await docsRequest.json()).sections
    }
    const getSectionFile = async ({ fetch, url }): Promise<string> => {
        const fileRequest = await fetch(url)
        return await fileRequest.text()
    }
    const getFullSections = async ({ fetch, sectionLinks }): Promise<Array<Section>> => {
        const sections = []
        for (const sectionLink of sectionLinks) {
            const sectionFile = await getSectionFile({ fetch, url: sectionLink.edit })
            const subsections = markdownToSectionStructure(sectionFile)
            const content = marked.parse(sectionFile)
            sections.push({
                ...sectionLink,
                slug: sectionLink.title.toLowerCase().replaceAll(' ', '-'),
                content,
                sections: subsections
            })
        }
        return sections
    }
    export async function load ({ fetch }) {
        const sectionLinks: Array<SectionLink> = await getSectionLinks({fetch})
        const sections: Array<Section> = await getFullSections({ fetch, sectionLinks })
        return {
            stuff: {
                sections
            },
            props: {
                sections
            }
        }
    }
</script>
<script lang="ts">
    import { Main, Contents } from '@sveltejs/site-kit/docs'
    export let sections: Array<Section>
    let path = null
</script>

<Main bind:path>
    <slot/>
</Main>
<Contents contents={sections} {path}/>
