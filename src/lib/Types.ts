interface LightboxCustomization {
    closeButtonProps: HTMLButtonElement,
    lightboxFooterProps: HTMLDivElement,
    lightboxHeaderProps: HTMLDivElement,
    lightboxProps: HTMLDivElement,
    thumbnailProps: HTMLDivElement
}
interface GalleryImage {
    id: number,
    title: string,
    description: string
}
interface GalleryState {
    imageCount: number,
    activeImage: number
}

type ImagePreset = '' | 'fullscreen' | 'scroll'
type GalleryArrowCharacter = '' | 'hide' | 'loop'

export type {
    LightboxCustomization,
    GalleryImage,
    GalleryState,
    ImagePreset,
    GalleryArrowCharacter
}
