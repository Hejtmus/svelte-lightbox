import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        class?: string | undefined;
        style?: string | undefined;
        protect?: boolean | undefined;
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
export declare type LightboxThumbnailProps = typeof __propDef.props;
export declare type LightboxThumbnailEvents = typeof __propDef.events;
export declare type LightboxThumbnailSlots = typeof __propDef.slots;
export default class LightboxThumbnail extends SvelteComponentTyped<LightboxThumbnailProps, LightboxThumbnailEvents, LightboxThumbnailSlots> {
}
export {};
