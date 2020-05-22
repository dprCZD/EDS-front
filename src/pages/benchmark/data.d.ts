export interface TableListItem {
  id: number;
  gmtCreate:Date;
  gmtModify:Date;
  bureauId:number;
  bureauName:string;
  dataId:string;
  operDate: Date;
  temporaryMarkDl:string;
  temporaryMarkDf: string;
  systemMarkDl: string;
  systemMarkDf: string;
  approvedMarkDl: number;
  approvedMarkDf: number;
  meterDataNomal: number;
  dataUsefull: number;
  invoiceMark: number;
  meterMark: number;
  dcMark: string;
  acMark: string;

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
  bureauId?: string;
  bureauName?: string;
  homeCity?: string;
  homeDistrict?: string;
  homeGrid?: string;
}

export interface MarkConfigItem {
  markTime?: Date;
  meterMarkFormula?: string;
  dcMarkFormula?: string;
  acMarkFormula?: string;
  meterMarkFormulaValue?: number;
  dcMarkFormulaValue?: number;
  acMarkFormulaValue?: number;
  outOfElecFee?:number;
  priceMark?:number;

}
