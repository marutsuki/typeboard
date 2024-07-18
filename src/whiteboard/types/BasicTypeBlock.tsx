import { FC } from 'react';
import { BasicType } from './types';
import Block, { BlockProps } from './Block';

type Props = {
    value: BasicType;
} & Omit<BlockProps, 'value'>;

const BasicTypeBlock: FC<Props> = (props: Props) => {
    return <Block {...props} />;
};

export default BasicTypeBlock;
