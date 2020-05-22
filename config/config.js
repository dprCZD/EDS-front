// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/accounttask',
            },
            {
              name: '个人信息',
              icon: 'smile',
              path: '/account/accountsettings',
              component: './user/AccountSettings',
            },
            {
              name: '用户管理',
              icon: 'smile',
              path: '/account/accountmanage',
              component: './user/accountmanage',
              authority: ['admin'],
            },
            {
              name: '系统任务',
              icon: 'smile',
              path: '/accounttask',
              component: './accounttask',
            },
            {
              name: '标杆信息',
              icon: 'smile',
              path: '/benchmark',
              component: './benchmark',
            },
            {
              name: '数据分析',
              icon: 'smile',
              path: '/dataanalysis',
              component: './dataanalysis',
            },
            {
              name: '数据维护',
              icon: 'smile',
              routes: [
                {
                  name: '局站基础信息',
                  icon: 'smile',
                  path: '/basesite',
                  component: './basesite',
                },
                {
                  name: '电费电量信息',
                  icon: 'smile',
                  path: '/electricityfee',
                  component: './electricityfee',
                },
                {
                  name: '抄表信息',
                  icon: 'smile',
                  path: '/meterdata',
                  component: './meterdata',
                },
                {
                  name: '转供电合同信息',
                  icon: 'smile',
                  path: '/eleccontract',
                  component: './eleccontract',
                },

              ],
            },

            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api/': {
      target: 'http://localhost:8080/',
      changeOrigin: true,
    },
  },
  manifest: {
    basePath: '/',
  },
});
