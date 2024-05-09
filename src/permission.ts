//路由权鉴
import router from '@/router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import useUserStore from './store/modules/user';
import pinia from './store';

let userStore = useUserStore(pinia);

//全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  nprogress.start();
  // TODO
  let token = userStore.token;
  // if (token) {
  // } else {
  //   if (userPath.includes(to.path)) {
  //     next();
  //   } else {
  //     next({ path: '/login' });
  //   }
  // }

  next();
});
//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done();
});
