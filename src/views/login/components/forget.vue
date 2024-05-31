<template>
  <div class="form">
    <div>
      <h1>请输入新的密码！</h1>

      <form>
        <div class="field-wrap">
          <label v-if="changePasswordForm?.email == ''">
            邮箱
            <span class="req">*</span>
          </label>
          <input
            v-model="changePasswordForm.email"
            required
            autocomplete="off"
          />
        </div>
        <div class="field-wrap">
          <label v-if="changePasswordForm?.password1 == ''">
            密码
            <span class="req">*</span>
          </label>
          <input
            v-model="changePasswordForm.password1"
            type="password"
            required
            autocomplete="off"
          />
        </div>

        <div class="field-wrap">
          <label v-if="changePasswordForm?.password2 == ''">
            确认密码
            <span class="req">*</span>
          </label>
          <input
            v-model="changePasswordForm.password2"
            type="password"
            required
            autocomplete="off"
          />
        </div>

        <button type="button" @click="change" class="button button-block">
          确认修改
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqChangePassword } from '@/api/user';
import { changePasswdForm } from '@/api/user/type';
import { bcryptSaltHash } from '@/utils/bcrypt';
import { ElMessage, ElNotification } from 'element-plus';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { params } = useRoute();
let $router = useRouter();

let changePasswordForm = ref<changePasswdForm>({
  password1: '',
  password2: '',
  email: '',
});

const change = async () => {
  if (
    changePasswordForm.value.password1 != changePasswordForm.value.password2
  ) {
    ElNotification({
      title: 'Error',
      message: '两次密码不一致，请重新输入',
      type: 'error',
    });
    return;
  }
  let password = bcryptSaltHash(changePasswordForm.value.password1);
  changePasswordForm.value.password1 = password;
  changePasswordForm.value.password2 = password;
  let res = await reqChangePassword(changePasswordForm.value, params.code);
  if (res.code == 200) {
    ElNotification({
      title: 'Success',
      message: '修改密码成功，即将跳转至登录界面',
      type: 'success',
    });
    $router.push({ path: '/login' });
  }
};
</script>

<style lang="scss" src="../index.scss"></style>
