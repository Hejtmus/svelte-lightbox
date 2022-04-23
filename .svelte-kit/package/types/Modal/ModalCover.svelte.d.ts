/** @typedef {typeof __propDef.props}  ModalCoverProps */
/** @typedef {typeof __propDef.events}  ModalCoverEvents */
/** @typedef {typeof __propDef.slots}  ModalCoverSlots */
export default class ModalCover extends SvelteComponentTyped<{
    transitionDuration: any;
}, {
    click: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type ModalCoverProps = typeof __propDef.props;
export type ModalCoverEvents = typeof __propDef.events;
export type ModalCoverSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        transitionDuration: any;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
