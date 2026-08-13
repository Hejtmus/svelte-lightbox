import { get } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { GalleryArrowCharacter } from '$lib/Types'

interface GalleryNavigation {
    activeImageStore: Writable<number>,
    imageCountStore: Writable<number>,
    character: GalleryArrowCharacter
}

// Moving past either end of the gallery wraps around only when arrows loop
const wrapsAround = (character: GalleryArrowCharacter) => character === 'loop'

const toPreviousImage = ({ activeImageStore, imageCountStore, character }: GalleryNavigation) => {
    const activeImage = get(activeImageStore)

    if (activeImage > 0) {
        activeImageStore.set(activeImage - 1)
    } else if (wrapsAround(character)) {
        activeImageStore.set(get(imageCountStore) - 1)
    }
}

const toNextImage = ({ activeImageStore, imageCountStore, character }: GalleryNavigation) => {
    const activeImage = get(activeImageStore)

    if (activeImage < get(imageCountStore) - 1) {
        activeImageStore.set(activeImage + 1)
    } else if (wrapsAround(character)) {
        activeImageStore.set(0)
    }
}

// Dragging leftwards pulls the next image in, dragging rightwards the previous one
const toSwipedImage = (navigation: GalleryNavigation, offset: number, threshold: number) => {
    if (Math.abs(offset) < threshold) {
        return
    }

    if (offset < 0) {
        toNextImage(navigation)
    } else {
        toPreviousImage(navigation)
    }
}

export {
    toPreviousImage,
    toNextImage,
    toSwipedImage
}
export type { GalleryNavigation }
