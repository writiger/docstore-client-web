import { defineStore } from 'pinia';

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //控制菜单
    };
  },
});
export default useLayoutSettingStore;
