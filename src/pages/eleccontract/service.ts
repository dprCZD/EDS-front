import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryContract(params?: TableListParams) {
  return request('/api/v1/elecContract/paged', {
    params,
  });
}

export async function removeContract(params: { key: number[] }) {
  return request('/api/v1/elecContract/delete', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addContract(params: TableListParams) {
  return request('/api/v1/elecContract/insert', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function generateContract(params: TableListParams) {

  return request('/api/v1/elecContract/generate', {
      params,});
}

export async function updateContract(params: TableListParams) {
  return request('/api/v1/elecContract/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
