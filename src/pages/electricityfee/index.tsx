import { DownOutlined, PlusOutlined,CloudUploadOutlined,PlusSquareOutlined } from '@ant-design/icons';
import { Button, Upload, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import {TableListItem, TableListParams} from './data.d';
import {queryFee, updateFee, addFee, removeFee, generateFee} from './service';
import {uploadUrl} from "../../models/download";
import {connect} from "umi";
import {CurrentUser} from "../user/data";
import {Err} from "@hapi/joi";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    const resp=await addFee(fields);
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

    const resp=await generateFee(params);
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
    excelType:1,
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
    const resp=await updateFee(fields);
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
    await removeFee({
      siteIdList: selectedRows.map((row) => row.siteId),
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
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key:'gmtCreate',
      hideInSearch:true,
      valueType:'date',
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
      title: '客户编号',
      dataIndex: 'customerId',
      key:'customerId',
      width:100,

    },
    {
      title: '局站类型',
      dataIndex: 'siteType',
      key:'siteType',

      width:100,

    },
    {
      title: '是否转铁塔',
      dataIndex: 'ironTowerCheck',
      key:'ironTowerCheck',
      hideInSearch:true,

      width:100,


    },
    {
      title: '供电所名称',
      dataIndex: 'powerStationName',
      width:100,
      key:'powerStationName',

    },
    {
      title: '年账期',
      dataIndex: 'year',
      key:'year',
      width:100,

    },
    {
      title: '联通分摊比',
      dataIndex: 'liantongApportionmentRatio',
      width:100,
      key:'liantongApportionmentRatio',
      hideInSearch:true,
    },
    {
      title: '1月电量',
      dataIndex: 'monthlyElectricityFeeAmount1',
      width:100,
      key:'monthlyElectricityFeeAmount1',
      hideInSearch:true,
    },
    {
      title: '1月电费',
      dataIndex: 'monthlyElectricityFeeFee1',
      width:100,
      key:'monthlyElectricityFeeFee1',
      hideInSearch:true,
    },

    {
      title: '1月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount1',
      width:100,
      key:'monthlyElectricityFeeSiteAmount1',
      hideInSearch:true,
    },
    {
      title: '1月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee1',
      width:100,
      key:'monthlyElectricityFeeSiteFee1',
      hideInSearch:true,
    },
    {
      title: '2月电量',
      dataIndex: 'monthlyElectricityFeeAmount2',
      width:100,
      key:'monthlyElectricityFeeAmount2',
      hideInSearch:true,
    },
    {
      title: '2月电费',
      dataIndex: 'monthlyElectricityFeeFee2',
      width:100,
      key:'monthlyElectricityFeeFee2',
      hideInSearch:true,
    },

    {
      title: '2月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount2',
      width:100,
      key:'monthlyElectricityFeeSiteAmount2',
      hideInSearch:true,
    },
    {
      title: '2月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee2',
      width:100,
      key:'monthlyElectricityFeeSiteFee2',
      hideInSearch:true,
    },
    {
      title: '3月电量',
      dataIndex: 'monthlyElectricityFeeAmount3',
      width:100,
      key:'monthlyElectricityFeeAmount3',
      hideInSearch:true,
    },
    {
      title: '3月电费',
      dataIndex: 'monthlyElectricityFeeFee3',
      width:100,
      key:'monthlyElectricityFeeFee3',
      hideInSearch:true,
    },

    {
      title: '3月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount3',
      width:100,
      key:'monthlyElectricityFeeSiteAmount3',
      hideInSearch:true,
    },
    {
      title: '3月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee3',
      width:100,
      key:'monthlyElectricityFeeSiteFee3',
      hideInSearch:true,
    },
    {
      title: '4月电量',
      dataIndex: 'monthlyElectricityFeeAmount4',
      width:100,
      key:'monthlyElectricityFeeAmount4',
      hideInSearch:true,
    },
    {
      title: '4月电费',
      dataIndex: 'monthlyElectricityFeeFee4',
      width:100,
      key:'monthlyElectricityFeeFee4',
      hideInSearch:true,
    },

    {
      title: '4月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount4',
      width:100,
      key:'monthlyElectricityFeeSiteAmount4',
      hideInSearch:true,
    },
    {
      title: '4月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee4',
      width:100,
      key:'monthlyElectricityFeeSiteFee4',
      hideInSearch:true,
    },
    {
      title: '5月电量',
      dataIndex: 'monthlyElectricityFeeAmount5',
      width:100,
      key:'monthlyElectricityFeeAmount5',
      hideInSearch:true,
    },
    {
      title: '5月电费',
      dataIndex: 'monthlyElectricityFeeFee5',
      width:100,
      key:'monthlyElectricityFeeFee5',
      hideInSearch:true,
    },

    {
      title: '5月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount5',
      width:100,
      key:'monthlyElectricityFeeSiteAmount5',
      hideInSearch:true,
    },
    {
      title: '5月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee5',
      width:100,
      key:'monthlyElectricityFeeSiteFee5',
      hideInSearch:true,
    },
    {
      title: '6月电量',
      dataIndex: 'monthlyElectricityFeeAmount6',
      width:100,
      key:'monthlyElectricityFeeAmount6',
      hideInSearch:true,
    },
    {
      title: '6月电费',
      dataIndex: 'monthlyElectricityFeeFee6',
      width:100,
      key:'monthlyElectricityFeeFee6',
      hideInSearch:true,
    },

    {
      title: '6月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount6',
      width:100,
      key:'monthlyElectricityFeeSiteAmount6',
      hideInSearch:true,
    },
    {
      title: '6月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee6',
      width:100,
      key:'monthlyElectricityFeeSiteFee6',
      hideInSearch:true,
    },
    {
      title: '7月电量',
      dataIndex: 'monthlyElectricityFeeAmount7',
      width:100,
      key:'monthlyElectricityFeeAmount7',
      hideInSearch:true,
    },
    {
      title: '7月电费',
      dataIndex: 'monthlyElectricityFeeFee7',
      width:100,
      key:'monthlyElectricityFeeFee7',
      hideInSearch:true,
    },

    {
      title: '7月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount7',
      width:100,
      key:'monthlyElectricityFeeSiteAmount7',
      hideInSearch:true,
    },
    {
      title: '7月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee7',
      width:100,
      key:'monthlyElectricityFeeSiteFee7',
      hideInSearch:true,
    },
    {
      title: '8月电量',
      dataIndex: 'monthlyElectricityFeeAmount8',
      width:100,
      key:'monthlyElectricityFeeAmount8',
      hideInSearch:true,
    },
    {
      title: '8月电费',
      dataIndex: 'monthlyElectricityFeeFee8',
      width:100,
      key:'monthlyElectricityFeeFee8',
      hideInSearch:true,
    },

    {
      title: '8月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount8',
      width:100,
      key:'monthlyElectricityFeeSiteAmount8',
      hideInSearch:true,
    },
    {
      title: '8月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee8',
      width:100,
      key:'monthlyElectricityFeeSiteFee8',
      hideInSearch:true,
    },
    {
      title: '9月电量',
      dataIndex: 'monthlyElectricityFeeAmount9',
      width:100,
      key:'monthlyElectricityFeeAmount9',
      hideInSearch:true,
    },
    {
      title: '9月电费',
      dataIndex: 'monthlyElectricityFeeFee9',
      width:100,
      key:'monthlyElectricityFeeFee9',
      hideInSearch:true,
    },

    {
      title: '9月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount9',
      width:100,
      key:'monthlyElectricityFeeSiteAmount9',
      hideInSearch:true,
    },
    {
      title: '9月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee9',
      width:100,
      key:'monthlyElectricityFeeSiteFee9',
      hideInSearch:true,
    },
    {
      title: '10月电量',
      dataIndex: 'monthlyElectricityFeeAmount10',
      width:100,
      key:'monthlyElectricityFeeAmount10',
      hideInSearch:true,
    },
    {
      title: '10月电费',
      dataIndex: 'monthlyElectricityFeeFee10',
      width:100,
      key:'monthlyElectricityFeeFee10',
      hideInSearch:true,
    },

    {
      title: '10月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount10',
      width:100,
      key:'monthlyElectricityFeeSiteAmount10',
      hideInSearch:true,
    },
    {
      title: '10月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee10',
      width:100,
      key:'monthlyElectricityFeeSiteFee10',
      hideInSearch:true,
    },
    {
      title: '11月电量',
      dataIndex: 'monthlyElectricityFeeAmount11',
      width:100,
      key:'monthlyElectricityFeeAmount11',
      hideInSearch:true,
    },
    {
      title: '11月电费',
      dataIndex: 'monthlyElectricityFeeFee11',
      width:100,
      key:'monthlyElectricityFeeFee11',
      hideInSearch:true,
    },

    {
      title: '11月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount11',
      width:100,
      key:'monthlyElectricityFeeSiteAmount11',
      hideInSearch:true,
    },
    {
      title: '11月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee11',
      width:100,
      key:'monthlyElectricityFeeSiteFee11',
      hideInSearch:true,
    },
    {
      title: '12月电量',
      dataIndex: 'monthlyElectricityFeeAmount12',
      width:100,
      key:'monthlyElectricityFeeAmount12',
      hideInSearch:true,
    },
    {
      title: '12月电费',
      dataIndex: 'monthlyElectricityFeeFee12',
      width:100,
      key:'monthlyElectricityFeeFee12',
      hideInSearch:true,
    },

    {
      title: '12月局站总电量',
      dataIndex: 'monthlyElectricityFeeSiteAmount12',
      width:100,
      key:'monthlyElectricityFeeSiteAmount12',
      hideInSearch:true,
    },
    {
      title: '12月局站总电费',
      dataIndex: 'monthlyElectricityFeeSiteFee12',
      width:100,
      key:'monthlyElectricityFeeSiteFee12',
      hideInSearch:true,
    },

    {
      title: '本年累计总电费',
      dataIndex: 'totalElectricityFee',
      width:100,
      key:'totalElectricityFee',
      hideInSearch:true,
    },
    {
      title: '本年累计总电量',
      dataIndex: 'totalElectricityAmount',
      width:100,
      key:'totalElectricityAmount',
      hideInSearch:true,
    },
    {
      title: '本年累计局站总电费',
      dataIndex: 'totalSiteElectricityFee',
      width:100,
      key:'totalSiteElectricityFee',
      hideInSearch:true,
    },
    {
      title: '本年累计局站总电量',
      dataIndex: 'totalSiteElectricityAmount',
      width:100,
      key:'totalSiteElectricityAmount',
      hideInSearch:true,
    },
    {
      title: '局站状态',
      dataIndex: 'siteStatus',
      width:100,
      key:'siteStatus',
      valueEnum: {
        1: { text: '现网运行', status: '现网运行' },
        9: { text: '停用', status: '停用' },
        99: { text: '未知情况', status: '未知情况' },
      },
    },
    {
      title: '转供/直供',
      dataIndex: 'supplyType',
      width:100,
      key:'supplyType',
      valueEnum: {
        1: { text: '直供', status: '直供' },
        2: { text: '转供', status: '转供' },
        99: { text: '未知情况', status: '未知情况' },
      },
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
        rowKey="siteId"
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
          return queryFee(params);
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
