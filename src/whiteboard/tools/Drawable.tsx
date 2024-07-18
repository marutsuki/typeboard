import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { globalConfig } from '../../global.config';
import { Point } from '../../util/types';

type Props = {
    name: string;
    description: string;
    exampleComponent: ReactNode;
    draw: (point: Point) => void;
};

const Drawable: FC<Props> = ({ name, exampleComponent, draw }: Props) => {
    const ref = useRef<HTMLSpanElement | null>(null);
    const [interacting, setInteracting] = useState(false);

    useEffect(() => {
        if (!interacting) return;

        const onMouseUp = (e: MouseEvent) => {
            setInteracting(false);
            const hoveredElements = document
                .querySelectorAll(':hover')
                .values();
            for (
                let elem = hoveredElements.next();
                !elem.done;
                elem = hoveredElements.next()
            ) {
                if (elem.value.id === globalConfig.whiteboardId) {
                    console.info(`Dropped a [${name}] component on whiteboard`);
                    const whiteboard = elem.value.getBoundingClientRect();
                    draw({
                        x: e.clientX - whiteboard.left,
                        y: e.clientY - whiteboard.top,
                    });
                    return;
                }
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            ref.current.style.left = e.clientX - rect.width / 2 + 'px';
            ref.current.style.top = e.clientY - rect.height / 2 + 'px';
        };

        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [draw, interacting, name]);

    return (
        <>
            <div
                className="w-1/2 h-full bg-gray-100 flex flex-col items-center justify-center"
                onMouseDown={() => setInteracting(true)}
            >
                {exampleComponent}
                <h3 className="text-center">{name}</h3>
            </div>
            {interacting ? (
                <span className="absolute" ref={ref}>
                    {exampleComponent}
                </span>
            ) : null}
        </>
    );
};

export default Drawable;
