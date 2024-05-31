import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo } from '@/api/user';
import type { loginForm, loginResponseData, userInfo } from '@/api/user/type';
import type { UserState } from './types/type';
import {
  DEL_BELONG,
  DEL_TOKEN,
  GET_BELONG,
  GET_TOKEN,
  SET_BELONG,
  SET_TOKEN,
} from '@/utils/token';
import { constantRoute, getAddRoute } from '@/router/routes';
import { USER_LEVEL } from '@/enum/user';
import router from '@/router';

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      userInfo: null,
      belong: GET_BELONG(),
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
        SET_BELONG(res.data.belong);
        let addRoute = getAddRoute(res.data.level as USER_LEVEL);
        this.menuRoutes = [...constantRoute, ...addRoute];
        addRoute?.forEach((route) => {
          router.addRoute(route);
        });
        return 'ok';
      } else {
        return Promise.reject('get user info failed');
      }
    },
    userLogout() {
      this.userInfo = null;
      this.token = '';
      this.belong = '';
      DEL_TOKEN();
      DEL_BELONG();
    },
  },
  getters: {},
});
export default useUserStore;
