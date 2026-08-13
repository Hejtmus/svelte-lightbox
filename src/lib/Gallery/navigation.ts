import type { GalleryArrowCharacter } from '$lib/Types'

// The part of a gallery moving through it needs, so the moves stay testable on their own
interface GalleryNavigation {
    activeImage: number,
    readonly imageCount: number,
    readonly character: GalleryArrowCharacter
}

// Moving past either end of the gallery wraps around only when arrows loop
const wrapsAround = (character: GalleryArrowCharacter) => character === 'loop'

const toPreviousImage = (gallery: GalleryNavigation) => {
    if (gallery.activeImage > 0) {
        gallery.activeImage -= 1
    } else if (wrapsAround(gallery.character)) {
        gallery.activeImage = gallery.imageCount - 1
    }
}

const toNextImage = (gallery: GalleryNavigation) => {
    if (gallery.activeImage < gallery.imageCount - 1) {
        gallery.activeImage += 1
    } else if (wrapsAround(gallery.character)) {
        gallery.activeImage = 0
    }
}

// Dragging leftwards pulls the next image in, dragging rightwards the previous one
const toSwipedImage = (gallery: GalleryNavigation, offset: number, threshold: number) => {
    if (Math.abs(offset) < threshold) {
        return
    }

    if (offset < 0) {
        toNextImage(gallery)
    } else {
        toPreviousImage(gallery)
    }
}

export {
    toPreviousImage,
    toNextImage,
    toSwipedImage
}
export type { GalleryNavigation }
