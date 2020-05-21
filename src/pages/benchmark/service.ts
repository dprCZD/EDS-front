import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryMark(params?: TableListParams) {
  return request('/api/v1/benchMark/paged', {
    params,
  });
}

export async function removeMark(params: { key: number[] }) {
  return request('/api/v1/benchMark/delete', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function caculateMark(params: TableListParams) {
  return request('/api/v1/benchMark/batchCalculate', {
    method: 'GET',
    data: {
      ...params,
    },
  });
}

export async function getMarkConfig() {
  return request('/api/v1/benchMark/config/get', {
    method: 'GET',
  });
}

export async function generateMark(params: TableListParams) {

  return request('/api/v1/benchMark/generate', {
      params,});
}

export async function updateMark(params: TableListParams) {
  return request('/api/v1/benchMark/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
