import request from '@/utils/request';
import {DownloadParams} from "../models/download";


export async function downloadExcel(params?:DownloadParams) {
  const response=request('/api/v1/file/downloadExcel', {
    method:'POST',
    params,
  });
  return response;
}
