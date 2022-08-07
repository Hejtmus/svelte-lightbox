import { SvelteComponentTyped } from "svelte";
import type { GalleryArrowCharacter } from '../Types';
declare const __propDef: {
    props: {
        activeImage: number;
        character: GalleryArrowCharacter;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type PreviousImageButtonProps = typeof __propDef.props;
export declare type PreviousImageButtonEvents = typeof __propDef.events;
export declare type PreviousImageButtonSlots = typeof __propDef.slots;
export default class PreviousImageButton extends SvelteComponentTyped<PreviousImageButtonProps, PreviousImageButtonEvents, PreviousImageButtonSlots> {
}
export {};
