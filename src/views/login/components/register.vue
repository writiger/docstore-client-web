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
        <select v-model="registerFormTemp.belong" id="belongs">
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
          <el-button @click="getVerify" link>
            <a>获取验证码</a>
          </el-button>
        </div>
      </div>
      <button type="button" @click="register" class="button button-block">
        Get Started
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reqBelongList } from '@/api/belong';
import { reqGetVerifyCode, reqRegisterUser } from '@/api/user';
import { registerForm } from '@/api/user/type';
import { bcryptSaltHash } from '@/utils/bcrypt';
import { ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let belongs = ref<string[]>([]);
let registerFormTemp = ref<registerForm>({
  account: '',
  password1: '',
  password2: '',
  belong: '',
  email: '',
  verify: '',
  name: '',
});
let $router = useRouter();

onMounted(() => {
  getBelongs();
});

const getBelongs = async () => {
  let res = await reqBelongList();
  res.data.forEach((value) => {
    belongs.value.push(value.name);
  });
};

const register = async () => {
  if (registerFormTemp.value.password1 != registerFormTemp.value.password2) {
    ElNotification({
      type: 'error',
      message: '两次输入的密码不同，请重新输入',
      title: 'Error',
    });
    return;
  }
  let pwd = bcryptSaltHash(registerFormTemp.value.password1);
  registerFormTemp.value.password1 = pwd;
  registerFormTemp.value.password2 = pwd;
  let res = await reqRegisterUser(registerFormTemp.value);
  if (res.code == 200) {
    ElNotification({
      type: 'success',
      message: '注册成功,跳转登陆界面',
      title: 'Success',
    });
    $router.push({ path: '/' });
  } else {
    ElNotification({
      type: 'error',
      message: res.message,
      title: 'Error',
    });
  }
};

const getVerify = async () => {
  if (registerFormTemp.value.email == '') {
    ElNotification({
      type: 'info',
      title: '请输入邮箱',
      message: '请输入邮箱',
    });
  }
  let res = await reqGetVerifyCode(registerFormTemp.value.email);
  console.log(res);
};
</script>

<style lang="scss" src="../index.scss"></style>
