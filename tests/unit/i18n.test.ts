import { describe, it, expect, afterEach } from 'vitest'
import { get } from 'svelte/store'
import i18n from '../../src/lib/i18n'

const original = get(i18n)

afterEach(() => i18n.set(original))

describe('i18n', () => {
    it('counts images from one for the reader', () => {
        expect(get(i18n).generateLocalizedGalleryCounter(0, 4)).toBe('Image 1 of 4')
        expect(get(i18n).generateLocalizedGalleryCounter(3, 4)).toBe('Image 4 of 4')
    })

    // Documented as: a store, so the counter wording can be replaced
    it('takes a replacement counter', () => {
        i18n.set({
            ...original,
            generateLocalizedGalleryCounter: (activeImage, imageCount) => `Obrázok ${activeImage + 1} z ${imageCount}`
        })

        expect(get(i18n).generateLocalizedGalleryCounter(1, 4)).toBe('Obrázok 2 z 4')
    })
})
