import React, { useEffect } from "react";
import { useRequest } from "ahooks";
import { getFileNameList } from "../service/editor";
import { resetFileNameList } from "../store/editorReducer";
import { handledTree } from "../utils/common";
import { useDispatch } from "react-redux";

function useLoadFileNameList() {
  const dispatch = useDispatch();
  const { data, loading, error, run } = useRequest(
    async () => {
      const result = await getFileNameList();
      return result.data;
    },
    {
      manual: true,
    }
  );

  // 数据发送变化时1
  useEffect(() => {
    if (!data) return;
    dispatch(
      resetFileNameList({
        priFileNameList: data,
        fileNameList: handledTree(data),
      })
    );
  }, [data, dispatch]);

  return { error, loading, loadFileNameList: run };
}

export default useLoadFileNameList;
