import axios from 'axios';
import { ElMessage } from 'element-plus';

let request = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  timeout: 5000,
  withCredentials: false,
});

//请求拦截器
request.interceptors.request.use((config) => {
  return config;
});

//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 失败的回调
    let message = '';
    const status = error.response.status;
    switch (status) {
      case 401:
        message = 'TOKEN过期';
        break;
      case 403:
        message = '无权访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器出现问题';
        break;
      default:
        message = '网络出现问题';
        break;
    }
    ElMessage({
      type: 'error',
      message: message,
    });
    return Promise.reject(error);
  },
);
export default request;
