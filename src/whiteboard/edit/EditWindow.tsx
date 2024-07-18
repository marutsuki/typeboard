import { FC, useEffect, useRef } from 'react';
import { selectTypeById, upsertType } from '../types/types.slice';
import { BasicType, CompositeType, isBasicType, types } from '../types/types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { Point } from '../../util/types';
import { setEdit } from './edit.slice';

type BasicEditWindowProps = {
    id: string;
    type: BasicType;
};

const BasicEditWindow: FC<BasicEditWindowProps> = ({
    id,
    type,
}: BasicEditWindowProps) => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            console.log(ref.current);
            if (e.target instanceof Node && !ref.current?.contains(e.target)) {
                dispatch(setEdit({ id: null }));
            }
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [dispatch]);
    return (
        <div ref={ref} className="p-4 bg-gray-100 shadow-md rounded-lg">
            <h2 className="text-xl mb-2">Basic Type</h2>
            <select
                onChange={(e) =>
                    dispatch(
                        upsertType({ id, value: e.target.value as BasicType })
                    )
                }
            >
                {type}
                {types.map((t) => (
                    <option
                        key={t}
                        value={t}
                        {...(t === type && { selected: true })}
                    >
                        {t}
                    </option>
                ))}
            </select>
        </div>
    );
};

type CompositeEditWindowProps = {
    id: string;
    type: CompositeType;
};

const CompositeEditWindow: FC<CompositeEditWindowProps> = ({
    type,
}: CompositeEditWindowProps) => {
    return (
        <div>
            <h2>{type.name}</h2>
        </div>
    );
};

export type EditWindowProps = {
    id: string;
    location: Point;
};

const EditWindow: FC<EditWindowProps> = ({ id, location }: EditWindowProps) => {
    const type = useSelector(selectTypeById(id));
    return (
        <div
            className="absolute z-10"
            style={{
                top: location.y,
                left: location.x,
            }}
        >
            {isBasicType(type.value) ? (
                <BasicEditWindow id={id} type={type.value} />
            ) : (
                <CompositeEditWindow id={id} type={type.value} />
            )}
        </div>
    );
};

export default EditWindow;
