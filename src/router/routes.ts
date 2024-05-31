import { USER_LEVEL } from '@/enum/user';

export const constantRoute = [
  {
    path: '/forget/:code',
    component: () => import('@/views/login/components/forget.vue'),
    name: 'forget',
    meta: {
      title: '忘记密码',
      hidden: true,
    },
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  // 文献面板
  {
    path: '/show',
    component: () => import('@/layout/index.vue'),
    name: 'showF',
    children: [
      {
        name: 'show',
        path: '/show/:uuid',
        component: () => import('@/views/show/index.vue'),
        meta: {
          title: '文献面板',
          hidden: true,
          icon: 'Memo',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: '任意',
      hidden: true,
      icon: 'share',
    },
  },
];

const rootRoute = [
  // 用户管理
  {
    path: '/user',
    name: 'user',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '用户管理',
      hidden: false,
      icon: 'Avatar',
    },
    children: [
      {
        path: '/user/list',
        component: () => import('@/views/user/userlist/index.vue'),
        name: 'userlist',
        meta: {
          title: '用户列表',
          hidden: false,
          icon: 'Stamp',
        },
      },
      {
        path: '/user/new',
        component: () => import('@/views/user/newuser/index.vue'),
        name: 'new',
        meta: {
          title: '新增用户',
          hidden: false,
          icon: 'User',
        },
      },
    ],
  },
  // 所属管理
  {
    path: '/belong',
    component: () => import('@/layout/index.vue'),
    name: 'belongF',
    children: [
      {
        name: 'belong',
        path: '/belong',
        component: () => import('@/views/region/index.vue'),
        meta: {
          title: '所属管理',
          hidden: false,
          icon: 'Location',
        },
      },
    ],
  },
];

const adminRoute = [
  // 文献管理
  {
    path: '/doc',
    name: 'doc',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '文献管理',
      hidden: false,
      icon: 'Files',
    },
    children: [
      {
        path: '/doc/add',
        component: () => import('@/views/doc/adddoc/index.vue'),
        name: 'add',
        meta: {
          title: '新增文献',
          hidden: false,
          icon: 'DocumentAdd',
        },
      },
      {
        path: '/doc/list',
        component: () => import('@/views/doc/doclist/index.vue'),
        name: 'doclist',
        meta: {
          title: '文献列表',
          hidden: false,
          icon: 'DocumentCopy',
        },
      },
      {
        path: '/doc/panel',
        component: () => import('@/views/doc/panel/index.vue'),
        name: 'docPanel',
        meta: {
          title: '修改文献',
          hidden: false,
          icon: 'DocumentChecked',
        },
      },
    ],
  },
  // 评论管理
  {
    path: '/comment',
    component: () => import('@/layout/index.vue'),
    name: 'commentF',
    children: [
      {
        name: 'comment',
        path: '/comment',
        component: () => import('@/views/comment/index.vue'),
        meta: {
          title: '评论管理',
          hidden: false,
          icon: 'Comment',
        },
      },
    ],
  },
  // 用户管理
  {
    path: '/user',
    name: 'user',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '用户管理',
      hidden: false,
      icon: 'Avatar',
    },
    children: [
      {
        path: '/user/list',
        component: () => import('@/views/user/userlist/index.vue'),
        name: 'userlist',
        meta: {
          title: '用户列表',
          hidden: false,
          icon: 'Stamp',
        },
      },
      {
        path: '/user/new',
        component: () => import('@/views/user/newuser/index.vue'),
        name: 'new',
        meta: {
          title: '新增用户',
          hidden: false,
          icon: 'User',
        },
      },
    ],
  },
];

const normalRoute = [
  // 个人资料
  {
    path: '/perself',
    component: () => import('@/layout/index.vue'),
    name: 'perself',
    meta: {
      title: '账号设置',
      hidden: false,
      icon: 'UserFilled',
    },
    children: [
      {
        path: '/perself/info',
        component: () => import('@/views/perself/myinfo/index.vue'),
        name: 'info',
        meta: {
          title: '个人资料',
          hidden: false,
          icon: 'Tools',
        },
      },
      {
        path: '/perself/history',
        component: () => import('@/views/perself/history/index.vue'),
        name: 'history',
        meta: {
          title: '搜索历史',
          hidden: false,
          icon: 'VideoCameraFilled',
        },
      },
    ],
  },
  // 文献检索
  {
    path: '/search',
    component: () => import('@/layout/index.vue'),
    name: 'search',
    meta: {
      title: '文献检索',
      hidden: false,
      icon: 'Aim',
    },
    children: [
      {
        path: '/search/easy',
        component: () => import('@/views/search/easy/index.vue'),
        name: 'easy',
        meta: {
          title: '简单搜索',
          hidden: false,
          icon: 'HelpFilled',
        },
      },
      {
        path: '/search/basic',
        component: () => import('@/views/search/basic/index.vue'),
        name: 'basic',
        meta: {
          title: '条件搜索',
          hidden: false,
          icon: 'Grid',
        },
      },
    ],
  },
];

export const getAddRoute = (level: USER_LEVEL) => {
  switch (level) {
    case USER_LEVEL.ROOT: {
      return rootRoute;
    }
    case USER_LEVEL.ADMIN: {
      return adminRoute;
    }
    case USER_LEVEL.NORMAL: {
      return normalRoute;
    }
  }
};
