import { FC } from 'react';
import { useAppDispatch } from '../../store';
import { drawables } from './drawables';
import { tools } from './tools';

const ToolsMenu: FC = () => {
    const dispatch = useAppDispatch();
    return (
        <div className="w-96 h-full bg-gray-100">
            <section>{tools(dispatch)}</section>
            <section className="p-4 grid grid-cols-2 place-items-center">
                {drawables(dispatch)}
            </section>
        </div>
    );
};

export default ToolsMenu;
