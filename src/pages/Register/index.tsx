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
      <div className={styles["register-box"]}>
        <div className={styles["register-header"]}>
          <h2>注册账户</h2>
          <p>请输入用户名和密码以创建用户</p>
        </div>
        <Form
          // labelCol={{ span: 6 }}
          // wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          className={styles["register-form"]}
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
            <Input.Password className={styles["form-input"]} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["form-btn"]}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
        <div className={styles["login-footer"]}>
          <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
