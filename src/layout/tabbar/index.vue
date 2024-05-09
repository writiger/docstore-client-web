<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <el-icon>
        <Expand />
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>
          <span>账号设置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span>修改密码</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar_right">
      <img src="/logo.svg" alt="" />
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          <span>{{ userStore.userInfo?.name }}</span>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { useRouter } from 'vue-router';

let userStore = useUserStore();
let $router = useRouter();

const logout = () => {
  userStore.userLogout();
  $router.push({ path: '/login' });
};
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  span {
    color: white;
    font-size: calc($logo-font-size / 1.5);
  }
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
    .el-icon {
      margin: 0 10px;
      font-size: calc($logo-font-size / 1.3);
    }
  }

  .tabbar_right {
    display: flex;
    align-items: center;
    margin-right: 10px;
    img {
      margin: 0px 10px;
      width: $logo-font-size;
      height: $logo-font-size;
      border-radius: calc($logo-font-size / 2);
      background-color: white;
    }
  }
}
</style>
