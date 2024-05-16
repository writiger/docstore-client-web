<template>
  <el-card class="box-card">
    <el-table :data="docInfos" style="width: 100%; padding: 5px">
      <el-table-column label="id" prop="id" />
      <el-table-column label="主题" prop="theme" />
      <el-table-column label="作者" prop="author" />
      <el-table-column label="摘要" prop="digest" />
      <el-table-column label="关键词" prop="keyword" />
      <el-table-column label="uuid" prop="uuid" />
      <el-table-column fixed="right" width="250px">
        <template #header>
          <el-input
            v-model="search"
            placeholder="Type to search"
            prefix-icon="Search"
            :blur="getDocList()"
          />
        </template>
        <template #default="scope">
          <el-button
            type="primary"
            @click="
              downloadDoc(
                scope.row.theme + scope.row.suffix,
                scope.row.uuid,
                scope.row.suffix,
              )
            "
          >
            下载
          </el-button>
          <el-button type="warning" @click="changeDoc(scope.row.uuid)">
            修改
          </el-button>
          <el-button type="danger" @click="deleteDoc(scope.row.uuid)">
            删除
          </el-button>
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
        @current-change="getDocList"
        @size-change="getDocList()"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reqDocList, reqEasySearchDoc, downloadDoc } from '@/api/doc';
import { doc } from '@/api/doc/type';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let search = ref('');
let pageNo = ref(1);
let pageSize = ref(10);
let total = ref<number>(0);
let docInfos = ref<doc[]>();
let $router = useRouter();

onMounted(() => {
  getDocList();
});

const getDocList = async () => {
  let searchWay;
  if (search.value) {
    searchWay = reqEasySearchDoc;
  } else {
    searchWay = reqDocList;
  }
  let res = await searchWay(pageNo.value, pageSize.value, search.value);
  total.value = res.data.total;
  docInfos.value = res.data.list;
};

const changeDoc = (uuid: string) => {
  $router.push('/doc/panel?uuid=' + uuid);
};

const deleteDoc = (uuid: string) => {
  console.log(uuid);
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
