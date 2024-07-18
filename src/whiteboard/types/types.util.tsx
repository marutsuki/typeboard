import { TypeData } from './types.slice';
import BasicTypeBlock from './BasicTypeBlock';
import ComplexTypeBlock from './CompositeTypeBlock';
import { isBasicType } from './types';

export const typeToComponent = ({ id, type }: TypeData) => {
    return isBasicType(type) ? (
        <BasicTypeBlock key={id} value={type} />
    ) : (
        <ComplexTypeBlock key={id} id={id} type={type} />
    );
};
