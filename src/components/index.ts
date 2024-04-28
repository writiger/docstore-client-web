import SvgIcon from './SvgIcon/index.vue';
import Pagination from './Pagination/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const allGlobalComponent: any = { SvgIcon, Pagination, ElementPlusIconsVue };
//对外暴露对象
export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key]);
    });
  },
};
