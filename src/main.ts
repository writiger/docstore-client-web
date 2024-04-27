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
const app = createApp(App);
app.use(globalComponent);
app.use(ElementPlus);
app.mount('#app');
