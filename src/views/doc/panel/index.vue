<template>
  <el-card>
    <template #header>
      <span style="font-size: 5vh">{{ docInfo?.theme }}</span>
    </template>
    <div class="card-body">
      <div>
        <el-button
          icon="Tools"
          size="small"
          link
          @click="authorChange = !authorChange"
        ></el-button>
        <template v-if="!authorChange">
          <input type="text" v-model="docInfo.author" />
        </template>
        <template v-for="item in authors" v-if="authorChange">
          <span>{{ item }}</span>
          &nbsp;
        </template>
      </div>
      <div>
        <el-button
          icon="Tools"
          size="small"
          link
          @click="keywordsChange = !keywordsChange"
        ></el-button>
        <template v-if="!keywordsChange">
          <input type="text" v-model="docInfo.keyword" />
        </template>
        <template v-if="keywordsChange" v-for="item in keywords">
          <span>{{ item }}</span>
          &nbsp;
        </template>
      </div>
      <div>
        <el-button
          icon="Tools"
          size="small"
          link
          @click="digestChange = !digestChange"
        ></el-button>
        <template v-if="!digestChange">
          <textarea v-model="docInfo.digest" />
        </template>
        <template v-if="digestChange">
          <span>{{ docInfo.digest }}</span>
        </template>
      </div>
    </div>
    <template #footer>
      <el-button type="warning" @click="changeDoc()">修改</el-button>
      <el-button @click="download()">下载</el-button>
      <span style="font-size: 1vh; margin-left: 5px">{{ docInfo.uuid }}</span>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { changeDocByUuid, docByUuid, downloadDoc } from '@/api/doc';
import { doc } from '@/api/doc/type';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let docInfo = ref<doc>({
  theme: '',
  author: '',
  keyword: '',
  digest: '',
  id: 0,
  uuid: '',
  suffix: '',
});
let authors = ref<string[]>(['']);
let keywords = ref<string[]>(['']);
let $router = useRouter();
let authorChange = ref<boolean>(true);
let keywordsChange = ref<boolean>(true);
let digestChange = ref<boolean>(true);

onMounted(() => {
  getDoc();
});

const getDoc = async () => {
  let res = await docByUuid($router.currentRoute.value.query.uuid);
  if ((res.code = 200)) {
    docInfo.value = res.data;
  } else {
    ElMessage({
      type: 'error',
      message: res.msg,
    });
  }
  authors.value = docInfo.value.author.split(';');
  keywords.value = docInfo.value.keyword.split(';');
};

const changeDoc = async () => {
  let res = await changeDocByUuid(docInfo.value);
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '修改成功',
    });
  }
};

const download = () => {
  if (docInfo.value?.uuid) {
    let info = docInfo.value;
    downloadDoc(
      info?.theme as string,
      info?.uuid as string,
      info?.suffix as string,
    );
  }
};
</script>

<style scoped lang="scss">
.card-body {
  span {
    display: inline-block;
    font-size: 3vh;
    margin-top: 2vh;
  }
  input {
    display: inline-block;
    font-size: 3vh;
    margin-top: 2vh;
  }
}
</style>
