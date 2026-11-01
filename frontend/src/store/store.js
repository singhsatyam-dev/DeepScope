import { configureStore } from "@reduxjs/toolkit";
import researchReducer from "../features/research/researchSlice";

export const store = configureStore({
  reducer: {
    research: researchReducer,
  },
});
