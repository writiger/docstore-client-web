// 评论相关接口
import request from '@/utils/request';
import { commentListResponse, uploadCommentForm } from './type';
enum API {
  COMMENT_LIST_DOC = '/comment/search',
  COMMENT_UPLOAD = '/comment',
}

//获取文献评论
export const reqCommentDocList = (
  pageNo: number,
  pageSize: number,
  uuid: string,
) =>
  request.get<any, commentListResponse>(
    API.COMMENT_LIST_DOC + `/${uuid}?pageNo=${pageNo}&pageSize=${pageSize}`,
  );

//上传文献
export const reqCommentUpload = (data: uploadCommentForm) =>
  request.post<any, any>(API.COMMENT_UPLOAD, data);
