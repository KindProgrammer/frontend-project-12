import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpened: false,
    type: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.type = action.payload;
            state.isOpened = true;
          },
        closeModal: (state) => {
            state.isOpened = false;
            state.type = false;
        },
    }});
  
  export const { openModal, closeModal, selectType } = modalSlice.actions;
  export const isOpenedSelector = (state) => state.modal.isOpened;
  export const typeSelector = (state) => state.modal.type;
  export default modalSlice.reducer;