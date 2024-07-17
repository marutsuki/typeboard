import { FC, useRef } from 'react';
import { BasicType } from './types';
import { useDragging } from './hooks';

type Props = {
    value: BasicType;
};

const BasicTypeBlock: FC<Props> = ({ value }: { value: BasicType }) => {
    const blockRef = useRef<HTMLSpanElement>(null);

    useDragging(blockRef);

    return (
        <span
            ref={blockRef}
            className="cursor-pointer absolute rounded-lg bg-violet-300 h-12 w-24 flex items-center justify-center"
        >
            <p className="font-bold">{value}</p>
        </span>
    );
};

export default BasicTypeBlock;
