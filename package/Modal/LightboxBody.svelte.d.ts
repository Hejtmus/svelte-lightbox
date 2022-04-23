/** @typedef {typeof __propDef.props}  LightboxBodyProps */
/** @typedef {typeof __propDef.events}  LightboxBodyEvents */
/** @typedef {typeof __propDef.slots}  LightboxBodySlots */
export default class LightboxBody extends SvelteComponentTyped<{
    protect?: boolean | undefined;
    fullscreen?: boolean | undefined;
    image?: {} | undefined;
    portrait?: boolean | undefined;
    imagePreset?: boolean | undefined;
    gallery?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type LightboxBodyProps = typeof __propDef.props;
export type LightboxBodyEvents = typeof __propDef.events;
export type LightboxBodySlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        protect?: boolean | undefined;
        fullscreen?: boolean | undefined;
        image?: {} | undefined;
        portrait?: boolean | undefined;
        imagePreset?: boolean | undefined;
        gallery?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
