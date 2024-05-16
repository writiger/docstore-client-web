//统一管理用户相关接口
import request from '@/utils/request';
import type {
  loginForm,
  loginResponseData,
  basicResponseData,
  userInfoResponseData,
  userListResponseData,
  changePasswdForm,
} from './type';
enum API {
  LOGIN_URL = '/user/login',
  REGISTER_URL = '/user/register',
  USER_INFO_URL = '/user',
  USER_LIST = '/admin/user',
  USER_LIST_LIKE = '/admin/user/like',
  USER_BAN = '/admin/ban',
  USER_UNBAN = '/admin/unban',
  USER_PWD_CHANGE_CODE = '/user/passwd',
}

//登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);

//获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USER_INFO_URL);

//模糊获取用户列表方法
export const reqUserListLike = (page: number, limit: number, col: string) =>
  request.get<any, userListResponseData>(
    API.USER_LIST_LIKE + `/${col}?pageNo=${page}&pageSize=${limit}`,
  );

//获取用户列表方法
export const reqUserList = (page: number, limit: number) =>
  request.get<any, userListResponseData>(
    API.USER_LIST + `?pageNo=${page}&pageSize=${limit}`,
  );

//封禁用户
export const reqUserBan = (account: string) =>
  request.put<any, basicResponseData>(API.USER_BAN + `/${account}`);

//解封用户
export const reqUserUnban = (account: string) =>
  request.put<any, basicResponseData>(API.USER_UNBAN + `/${account}`);

//申请修改密码
export const reqChangePasswordVerify = (email: string) =>
  request.post<any, basicResponseData>(API.USER_PWD_CHANGE_CODE + `/${email}`);

//修改密码
export const reqChangePassword = (data: changePasswdForm, code: string) =>
  request.put(API.USER_PWD_CHANGE_CODE + `/${code}`, data);
