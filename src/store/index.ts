import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";

// 在取数据时用到
export type StateType = {
  user: UserStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
