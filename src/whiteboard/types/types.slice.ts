import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { BasicType, CompositeType, isCompositeType } from '../types/types';
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
            children: ['1', '3'],
        },
        location: { x: 250, y: 500 },
    },
    '3': {
        value: 'boolean',
        location: { x: 300, y: 350 },
    },
    '4': {
        value: {
            name: 'K',
            children: ['1', '2'],
        },
        location: { x: 500, y: 0 },
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
        connectTypes: (
            state,
            action: PayloadAction<{ parent: string; child: string }>
        ) => {
            if (state[action.payload.parent] && state[action.payload.child]) {
                const parent = state[action.payload.parent].value;
                if (isCompositeType(parent)) {
                    parent.children.push(action.payload.child);
                }
            }
        },
    },
});

export const typesReducer = typesSlice.reducer;
export const { upsertType, removeType, updateTypeLocation, connectTypes } =
    typesSlice.actions;
export const selectTypes = (state: RootState) => state.types;
