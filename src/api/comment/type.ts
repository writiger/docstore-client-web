export interface commentMy {
  [x: string]: any;
  id: number;
  content: string;
  userId: number;
  username: string;
  createTime: string;
  isDelete: string;
  docUuid: string;
  parentId: number;
  rootParentId: number;
  child: commentMy[];
}

export interface commentListResponse {
  code: number;
  msg: string;
  data: {
    total: number;
    page: number;
    list: commentMy[];
  };
}

export interface uploadCommentForm {
  uuid: string;
  to: number;
  root: number;
  content: string;
}
