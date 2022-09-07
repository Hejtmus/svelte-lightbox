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

export type {
    SectionLink,
    Section
}
