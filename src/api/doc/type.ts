// 文献相关api
export interface uploadDocForm {
  theme: string;
  author: string;
  digest: string;
  keyword: string;
  file: Blob | null;
}

export interface doc {
  id: number;
  uuid: string;
  theme: string;
  author: string;
  digest: string;
  keyword: string;
  suffix: string;
}

interface docList {
  total: number;
  pages: number;
  list: doc[];
}

export interface responseDocList {
  code: number;
  msg: string;
  data: docList;
}

export interface responseDoc {
  code: number;
  msg: string;
  data: doc;
}

//通过uuid修改文献内容
export interface reqChangeDocByUuid {
  author: string;
  keyword: string;
  uuid: string;
  digest: string;
}

export interface responseBasic {
  code: number;
  msg: string;
}

//检索条件
export interface reqBasicSearch {
  pageNo: number;
  pageSize: number;
  belong: string;
  items: basicSearchItem[];
}

interface basicSearchItem {
  linkWay: string;
  key: string;
  value: string;
}
