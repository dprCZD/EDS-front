export interface TableListItem {
  id: number;
  gmtCreate:Date;
  gmtModify:Date;
  billId: string;
  creator: string;
  department:string;
  billDate:Date;
  template: string;
  bizType: string;
  billAmount: number;
  applyAmount: number;
  currency: string;
  approval: string;
  supplierName: string;
  contractId: string;
  contractName: string;
  operator: string;
  accountant: string;
  annexNum: string;
  reiburseId: string;
  totalAccountDate: Date;
  billType: string;
  supplierType: string;
  receiverName: string;
  receiverId: string;
  receiverBank: string;

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

  id?: number;
  billId?: string;
  department?: string;
  bizType?: string;
  creator?: string;

}
