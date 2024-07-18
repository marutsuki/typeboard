import { RefObject, useCallback, useEffect } from 'react';
import { Point } from '../../util/types';

export const useDragging = (
    initialLocation: Point,
    ref: RefObject<HTMLElement>,
    onDrag: (point: Point) => void
) => {
    const startDragging = useCallback(
        (oe: MouseEvent) => {
            let prevX = oe.clientX;
            let prevY = oe.clientY;

            const drag = (e: MouseEvent) => {
                e.preventDefault();
                if (ref.current !== null) {
                    const rect = ref.current.getBoundingClientRect();
                    const deltaX = e.clientX - prevX;
                    const deltaY = e.clientY - prevY;
                    const left = clamp(
                        parseInt(ref.current.style.left.split('px')[0]) +
                            deltaX,
                        0,
                        window.innerWidth - ref.current.clientWidth
                    );
                    const top = clamp(
                        parseInt(ref.current.style.top.split('px')[0]) + deltaY,
                        0,
                        window.innerHeight - ref.current.clientHeight
                    );
                    ref.current.style.left = left + 'px';
                    ref.current.style.top = top + 'px';
                    onDrag({
                        x: left + rect.width / 2,
                        y: top + rect.height / 2,
                    });
                }
                prevX = e.clientX;
                prevY = e.clientY;
            };

            const dragFinish = () => {
                window.removeEventListener('mousemove', drag);
                window.removeEventListener('mouseup', dragFinish);
            };

            window.addEventListener('mousemove', drag);
            window.addEventListener('mouseup', dragFinish);
        },
        [onDrag, ref]
    );

    useEffect(() => {
        const elem = ref.current;
        if (elem) {
            const rect = elem.getBoundingClientRect();
            elem.style.left = initialLocation.x - rect.width / 2 + 'px';
            elem.style.top = initialLocation.y - rect.height / 2 + 'px';
            elem.addEventListener('mousedown', startDragging);
        }
    }, [initialLocation.x, initialLocation.y, ref, startDragging]);

    useEffect(() => {
        const elem = ref.current;
        if (elem) {
            const observer = new ResizeObserver(() => {
                if (
                    parseInt(elem.style.left) + elem.clientWidth >
                    window.innerWidth
                ) {
                    elem.style.left =
                        window.innerWidth - elem.clientWidth + 'px';
                }
                if (
                    parseInt(elem.style.top) + elem.clientHeight >
                    window.innerHeight
                ) {
                    elem.style.top =
                        window.innerHeight - elem.clientHeight + 'px';
                }
            });
            observer.observe(document.body);
            return () => {
                elem.removeEventListener('mousedown', startDragging);
                observer.disconnect();
            };
        }
    }, [ref, startDragging]);
};

export const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(value, max));
};
