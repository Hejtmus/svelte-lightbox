import { marked } from 'marked'
import { markdownToSectionStructure } from '$utils/markdown'
import type { SectionLink, Section } from '$utils/types'

const getSectionLinks = async (): Promise<Array<SectionLink>> => {
    const docsRequest = await fetch('https://raw.githubusercontent.com/Hejtmus/svelte-lightbox/master/documentation/docs/index.json')
    return (await docsRequest.json()).sections
}
const getSectionFile = async ({ url }): Promise<string> => {
    const fileRequest = await fetch(url)
    return await fileRequest.text()
}
const getFullSections = async ({ sectionLinks }): Promise<Array<Section>> => {
    const sections = []
    for (const sectionLink of sectionLinks) {
        const slug = sectionLink.title.toLowerCase().replaceAll(' ', '-')
        const sectionFile = await getSectionFile({ url: sectionLink.edit })
        const subsections = markdownToSectionStructure(sectionFile, slug)
        const content = marked.parse(sectionFile)
        sections.push({
            ...sectionLink,
            slug,
            path: slug,
            content,
            sections: subsections
        })
    }
    return sections
}
export async function load () {
    const sectionLinks: Array<SectionLink> = await getSectionLinks()
    const sections: Array<Section> = await getFullSections({ sectionLinks })
    return {
        sections
    }
}
