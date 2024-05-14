<template>
  <el-card class="box-card">
    <el-card
      class="card-item"
      v-for="(item, index) in belongList"
      :key="index"
      shadow="never"
    >
      <template #header>
        <div class="card-header">
          <span>{{ item.name }}</span>
        </div>
      </template>
      {{ item.description }}
    </el-card>
  </el-card>
</template>

<script setup lang="ts">
import { reqBelongList } from '@/api/belong';
import { belong } from '@/api/belong/type';
import { onMounted, ref } from 'vue';

let belongList = ref<belong[]>();

onMounted(() => {
  getBelongList();
});

const getBelongList = async () => {
  let res = await reqBelongList();
  belongList.value = res.data;
};
</script>

<style scoped lang="scss">
.box-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
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
  .card-item {
    margin: 10px;
    display: inline-block;
    box-shadow: null;
    width: 300px;
    height: 200px;
  }
}
</style>
