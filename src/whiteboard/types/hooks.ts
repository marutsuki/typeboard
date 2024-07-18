import { RefObject, useCallback, useEffect } from 'react';

export const useDragging = (ref: RefObject<HTMLElement>) => {
    const startDragging = useCallback(
        (oe: MouseEvent) => {
            let prevX = oe.clientX;
            let prevY = oe.clientY;

            const drag = (e: MouseEvent) => {
                e.preventDefault();
                if (ref.current !== null) {
                    const deltaX = e.clientX - prevX;
                    const deltaY = e.clientY - prevY;
                    ref.current.style.left =
                        clamp(
                            parseInt(ref.current.style.left.split('px')[0]) +
                                deltaX,
                            0,
                            window.innerWidth - ref.current.clientWidth
                        ) + 'px';
                    ref.current.style.top =
                        clamp(
                            parseInt(ref.current.style.top.split('px')[0]) +
                                deltaY,
                            0,
                            window.innerHeight - ref.current.clientHeight
                        ) + 'px';
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
        [ref]
    );

    useEffect(() => {
        const elem = ref.current;
        if (elem) {
            if (elem.style.top === '') {
                elem.style.top = elem.getBoundingClientRect().top + 'px';
            }
            if (elem.style.left === '') {
                elem.style.left = elem.getBoundingClientRect().left + 'px';
            }
            elem.addEventListener('mousedown', startDragging);
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
