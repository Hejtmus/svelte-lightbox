import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        transitionDuration: number;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type ModalCoverProps = typeof __propDef.props;
export declare type ModalCoverEvents = typeof __propDef.events;
export declare type ModalCoverSlots = typeof __propDef.slots;
export default class ModalCover extends SvelteComponentTyped<ModalCoverProps, ModalCoverEvents, ModalCoverSlots> {
}
export {};
