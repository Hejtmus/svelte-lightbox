/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    closeButton: any;
    imagePreset: any;
    protect?: boolean | undefined;
    image?: {} | undefined;
    portrait?: boolean | undefined;
    gallery?: any[] | undefined;
    title?: string | undefined;
    description?: string | undefined;
    transitionDuration?: number | undefined;
    modalStyle?: string | undefined;
    modalClasses?: string | undefined;
}, {
    topModalClick: CustomEvent<any>;
    modalClick: CustomEvent<any>;
    close: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        closeButton: any;
        imagePreset: any;
        protect?: boolean | undefined;
        image?: {} | undefined;
        portrait?: boolean | undefined;
        gallery?: any[] | undefined;
        title?: string | undefined;
        description?: string | undefined;
        transitionDuration?: number | undefined;
        modalStyle?: string | undefined;
        modalClasses?: string | undefined;
    };
    events: {
        topModalClick: CustomEvent<any>;
        modalClick: CustomEvent<any>;
        close: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
