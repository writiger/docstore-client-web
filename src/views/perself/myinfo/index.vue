<template>
  <el-card>
    <template #header>
      <span>{{ myInfo?.account }}</span>
    </template>
    <div class="card-body">
      <span>用户等级: {{ myInfo?.level }}</span>
      <br />
      <span>绑定邮箱: {{ myInfo?.email }}</span>
      <br />
      <span>所属文库: {{ myInfo?.belong }}</span>
      <!-- <el-input placeholder="头像" :v-model="myInfo?.avatar"></el-input> -->
      <br />
      <el-input placeholder="昵称" v-model="nameNew"></el-input>
      <el-button class="mini-button" type="warning" @click="changeName">
        修改昵称
      </el-button>
      <br />
      <el-button type="success" @click="forgetPWD">修改密码</el-button>
    </div>
    <template #footer>
      <span>UUID: {{ myInfo?.uuid }}</span>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import {
  reqChangeName,
  reqChangePasswordVerify,
  reqUserInfo,
} from '@/api/user';
import { userInfo } from '@/api/user/type';
import { ElMessage, ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';

let myInfo = ref<userInfo>();
let nameNew = ref<string>('');

onMounted(() => {
  getMyInfo();
});

const getMyInfo = async () => {
  let res = await reqUserInfo();
  if (res.code == 200) {
    myInfo.value = res.data;
    console.log(res.data);
  } else {
    ElMessage({
      type: 'error',
      message: res.msg,
    });
  }
};

const forgetPWD = async () => {
  let res = await reqChangePasswordVerify(myInfo.value?.email as string);
  if (res.code == 200) {
    ElNotification({
      title: 'Success',
      message: '邮件已发出,请查收',
      type: 'success',
    });
  }
};

const changeName = async () => {
  let res = await reqChangeName(nameNew.value);
  if (res.code == 200) {
  }
};
</script>

<style scoped lang="scss">
.card-body {
  padding-left: calc(50% - 150px);
  .el-input {
    width: 300px;
    margin-top: 5px;
  }
  span {
    display: inline-block;
    margin-top: 5px;
  }
  .mini-button {
    width: 60px;
    margin-top: 5px;
  }
}
</style>
