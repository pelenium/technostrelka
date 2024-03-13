import { ForwardRefExoticComponent, ForwardRefRenderFunction, MutableRefObject, PropsWithoutRef, ReactElement, RefAttributes } from 'react';
interface RenderFunction<P, E> extends Pick<ForwardRefRenderFunction<E, P>, 'defaultProps' | 'displayName' | 'propTypes'> {
    (props: P, ref: ((instance: E | null) => void) | MutableRefObject<E | null> | null): ReactElement | null;
}
/**
 * Wrapper around React's `forwardRef` function, which adds a `displayName` to each component
 * created using it
 */
export declare function intrinsicComponent<P = Record<string, unknown>, E = HTMLElement>(render: RenderFunction<P, E>, displayName?: string): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<E>>;
export {};
