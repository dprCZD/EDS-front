export interface TableListItem {
  id: number;
  gmtCreate:Date;
  gmtModify:Date;
  billingPeriod:number;
  processId:string;
  siteId: string;
  siteName: string;
  customerId:string;
  meterId:string;
  homeCity: string;
  homeDistrict: string;
  homeGrid: string;
  meterDataPeak: number;
  meterDataValley: number;
  meterDataNomal: number;
  meterReader: number;
  meterReadDate: Date;
  meterNumber: number;
  meterReadPeriod: number;
  siteType: string;
  processCode: string;
  meterReadWay: string;
  alternatingCurrentA: number;
  alternatingCurrentB: number;
  alternatingCurrentC: number;
  directCurrentTotal: number;
  electricCurrentLiantong: number;
  electricCurrentYidong: number;
  electricCurrentDianxing: number;
}


export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  billingPeriod?:number;
  processId?:string;
  siteId?: string;
  siteName?: string;
  customerId?: string;
  meterId?: string;
  meterReader ?: string;
  homeCity?: string;
  homeDistrict?: string;
  homeGrid?: string;
}
