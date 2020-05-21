export interface TableListItem {
  id: number;
  gmtCreate:Date;
  gmtModify:Date;
  siteId: string;
  siteName: string;
  customerId:string;
  detailAddress:string;
  siteType:string;
  ironTowerCheck:string;
  homeCity: string;
  homeDistrict: string;
  homeGrid: string;
  powerStationName: string;
  year: number;
  liantongApportionmentRatio: number;
  monthlyElectricityFeeAmount1: number;
  monthlyElectricityFeeFee1: number;
  monthlyElectricityFeeSiteAmount1: number;
  monthlyElectricityFeeSiteFee1: number;
  monthlyElectricityFeeAmount2: number;
  monthlyElectricityFeeFee2: number;
  monthlyElectricityFeeSiteAmount2: number;
  monthlyElectricityFeeSiteFee2: number;
  monthlyElectricityFeeAmount3: number;
  monthlyElectricityFeeFee3: number;
  monthlyElectricityFeeSiteAmount3: number;
  monthlyElectricityFeeSiteFee3: number;
  monthlyElectricityFeeAmount4: number;
  monthlyElectricityFeeFee4: number;
  monthlyElectricityFeeSiteAmount4: number;
  monthlyElectricityFeeSiteFee4: number;
  monthlyElectricityFeeAmount5: number;
  monthlyElectricityFeeFee5: number;
  monthlyElectricityFeeSiteAmount5: number;
  monthlyElectricityFeeSiteFee5: number;
  monthlyElectricityFeeAmount6: number;
  monthlyElectricityFeeFee6: number;
  monthlyElectricityFeeSiteAmount6: number;
  monthlyElectricityFeeSiteFee6: number;
  monthlyElectricityFeeAmount7: number;
  monthlyElectricityFeeFee7: number;
  monthlyElectricityFeeSiteAmount7: number;
  monthlyElectricityFeeSiteFee7: number;
  monthlyElectricityFeeAmount8: number;
  monthlyElectricityFeeFee8: number;
  monthlyElectricityFeeSiteAmount8: number;
  monthlyElectricityFeeSiteFee8: number;
  monthlyElectricityFeeAmount9: number;
  monthlyElectricityFeeFee9: number;
  monthlyElectricityFeeSiteAmount9: number;
  monthlyElectricityFeeSiteFee9: number;
  monthlyElectricityFeeAmount10: number;
  monthlyElectricityFeeFee10: number;
  monthlyElectricityFeeSiteAmount10: number;
  monthlyElectricityFeeSiteFee10: number;
  monthlyElectricityFeeAmount11: number;
  monthlyElectricityFeeFee11: number;
  monthlyElectricityFeeSiteAmount11: number;
  monthlyElectricityFeeSiteFee11: number;
  monthlyElectricityFeeAmount12: number;
  monthlyElectricityFeeFee12: number;
  monthlyElectricityFeeSiteAmount12: number;
  monthlyElectricityFeeSiteFee12: number;
  totalElectricityFee: number;
  totalElectricityAmount: number;
  totalSiteElectricityFee: number;
  totalSiteElectricityAmount: number;
  siteStatus: string;
  supplyType: string;
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
  customerId?: string;
  detailAddress?: string;
  siteType ?: string;
  ironTowerCheck?: string;
  homeCity?: string;
  homeDistrict?: string;
  homeGrid?: string;
  powerStationName?:string;
  year:number;
  siteStatus:number;
  supplyType:number;
}
