import React, { FC, useEffect } from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { REGISTER_PATHNAME, MAIN_PATHNAME } from "../../router";
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
          nav("/catalog");
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
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        // 这里一定要和form进行连接
        form={form}
        // 默认值
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="用户名"
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
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 6, span: 16 }}
        >
          {/* 这里Checkbox没有label属性，所以设置remember为key，Checkbox本身的checked为value */}
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <Link to={REGISTER_PATHNAME}>注册新用户</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
