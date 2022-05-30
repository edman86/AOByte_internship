import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './reducers/layoutSlice';
import modalReducer from './reducers/modalSlice';

export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        modal: modalReducer
    },
});