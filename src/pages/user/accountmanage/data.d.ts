export interface TableListItem {
  id: number;
  bureauId: string;
  bureauName: string;
  createDate:string;
  clientId:string;
  remark1:string;
  remark2:string;
  bureauType: string;
  bureauStatus: string;
  supplyType: string;
  bureauRight: string;
  firstLevelNameOwn: string;
  secondLevelNameOwn: string;
  threeLevelNameOwn: string;
  bureauAddr: string;
  benchmarkType: string;
  benchmarkState: string;
  electricA: string;
  powerKw: string;
  airPowerKw: string;
  stationEqu: string;
  dayAvg: string;
  zpNum: string;
  zsNum: string;
  geographyJd: string;
  geographyWd: string;
  logicNum: string;
  areaPerson: string;
  bureauLevel: string;
  baseLevel: string;
  boardRoom: string;
  engineRoom: string;
  buildingType: string;
  bureauEreWay: string;
  fixedLine: string;
  mobile2g: string;
  mobile3g: string;
  mobile4g: string;
  professWy: string;
  fiveLevelNameOwn: string;
  remark4: string;
  remark5: string;



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
  bureauType?: string;
  bureauStatus?: string;
  firstLevelNameOwn ?: string;
  secondLevelNameOwn?: string;
  threeLevelNameOwn?: string;
  pageSize?: number;
  currentPage?: number;
}
