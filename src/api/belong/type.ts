// 所属列表
export interface belong {
  id: number;
  description: string;
  name: string;
}

export interface belongListResponseData {
  code: number;
  msg: string;
  data: belong[];
}
