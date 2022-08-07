type ImagePreset = '' | 'fullscreen' | 'scroll'
type GalleryArrowCharacter = '' | 'hide' | 'loop'

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

interface GalleryArrowsConfig {
    color: string,
    character: GalleryArrowCharacter,
    enableKeyboardControl: boolean
}


export type {
    ImagePreset,
    GalleryArrowCharacter,
    LightboxCustomization,
    GalleryImage,
    GalleryState,
    GalleryArrowsConfig
}
