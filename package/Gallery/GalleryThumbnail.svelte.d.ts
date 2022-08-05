import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        id: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type GalleryThumbnailProps = typeof __propDef.props;
export declare type GalleryThumbnailEvents = typeof __propDef.events;
export declare type GalleryThumbnailSlots = typeof __propDef.slots;
export default class GalleryThumbnail extends SvelteComponentTyped<GalleryThumbnailProps, GalleryThumbnailEvents, GalleryThumbnailSlots> {
}
export {};
