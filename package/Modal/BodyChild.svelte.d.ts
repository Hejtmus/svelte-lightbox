import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type BodyChildProps = typeof __propDef.props;
export declare type BodyChildEvents = typeof __propDef.events;
export declare type BodyChildSlots = typeof __propDef.slots;
export default class BodyChild extends SvelteComponentTyped<BodyChildProps, BodyChildEvents, BodyChildSlots> {
}
export {};
