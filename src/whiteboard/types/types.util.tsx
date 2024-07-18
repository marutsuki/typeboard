import BasicTypeBlock from './BasicTypeBlock';
import ComplexTypeBlock from './CompositeTypeBlock';
import { isBasicType } from './types';
import { CreatedType } from './types.slice';

export const typeToComponent = (
    id: string,
    { value, ...props }: CreatedType
) => {
    return isBasicType(value) ? (
        <BasicTypeBlock
            key={id}
            id={id}
            value={value}
            type="basic"
            {...props}
        />
    ) : (
        <ComplexTypeBlock
            key={id}
            id={id}
            value={value}
            type="composite"
            {...props}
        />
    );
};
