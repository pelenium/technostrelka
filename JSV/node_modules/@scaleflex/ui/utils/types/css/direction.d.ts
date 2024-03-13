import { Values, With } from '..';
export declare const Direction: {
    readonly Row: "row";
    readonly Column: "column";
};
export declare type WithDirection<T = undefined> = With<T, {
    direction?: Values<typeof Direction>;
}>;
