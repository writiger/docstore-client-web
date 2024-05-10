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
            :blur="getUserList()"
          />
        </template>
        <template #default="scope">
          <template v-if="scope.row.status == USER_STATUS.NORMAL">
            <el-button
              size="small"
              type="danger"
              @click="ban(scope.row.account)"
            >
              封禁
            </el-button>
          </template>
          <template v-if="scope.row.status == USER_STATUS.FRONZEN">
            <el-button
              size="small"
              type="success"
              @click="unban(scope.row.account)"
            >
              解禁
            </el-button>
          </template>
          <template v-if="scope.row.status == null">-</template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next, ->,sizes ,total"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :total="total"
        background="false"
        :page-sizes="[5, 10, 15]"
        @current-change="getUserList()"
        @size-change="getUserList()"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {
  reqUserBan,
  reqUserList,
  reqUserListLike,
  reqUserUnban,
} from '@/api/user';
import { userInfo } from '@/api/user/type';
import { onMounted, ref } from 'vue';
import { USER_STATUS } from '@/enum/user';
import { ElMessage } from 'element-plus';

let search = ref('');
let pageNo = ref(1);
let pageSize = ref(10);
let total = ref<number>(0);
let userInfos = ref<userInfo[]>();

onMounted(() => {
  getUserList();
});

const getUserList = async (pager = 1) => {
  pageNo.value = pager;
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
    // 填充表格
    for (let need = pageSize.value - userInfos.value.length; need > 0; need--) {
      const temp = {} as userInfo;
      userInfos.value.push(temp);
    }
  }
};

const ban = async (account: string) => {
  let res = await reqUserBan(account);
  if (res.code != 200) {
    ElMessage({
      showClose: true,
      message: res.msg,
      type: 'error',
    });
  } else {
    ElMessage({
      showClose: true,
      message: `封禁用户${account}成功`,
      type: 'success',
    });
    getUserList();
  }
};

const unban = async (account: string) => {
  let res = await reqUserUnban(account);
  if (res.code != 200) {
    ElMessage({
      showClose: true,
      message: res.msg,
      type: 'error',
    });
  } else {
    ElMessage({
      showClose: true,
      message: `解禁用户${account}成功`,
      type: 'success',
    });
    getUserList();
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
  .pagination {
    width: 100%;
    padding: 5px 10px;
    background-color: rgba(255, 255, 255, 0.7);
  }
}
</style>
