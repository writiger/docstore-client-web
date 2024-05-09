import { RouteRecordRaw } from 'vue-router';
import type { userInfo } from '@/api/user/type.ts';
type RouteRecordRaw = typeof RouteRecordRaw;
//定义小仓库数据类型
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  userInfo: userInfo | null;
}
