//登录
export interface loginForm {
  account: string;
  password: string;
}

interface loginDataType {
  token: string;
}
export interface loginResponseData {
  code: number;
  msg: string;
  data?: loginDataType;
}

//注册
export interface registerForm {
  account: string;
  password1: string;
  password2: string;
  belong: string;
  email: string;
  verify: string;
  name: string;
}

//获取用户信息
export interface userInfo {
  token: string;
  account: string;
  email: string;
  name: string;
  level: string;
  belong: string;
  status: string;
  avatar: string;
  uid: string;
}

export interface userInfoResponseData {
  code: number;
  msg: string;
  data: userInfo;
}
//获取用户列表
export interface userListResponseData {
  code: number;
  msg: string;
  data: userList;
}
interface userList {
  list: userInfo[];
  total: number;
  pages: number;
}
