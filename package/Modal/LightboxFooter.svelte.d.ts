import { SvelteComponentTyped } from "svelte";
import type { GalleryState } from '../Types';
declare const __propDef: {
    props: {
        title?: string | undefined;
        description?: string | undefined;
        gallery?: GalleryState | undefined;
        classes?: string | undefined;
        style?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type LightboxFooterProps = typeof __propDef.props;
export declare type LightboxFooterEvents = typeof __propDef.events;
export declare type LightboxFooterSlots = typeof __propDef.slots;
export default class LightboxFooter extends SvelteComponentTyped<LightboxFooterProps, LightboxFooterEvents, LightboxFooterSlots> {
}
export {};
