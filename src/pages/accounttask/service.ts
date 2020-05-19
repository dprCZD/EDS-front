import request from 'umi-request';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  params.operatorId=sessionStorage.getItem("userId");
  const response=request('/api/v1/task/paged', {
    params,
  });
  return response;
}



