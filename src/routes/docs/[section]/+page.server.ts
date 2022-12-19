import { error } from '@sveltejs/kit'

export async function load ({ parent, params }) {
    let section
    const { sections } = await parent()
    for (const stuffSection of sections) {
        if (stuffSection.slug === params.section) {
            section = stuffSection
            break
        }
    }
    if (section) {
        return {
            section,
            title: params.section
        }
    } else {
        throw error(404, 'Non-existing document')
    }
}
