//统一管理用户相关接口
import request from '@/utils/request';
import type {
  loginForm,
  loginResponseData,
  basicResponseData,
  userInfoResponseData,
  userListResponseData,
  changePasswdForm,
  registerForm,
} from './type';

enum API {
  LOGIN_URL = '/user/login',
  REGISTER_URL = '/user/register',
  USER_INFO_URL = '/user',
  USER_LIST = '/admin/user',
  USER_LIST_LIKE = '/admin/user/like',
  USER_BAN = '/admin/ban',
  USER_UNBAN = '/admin/unban',
  USER_BANNED = '/admin/user/banned',
  USER_PWD_CHANGE_CODE = '/user/passwd',
  USER_REGISTER = '/user/register',
  USER_REGISTER_CODE = '/user/verify',
  USER_CHANGE_NAME = '/user/name',
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
  request.put<any, basicResponseData>(
    API.USER_PWD_CHANGE_CODE + `/${code}`,
    data,
  );

//注册用户
export const reqRegisterUser = (data: registerForm) =>
  request.post<any, any>(API.REGISTER_URL, data);

//获取注册验证码
export const reqGetVerifyCode = (email: string) =>
  request.get<any, any>(API.USER_REGISTER_CODE + `/${email}`);

//修改昵称
export const reqChangeName = (name: string) =>
  request.put<any, any>(API.USER_CHANGE_NAME + `/${name}`);

//获取封禁用户列表
export const reqBannedUserList = (page: number, limit: number) =>
  request.get<any, userListResponseData>(
    API.USER_BANNED + `?pageNo=${page}&pageSize=${limit}`,
  );
