export interface TableListItem {
  id: number;
  gmtCreate:Date;
  gmtModify:Date;
  siteId: string;
  siteName: string;
  contractId:string;
  customerId:string;
  powerSupplyUinitName: string;
  powerSupplyBureauName: string;
  electricityType: string;
  electricityLevel: string;
  electricityUnitPrice: string;
  billingCycle: string;
  meterId: string;
  meterCycle: string;
  meterMagnification: string;
  contractStart: Date;
  contractEnd: Date;
  accountBank: string;
  accountBankName: string;
  accountId: string;
  homeCity: string;
  homeDistrict: string;
  homeGrid: string;
  meterOpr: string;
  meterInstallTime: Date;
  meterStartTime: Date;
  meterEndTime: Date;
  lineArea:string;
  meterArea:string;
  contractName:string;
  wrapRodPrice:string;
  contractStatus:string;

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
  siteId?: string;
  siteName?: string;
  contractId?: string;
  customerId?: string;
  meterId?: string;
  meterOpr ?: string;
  homeCity?: string;
  homeDistrict?: string;
  homeGrid?: string;
  contractStatus?:string;
}
