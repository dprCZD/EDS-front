import { stringify } from 'querystring';
import { history } from 'umi';
import { accountLogin,accountLogout,queryCurrent } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const authorityMap = {
  0: 'admin',
  1: 'user',
};
const Model = {
  namespace: 'login',
  state: {
    currentUser:{},
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response.data,
      }); // Login successfully
      sessionStorage.setItem("userId",response.data.id);

      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params;
      if (redirect) {
        const redirectUrlParams = new URL(redirect);

        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);

          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = '/';
          return;
        }
      }

      history.replace(redirect || '/');
    },

    *queryCurrent( _,{ call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload:response==null?null:response.data,
      });
    },

    *logout( _,{ call, put }) {

      yield call(accountLogout);
      yield put({
        type: 'removeLoginStatus',
      });
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      sessionStorage.removeItem("userId");

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      const authority=authorityMap[payload.authority];
      setAuthority(authority);
      return { ...state, currentUser: payload};
    },

    saveCurrentUser(state, { payload }){

      return { ...state, currentUser: payload};
    },

    removeLoginStatus(state) {
      setAuthority(undefined);
      return { ...state,currentUser:undefined};
    },
  },
};
export default Model;
