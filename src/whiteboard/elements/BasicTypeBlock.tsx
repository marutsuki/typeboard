import { FC } from 'react';
import { BasicType } from './types';

type Props = {
    value: BasicType;
};

const BasicTypeBlock: FC<Props> = ({ value }: { value: BasicType }) => {
    return (
        <span className="cursor-pointer absolute rounded-lg bg-violet-300 h-12 w-24 flex items-center justify-center">
            <p className="font-bold">{value}</p>
        </span>
    );
};

export default BasicTypeBlock;
