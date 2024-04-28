import { defineStore } from 'pinia';
import { reqLogin } from '@/api/user';
import type { loginForm } from '@/api/user/type';

let useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'),
    };
  },
  actions: {
    async userLogin(data: loginForm) {
      let res = await reqLogin(data);
      if (res.code == 200) {
        this.token = res.data.token;
        //本地化
        localStorage.setItem('TOKEN', res.data.token);
        //保证async返回成功promise
        return 'ok';
      } else {
        return Promise.reject(new Error(res.msg));
      }
    },
  },
  getters: {},
});
export default useUserStore;
