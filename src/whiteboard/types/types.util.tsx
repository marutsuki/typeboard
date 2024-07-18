import TypeBlock from './TypeBlock';
import { CreatedType } from './types.slice';

export const typeToComponent = (id: string, props: CreatedType) => {
    return <TypeBlock key={id} id={id} {...props} />;
};
