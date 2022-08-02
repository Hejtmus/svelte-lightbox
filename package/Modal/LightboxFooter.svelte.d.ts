/** @typedef {typeof __propDef.props}  LightboxFooterProps */
/** @typedef {typeof __propDef.events}  LightboxFooterEvents */
/** @typedef {typeof __propDef.slots}  LightboxFooterSlots */
export default class LightboxFooter extends SvelteComponentTyped<{
    style?: string | undefined;
    gallery?: null | undefined;
    title?: string | undefined;
    description?: string | undefined;
    classes?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type LightboxFooterProps = typeof __propDef.props;
export type LightboxFooterEvents = typeof __propDef.events;
export type LightboxFooterSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        style?: string | undefined;
        gallery?: null | undefined;
        title?: string | undefined;
        description?: string | undefined;
        classes?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
