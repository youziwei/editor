import React, { useState, useEffect, useRef } from "react";
import Tiptap from "../tiptap";
import SideBar from "../../components/SideBar";
import styles from "./index.module.scss";
import {
  MenuOutlined,
  FileSyncOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useGetEditorData from "../../hooks/getData/useGetEditorData";
import { saveFile } from "../../service/editor";
import { Button, message } from "antd";

const CatalogLayout = () => {
  const { selectIndex, curFileItem } = useGetEditorData();
  const [docuData, setDocuData] = useState("");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(true); // 模式切换
  const sideBarRef = useRef(null);
  const tipTapRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickSwitch = () => {
    setMode(!mode);
  };

  const handleClickSave = () => {
    if (tipTapRef.current && tipTapRef.current.editorRef) {
      const html = tipTapRef.current.editorRef.getHTML;
      message.success("保存成功");
      saveFile(selectIndex, html);
    }
  };

  // 计算长度
  // 当前屏幕一半长度
  const curScreenWidth = document.body.clientWidth / 2;
  const marginLeft = curScreenWidth < 378 ? curScreenWidth : 378;

  return (
    <div
      className={styles["notes-container"]}
      // style={{
      //   marginLeft: open ? marginLeft : "0px",
      // }}
    >
      <div className={styles["notes-header"]}>
        <MenuOutlined onClick={handleClickOpen} />
        <h2 className={styles["header-title"]}>
          {curFileItem.type === "2" ? curFileItem.title : ""}
        </h2>
      </div>
      <div className={styles["header-btns"]}>
        <Button
          type="primary"
          icon={<i className="iconfont icon-pdf"></i>}
          onClick={handleClickSave}
        >
          保存
        </Button>
        <Button icon={<i className="iconfont icon-save"></i>}>下载</Button>
        <Button icon={<FileSyncOutlined />} onClick={handleClickSwitch}>
          {mode ? "编辑模式" : "预览模式"}
        </Button>
      </div>
      {selectIndex || selectIndex === 0 ? (
        <Tiptap ref={tipTapRef} data={docuData} mode={mode} />
      ) : (
        <div className={styles["empty-state-container"]}>
          <svg className={styles["empty-state-icon"]} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
            />
          </svg>
          <p className={styles["empty-state-title"]}>创建你的第一个文件</p>
          <span className={styles["empty-state-description"]}>
            开始你的创作之旅，点击下方按钮创建新文档或打开现有文件
          </span>
          <Button
            icon={<PlusOutlined />}
            className={styles["empty-state-btn"]}
            onClick={handleClickOpen}
          >
            新建文档
          </Button>
        </div>
      )}

      {/* 左侧目录 */}
      <SideBar
        ref={sideBarRef}
        setDocuData={setDocuData}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default CatalogLayout;
