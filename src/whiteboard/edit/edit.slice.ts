import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Point } from '../../util/types';

type EditState =
    | {
          id: string;
          location: Point;
      }
    | {
          id: null;
      };

const editSlice = createSlice({
    name: 'edit',
    initialState: { id: null } as EditState,
    reducers: {
        setEdit: (state, action: PayloadAction<EditState>) => {
            state.id = action.payload.id;
            if (state.id !== null && action.payload.id !== null) {
                state.location = action.payload.location;
            }
        },
    },
});

export const editReducer = editSlice.reducer;

export const { setEdit } = editSlice.actions;

export const selectEdit = (state: RootState) => state.edit;
