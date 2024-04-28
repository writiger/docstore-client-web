import { createApp } from 'vue';
import App from '@/App.vue';
//引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//svg插件
import 'virtual:svg-icons-register';
//自动插件
import globalComponent from '@/components';
//全局样式
import '@/style/index.scss';
//路由
import router from './router';
//仓库
import pinia from './store';

const app = createApp(App);
app.use(globalComponent);
app.use(ElementPlus);
app.use(router);
app.use(pinia);
app.mount('#app');
