<template>
  <div>
    <h1>欢迎回到 DocStore!</h1>

    <form>
      <div class="field-wrap">
        <label v-if="loginFormTemp.account == ''">
          账号
          <span class="req">*</span>
        </label>
        <input v-model="loginFormTemp.account" required autocomplete="off" />
      </div>

      <div class="field-wrap">
        <label v-if="loginFormTemp.password == ''">
          密码
          <span class="req">*</span>
        </label>
        <input
          v-model="loginFormTemp.password"
          type="password"
          required
          autocomplete="off"
        />
      </div>

      <p class="forgot"><a href="#">Forgot Password?</a></p>

      <button @click="login()" class="button button-block">Log In</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { loginForm } from '@/api/user/type';
import { reactive } from 'vue';
import useUserStore from '@/store/modules/user/user.ts';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';

let $router = useRouter();
let userStore = useUserStore();
let loginFormTemp = reactive<loginForm>({
  account: '',
  password: '',
});

const login = async () => {
  try {
    await userStore.userLogin(loginFormTemp);
    $router.push('/');
    ElNotification({
      type: 'success',
      message: '登陆成功',
    });
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    });
  }
};
</script>

<style lang="scss" src="../index.scss"></style>
