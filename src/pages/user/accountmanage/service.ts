import request from 'umi-request';
import { TableListParams } from './data';
import { userCity } from '@/models/consts';


export async function queryAccount(params?: TableListParams) {
  return request('/api/v1/manager/account/query', {
    params,
  });
}

export async function addAccount(params: TableListParams) {
  return request('/api/v1/manager/account/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateAccount(params: TableListParams) {
  return request('/api/v1/manager/account/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
