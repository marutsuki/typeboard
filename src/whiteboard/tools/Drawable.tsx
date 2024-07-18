import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { globalConfig } from '../../global.config';

type Props = {
    name: string;
    description: string;
    exampleComponent: ReactNode;
};

const Drawable: FC<Props> = ({
    name,
    description,
    exampleComponent,
}: Props) => {
    const ref = useRef<HTMLSpanElement | null>(null);
    const [interacting, setInteracting] = useState(false);

    useEffect(() => {
        if (!interacting) return;

        const onMouseUp = () => {
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
    }, [interacting]);

    return (
        <>
            <div
                className="w-1/6 h-full bg-gray-100"
                onMouseDown={() => setInteracting(true)}
            >
                {exampleComponent}
            </div>
            {interacting ? (
                <span className="absolute" ref={ref}>
                    {exampleComponent}{' '}
                </span>
            ) : null}
        </>
    );
};

export default Drawable;
