import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        protect?: boolean | undefined;
        portrait?: boolean | undefined;
        imagePreset?: string | null | undefined;
        fullscreen?: boolean | undefined;
        isGallery?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type LightboxBodyProps = typeof __propDef.props;
export declare type LightboxBodyEvents = typeof __propDef.events;
export declare type LightboxBodySlots = typeof __propDef.slots;
export default class LightboxBody extends SvelteComponentTyped<LightboxBodyProps, LightboxBodyEvents, LightboxBodySlots> {
}
export {};
