import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { BasicType, CompositeType } from '../types/types';
import { v4 } from 'uuid';

type CreatedType = CompositeType | BasicType;

export type TypeData = {
    id: string;
    type: CreatedType;
};

type State = Record<string, CreatedType>;

const dummyInitialState = {
    '1': 'string',
    '2': { name: 'T', children: ['string', 'number'] },
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
    },
});

export const typesReducer = typesSlice.reducer;
export const { upsertType, removeType } = typesSlice.actions;
export const selectTypes = (state: RootState) => state.types;

export const selectAllTypes = createSelector(selectTypes, (types): TypeData[] =>
    Object.entries(types).map((type) => ({ id: type[0], type: type[1] }))
);
