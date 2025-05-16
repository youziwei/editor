import React, { FC } from "react";
import { Button } from "antd";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../../router";
import classnames from "classnames";

const Home: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>在线编辑器</h1>
      <p className={styles.subtitle}>
        一个简洁高效的在线编辑器，随时随地记录您的灵感
      </p>
      <div className={styles["animation-container"]}>
        <div className={classnames(styles.shape, styles.cover)}></div>
        <div className={classnames(styles.shape, styles.spine)}></div>
        <div className={classnames(styles.shape, styles.page)}></div>
        <div className={classnames(styles.shape, styles.corner)}></div>
        <div className={classnames(styles.shape, styles["code-line"])}></div>
        <div className={classnames(styles.shape, styles["code-line"])}></div>
        <div className={classnames(styles.shape, styles["code-line"])}></div>
        <div className={classnames(styles.shape, styles["code-line"])}></div>
      </div>
      <Button
        className={styles["home-start"]}
        onClick={() => nav(LOGIN_PATHNAME)}
      >
        开始创作
      </Button>
    </div>
  );
};

export default Home;
