declare const Styled: {
    Pagination: import("styled-components").StyledComponent<"nav", import("styled-components").DefaultTheme, {
        className: string;
    }, "className">;
    PaginationList: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {
        className: string;
    }, "className">;
    PaginationItemList: import("styled-components").StyledComponent<"li", import("styled-components").DefaultTheme, {
        className: string;
    }, "className">;
    PaginationItem: import("styled-components").StyledComponent<"button", import("styled-components").DefaultTheme, {
        className: string;
    } & {
        selected: boolean;
    }, "className">;
};
export default Styled;
