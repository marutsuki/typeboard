import { FC } from 'react';
import Block, { BlockProps } from './Block';
import { CompositeType } from './types';

type Props = {
    id: string;
    value: CompositeType;
} & Omit<BlockProps, 'value'>;

const ComplexTypeBlock: FC<Props> = ({ value, ...props }: Props) => {
    const { name } = value;
    return <Block value={name} {...props} />;
};

export default ComplexTypeBlock;
