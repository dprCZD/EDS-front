import {downloadExcel} from "../services/download";


export interface DownloadParams {
  fileName:string
  excelType:number
}
export const downloadUrl="api/v1/file/downloadExcel?excelType=0&fileName=";

export default {
  namespace: 'download',

  state: {},

  effects: {

  },

  reducers: {},
}
