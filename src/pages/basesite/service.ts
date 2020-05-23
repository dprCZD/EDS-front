import request from 'umi-request';
import { TableListParams } from './data.d';
import { userCity } from '@/models/consts';


export async function querySite(params?: TableListParams) {
  return request('/api/v1/baseSite/paged', {
    params,
  });
}

export async function removeSite(params: { key: number[] }) {
  return request('/api/v1/baseSite/delete', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addSite(params: TableListParams) {
  return request('/api/v1/baseSite/insert', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function generateSite(params: TableListParams) {

  return request('/api/v1/baseSite/generate', {
      params,});
}

export async function updateRule(params: TableListParams) {
  return request('/api/v1/baseSite/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
