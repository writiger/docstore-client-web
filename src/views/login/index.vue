<template>
  <div class="form">
    <ul class="tab-group">
      <li class="tab" :class="fun ? '' : 'active'">
        <a @click="changeFun(false)">
          <CircleCheck style="height: 16px" />
          &nbsp; 注册
        </a>
      </li>
      <li class="tab" :class="!fun ? '' : 'active'">
        <a @click="changeFun(true)">
          <DocumentAdd style="height: 16px" />
          &nbsp; 登录
        </a>
      </li>
    </ul>
    <login v-if="fun == true"></login>
    <register v-else></register>
  </div>
  <!-- /form -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CircleCheck, DocumentAdd } from '@element-plus/icons-vue';
import login from './components/login.vue';
import register from './components/register.vue';
let fun = ref(true);
const changeFun = (now: boolean) => {
  if (now == fun.value) {
    return;
  }
  fun.value = !fun.value;
};
</script>

<style src="./index.scss" lang="scss"></style>
