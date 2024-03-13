import type { ModalProps } from './modal.props';
declare const Styled: {
    Modal: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {
        className: string;
    }, "className">;
    Wrapper: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {
        className: string;
    } & {
        open: boolean;
    }, "className">;
    Overlay: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {
        className: string;
    } & {
        open: boolean;
    }, "className">;
    Container: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {
        className: string;
    } & ModalProps, "className">;
};
export default Styled;
