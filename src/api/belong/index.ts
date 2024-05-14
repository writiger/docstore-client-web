//统一管理所属相关接口
import request from '@/utils/request';
import { belongListResponseData } from './type';

enum API {
  BELONG_LIST = '/belong/list',
}

export const reqBelongList = () =>
  request.get<any, belongListResponseData>(API.BELONG_LIST);
