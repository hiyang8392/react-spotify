import { createSlice } from "@reduxjs/toolkit";

const initUi = {
  toast: {
    isClick: false,
    isShow: false,
  },
};

const ui = createSlice({
  name: 'ui',
  initialState: initUi,
  reducers: {
    showToast(state, action) {
      state.toast.message = action.payload;
      state.toast.isShow = true;
      state.toast.isClick = true;
    },
    hiddenToast(state) {
      state.toast.isShow = false;
      state.toast.isClick = false;
    }
  }
});

export const ShowToast = (message) => {
  return (dispatch) => {
    dispatch(ui.actions.showToast(message));

    setTimeout(() => {
      dispatch(ui.actions.hiddenToast());
    }, 3000);
  }
};

export default ui;
