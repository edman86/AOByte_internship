import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    currentElementId: null
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,

    reducers: {
        toggleModal: (state) => {
            state.isOpen = !state.isOpen;
        },
        setCurrentId: (state, action) => {
            state.currentElementId = action.payload;
        }
    }
});

export const { toggleModal, setCurrentId } = modalSlice.actions;
export const selectIsOpen = state => state.modal.isOpen;
export const selectCurrentId = state => state.modal.currentElementId;
export default modalSlice.reducer;