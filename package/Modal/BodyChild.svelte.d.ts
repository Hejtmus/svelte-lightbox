/** @typedef {typeof __propDef.props}  BodyChildProps */
/** @typedef {typeof __propDef.events}  BodyChildEvents */
/** @typedef {typeof __propDef.slots}  BodyChildSlots */
export default class BodyChild extends SvelteComponentTyped<{
    [x: string]: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type BodyChildProps = typeof __propDef.props;
export type BodyChildEvents = typeof __propDef.events;
export type BodyChildSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
