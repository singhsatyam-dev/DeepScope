import { configureStore } from "@reduxjs/toolkit";
import researchReducer from "../features/research/researchSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    research: researchReducer,
    auth: authReducer,
  },
});
