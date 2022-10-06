import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

// when we have a only one store reducer then we export this way and if we have a multiple we create a object and then store the reducer in there
export const store = configureStore({
  reducer: authSlice.reducer,
});
