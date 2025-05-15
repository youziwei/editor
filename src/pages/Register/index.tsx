import React, { FC } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../../router";
import { useRequest } from "ahooks";
import { registerService } from "../../service/user";
// import { sha256 } from "../../utils/common";
import sha256 from "crypto-js/sha256";
import styles from "./index.module.scss";

const Login: FC = () => {
  const nav = useNavigate();
  const { run } = useRequest(
    async (values) => {
      const { username, password } = values;
      const newPassword = sha256(password).toString();
      return await registerService(username, newPassword);
    },
    {
      manual: true,
      onSuccess() {
        message.success("注册成功");
        nav(LOGIN_PATHNAME); // 跳转到登录页
      },
    }
  );

  const onFinish = (values: any) => {
    run(values);
  };

  return (
    <div className={styles["register-container"]}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
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
          label="确认密码"
          name="confirm"
          rules={[
            { required: true, message: "请输入密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                // 获取password与当前value对比
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error("两次密码不一致"));
                }
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
