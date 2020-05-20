import { stringify } from 'querystring';
import { history } from 'umi';
import { accountLogin,accountLogout,queryCurrent } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import {userCity, userId} from "./consts";

const authorityMap = {
  0: 'admin',
  1: 'user',
  2: 'user',
  3: 'user',
};
const Model = {
  namespace: 'login',
  state: {
    currentUser:{},
    status:[],
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      if(response.success){
        sessionStorage.setItem(userId,response.data.id);
        sessionStorage.setItem(userCity,response.data.city);
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
      }
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
      sessionStorage.removeItem(userId);
      if (window.location.pathname !== '/user/login') {
        history.replace({
          pathname: '/user/login',
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      const  loginStatus=payload.success?'ok':'error';
      const authority=authorityMap[payload.data.authority];
      console.log(authority);
      setAuthority(authority);
      return { ...state, currentUser: payload.data,status:loginStatus};
    },

    saveCurrentUser(state, { payload }){

      return { ...state, currentUser: payload};
    },

    removeLoginStatus(state) {
      setAuthority(undefined);
      return { ...state};
    },
  },
};
export default Model;
