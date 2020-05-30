import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {Divider, Typography,} from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule} from './service';
import {downloadUrl} from "../../models/download";
import {connect} from "umi";
import {CurrentUser} from "../user/data";



const {Paragraph}=Typography;
const { Text } = Typography;

const content = (
  <>
    <Paragraph>
      所有的计算任务，分析任务，录入任务，上传下载任务，生成任务均可在这里查看。其中分析任务，生成任务完成后可下载Excel报告。
    </Paragraph>
  </>
);

const TableList: React.FC<{}> = (props) => {

  const  { currentUser }=props;


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
      hideInSearch:currentUser.authority!=0,

    },

    {
      title: '操作人名称',
      dataIndex: 'operatorName',
      hideInSearch:true,
    },
    {
      title: '操作类型',
      dataIndex: 'type',
      valueEnum: {
        0: { text: '默认任务', status: '默认任务' },
        11: { text: '上传EXCEL', status: '上传EXCEL' },
        12: { text: '录入EXCEL', status: '录入EXCEL' },
        13: { text: '生成EXCEL', status: '生成EXCEL' },
        14: { text: '下载EXCEL', status: '下载EXCEL' },
        15: { text: '计算任务', status: '计算任务' },
        16: { text: '分析任务', status: '分析任务' },


      },
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '创建', status: '创建' },
        1: { text: '执行中', status: '执行中' },
        2: { text: '执行成功', status: '执行成功' },
        9: { text: '执行失败', status: '执行失败' },
      },
    },
    {
      title: '执行进度',
      dataIndex: 'progress',
      hideInSearch:true,

    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      valueType:'dateTime',
      hideInSearch:true,

    },
    {
      title: '更新时间',
      dataIndex: 'gmtModify',
      valueType:'dateTime',
      hideInSearch:true,

    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a href={downloadUrl+record.attributes.fileName} hidden={(record.type!=13&&record.type!=16)||record.status!=2||
            new Date().getTime()-record.gmtCreate>=2160000000}>
            下载
          </a>
          <Divider type="vertical" />
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper content={content}>
      <ProTable<TableListItem>
        headerTitle="系统任务"
        actionRef={actionRef}
        rowKey="id"
        request={(params) => {
           if(currentUser.authority!=0){
             params.operatorId=currentUser.id;
           }
          return queryRule(params);
        }}
        columns={columns}
        rowSelection={{}}
      />

    </PageHeaderWrapper>
  );
};

export default connect(
  ({
     login,
   }: {
    login: {
      currentUser: CurrentUser;
    };
  }) => ({
    currentUser: login.currentUser,
  }),
)(TableList);
