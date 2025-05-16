import React, { FC, useEffect } from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { REGISTER_PATHNAME, EDITOR_PATHNAME } from "../../router";
import { useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";
import { loginPage } from "../../service/user";
import { setToken } from "../../utils/handleToken";
// import { sha256 } from "../../utils/common";
import sha256 from "crypto-js/sha256";
import styles from "./index.module.scss";

// redux
import { useDispatch } from "react-redux";
import { loginReducer } from "../../store/userReducer";

const USERNAME_KEY = "username";
const PASSWORD_KEY = "password";

// 密码储存localStorage
function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

// 清空密码
function deleteUserStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

// 获取用户名密码
function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

const Login: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // Form提供的第三方hooks

  useEffect(() => {
    // 记住我：sessionStorage获取用户名密码
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  const { run } = useRequest(
    async (username: string, password: string) => {
      const newPassword = sha256(password).toString();
      const data = await loginPage(username, newPassword);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        if (result && result.errno === 0) {
          const { token = "", username } = result.data;
          // 将用户信息存储到redux store
          dispatch(loginReducer({ username }));
          setToken(token); // 存储 token
          nav(EDITOR_PATHNAME);
        }
      },
    }
  );

  const onFinish = (values: any) => {
    const { username, password, remember } = values || {};
    run(username, password); // 登录

    // 记住我
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserStorage();
    }
  };
  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-box"]}>
        <div className={styles["login-header"]}>
          <h2>欢迎回来</h2>
          <p>请输入您的凭据以登录您的账户</p>
        </div>
        <Form
          onFinish={onFinish}
          // 这里一定要和form进行连接
          form={form}
          className={styles["login-form"]}
          // 默认值
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="用户名或邮箱"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                type: "string",
                min: 4,
                max: 20,
                message: "字符长度在4-20之间",
              },
              { pattern: /^\w+$/, message: "只能是字母数字下划线" },
            ]}
          >
            <Input className={styles["form-input"]} />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password className={styles["form-input"]} />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            {/* 这里Checkbox没有label属性，所以设置remember为key，Checkbox本身的checked为value */}
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["form-btn"]}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className={styles["login-footer"]}>
          <Link to={"/login"}>忘记密码?</Link>
          <Link to={REGISTER_PATHNAME}>注册新用户</Link>
        </div>
        <div className={styles["divider"]}>或通过以下方式登录</div>
        <div className={styles["social-login"]}>
          <div className={styles["social-btn"]}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#4285F4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
            </svg>
          </div>
          <div className={styles["social-btn"]}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
            </svg>
          </div>
          <div className={styles["social-btn"]}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DA1F2">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
