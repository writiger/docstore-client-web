<template>
  <el-card>
    <template #header>
      <span style="font-size: 5vh">{{ docInfo?.theme }}</span>
    </template>
    <div class="card-body">
      <div>
        <template v-for="item in authors">
          <span>{{ item }}</span>
          &nbsp;
        </template>
      </div>
      <div>
        <template v-for="item in keywords">
          <span>{{ item }}</span>
          &nbsp;
        </template>
      </div>
      <div>
        <template>
          <textarea v-model="docInfo.digest" />
        </template>
        <template>
          <span>{{ docInfo.digest }}</span>
        </template>
      </div>
    </div>
    <template #footer>
      <el-button @click="download()">下载</el-button>
      <span style="font-size: 1vh; margin-left: 5px">{{ docInfo.uuid }}</span>
      <br />
      <el-input v-model="commentForm.content"></el-input>
      <el-button @click="uploadComment">发送</el-button>
      <el-button @click="sendComment(0, '')">重置</el-button>
      <!-- 显示评论 -->
      <div class="father-comment" v-for="comment in commentMyList">
        <span class="username">{{ comment.userName }}</span>
        <br />
        <span class="content">
          &nbsp;{{ comment.content }}
          <el-button link @click="sendComment(comment.id, comment.userName)">
            回复
          </el-button>
        </span>
        <br />
        <div v-for="child in comment.child">
          <span class="username child">{{ child.userName }}</span>
          <br />
          <span class="content child">
            &nbsp;{{ child.content }}
            <el-button link @click="sendComment(child.id, child.userName)">
              回复
            </el-button>
          </span>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { reqCommentDocList, reqCommentUpload } from '@/api/comment';
import { commentMy, uploadCommentForm } from '@/api/comment/type';
import { docByUuid, downloadDoc } from '@/api/doc';
import { doc } from '@/api/doc/type';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useRouter } from 'vue-router';
const { params } = useRoute();

let docInfo = ref<doc>({
  theme: '',
  author: '',
  keyword: '',
  digest: '',
  id: 0,
  uuid: '',
  suffix: '',
});
let commentForm = ref<uploadCommentForm>({
  to: 0,
  root: 0,
  content: '',
  uuid: '',
});
let authors = ref<string[]>(['']);
let keywords = ref<string[]>(['']);
let $router = useRouter();
let commentMyList = ref<commentMy[]>();
let pageNo = ref(1);
let pageSize = ref(10);
let total = ref<number>(0);

onMounted(() => {
  getDoc();
  getComment();
});

const getDoc = async () => {
  let res = await docByUuid(params.uuid);
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

const getComment = async () => {
  let res = await reqCommentDocList(pageNo.value, pageSize.value, params.uuid);
  if (res.code == 200) {
    commentMyList.value = res.data.list;
    total.value = res.data.total;
  }
};

const sendComment = async (to: number, name: string, content: string) => {
  if (name != '') {
    commentForm.value.content = `@${name}:`;
  } else {
    commentForm.value.content = '';
  }
  if (content) {
    commentForm.value.content = content;
  }
  commentForm.value.to = to;
  commentForm.value.uuid = params.uuid;
};

const uploadComment = async () => {
  sendComment(
    commentForm.value.to,
    commentForm.value.uuid,
    commentForm.value.content,
  );
  console.log(commentForm.value);
  let res = await reqCommentUpload(commentForm.value);
  if (res.code == 200) {
    ElMessage({
      message: '上传成功',
      type: 'success',
    });
    $router.go(0);
  } else {
    ElMessage({
      message: res.msg,
      type: 'error',
    });
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
.father-comment {
  margin-top: 15px;
  display: block;
  .username {
    color: $color-bright;
  }
  .content {
    display: block;
    margin-top: 15px;
    font-size: larger;
  }
  .child {
    margin-left: 20px;
    font-size: small;
  }
}
</style>
