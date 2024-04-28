<template>
  <div id="building">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#building {
  background: url('@/assets/wave.svg');
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 170%;
}
</style>
