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
              redirect: '/sitedata',
            },
            {
              name: '局站信息',
              icon: 'smile',
              path: '/sitedata',
              component: './SiteData',
            },
            {
              name: '数据录入',
              icon: 'smile',
              path: '/dataentry',
              component: './DataEntry',
            },
            {
              name: '电费电量',
              icon: 'smile',
              path: '/electricityfee',
              component: './ElectricityFee',
            },
            {
              name: '标杆生成',
              icon: 'smile',
              path: '/benchmarkanalysis',
              component: './BenchmarkAnalysis',
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
  proxy:{
    '/api/':{
      target:'http://localhost:8080/',
      changeOrigin:true,
    }
  },
  manifest: {
    basePath: '/',
  },
});
