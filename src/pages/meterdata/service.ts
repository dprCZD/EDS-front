import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryMeter(params?: TableListParams) {
  return request('/api/v1/meterData/paged', {
    params,
  });
}

export async function removeMeter(params: { key: number[] }) {
  return request('/api/v1/meterData/delete', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addMeter(params: TableListParams) {
  return request('/api/v1/meterData/insert', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function generateMeter(params: TableListParams) {

  return request('/api/v1/meterData/generate', {
      params,});
}

export async function updateMeter(params: TableListParams) {
  return request('/api/v1/meterData/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
