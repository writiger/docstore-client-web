import SvgIcon from './SvgIcon/index.vue';
import Pagination from './Pagination/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const allGlobalComponent: any = { SvgIcon, Pagination };
//对外暴露对象
export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
