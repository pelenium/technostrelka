/**
 * If your prop can be either a function or a plain value, this function handles
 * its usage for you – just provide the reference for a 'maybe function' and the arguments
 * to call it with
 */
export declare function applyPolymorphicFunctionProp<T, F extends (...args: any[]) => T>(prop: F | T | undefined, ...args: Parameters<F>): Exclude<typeof prop, F>;
