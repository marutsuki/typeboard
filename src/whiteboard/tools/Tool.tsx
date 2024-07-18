import { FC, MouseEvent } from 'react';

export type ToolProps = {
    name: string;
    description: string;
    use: () => void;
};

const Tool: FC<ToolProps> = ({ name, description, use }: ToolProps) => {
    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        use();
    };
    return <button onClick={onClick}>{name}</button>;
};

export default Tool;
