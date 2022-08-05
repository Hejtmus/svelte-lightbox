interface GalleryImage {
    id: number,
    thumbnailProps: HTMLImageElement,
    title: string,
    description: string
}
interface GalleryState {
    imageCount: number,
    activeImage: number
}

type ImagePreset = 'fit' | 'expand' | 'fullscreen' | 'scroll'
type GalleryArrowCharacter = 'unset' | 'hide' | 'loop'

export type {
    GalleryImage,
    GalleryState,
    ImagePreset,
    GalleryArrowCharacter
}
