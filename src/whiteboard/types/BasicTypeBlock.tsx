import { FC } from 'react';
import { BasicType } from './types';
import Block from './Block';

type Props = {
    value: BasicType;
};

const BasicTypeBlock: FC<Props> = ({ value }: Props) => {
    return <Block value={value} />;
};

export default BasicTypeBlock;
