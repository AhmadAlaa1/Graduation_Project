import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import cvReducer from "./slices/cvSlice";
import interviewReducer from "./slices/interviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cv: cvReducer,
    interview: interviewReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
