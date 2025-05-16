import { createBrowserRouter } from "react-router-dom";
// pages目录：页面主要结构
// layputs目录：页面公共部分布局
import MainLayout from "../layouts/MainLayout";
import Editor from "../pages/Editor";
import Home from "../pages/Home/index";
import Login from "../pages/Login/index";
import Register from "../pages/Register/index";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    // 在外层加一个根目录来阻止页面跳转
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/editor",
        element: <Editor />,
      },
      {
        path: "*", // 写在最后 兜底
        element: <NotFound />,
      },
    ],
  },
]);

// 常用路由常量
export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const EDITOR_PATHNAME = "/editor";

// 未登录：只能访问首页、登录、注册页
export function isNoLogin(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname))
    return true;
  return false;
}

export default router;
