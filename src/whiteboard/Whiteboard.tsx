import { FC } from 'react';
import BasicTypeBlock from './elements/BasicTypeBlock';

const Whiteboard: FC<object> = () => {
    return (
        <div className="w-full h-full">
            <BasicTypeBlock value={'string'} />
        </div>
    );
};

export default Whiteboard;
