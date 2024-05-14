<template>
  <div class="layout_container">
    <div
      class="layout_slider"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          text-color="white"
          background-color="$color1"
          active-color="$color2"
          :default-active="$route.path"
          :collapse="layoutSettingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_tabbar"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <div
      class="layout_main"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Main from './main/index.vue';
import Tabbar from './tabbar/index.vue';
import useUserStore from '@/store/modules/user';
import useLayoutSettingStore from '@/store/modules/setting';
import { useRoute } from 'vue-router';

let $route = useRoute();
let userStore = useUserStore();
let layoutSettingStore = useLayoutSettingStore();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: rgba($color1, 0.6);
  .layout_slider {
    width: $layout-menu-width;
    height: 100%;
    background-color: $color1;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $logo-width);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $layout-slider-min-width;
    }
  }
  .layout_tabbar {
    transition: all 0.3s;
    position: fixed;
    width: calc(100% - $layout-menu-width);
    height: $layout-tabbar-height;
    top: 0;
    left: $layout-menu-width;
    background-color: rgba($color2, 0.6);
    &.fold {
      width: calc(100vw - $layout-slider-min-width);
      left: $layout-slider-min-width;
    }
  }
  .layout_main {
    transition: all 0.3s;
    position: absolute;
    width: calc(100% - $layout-menu-width);
    height: calc(100vh - $layout-tabbar-height);
    background-color: rgba($color3, 0.6);
    left: $layout-menu-width;
    top: $layout-tabbar-height;
    padding: 3vh;
    overflow: auto;
    &.fold {
      width: calc(100vw - $layout-slider-min-width);
      left: $layout-slider-min-width;
    }
  }
}
</style>
