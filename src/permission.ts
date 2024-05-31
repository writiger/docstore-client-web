//路由权鉴
import router from '@/router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import useUserStore from './store/modules/user';
import pinia from './store';
import setting from './setting';

let userStore = useUserStore(pinia);

//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start();
  document.title = setting.title + '-' + to.meta.title;
  let token = userStore.token;
  let userInfo = userStore.userInfo;
  //登录成功
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' });
    } else {
      if (userInfo) {
        next();
      } else {
        try {
          await userStore.userInfoGet();
          next();
        } catch (error) {
          //token过期
          userStore.userLogout();
          next({ path: '/login' });
        }
      }
    }
  } else {
    let regex = new RegExp('/forget/([a-zA-Z0-9_-]+)$');
    if (to.path == '/login' || regex.test(to.path)) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  next();
});
//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done();
});
