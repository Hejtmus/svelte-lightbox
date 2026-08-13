import { describe, it, expect } from 'vitest'
import { toNextImage, toPreviousImage, toSwipedImage } from '../../src/lib/Gallery/navigation'
import type { GalleryArrowCharacter } from '../../src/lib/Types'

const gallery = (activeImage: number, imageCount = 3, character: GalleryArrowCharacter = '') => ({
    activeImage,
    imageCount,
    character
})

describe('gallery navigation', () => {
    it('moves to the next image', () => {
        const navigation = gallery(0)

        toNextImage(navigation)

        expect(navigation.activeImage).toBe(1)
    })

    it('moves to the previous image', () => {
        const navigation = gallery(2)

        toPreviousImage(navigation)

        expect(navigation.activeImage).toBe(1)
    })

    // Documented as: '' leaves the arrow inactive in edge cases
    describe.each([
        ['', 'default'],
        ['hide', 'hidden']
    ] as const)('with %s arrows', (character) => {
        it('stays on the last image', () => {
            const navigation = gallery(2, 3, character)

            toNextImage(navigation)

            expect(navigation.activeImage).toBe(2)
        })

        it('stays on the first image', () => {
            const navigation = gallery(0, 3, character)

            toPreviousImage(navigation)

            expect(navigation.activeImage).toBe(0)
        })
    })

    // Documented as: 'loop' keeps arrows always active and wraps around
    describe('with looping arrows', () => {
        it('wraps from the last image to the first', () => {
            const navigation = gallery(2, 3, 'loop')

            toNextImage(navigation)

            expect(navigation.activeImage).toBe(0)
        })

        it('wraps from the first image to the last', () => {
            const navigation = gallery(0, 3, 'loop')

            toPreviousImage(navigation)

            expect(navigation.activeImage).toBe(2)
        })
    })

    it('reads the image count at the time of the move', () => {
        const navigation = gallery(0, 1, 'loop')
        navigation.imageCount = 4

        toPreviousImage(navigation)

        expect(navigation.activeImage).toBe(3)
    })
})

describe('swiped navigation', () => {
    it('moves to the next image when dragged left past the threshold', () => {
        const navigation = gallery(0)

        toSwipedImage(navigation, -60, 50)

        expect(navigation.activeImage).toBe(1)
    })

    it('moves to the previous image when dragged right past the threshold', () => {
        const navigation = gallery(1)

        toSwipedImage(navigation, 60, 50)

        expect(navigation.activeImage).toBe(0)
    })

    // Documented as: shorter drags return the image back to its place
    it.each([-49, -1, 0, 1, 49])('stays put for a drag of %ipx', (offset) => {
        const navigation = gallery(1)

        toSwipedImage(navigation, offset, 50)

        expect(navigation.activeImage).toBe(1)
    })

    it('moves on a drag of exactly the threshold', () => {
        const navigation = gallery(1)

        toSwipedImage(navigation, -50, 50)

        expect(navigation.activeImage).toBe(2)
    })

    it('respects the edge rules of the arrows', () => {
        const navigation = gallery(2, 3, '')

        toSwipedImage(navigation, -200, 50)

        expect(navigation.activeImage).toBe(2)
    })
})
