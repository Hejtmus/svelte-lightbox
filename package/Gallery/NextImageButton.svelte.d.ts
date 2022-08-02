/** @typedef {typeof __propDef.props}  NextImageButtonProps */
/** @typedef {typeof __propDef.events}  NextImageButtonEvents */
/** @typedef {typeof __propDef.slots}  NextImageButtonSlots */
export default class NextImageButton extends SvelteComponentTyped<{
    activeImage: any;
    character: any;
    imageCount: any;
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type NextImageButtonProps = typeof __propDef.props;
export type NextImageButtonEvents = typeof __propDef.events;
export type NextImageButtonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        activeImage: any;
        character: any;
        imageCount: any;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
