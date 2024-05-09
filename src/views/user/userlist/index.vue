<template>
  <el-card class="box-card">
    <el-table :data="userInfos" style="width: 100%; padding: 5px">
      <el-table-column label="id" prop="id" />
      <el-table-column label="账号" prop="account" />
      <el-table-column label="头像" prop="avatar" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="昵称" prop="name" />
      <el-table-column label="uuid" prop="uuid" />
      <el-table-column fixed="right" width="200px">
        <template #header>
          <el-input
            v-model="search"
            placeholder="Type to search"
            prefix-icon="Search"
          />
        </template>
        <template #default="scope">
          <template v-if="scope.row.status == USER_STATUS.NORMAL">
            <el-button size="small" type="danger">封禁</el-button>
          </template>
          <template v-if="scope.row.status == USER_STATUS.FRONZEN">
            <el-button size="small" type="success">解禁</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { reqUserList, reqUserListLike } from '@/api/user';
import { userInfo } from '@/api/user/type';
import { onMounted, ref } from 'vue';
import { USER_STATUS } from '@/enum/user';

let search = ref('');
let pageNo = ref(1);
let pageSize = ref(5);
let total = ref<number>(0);
let userInfos = ref<userInfo[]>();

onMounted(() => {
  getUserList();
});

const getUserList = async () => {
  let searchWay;
  if (search.value) {
    searchWay = reqUserListLike;
  } else {
    searchWay = reqUserList;
  }
  let res = await searchWay(pageNo.value, pageSize.value, search.value);
  if (res.code == 200) {
    total.value = res.data.total;
    userInfos.value = res.data.list;
  }
};
</script>

<style scoped lang="scss">
.box-card {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 3px;
  .el-input {
    --el-input-focus-border-color: #526d82;
    margin-bottom: 1vh;
  }
}
</style>
