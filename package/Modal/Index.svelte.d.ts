import { SvelteComponentTyped } from "svelte";
import type { GalleryState, ImagePreset } from '../Types';
declare const __propDef: {
    props: {
        modalClasses?: string | undefined;
        modalStyle?: string | undefined;
        transitionDuration?: number | undefined;
        gallery?: GalleryState | undefined;
        protect?: boolean | undefined;
        portrait?: boolean | undefined;
        title?: string | undefined;
        description?: string | undefined;
        imagePreset: ImagePreset;
        escapeToClose: boolean;
        closeButton: boolean;
    };
    events: {
        close: CustomEvent<any>;
        topModalClick: CustomEvent<any>;
        modalClick: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type IndexProps = typeof __propDef.props;
export declare type IndexEvents = typeof __propDef.events;
export declare type IndexSlots = typeof __propDef.slots;
export default class Index extends SvelteComponentTyped<IndexProps, IndexEvents, IndexSlots> {
}
export {};
