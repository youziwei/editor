// 用于获取editor的数据
import { useSelector } from "react-redux";
import { StateType } from "../../store";
import { EditorStateType } from "../../store/editorReducer";

function useGetEditorData() {
  const { selectIndex, priFileNameList, fileNameList, curFileItem } =
    useSelector<StateType>((state) => state.editor) as EditorStateType;

  return { selectIndex, priFileNameList, fileNameList, curFileItem };
}

export default useGetEditorData;
