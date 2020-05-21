import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryFee(params?: TableListParams) {
  return request('/api/v1/electricityFee/paged', {
    params,
  });
}

export async function removeFee(params: { key: number[] }) {
  return request('/api/v1/electricityFee/delete', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addFee(params: TableListParams) {
  return request('/api/v1/electricityFee/insert', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function generateFee(params: TableListParams) {

  return request('/api/v1/electricityFee/generate', {
      params,});
}

export async function updateFee(params: TableListParams) {
  return request('/api/v1/electricityFee/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
