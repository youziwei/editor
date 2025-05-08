// 处理请求拦截
import { message } from "antd";
import axios from "axios";
import { getToken } from "./handleToken";

export type ResDataType = {
  [key: string]: any;
};

export type ResType = {
  errno: number;
  // 参数返回类型
  data?: ResDataType;
  message?: string;
};

const instance = axios.create({
  timeout: 10 * 1000,
});

// request拦截：每次请求带上token
instance.interceptors.request.use(
  (config) => {
    // 每次请求带上header
    config.headers["Authorization"] = `Bearer ${getToken()}`; // JWT 的固定格式
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response拦截：统一处理errno和msg
instance.interceptors.response.use(
  (res) => {
    const resData = (res.data || {}) as ResType;
    const { errno, data, message: msg } = resData;

    if (errno !== 0) {
      // 错误提示
      if (msg) {
        message.error(msg);
      }
      throw new Error(msg);
    }
    return { data, errno } as any;
  },
  (error) => {
    message.error(error.message);
  }
);

export default instance;
