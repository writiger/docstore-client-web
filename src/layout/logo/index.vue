<template>
  <div class="logo">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $logo-width;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: $logo-img-width;
    height: $logo-img-height;
  }
  p {
    font-size: $logo-font-size;
    margin-left: 10px;
  }
}
</style>
