/**
 * 页面主框架
 *  - 需要做路由跳转限制
 */

import React, { FC } from "react";
import { Layout, Spin, Button, message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import useNavPage from "../../hooks/useNavPage";
// import { LOGIN_PATHNAME, HOME_PATHNAME } from "../../router";
// import useGetUserInfo from "../../hooks/useGetUserInfo";

// import { logoutReducer } from "../../store/userReducer";
// import { useDispatch } from "react-redux";
// import { removeToken } from "../../utils/handleToken";

// const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  // 登录拦截：进入页面前先加载用户信息
  useNavPage();

  // const dispatch = useDispatch();
  // const { username } = useGetUserInfo();

  // 点击登录跳转
  // const nav = useNavigate();
  // function handleClickToHome() {
  //   message.success("登录成功");
  //   nav(HOME_PATHNAME);
  // }

  // // 退出登录
  // function logout() {
  //   dispatch(logoutReducer()); // 清空了 redux user 数据
  //   removeToken(); // 清除 token 的存储
  //   message.success("退出成功");
  //   nav(HOME_PATHNAME);
  // }
  return (
    <Outlet />
    // <Layout>
    //   <Header className={styles.header}>
    //     <div className={styles.left} onClick={handleClickToHome}>
    //       在线编辑器
    //     </div>
    //     <div className={styles.right}>
    //       {!username ? (
    //         <Button onClick={() => nav(LOGIN_PATHNAME)}>登录</Button>
    //       ) : (
    //         <Button onClick={logout}>退出登录</Button>
    //       )}
    //     </div>
    //   </Header>
    //   <Content className={styles.main}>
    //     {/* 中间chlidren的内容 */}
    //     <Outlet />
    //   </Content>
    //   <Footer className={styles.footer}>编辑器&copy;</Footer>
    // </Layout>
  );
};

export default MainLayout;
