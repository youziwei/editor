import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { produce } from "immer";

type fileOption = {
  id?: number;
  parentId: number;
  type: number;
  title: string;
};

export type EditorStateType = {
  // 选中下标
  selectIndex: number | null;
  // 原始数组
  priFileNameList: fileOption[];
  // 目录树
  fileNameList: any[];
  // 当前选中项
  curFileItem: fileOption | Record<any, any>;
};

const INIT_STATE: EditorStateType = {
  selectIndex: null,
  priFileNameList: [],
  fileNameList: [],
  curFileItem: {},
};

export const editorSlice = createSlice({
  name: "editor",
  initialState: INIT_STATE,
  // 这里面是一些方法
  // state：存储数据
  // action：更新操作，更新数据储存在payload中
  reducers: {
    // 当前选择的页面
    changeSelectIndex: produce(
      (state: EditorStateType, action: PayloadAction<number>) => {
        // 使用immer直接修改state数据
        const selectIndx = action.payload;
        state.selectIndex = selectIndx;
        // 通过index筛出当前选中项
        const curItem = current(state).priFileNameList.find(
          (i) => i.id === Number(selectIndx)
        );
        state.curFileItem = curItem || {};
      }
    ),
    resetFileNameList: produce(
      (state: EditorStateType, action: PayloadAction<any>) => {
        state.priFileNameList = action.payload.priFileNameList;
        state.fileNameList = action.payload.fileNameList;
      }
    ),
  },
});

// 在外面接收方法
export const { changeSelectIndex, resetFileNameList } = editorSlice.actions;

export default editorSlice.reducer;
