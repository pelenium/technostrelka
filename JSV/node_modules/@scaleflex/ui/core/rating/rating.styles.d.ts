import type { RatingProps } from './rating.props';
declare const Styled: {
    Rating: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {
        className: string;
    } & RatingProps, "className">;
    Item: import("styled-components").StyledComponent<"label", import("styled-components").DefaultTheme, {
        className: string;
    } & {
        readOnly?: boolean | undefined;
    }, "className">;
    Icon: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {
        className: string;
    } & {
        active: boolean;
    }, "className">;
};
export default Styled;
