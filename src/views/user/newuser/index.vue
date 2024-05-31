<template>
  <el-card class="box-card">
    <el-table :data="userInfos" style="width: 100%; padding: 5px">
      <el-table-column label="id" prop="id" />
      <el-table-column label="账号" prop="account" />
      <el-table-column label="头像" prop="avatar" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="昵称" prop="name" />
      <el-table-column label="uuid" prop="uuid" />
      <el-table-column fixed="right" width="60px">
        <template #default="scope">
          <template v-if="scope.row.status == USER_STATUS.FRONZEN">
            <el-button
              size="small"
              type="success"
              @click="unban(scope.row.account)"
            >
              通过
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
        @current-change="getBannedUser"
        @size-change="getBannedUser()"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reqBannedUserList, reqUserUnban } from '@/api/user';
import { userInfo } from '@/api/user/type';
import { USER_STATUS } from '@/enum/user';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
let pageNo = ref(1);
let pageSize = ref(10);
let total = ref<number>(0);
let userInfos = ref<userInfo[]>();

onMounted(() => {
  getBannedUser();
});

const getBannedUser = async () => {
  let res = await reqBannedUserList(pageNo.value, pageSize.value);
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
      message: `新增用户${account}成功`,
      type: 'success',
    });
    getBannedUser();
  }
};
</script>

<style scoped lang="scss">
.box-card {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 3px;
  .pagination {
    width: 100%;
    padding: 5px 10px;
    background-color: rgba(255, 255, 255, 0.7);
  }
}
</style>
