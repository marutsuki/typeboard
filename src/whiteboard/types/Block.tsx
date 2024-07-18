import {
    FC,
    forwardRef,
    MutableRefObject,
    RefObject,
    useCallback,
    useRef,
} from 'react';
import { useDragging } from './hooks';
import { Point } from '../../util/types';
import { useDispatch } from 'react-redux';
import { updateTypeLocation } from './types.slice';

export type BlockProps = {
    id: string;
    value: string;
    location: Point;
    dynamic?: boolean;
};

const Block: FC<BlockProps> = ({ dynamic = true, ...props }: BlockProps) => {
    return dynamic ? <DynamicBlock {...props} /> : <StaticBlock {...props} />;
};

const DynamicBlock: FC<BlockProps> = ({ id, value, location }: BlockProps) => {
    const blockRef = useRef<HTMLSpanElement>(null);
    const dispatch = useDispatch();

    const onDrag = useCallback(
        (point: Point) => {
            dispatch(updateTypeLocation({ id: id, location: point }));
        },
        [dispatch, id]
    );

    useDragging(location, blockRef, onDrag);

    return <StaticBlock className="!absolute" ref={blockRef} value={value} />;
};

export const StaticBlock = forwardRef<
    HTMLSpanElement,
    {
        value: string;
        className?: string;
    }
>(({ value, className }, ref) => {
    return (
        <span
            ref={ref}
            className={`${className ? className : ''} cursor-pointer relative rounded-lg bg-violet-300 h-12 w-24 flex items-center justify-center`}
        >
            <p className="font-bold select-none">{value}</p>
        </span>
    );
});

export default Block;
