/**
 * 判断用户是否以登录，未登录跳转至首页
 */

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isNoLogin, HOME_PATHNAME } from "../router";
import useGetUserInfo from "./getData/useGetUserInfo";

function useNavPage() {
  // 获取域名后面的参数
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    // 已登录
    if (username) {
      return;
    }

    // 未登录
    if (isNoLogin(pathname)) {
      // 如果当前为首页，登录页，注册页，不做处理
      return;
    } else {
      // 如果不是，则跳转到登录页面
      nav(HOME_PATHNAME);
    }
  }, [pathname]);
}

export default useNavPage;
