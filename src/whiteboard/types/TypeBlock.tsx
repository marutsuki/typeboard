import { FC, MouseEvent, useCallback, useRef } from 'react';
import { BasicType, CompositeType, isBasicType } from './types';
import { BlockProps, DynamicBlock } from './Block';
import { useAppDispatch } from '../../store';
import { setEdit } from '../edit/edit.slice';
import { useDragging } from './hooks';
import { Point } from '../../util/types';
import { updateTypeLocation } from './types.slice';

type TypeBlockProps = Omit<BlockProps, 'value' | 'type'> & {
    value: BasicType | CompositeType;
    location: Point;
};
const TypeBlock: FC<TypeBlockProps> = ({
    id,
    value,
    location,
    ...props
}: TypeBlockProps) => {
    const dispatch = useAppDispatch();

    const blockRef = useRef<HTMLSpanElement>(null);

    const onDrag = useCallback(
        (point: Point) => {
            dispatch(updateTypeLocation({ id: id, location: point }));
        },
        [dispatch, id]
    );

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        if (blockRef.current === null) return;
        e.stopPropagation();
        const rect = blockRef.current.getBoundingClientRect();
        dispatch(
            setEdit({
                id,
                location: {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                },
            })
        );
    };

    useDragging(location, blockRef, onDrag);

    return (
        <div onClick={onClick}>
            <DynamicBlock
                id={id}
                ref={blockRef}
                type={isBasicType(value) ? 'basic' : 'composite'}
                value={isBasicType(value) ? value : value.name}
                {...props}
            />
        </div>
    );
};

export default TypeBlock;
