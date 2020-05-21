import { DownOutlined, PlusOutlined,CloudUploadOutlined,PlusSquareOutlined } from '@ant-design/icons';
import { Button, Upload, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import {TableListItem, TableListParams} from './data.d';
import {queryMark, updateMark, caculateMark, removeMark, generateMark} from './service';
import {uploadUrl} from "../../models/download";
import {connect} from "umi";
import {CurrentUser} from "../user/data";

/**
 * 添加节点
 * @param fields
 */
const handleCalculate = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    const resp=await caculateMark(fields);
    hide();
    if(!resp||!resp.success){
      return false;
    }
    message.success('添加成功');
    return true;
  } catch (error) {
    return false;
  }
};

const handleGenerateExcel = async (params:TableListParams) => {
  try{

    const resp=await generateMark(params);
    if(!resp||!resp.success){
      return false;
    }
    message.success('创建Excel生成任务成功，请到系统任务查看');
    return  true;
  }catch (error) {
    return false;
  }

};


/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');
  try {
    const resp=await updateMark(fields);
    if(!resp||!resp.success){
      return false;
    }
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeMark({
      processIdList: selectedRows.map((row) => row.processId),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = (props) => {

  const  { currentUser }=props;
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [

    {
      title: '局站编码',
      dataIndex: 'bureauId',
      key: 'bureauId',
      fixed: 'left',
      width:100,
    },
    {
      title: '局站名称',
      dataIndex: 'bureauName',
      key:'bureauName',
      width:100,
    },
    {

      title: '创建时间',
      dataIndex: 'gmtCreate',
      key:'gmtCreate',
      hideInSearch:true,
      valueType:'date',
      width:100,

    },
    {
      title: '数据有效性（0无效，1有效）',
      dataIndex: 'dataUsefull',
      hideInSearch:true,
      key:'dataUsefull',
      width:100,
    },
    {
      title: '抄表周期',
      dataIndex: 'meterReadPeriod',
      width:100,
      key:'meterReadPeriod',
      hideInSearch:true,
    },
    {
      title: '操作时间',
      dataIndex: 'operDate',
      key:'operDate',
      valueType:'date',
      hideInSearch:true,
      width:100,

    },
    {
      title: '归属地市',
      dataIndex: 'homeCity',
      key:'homeCity',
      hideInSearch:currentUser.authority>=1,
      hideInTable:true,

      width:100,


    },
    {
      title: '归属区县',
      dataIndex: 'homeDistrict',
      key:'homeDistrict',
      hideInSearch:currentUser.authority>=2,
      hideInTable:true,

      width:100,
    },
    {
      title: '归属网格',
      dataIndex: 'homeGrid',
      key:'homeGrid',
      hideInTable:true,

      width:100,


    },

    {
      title: '系统标杆电量',
      dataIndex: 'systemMarkDl',
      width:100,
      hideInSearch:true,

      key:'systemMarkDl',

    },
    {
      title: '系统标杆电费',
      dataIndex: 'systemMarkDf',
      key:'systemMarkDf',
      hideInSearch:true,

      width:100,


    },
    {
      title: '发票标杆',
      dataIndex: 'invoiceMark',
      width:100,
      key:'invoiceMark',
      hideInSearch:true,

    },
    {
      title: '抄表标杆',
      dataIndex: 'meterMark',
      width:100,
      key:'meterMark',
      hideInSearch:true,

    },
    {
      title: '直流标杆',
      dataIndex: 'dcMark',
      key:'dcMark',
      width:100,
      hideInSearch:true,

    },
    {
      title: '交流标杆',
      dataIndex: 'acMark',
      width:100,
      key:'acMark',
      hideInSearch:true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width:60,
      fixed: 'right',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="bureauId"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusSquareOutlined />} type="primary" onClick={() => {
            let params:TableListParams={};
            if(currentUser.authority==1){
              params.homeCity=currentUser.city;
            }
            if(currentUser.authority==2){
              params.homeDistrict=currentUser.district;
            }
            if(currentUser.authority==3){
              params.homeGrid=currentUser.grid;
            }
            return   handleGenerateExcel(params);
          }}>
            生成Excel
          </Button>,
            <Button type="primary">
              <CloudUploadOutlined />             上传Excel
            </Button>,
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            标杆计算
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        request={(params) => {
          if(currentUser.authority==1){
            params.homeCity=currentUser.city;
          }
          if(currentUser.authority==2){
            params.homeDistrict=currentUser.district;
          }
          if(currentUser.authority==3){
            params.homeGrid=currentUser.grid;
          }
          return queryMark(params);
        }}
        columns={columns}
        scroll={{ x: 800 }}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async (value) => {
          const success = await handleCalculate(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
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
