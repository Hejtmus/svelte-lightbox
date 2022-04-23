export default presets;
declare namespace presets {
    namespace expand {
        const width: string;
        const maxWidth: string;
        const height: string;
        const maxHeight: string;
    }
    namespace fit {
        const width_1: string;
        export { width_1 as width };
        const maxWidth_1: string;
        export { maxWidth_1 as maxWidth };
        const height_1: string;
        export { height_1 as height };
        const maxHeight_1: string;
        export { maxHeight_1 as maxHeight };
    }
    namespace fullscreen {
        const width_2: string;
        export { width_2 as width };
        const maxWidth_2: string;
        export { maxWidth_2 as maxWidth };
        const height_2: string;
        export { height_2 as height };
        const maxHeight_2: string;
        export { maxHeight_2 as maxHeight };
    }
    namespace scroll {
        const width_3: string;
        export { width_3 as width };
        const height_3: string;
        export { height_3 as height };
        export const overflow: string;
    }
}
