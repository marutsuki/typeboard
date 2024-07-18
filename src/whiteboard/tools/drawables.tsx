import { ReactNode } from 'react';
import { AppDispatch } from '../../store';
import { StaticBlock } from '../types/Block';
import { createType } from '../types/types.slice';
import Drawable from './Drawable';

export const drawables = (dispatch: AppDispatch): ReactNode[] => [
    <Drawable
        name={'Basic Type'}
        description={'A elementary TypeScript type'}
        exampleComponent={<StaticBlock value={'string'} />}
        draw={(location) => dispatch(createType({ value: 'string', location }))}
    />,
    <Drawable
        name={'Composite Type'}
        description={
            'A composite TypeScript type, constructed with unions, intersections, generics or conditionals'
        }
        exampleComponent={<StaticBlock value={'T'} />}
        draw={(location) =>
            dispatch(
                createType({ value: { name: 'T', children: [] }, location })
            )
        }
    />,
];
