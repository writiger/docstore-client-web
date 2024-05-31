// 文献相关接口
import request from '@/utils/request';
import {
  reqBasicSearch,
  reqChangeDocByUuid,
  responseBasic,
  responseDoc,
  responseDocList,
} from './type';
import { basicResponseData } from '../user/type';
import { da } from 'element-plus/es/locale';

enum API {
  UPLOAD_URL = '/doc/upload',
  DOC_LIST = '/doc/search/list',
  DOC_LIST_EASY = '/doc/search/easy',
  DOC_LIST_BASIC = '/doc/search/basic',
  DOC_MANAGE_LIST = '/doc/manage/list',
  DOC_MANAGE_LIST_LIKE = '/doc/manage/like',
  DOC_UUID = '/doc/search',
  DOC_CHANGE_UUID = '/doc',
  DOC_DELETE = '/doc',
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

export const reqBasicSearchDoc = (data: reqBasicSearch) =>
  request.post<any, any>(API.DOC_LIST_BASIC, data);

//管理文献列表
export const reqManageDocList = (page: number, limit: number) =>
  request.get<any, responseDocList>(
    API.DOC_MANAGE_LIST + `?pageNo=${page}&pageSize=${limit}`,
  );

//模糊管理文献列表
export const reqManageDocListLike = (
  page: number,
  limit: number,
  col: string,
) =>
  request.get<any, responseDocList>(
    API.DOC_MANAGE_LIST_LIKE + `/${col}?pageNo=${page}&pageSize=${limit}`,
  );

//下载
export const downloadDoc = (fileName: string, uuid: string, suffix: string) => {
  request
    .post(
      '/file/download',
      {
        uuid,
        suffix,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      },
    )
    .then((res) => {
      let link = document.createElement('a');
      link.style.display = 'none';
      const url = window.URL || window.webkitURL;
      link.href = url.createObjectURL(res as unknown as Blob);
      link.download = fileName + suffix; //下载的文件名称
      link.click();
      window.URL.revokeObjectURL(url as unknown as string);
    });
};

//通过uuid查询文献
export const docByUuid = (uuid: string) =>
  request.get<any, responseDoc>(API.DOC_UUID + `/${uuid}`);

//通过uuid修改文献
export const changeDocByUuid = (data: reqChangeDocByUuid) =>
  request.put<any, responseBasic>(API.DOC_CHANGE_UUID, data);

//通过uuid删除文献
export const deleteDocByUuid = (uuid: string) =>
  request.delete<any, basicResponseData>(API.DOC_DELETE + `/${uuid}`);
