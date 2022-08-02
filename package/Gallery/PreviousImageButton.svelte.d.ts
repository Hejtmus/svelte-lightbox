/** @typedef {typeof __propDef.props}  PreviousImageButtonProps */
/** @typedef {typeof __propDef.events}  PreviousImageButtonEvents */
/** @typedef {typeof __propDef.slots}  PreviousImageButtonSlots */
export default class PreviousImageButton extends SvelteComponentTyped<{
    activeImage: any;
    character: any;
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PreviousImageButtonProps = typeof __propDef.props;
export type PreviousImageButtonEvents = typeof __propDef.events;
export type PreviousImageButtonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        activeImage: any;
        character: any;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
