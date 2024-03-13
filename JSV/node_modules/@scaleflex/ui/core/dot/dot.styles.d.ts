import type { DotProps } from './dot.props';
declare const Styled: {
    Dot: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {
        className: string;
    } & DotProps, "className">;
    Icon: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {
        className: string;
    } & {
        visible: boolean;
        on?: boolean | undefined;
    }, "className">;
};
export default Styled;
