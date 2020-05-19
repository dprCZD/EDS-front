import request from '@/utils/request';

export async function accountLogin(params) {
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
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
