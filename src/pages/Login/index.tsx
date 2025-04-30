import React, { FC } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { REGISTER_PATHNAME } from "../../router";

const Login: FC = () => {
  const onFinish = () => {
    message.warning("新功能待开发");
  };
  return (
    <div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="确认密码" name="confirm">
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Link to={REGISTER_PATHNAME}>注册新用户</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
