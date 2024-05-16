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

      <p class="forgot" @click="dialogVisable = true">
        <a>Forgot Password?</a>
      </p>

      <button @click="login()" class="button button-block">Log In</button>
    </form>
    <el-dialog v-model="dialogVisable" style="width: 30%">
      <el-input placeholder="请输入邮箱" v-model="email"></el-input>
      <template #footer>
        <el-button type="success" @click="forgetPWD">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { loginForm } from '@/api/user/type';
import { reactive, ref } from 'vue';
import useUserStore from '@/store/modules/user';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { reqChangePasswordVerify } from '@/api/user';

let $router = useRouter();
let userStore = useUserStore();
let loginFormTemp = reactive<loginForm>({
  account: '',
  password: '',
});
let dialogVisable = ref<boolean>(false);
let email = ref<string>('');

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

const forgetPWD = async () => {
  dialogVisable.value = false;
  let res = await reqChangePasswordVerify(email.value);
  if (res.code == 200) {
    ElNotification({
      title: 'Success',
      message: '邮件已发出,请查收',
      type: 'success',
    });
  }
};
</script>

<style lang="scss" src="../index.scss"></style>
