<template>
  <div>
    <el-card shadow="never" class="searchCondition">
      <el-select v-model="searchConditions.belong">
        <el-option
          v-for="item in belongList"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
      <br />
      <template v-for="(item, index) in searchConditions.items">
        <el-button
          size="small"
          type="success"
          icon="Plus"
          circle
          @click="addCondition(index)"
        />
        <el-button
          size="small"
          type="danger"
          icon="Minus"
          circle
          @click="deleteCondition(index)"
        />
        <el-button
          link
          v-if="item.linkWay == 'and'"
          @click="changeItemWay(index)"
        >
          且
        </el-button>
        <el-button v-else link @click="changeItemWay(index)">或</el-button>
        <el-select
          style="width: 120px"
          v-model="searchConditions.items[index].key"
        >
          <el-option
            v-for="item in conditions"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-input
          style="display: inline"
          v-model="searchConditions.items[index].value"
        ></el-input>
        <br />
      </template>
      <el-button style="width: 395px" type="primary" @click="search">
        search
      </el-button>
    </el-card>
    <el-card shadow="never" class="searchRes">
      <el-table :data="docInfos" style="width: 100%; padding: 5px">
        <el-table-column label="id" prop="id" />
        <el-table-column label="主题" prop="theme" />
        <el-table-column label="作者" prop="author" />
        <el-table-column label="摘要" prop="digest" />
        <el-table-column label="关键词" prop="keyword" />
        <el-table-column label="uuid" prop="uuid" />
        <el-table-column fixed="right" width="250px">
          <template #default="scope">
            <el-button
              type="primary"
              @click="
                downloadDoc(scope.row.theme, scope.row.uuid, scope.row.suffix)
              "
            >
              下载
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
          @current-change="search"
          @size-change="search()"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqBelongList } from '@/api/belong';
import { belong } from '@/api/belong/type';
import { reqBasicSearchDoc, downloadDoc } from '@/api/doc';
import { doc, reqBasicSearch } from '@/api/doc/type';
import { onMounted, ref } from 'vue';

const conditions = ['theme', 'keyword', 'author'];
let searchConditions = ref<reqBasicSearch>({
  pageNo: 1,
  pageSize: 10,
  belong: 'all',
  items: [
    {
      linkWay: 'or',
      key: 'theme',
      value: 'test',
    },
    {
      linkWay: 'or',
      key: 'keyword',
      value: 'test',
    },
    {
      linkWay: 'and',
      key: 'author',
      value: '作者33',
    },
  ],
});
let pageNo = ref(1);
let pageSize = ref(10);
let total = ref<number>(0);

let belongList = ref<belong[]>();
let docInfos = ref<doc[]>();

onMounted(() => {
  getBelongs();
});

const getBelongs = async () => {
  let res = await reqBelongList();
  if (res.code == 200) {
    belongList.value = res.data;
  }
  belongList.value?.push({
    id: 0,
    description: 'all',
    name: 'all',
  });
};

const changeItemWay = (i: number) => {
  if (searchConditions.value.items[i].linkWay == 'and') {
    searchConditions.value.items[i].linkWay = 'or';
  } else {
    searchConditions.value.items[i].linkWay = 'and';
  }
};

const addCondition = (i: number) => {
  searchConditions.value.items.splice(i + 1, 0, {
    linkWay: 'or',
    key: 'theme',
    value: '',
  });
};

const deleteCondition = (i: number) => {
  searchConditions.value.items.splice(i, 1);
};

const search = async () => {
  searchConditions.value.pageNo = pageNo.value;
  searchConditions.value.pageSize = pageSize.value;
  let res = await reqBasicSearchDoc(searchConditions.value);
  if (res.code == 200) {
    docInfos.value = res.data.list;
    total.value = res.data.total;
  }
};
</script>

<style scoped lang="scss">
.searchCondition {
  margin-bottom: 1vh;

  .el-select {
    width: 240px;
    margin: 3px;
  }
}
.searchRes {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
