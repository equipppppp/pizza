import { createSlice } from "@reduxjs/toolkit";

type ModalState = {
  isHidden: boolean;
  isOrderConfirmed: boolean;
  isDataEntered: boolean;
  isDataConfirmed: boolean;
};

const initialState: ModalState = {
  isHidden: true,
  isOrderConfirmed: false,
  isDataEntered: false,
  isDataConfirmed: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal(state) {
      if (!state.isHidden) {
        state.isHidden = !state.isHidden;
        state.isDataEntered = false;
        state.isOrderConfirmed = false;
        state.isDataConfirmed = false;
      } else {
        state.isHidden = !state.isHidden;
      }
    },
    confirmOrder(state) {
      state.isOrderConfirmed = true;
    },
    toggleEnterData(state) {
      state.isDataEntered = !state.isDataEntered;
    },
    confirmData(state) {
      state.isDataConfirmed = true;
    },
  },
});

export default modalSlice.reducer;
export const { toggleModal, toggleEnterData, confirmOrder, confirmData } =
  modalSlice.actions;
