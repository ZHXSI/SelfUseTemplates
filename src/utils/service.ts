import axios from "axios";
// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // api的base_url
  timeout: 90000, // 请求超时时间
  withCredentials: true, // 是否跨域
});

// request拦截器,在发送请求之前做一些处理
service.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      timestamp: new Date().getTime(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// response拦截器,在接收到响应之后做一些处理
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default service;
