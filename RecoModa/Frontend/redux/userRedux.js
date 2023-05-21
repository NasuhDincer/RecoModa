import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateInformation: (state, action) => {
      // Assuming action.payload contains the updated information
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
    logout: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      console.log("redux");
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, updateInformation, logout } = userSlice.actions;
export default userSlice.reducer;