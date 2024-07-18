import { FC, useRef } from 'react';
import { useDragging } from './hooks';

type Props = {
    value: string;
};

const Block: FC<Props> = ({ value }: { value: string }) => {
    const blockRef = useRef<HTMLSpanElement>(null);

    useDragging(blockRef);

    return (
        <span
            ref={blockRef}
            className="cursor-pointer absolute rounded-lg bg-violet-300 h-12 w-24 flex items-center justify-center"
        >
            <p className="font-bold select-none">{value}</p>
        </span>
    );
};

export default Block;
