import React, { useState, useEffect } from "react";
import { getFileNameList } from "../../service/editor";
import Tiptap from "../tiptap";
import SideBar from "../sideBar";
import styles from "./index.module.scss";
import { handledTree } from "../../utils/common";

const CatalogLayout = () => {
  const [fileNameList, setFileNameList] = useState([]);
  const [docuData, setDocuData] = useState("");
  const [selectIndex, setSelectIndex] = useState(null);

  const init = async () => {
    const fileNameRes = await getFileNameList();
    if (fileNameRes && fileNameRes.data) {
      setFileNameList(handledTree(fileNameRes.data));
      // setDocuData(docuData[0]);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className={styles["notes-container"]}>
      <SideBar
        data={fileNameList}
        selectIndex={selectIndex}
        setSelectIndex={setSelectIndex}
        setFileNameList={setFileNameList}
        setDocuData={setDocuData}
      />
      <Tiptap data={docuData} selectIndex={selectIndex} />
    </div>
  );
};

export default CatalogLayout;
