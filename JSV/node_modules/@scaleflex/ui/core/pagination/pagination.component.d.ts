import React from 'react';
import PT from 'prop-types';
import type { PaginationProps } from './pagination.props';
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLDivElement>>;
export declare const propTypes: {
    boundaryCount: PT.Requireable<number>;
    count: PT.Requireable<number>;
    defaultPage: PT.Requireable<number>;
    disabled: PT.Requireable<boolean>;
    onChange: PT.Requireable<(...args: any[]) => any>;
    getItemAriaLabel: PT.Requireable<(...args: any[]) => any>;
    page: PT.Requireable<number>;
    siblingCount: PT.Requireable<number>;
};
export default Pagination;
