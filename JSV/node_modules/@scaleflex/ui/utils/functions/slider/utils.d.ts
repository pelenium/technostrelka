export declare function asc(a: number, b: number): number;
export declare function valueToPercent(value: number, min: number, max: number): number;
export declare function percentToValue(percent: number, min: number, max: number): number;
export declare function roundValueToStep(value: number, step: number, min: number): number;
export declare function setValueIndex({ values, newValue, index, }: {
    values: number[];
    newValue: number;
    index: number;
}): number | number[];
export declare function findClosest(values: number[], currentValue: number): number;
export declare function ownerDocument(node: Node | null | undefined): Document;
export declare function clamp(value: number | null, min: number, max: number): number;
export declare function trackFinger(event: any, touchId: any): {
    x: number | null;
    y: number | null;
} | boolean;
export declare const axisProps: {
    horizontal: {
        offset: (percent: number) => {
            left: string;
        };
        leap: (percent: number) => {
            width: string;
        };
    };
    'horizontal-reverse': {
        offset: (percent: number) => {
            right: string;
        };
        leap: (percent: number) => {
            width: string;
        };
    };
    vertical: {
        offset: (percent: number) => {
            bottom: string;
        };
        leap: (percent: number) => {
            height: string;
        };
    };
};
export declare function focusThumb({ sliderRef, activeIndex, setActive, }: {
    sliderRef: any;
    activeIndex: number;
    setActive?: any;
}): void;
