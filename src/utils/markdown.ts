import { marked } from 'marked'

interface SectionWithContent {
    title: string,
    content: Array<marked.Token>
}
interface Section {
    title: string,
    sections: Array<Section>
}

const getSectionsAndTheirContent = (tokens: marked.TokensList, currentDepth: number) => {
    const sections: Array<SectionWithContent> = []
    for (const token of tokens) {
        if (token.type === 'heading') {
            if (token.depth === currentDepth) {
                sections.push({
                    title: token.text,
                    content: []
                })
            } else {
                sections[sections.length - 1].content.push(token)
            }
        }
    }
    return sections
}
const makeSectionTreeArray = (tokens: marked.TokensList, currentDepth: number) => {
    const sectionsWithContent = getSectionsAndTheirContent(tokens, currentDepth)
    const sections: Array<Section> = []
    for (const sectionWithContent of sectionsWithContent) {
        const section: Section = {
            title: sectionWithContent.title,
            sections: makeSectionTreeArray(<marked.TokensList>sectionWithContent.content, currentDepth + 1)
        }
        sections.push(section)
    }
    return sections
}

export const markdownToSectionStructure = (markdown: string) => {
    const tokens = marked.lexer(markdown)
    return makeSectionTreeArray(tokens, 2)
}
