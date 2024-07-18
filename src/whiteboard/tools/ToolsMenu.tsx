import { FC } from 'react';
import Drawable from './Drawable';
import { StaticBlock } from '../types/Block';

type Tool = {
    name: string;
    description: string;
    use: () => void;
};

type Props = {
    tools: Tool[];
};

const ToolsMenu: FC<Props> = ({ tools }: Props) => {
    return (
        <div className="w-1/6 h-full bg-gray-100">
            {tools.map((tool) => (
                <button key={tool.name} className="w-full h-16">
                    {tool.name}
                </button>
            ))}
            <Drawable
                exampleComponent={<StaticBlock value={'string'} />}
                name={'Basic Type'}
                description={'A elementary TypeScript type'}
            />
        </div>
    );
};

export default ToolsMenu;
