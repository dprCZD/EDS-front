import request from '@/utils/request';
import md5 from "md5";

export async function accountLogin(params) {
  const login=params;
  login.password=md5(login.password);
  return request('/api/auth/login', {
    method: 'POST',
    data: login,
  });
}

export async function accountLogout() {
  return request('/api/auth/logout', {
    method: 'GET',
  });
}

export async function queryCurrent() {
  return request('/api/auth/query', {
    method: 'GET',
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
