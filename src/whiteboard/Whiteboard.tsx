import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectTypes } from './types/types.slice';
import { typeToComponent } from './types/types.util';
import Lines from './graph/Lines';
import { globalConfig } from '../global.config';
import EditWindowProvider from './edit/EditWindowProvider';

const Whiteboard: FC<object> = () => {
    const types = useSelector(selectTypes);

    return (
        <EditWindowProvider>
            <div
                id={globalConfig.whiteboardId}
                className="w-full h-full relative"
            >
                <Lines />
                {Object.entries(types).map(([id, type]) =>
                    typeToComponent(id, type)
                )}
            </div>
        </EditWindowProvider>
    );
};

export default Whiteboard;
