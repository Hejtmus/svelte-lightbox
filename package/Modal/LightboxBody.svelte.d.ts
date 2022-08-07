import { SvelteComponentTyped } from "svelte";
import type { ImagePreset } from '../Types';
declare const __propDef: {
    props: {
        imagePreset: ImagePreset;
        enableImageExpand: boolean;
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
