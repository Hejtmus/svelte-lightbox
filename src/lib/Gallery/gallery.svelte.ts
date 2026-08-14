import { createContext } from 'svelte'
import { SvelteMap } from 'svelte/reactivity'
import type { GalleryArrowsConfig, GalleryImage, GallerySwipeConfig } from '$lib/Types'

const DEFAULT_ARROWS_CONFIG: GalleryArrowsConfig = {
    color: 'black',
    character: '',
    enableKeyboardControl: true
}

const DEFAULT_SWIPE_CONFIG: GallerySwipeConfig = {
    enabled: false,
    threshold: 50,
    enableMouseDrag: true
}

// What a gallery owns rather than derives, handed in so it can stay the caller's own state
interface GallerySettings {
    activeImage: number,
    readonly arrowsConfig: GalleryArrowsConfig,
    readonly swipeConfig: GallerySwipeConfig,
    readonly openImage: (imageId: number) => void
}

/**
 * The state a gallery shares with the parts inside it: which image is displayed,
 * which images there are at all, and how navigation is supposed to behave.
 */
class Gallery {
    #settings: GallerySettings
    #images: Array<GalleryImage> = $state([])
    #thumbnails = new SvelteMap<number, Element>()
    #thumbnailCount = 0

    constructor (settings: GallerySettings) {
        this.#settings = settings
    }

    get activeImage () {
        return this.#settings.activeImage
    }

    set activeImage (imageId: number) {
        this.#settings.activeImage = imageId
    }

    get images () {
        return this.#images
    }

    get imageCount () {
        return this.#images.length
    }

    get arrowsConfig () {
        return this.#settings.arrowsConfig
    }

    get character () {
        return this.#settings.arrowsConfig.character
    }

    get swipeConfig () {
        return this.#settings.swipeConfig
    }

    // Images announce themselves as they mount, which is what pairs them with their thumbnail
    registerImage (image: Omit<GalleryImage, 'id'>) {
        const id = this.#images.length

        this.#images = [
            ...this.#images,
            { ...image, id }
        ]
        return id
    }

    // A closed gallery unmounts its images, so the next opening has to start counting over
    forgetImages () {
        this.#images = []
    }

    nextThumbnailId () {
        return this.#thumbnailCount++
    }

    // The place on the page an image grows out of, and shrinks back into on closing
    thumbnailOf (imageId: number) {
        return this.#thumbnails.get(imageId) ?? null
    }

    rememberThumbnail (imageId: number, thumbnail: Element) {
        this.#thumbnails.set(imageId, thumbnail)

        return () => this.#thumbnails.delete(imageId)
    }

    openImage (imageId: number) {
        this.#settings.openImage(imageId)
    }
}

const [getGallery, setGallery] = createContext<Gallery>()

// Puts a gallery within reach of every thumbnail and image below it
const createGallery = (settings: GallerySettings) => setGallery(new Gallery(settings))

export {
    Gallery,
    createGallery,
    getGallery,
    DEFAULT_ARROWS_CONFIG,
    DEFAULT_SWIPE_CONFIG
}
export type { GallerySettings }
