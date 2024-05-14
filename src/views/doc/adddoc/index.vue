<template>
  <el-form label-width="auto" style="max-width: 600px">
    <el-form-item label="主题">
      <el-input v-model="docFormData.theme" />
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="docFormData.author" />
    </el-form-item>
    <el-form-item label="摘要">
      <el-input v-model="docFormData.digest" />
    </el-form-item>
    <el-form-item label="关键词">
      <el-input v-model="docFormData.keyword" />
    </el-form-item>
    <el-form-item label="文章上传">
      <el-upload
        v-model:file-list="docFormData.file"
        action="none"
        :limit="1"
        :auto-upload="false"
        with-credentials
      >
        <el-button type="primary">点击上传文章</el-button>
        <template #tip>
          <div class="el-upload__tip">文件应小于10MB</div>
        </template>
      </el-upload>
    </el-form-item>
    <el-button @click="upload">上传文献</el-button>
  </el-form>
</template>

<script setup lang="ts">
import { uploadDocForm } from '@/api/doc/type.ts';
import { reqUploadDoc } from '@/api/doc/index.ts';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

let docFormData = ref<uploadDocForm>({
  theme: '',
  author: '',
  keyword: '',
  digest: '',
  file: '',
});

const upload = async () => {
  let formData = new FormData();
  formData.append('theme', docFormData.value.theme);
  formData.append('author', docFormData.value.author);
  formData.append('keyword', docFormData.value.keyword);
  formData.append('digest', docFormData.value.digest);
  formData.append('file', docFormData.value.file[0].raw);

  // formData可以添加同名数据，在获取的时候可根据名称获得所有key为该名称的数据。
  // formOptions.data.addFileList.forEach((v) => {
  //   formData.append('addFiles', v.raw);
  // });
  // console.log(formData);
  let res = await reqUploadDoc(formData);
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '文件上传成功',
    });
  }
};
</script>

<style scoped lang="scss"></style>
