import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        imagePreset?: string | undefined;
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
