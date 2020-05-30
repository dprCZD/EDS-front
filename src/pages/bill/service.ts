import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryBill(params?: TableListParams) {
  return request('/api/v1/bill/paged', {
    params,
  });
}

export async function removeBill(params: { key: number[] }) {
  return request('/api/v1/bill/delete', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addBill(params: TableListParams) {
  return request('/api/v1/bill/insert', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function generateBill(params: TableListParams) {

  return request('/api/v1/bill/generate', {
      params,});
}

export async function updateBill(params: TableListParams) {
  return request('/api/v1/bill/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
