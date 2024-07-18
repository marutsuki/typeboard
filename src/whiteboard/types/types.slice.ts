import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { BasicType, CompositeType } from '../types/types';
import { v4 } from 'uuid';
import { Point } from '../../util/types';

export type CreatedType = {
    value:
        | (Omit<CompositeType, 'children'> & { children: string[] })
        | BasicType;
    location: Point;
};

type State = Record<string, CreatedType>;

const dummyInitialState = {
    '1': { value: 'string', location: { x: 200, y: 200 } },
    '2': {
        value: {
            name: 'T',
            children: ['1'],
        },
        location: { x: 250, y: 500 },
    },
};
const typesSlice = createSlice({
    name: 'types',
    initialState: dummyInitialState as State,
    reducers: {
        upsertType: (state, action: PayloadAction<CreatedType>) => {
            state[v4()] = action.payload;
        },
        removeType: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        },
        updateTypeLocation: (
            state,
            action: PayloadAction<{ id: string; location: Point }>
        ) => {
            if (state[action.payload.id]) {
                state[action.payload.id].location = action.payload.location;
            }
        },
    },
});

export const typesReducer = typesSlice.reducer;
export const { upsertType, removeType, updateTypeLocation } =
    typesSlice.actions;
export const selectTypes = (state: RootState) => state.types;
