declare function useDrag(onMove: any, onStart: any, onEnd: any): {
    onMouseDown: (e: any) => void;
    onTouchStart: (e: any) => void;
};
export default useDrag;
