import * as React from 'react';
export declare function useForkRef<T>(refA: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined, refB: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined): any;
