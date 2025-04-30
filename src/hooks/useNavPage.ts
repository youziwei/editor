// 判断用户是否以登录，未登录跳转登录注册页
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isNoLogin, LOGIN_PATHNAME } from "../router";

function useNavPage(waitingUserData: boolean) {
  const username = "";
  // 获取域名后面的参数
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (waitingUserData) return;

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
      nav(LOGIN_PATHNAME);
    }
  }, [pathname]);
}

export default useNavPage;
