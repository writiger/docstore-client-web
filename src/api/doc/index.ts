// 文献相关接口
import request from '@/utils/request';
import { responseDocList, uploadDocForm } from './type';

enum API {
  UPLOAD_URL = '/doc/upload',
  DOC_LIST = '/doc/search/list',
  DOC_LIST_EASY = '/doc/search/easy',
}

//上传文献
export const reqUploadDoc = (data: any) => {
  request.defaults.headers['Content-Type'] =
    'multipart/form-data; charset=utf-8';
  request.post<any, any>(API.UPLOAD_URL, data);
};

//文献列表
export const reqDocList = (page: number, limit: number) =>
  request.get<any, responseDocList>(
    API.DOC_LIST + `?pageNo=${page}&pageSize=${limit}`,
  );

//简单文献查询
export const reqEasySearchDoc = (page: number, limit: number, col: string) =>
  request.get<any, responseDocList>(
    API.DOC_LIST_EASY + `/${col}?pageNo=${page}&pageSize=${limit}`,
  );
