import request from 'umi-request';
import { TableListParams } from './data.d';
import { userId } from '@/models/consts';


export async function queryRule(params?: TableListParams) {
  const response=request('/api/v1/task/paged', {
    params,
  });
  return response;
}



