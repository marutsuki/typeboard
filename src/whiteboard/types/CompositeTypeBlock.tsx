import { FC } from 'react';
import Block from './Block';
import { CompositeType } from './types';

type Props = {
    id: string;
    type: CompositeType;
};

const ComplexTypeBlock: FC<Props> = ({ type }: Props) => {
    const { name } = type;
    return <Block value={name} />;
};

export default ComplexTypeBlock;
