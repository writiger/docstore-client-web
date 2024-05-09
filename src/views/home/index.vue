<template>
  <div>
    <h1>一级路由HOME</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';

let userStore = useUserStore();
onMounted(() => {
  userStore.userInfoGet();
});
</script>

<style scoped lang="scss"></style>
