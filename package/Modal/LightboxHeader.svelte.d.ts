import { SvelteComponentTyped } from "svelte";
import type { ImagePreset } from '../Types';
declare const __propDef: {
    props: {
        [x: string]: any;
        closeButtonProps?: {} | HTMLButtonElement | undefined;
        showCloseButton: boolean;
        enableEscapeToClose: boolean;
        imagePreset: ImagePreset;
    };
    events: {
        close: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type LightboxHeaderProps = typeof __propDef.props;
export declare type LightboxHeaderEvents = typeof __propDef.events;
export declare type LightboxHeaderSlots = typeof __propDef.slots;
export default class LightboxHeader extends SvelteComponentTyped<LightboxHeaderProps, LightboxHeaderEvents, LightboxHeaderSlots> {
}
export {};
