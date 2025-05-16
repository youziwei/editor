import React, { useState, useEffect, forwardRef } from "react";
import { Drawer, Spin } from "antd";
import Tree from "./menuTree";
import useLoadFileNameList from "../../hooks/useLoadFileNameList";
import "./index.module.scss";

const SideBar = (props, ref) => {
  const { setDocuData, open, setOpen } = props;
  // 获取目录
  const { loading, loadFileNameList } = useLoadFileNameList();

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer title="在线编辑器" placement="left" onClose={onClose} open={open}>
      <Spin spinning={loading}>
        <Tree setDocuData={setDocuData} loadFileNameList={loadFileNameList} />
      </Spin>
    </Drawer>
  );
};

export default forwardRef(SideBar);
