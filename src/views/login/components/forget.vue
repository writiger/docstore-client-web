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

        <button @click="change()" class="button button-block">确认修改</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { changePasswdForm } from '@/api/user/type';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { params } = useRoute();

console.log(params);

let changePasswordForm = ref<changePasswdForm>({
  password1: '',
  password2: '',
  email: '',
});

const change = () => {};
</script>

<style lang="scss" src="../index.scss"></style>
