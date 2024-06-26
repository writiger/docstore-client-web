import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
//svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { tr } from 'element-plus/es/locale';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  //scss全局变量的配置
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/style/variable.scss";',
      },
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
});
