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

//本地化存储Belong
export const SET_BELONG = (belong: string) => {
  localStorage.setItem('belong', belong);
};

export const GET_BELONG = () => {
  return localStorage.getItem('belong');
};

export const DEL_BELONG = () => {
  localStorage.removeItem('belong');
};
