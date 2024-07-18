import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { typesReducer } from './whiteboard/types/types.slice';
import { editReducer } from './whiteboard/edit/edit.slice';

const store = configureStore({
    reducer: {
        edit: editReducer,
        types: typesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
