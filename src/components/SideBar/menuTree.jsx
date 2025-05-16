import React, { useState } from "react";
import { Tree, Modal, Input, Button, message, Tooltip, Menu } from "antd";
import {
  getFileNameList,
  getDocument,
  addDocument,
  editName,
} from "../../service/editor";
import { handledTree } from "../../utils/common";
import { useDispatch } from "react-redux";
import { changeSelectIndex } from "../../store/editorReducer";
import useGetEditorData from "../../hooks/getData/useGetEditorData";
import styles from "./tree.module.scss";

const SideBar = (props) => {
  const { setDocuData, loadFileNameList } = props;
  // 获取目录数据
  const { selectIndex, fileNameList: data, curFileItem } = useGetEditorData();

  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [curFileType, setCurFileType] = useState("1"); // 选中的文件类型
  const [handleTitle, setHandleTitle] = useState(0); // 新增(0)或修改(1)标题
  const dispatch = useDispatch();

  const handleSelect = async (selectKeys) => {
    const { key } = selectKeys;
    // setSelectIndex(key);
    dispatch(changeSelectIndex(key));

    setDocuData("");
    const res = await getDocument(key);
    const { data } = res;
    setDocuData(data.content);
  };

  // type: 1:文件夹， 2:文件
  const handleAddFile = () => {
    // 选中文件不可新增文件和文件夹
    if (selectIndex == null || curFileItem.type === "2") return;
    setCurFileType("2");
    setVisible(true);
    setHandleTitle(0);
  };

  const handleAddPaperfile = () => {
    // 选中文件不可新增文件和文件夹
    if (curFileItem.type === "2") return;
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
        parentId: selectIndex || "0",
        type: curFileType,
        title: inputValue,
      });
      message.success("新增成功");
      setVisible(false);
      setInputValue("");
      // 查询
      loadFileNameList();
    }

    if (handleTitle === 1) {
      await editName({
        id: selectIndex,
        title: inputValue,
      });
      message.success("修改成功");
      setVisible(false);
      setInputValue("");
      // 查询
      loadFileNameList();
    }
  };

  // 修改名字
  const handleEditName = async () => {
    setVisible(true);
    setInputValue(curFileItem.title);
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
            disabled={!selectIndex || curFileItem.type === "2"}
            icon={<i className="iconfont icon-xinzengwenjian"></i>}
          ></Button>
        </Tooltip>
        <Tooltip title="新增文件夹">
          <Button
            onClick={handleAddPaperfile}
            disabled={selectIndex && curFileItem.type === "2"}
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
      <Menu
        onSelect={handleSelect}
        onOpenChange={(openKeys) => {
          if (openKeys.length > 0) {
            dispatch(changeSelectIndex(openKeys[0]));
          }
        }}
        style={{ width: "100%" }}
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        items={data}
      />
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
