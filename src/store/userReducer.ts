import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserStateType = {
  username: string;
};

const INIT_STATE: UserStateType = { username: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>
    ) => {
      return action.payload;
    },
    // 退出登录，只有重置为默认值就可以
    logoutReducer: () => INIT_STATE,
  },
});

// 在外面接收方法
export const { loginReducer, logoutReducer } = userSlice.actions;

export default userSlice.reducer;
