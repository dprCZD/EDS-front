import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule} from './service';
import { downloadExcel }from'@/services/download'
import {downloadUrl} from "../../models/download";





const TableList: React.FC<{}> = () => {

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '任务ID',
      dataIndex: 'id',
    },
    {
      title: '任务名称',
      dataIndex: 'name',
    },
    {
      title: '操作人id',
      dataIndex: 'operatorId',
    },

    {
      title: '操作人名称',
      dataIndex: 'operatorName',
    },
    {
      title: '操作类型',
      dataIndex: 'type',
    },
    {
      title: '任务状态',
      dataIndex: 'status',
    },
    {
      title: '执行进度',
      dataIndex: 'progress',
    },
    {
      title: '任务状态',
      dataIndex: 'status',
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      valueType:'date',

    },
    {
      title: '更新时间',
      dataIndex: 'gmtModify',
      valueType:'date',

    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a href={downloadUrl+record.attributes.fileName} hidden={record.type!='生成EXCEL'||record.status!='执行成功'||
            new Date().getTime()-record.gmtCreate>=2160000000}>
            下载
          </a>
          <Divider type="vertical" />
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="系统任务"
        actionRef={actionRef}
        rowKey="key"
        request={(params) => {
          return queryRule(params);
        }}
        columns={columns}
        rowSelection={{}}
      />

    </PageHeaderWrapper>
  );
};

export default TableList;
