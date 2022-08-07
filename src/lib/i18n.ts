import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { I18n } from '$lib/Types'

const i18n: Writable<I18n> = writable({
    generateLocalizedGalleryCounter: (activeImage: number, imageCount: number): string => {
        return `Image ${activeImage + 1} of ${imageCount}`
    }
})

export default i18n
