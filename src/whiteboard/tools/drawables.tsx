import { ReactNode } from 'react';
import { AppDispatch } from '../../store';
import { StaticBlock } from '../types/Block';
import { upsertType } from '../types/types.slice';
import Drawable from './Drawable';

export const drawables = (dispatch: AppDispatch): ReactNode[] => [
    <Drawable
        name={'Basic Type'}
        description={'A elementary TypeScript type'}
        exampleComponent={<StaticBlock value={'string'} />}
        interactiveComponent={
            <StaticBlock value={'string'} className="absolute" />
        }
        draw={(location) => dispatch(upsertType({ value: 'string', location }))}
    />,
    <Drawable
        name={'Composite Type'}
        description={
            'A composite TypeScript type, constructed with unions, intersections, generics or conditionals'
        }
        exampleComponent={<StaticBlock value={'T'} />}
        interactiveComponent={<StaticBlock value={'T'} className="absolute" />}
        draw={(location) =>
            dispatch(
                upsertType({ value: { name: 'T', children: [] }, location })
            )
        }
    />,
];
