import { SvelteComponentTyped } from "svelte";
import type { Writable } from 'svelte/store';
declare const __propDef: {
    props: {
        imagePreset?: string | undefined;
        imageCountStore: Writable<number>;
        activeImageStore: Writable<number>;
        arrowsColorStore: Writable<string>;
        arrowsCharacterStore: Writable<string>;
        keyboardControlStore: Writable<boolean>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type GalleryControllerProps = typeof __propDef.props;
export declare type GalleryControllerEvents = typeof __propDef.events;
export declare type GalleryControllerSlots = typeof __propDef.slots;
export default class GalleryController extends SvelteComponentTyped<GalleryControllerProps, GalleryControllerEvents, GalleryControllerSlots> {
}
export {};
