/** @typedef {typeof __propDef.props}  LightboxImageProps */
/** @typedef {typeof __propDef.events}  LightboxImageEvents */
/** @typedef {typeof __propDef.slots}  LightboxImageSlots */
export default class LightboxImage extends SvelteComponentTyped<{
    [x: string]: any;
    thumbnailProps: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type LightboxImageProps = typeof __propDef.props;
export type LightboxImageEvents = typeof __propDef.events;
export type LightboxImageSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        thumbnailProps: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
