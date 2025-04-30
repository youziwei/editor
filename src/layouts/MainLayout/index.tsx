import React, { FC } from "react";
import { Layout, Spin, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import useNavPage from "../../hooks/useNavPage";
import { LOGIN_PATHNAME, REGISTER_PATHNAME } from "../../router";

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  const nav = useNavigate();
  useNavPage(false);
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>这是logo</div>
        <div className={styles.right}>
          <Button onClick={() => nav(LOGIN_PATHNAME)}>登录</Button>
        </div>
      </Header>
      <Content className={styles.main}>
        {/* 中间chlidren的内容 */}
        <Outlet />
      </Content>
      <Footer className={styles.footer}>编辑器&copy;</Footer>
    </Layout>
  );
};

export default MainLayout;
