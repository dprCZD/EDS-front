import { DownOutlined, PlusOutlined,CloudUploadOutlined,PlusSquareOutlined } from '@ant-design/icons';
import { Button, Upload, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import {TableListItem, TableListParams} from './data.d';
import {queryMeter, updateMeter, addMeter, removeMeter, generateMeter} from './service';
import {uploadUrl} from "../../models/download";
import {connect} from "umi";
import {CurrentUser} from "../user/data";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    const resp=await addMeter(fields);
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

    const resp=await generateMeter(params);
    if(!resp||!resp.success){
      return false;
    }
    message.success('创建Excel生成任务成功，请到系统任务查看');
    return  true;
  }catch (error) {
    return false;
  }

};

const uploadProps = {
  name: 'file',
  action: uploadUrl,
  data:{
    excelType:2,
  },
  withCredentials:true,

  onChange(info) {

    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功，文件录入已开始，请到系统任务下查看。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败！`);
    }
  },
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');
  try {
    const resp=await updateMeter(fields);
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
    await removeMeter({
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
      title: '流程单号',
      dataIndex: 'processId',
      key: 'processId',
      fixed: 'left',
      width:100,
    },
    {
      title: '局站编码',
      dataIndex: 'siteId',
      key: 'siteId',
      fixed: 'left',
      width:100,
    },
    {
      title: '局站名称',
      dataIndex: 'siteName',
      key:'siteName',
      width:100,

    },
    {
      title: '账期',
      dataIndex: 'billingPeriod',
      key:'billingPeriod',
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
      title: '客户编号',
      dataIndex: 'customerId',
      key:'customerId',
      width:100,

    },
    {
      title: '电表表号',
      dataIndex: 'meterId',
      key:'meterId',
      width:100,

    },
    {
      title: '归属地市',
      dataIndex: 'homeCity',
      key:'homeCity',
      hideInSearch:currentUser.authority>=1,

      width:100,


    },
    {
      title: '归属区县',
      dataIndex: 'homeDistrict',
      key:'homeDistrict',
      hideInSearch:currentUser.authority>=2,

      width:100,
    },
    {
      title: '归属网格',
      dataIndex: 'homeGrid',
      key:'homeGrid',
      width:100,


    },

    {
      title: '表示数-峰',
      dataIndex: 'meterDataPeak',
      width:100,
      hideInSearch:true,

      key:'meterDataPeak',

    },
    {
      title: '表示数-谷',
      dataIndex: 'meterDataValley',
      key:'meterDataValley',
      hideInSearch:true,

      width:100,


    },
    {
      title: '表示数-平',
      dataIndex: 'meterDataNomal',
      width:100,
      key:'meterDataNomal',
      hideInSearch:true,

    },
    {
      title: '抄表人员',
      dataIndex: 'meterReader',
      width:100,
      key:'meterReader',
      hideInSearch:true,

    },
    {
      title: '抄表日期',
      dataIndex: 'meterReadDate',
      key:'meterReadDate',
      valueType:'date',
      width:100,
      hideInSearch:true,

    },
    {
      title: '总计表示数',
      dataIndex: 'meterNumber',
      width:100,
      key:'meterNumber',
      hideInSearch:true,
    },
    {
      title: '抄表周期',
      dataIndex: 'meterReadPeriod',
      width:100,
      key:'meterReadPeriod',
      hideInSearch:true,
    },
    {
      title: '局站类型',
      dataIndex: 'siteType',
      width:100,
      key:'siteType',
      hideInSearch:true,
    },
    {
      title: '流程编码',
      dataIndex: 'processCode',
      width:100,
      key:'processCode',
      hideInSearch:true,
    },

    {
      title: '抄表方式',
      dataIndex: 'meterReadWay',
      width:100,
      key:'meterReadWay',
      hideInSearch:true,
    },
    {
      title: '交流电流A',
      dataIndex: 'alternatingCurrentA',
      width:100,
      key:'alternatingCurrentA',
      hideInSearch:true,
    },
    {
      title: '交流电流B',
      dataIndex: 'alternatingCurrentB',
      width:100,
      key:'alternatingCurrentB',
      hideInSearch:true,
    },
    {
      title: '交流电流C',
      dataIndex: 'alternatingCurrentC',
      width:100,
      key:'alternatingCurrentC',
      hideInSearch:true,
    },

    {
      title: '直流总电流',
      dataIndex: 'directCurrentTotal',
      width:100,
      key:'directCurrentTotal',
      hideInSearch:true,
    },
    {
      title: '联通电流',
      dataIndex: 'electricCurrentLiantong',
      width:100,
      key:'electricCurrentLiantong',
      hideInSearch:true,
    },
    {
      title: '移动电流',
      dataIndex: 'electricCurrentYidong',
      width:100,
      key:'electricCurrentYidong',
      hideInSearch:true,
    },
    {
      title: '电信电流',
      dataIndex: 'electricCurrentDianxing',
      width:100,
      key:'electricCurrentDianxing',
      hideInSearch:true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
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
        rowKey="processId"
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
          <Upload {...uploadProps}>
            <Button type="primary">
              <CloudUploadOutlined />             上传Excel
            </Button>
          </Upload>,
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
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
          return queryMeter(params);
        }}
        columns={columns}
        scroll={{ x: 5000 }}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
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
