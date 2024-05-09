import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo } from '@/api/user';
import type { loginForm, loginResponseData, userInfo } from '@/api/user/type';
import type { UserState } from './types/type';
import { DEL_TOKEN, GET_TOKEN, SET_TOKEN } from '@/utils/token';
import { constantRoute } from '@/router/routes';

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      userInfo: null,
    };
  },
  actions: {
    async userLogin(data: loginForm) {
      let res: loginResponseData = await reqLogin(data);
      if (res.code == 200 && res.data != null) {
        this.token = res.data.token;
        //本地化
        SET_TOKEN(this.token);
        //保证async返回成功promise
        return 'ok';
      } else {
        return Promise.reject(new Error(res.msg));
      }
    },
    async userInfoGet() {
      let res = await reqUserInfo();
      if (res.code == 200) {
        this.userInfo = res.data;
      } else {
      }
    },
    userLogout() {
      this.userInfo = null;
      this.token = '';
      DEL_TOKEN();
    },
  },
  getters: {},
});
export default useUserStore;
