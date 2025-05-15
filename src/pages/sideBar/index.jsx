import React, { useState } from "react";
import { Tree, Modal, Input, Button, message, Tooltip } from "antd";
import {
  getFileNameList,
  getDocument,
  addDocument,
  editName,
} from "../../service/editor";
import { handledTree } from "../../utils/common";
import styles from "./index.module.scss";

const SideBar = (props) => {
  const { data, selectIndex, setSelectIndex, setFileNameList, setDocuData } =
    props;
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [curFileType, setCurFileType] = useState("1"); // 选中的文件类型
  const [handleTitle, setHandleTitle] = useState(0); // 新增(0)或修改(1)标题

  const handleSelect = async (selectKeys, item) => {
    setSelectIndex(item.selectedNodes[0]);
    if (
      !item.selectedNodes ||
      item.selectedNodes.length === 0 ||
      item.selectedNodes[0].type === "1"
    )
      return;
    setDocuData("");
    const res = await getDocument(item.selectedNodes[0].key);
    const { data } = res;
    setDocuData(data.content);
  };

  // type: 1:文件夹， 2:文件
  const handleAddFile = () => {
    // 选中文件不可新增文件和文件夹
    console.log("selectIndex", selectIndex);
    if (selectIndex == null || selectIndex.type === "2") return;
    setCurFileType("2");
    setVisible(true);
    setHandleTitle(0);
  };

  const handleAddPaperfile = () => {
    // 选中文件不可新增文件和文件夹
    if (selectIndex && selectIndex.type === "2") return;
    setCurFileType("1");
    setVisible(true);
    setHandleTitle(0);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClickConfirm = async () => {
    if (handleTitle === 0) {
      await addDocument({
        parentId: (selectIndex && selectIndex.key) || "0",
        type: curFileType,
        title: inputValue,
      });
      message.success("新增成功");
      setVisible(false);
      setInputValue("");
      const fileNameRes = await getFileNameList();
      setFileNameList(handledTree(fileNameRes.data));
    }

    if (handleTitle === 1) {
      await editName({
        id: selectIndex.key,
        title: inputValue,
      });
      message.success("修改成功");
      setVisible(false);
      setInputValue("");
      const fileNameRes = await getFileNameList();
      setFileNameList(handledTree(fileNameRes.data));
    }
  };

  // 修改名字
  const handleEditName = async () => {
    setVisible(true);
    setInputValue(selectIndex.title);
    setHandleTitle(1);
  };

  const handleCancel = () => {
    setVisible(false);
    setInputValue("");
  };

  return (
    <div className={styles["side-bar-container"]}>
      <div className={styles["side-btns"]}>
        <Tooltip title="新增文件">
          <Button
            onClick={handleAddFile}
            disabled={!selectIndex || selectIndex.type === "2"}
            icon={<i className="iconfont icon-xinzengwenjian"></i>}
          ></Button>
        </Tooltip>
        <Tooltip title="新增文件夹">
          <Button
            onClick={handleAddPaperfile}
            disabled={selectIndex && selectIndex.type === "2"}
            icon={<i className="iconfont icon-xinzengwenjianjia"></i>}
          ></Button>
        </Tooltip>
        <Tooltip title="修改名称">
          <Button
            onClick={handleEditName}
            disabled={!selectIndex}
            icon={<i className="iconfont icon-xiugaimingcheng"></i>}
          ></Button>
        </Tooltip>
      </div>
      <Tree treeData={data} blockNode onSelect={handleSelect} />
      <Modal
        open={visible}
        footer={[
          <Button onClick={handleClickConfirm}>确认</Button>,
          <Button onClick={handleCancel}>取消</Button>,
        ]}
        onCancel={handleCancel}
      >
        <div className={styles["handle-title"]} key={1}>
          <span>标题：</span>
          <Input value={inputValue} onChange={handleInputChange} />
        </div>
      </Modal>
    </div>
  );
};

export default SideBar;
