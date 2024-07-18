import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTypes } from './types/types.slice';
import { typeToComponent } from './types/types.util';

const Whiteboard: FC<object> = () => {
    const types = useSelector(selectAllTypes);

    return (
        <div className="w-full h-full relative">
            {types.map(typeToComponent)}
        </div>
    );
};

export default Whiteboard;
