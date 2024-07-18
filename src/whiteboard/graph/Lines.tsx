import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectTypes } from '../types/types.slice';
import { isCompositeType } from '../types/types';

const Lines: FC<object> = () => {
    const types = useSelector(selectTypes);

    return (
        <>
            {Object.entries(types).map(
                ([id, type]) =>
                    isCompositeType(type.value) &&
                    type.value.children.map((child, index) => (
                        <svg
                            className="absolute w-full h-full"
                            key={`${id}-${index}`}
                        >
                            <line
                                x1={type.location.x}
                                y1={type.location.y}
                                x2={types[child].location.x}
                                y2={types[child].location.y}
                                stroke="black"
                            />
                        </svg>
                    ))
            )}
        </>
    );
};

export default Lines;
