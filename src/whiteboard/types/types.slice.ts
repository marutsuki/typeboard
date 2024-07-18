import { v4 } from 'uuid';

import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { Point } from '../../util/types';
import { BasicType, CompositeType, isCompositeType } from '../types/types';

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
        createType: (state, action: PayloadAction<CreatedType>) => {
            state[v4()] = action.payload;
        },
        upsertType: (
            state,
            action: PayloadAction<Partial<CreatedType> & { id: string }>
        ) => {
            Object.assign(state[action.payload.id], action.payload);
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
export const {
    createType,
    upsertType,
    removeType,
    updateTypeLocation,
    connectTypes,
} = typesSlice.actions;
export const selectTypes = (state: RootState) => state.types;

export const selectTypeById = (id: string) =>
    createSelector(selectTypes, (types) => types[id] || null);
