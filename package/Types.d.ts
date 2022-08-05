interface GalleryImage {
    id: number;
    thumbnailProps: HTMLImageElement;
    title: string;
    description: string;
}
interface GalleryState {
    imageCount: number;
    activeImage: number;
}
declare type ImagePreset = 'fit' | 'expand' | 'fullscreen' | 'scroll';
declare type GalleryArrowCharacter = 'unset' | 'hide' | 'loop';
export type { GalleryImage, GalleryState, ImagePreset, GalleryArrowCharacter };
