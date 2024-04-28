<template>
  <div>
    <h1>需管理员审核后才能通过注册</h1>

    <form>
      <div class="top-row">
        <div class="field-wrap">
          <label v-if="registerFormTemp.account == ''">
            账号
            <span class="req">*</span>
          </label>
          <input
            v-model="registerFormTemp.account"
            type="text"
            required
            autocomplete="off"
          />
        </div>

        <div class="field-wrap">
          <label v-if="registerFormTemp.name == ''">
            昵称
            <span class="req">*</span>
          </label>
          <input
            v-model="registerFormTemp.name"
            type="text"
            required
            autocomplete="off"
          />
        </div>
      </div>

      <div class="field-wrap">
        <label v-if="registerFormTemp.email == ''">
          邮箱
          <span class="req">*</span>
        </label>
        <input
          v-model="registerFormTemp.email"
          type="email"
          required
          autocomplete="off"
        />
      </div>

      <div class="field-wrap">
        <label v-if="registerFormTemp.belong == ''">
          所属单位
          <span class="req">*</span>
        </label>
        <select v-model="registerFormTemp.belong" id="belongs" name="skills">
          <option
            v-for="(option, index) in belongs"
            :key="index"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>

      <div class="field-wrap">
        <label v-if="registerFormTemp.password1 == ''">
          请输入密码
          <span class="req">*</span>
        </label>
        <input
          v-model="registerFormTemp.password1"
          type="password"
          required
          autocomplete="off"
        />
      </div>

      <div class="field-wrap">
        <label v-if="registerFormTemp.password2 == ''">
          请再次输入密码
          <span class="req">*</span>
        </label>
        <input
          v-model="registerFormTemp.password2"
          type="password"
          required
          autocomplete="off"
        />
      </div>

      <div class="top-row">
        <div class="field-wrap">
          <label v-if="registerFormTemp.verify == ''">
            验证码
            <span class="req">*</span>
          </label>
          <input
            v-model="registerFormTemp.verify"
            type="password"
            required
            autocomplete="off"
          />
        </div>
        <div class="field-wrap">
          <label>
            <a>获取验证码</a>
          </label>
        </div>
      </div>
      <button type="submit" class="button button-block">Get Started</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { registerForm } from '@/api/user/type';
import { reactive, ref } from 'vue';
let belongs = ref(['dlnu', 'dlut', 'dlmu']);
let registerFormTemp = reactive<registerForm>({
  account: '',
  password1: '',
  password2: '',
  belong: '',
  email: '',
  verify: '',
  name: '',
});
</script>

<style lang="scss" src="../index.scss"></style>
