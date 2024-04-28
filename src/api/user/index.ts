//统一管理用户相关接口
import request from '@/utils/request';
import type { loginForm, loginResponseData } from './type';

enum API {
  LOGIN_URL = '/user/login',
  REGISTER_URL = '/user/register',
  USER_INFO_URL = '/user',
}

//登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);

//获取用户信息接口方法
export const reqUserInfo = () => request.get(API.USER_INFO_URL);
