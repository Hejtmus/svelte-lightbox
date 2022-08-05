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

export type {
    GalleryImage,
    GalleryState
}
