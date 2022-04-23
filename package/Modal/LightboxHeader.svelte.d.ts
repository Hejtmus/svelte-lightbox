/** @typedef {typeof __propDef.props}  LightboxHeaderProps */
/** @typedef {typeof __propDef.events}  LightboxHeaderEvents */
/** @typedef {typeof __propDef.slots}  LightboxHeaderSlots */
export default class LightboxHeader extends SvelteComponentTyped<{
    style?: string | undefined;
    size?: string | undefined;
    headerClasses?: string | undefined;
    buttonClasses?: string | undefined;
    closeButton?: boolean | undefined;
    fullscreen?: boolean | undefined;
}, {
    close: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type LightboxHeaderProps = typeof __propDef.props;
export type LightboxHeaderEvents = typeof __propDef.events;
export type LightboxHeaderSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        style?: string | undefined;
        size?: string | undefined;
        headerClasses?: string | undefined;
        buttonClasses?: string | undefined;
        closeButton?: boolean | undefined;
        fullscreen?: boolean | undefined;
    };
    events: {
        close: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
