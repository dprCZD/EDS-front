export interface TableListItem {
  id: string;
  name: string;
  operatorId: string;
  operatorName: string;
  type: number;
  status: number;
  progress: string;
  gmtCreate:Date,
  gmtModify:Date,
  attributes: Attributes;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface Attributes {
  fileName: string;

}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  id:string;
  name: string;
  operatorId: string;
  operatorName: string;
  type: string;
  status: string;
  pageSize?: number;
  currentPage?: number;
}
