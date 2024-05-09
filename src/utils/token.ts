//本地存储读取数据方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('token', token);
};

export const GET_TOKEN = () => {
  return localStorage.getItem('token');
};

export const DEL_TOKEN = () => {
  localStorage.removeItem('token');
};
