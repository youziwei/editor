import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import editorReducer, { EditorStateType } from "./editorReducer";
// 在取数据时用到
export type StateType = {
  user: UserStateType;
  editor: EditorStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    editor: editorReducer,
  },
});
