import { DownOutlined, PlusOutlined,CloudUploadOutlined,PlusSquareOutlined } from '@ant-design/icons';
import {Button, Upload, Dropdown, Menu, message, Tooltip, Typography} from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import {TableListItem, TableListParams} from './data.d';
import {queryContract, updateContract, addContract, removeContract, generateContract} from './service';
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
    const resp=await addContract(fields);
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

    const resp=await generateContract(params);
    if(!resp||!resp.success){
      return false;
    }
    message.success("生成[转供电信息台账]Excel生成任务成功，请至系统任务下查看,任务ID："+resp.data.id);
    return  true;
  }catch (error) {
    return false;
  }

};

const uploadProps = {
  name: 'file',
  action: uploadUrl,
  data:{
    excelType:6,
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
    const resp=await updateContract(fields);
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
    await removeContract({
      idList: selectedRows.map((row) => row.id),
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

const {Paragraph}=Typography;
const { Text } = Typography;

const content = (
  <>
    <Paragraph>
      由转供电合同台账.xls录入。
    </Paragraph>
    <Paragraph>
      <Text strong>Excel格式</Text>：(局站编号	局站名称	合同编号	客户编号	供电单位名称	供电所名称	用电类型	市电/农电
      电费单价	付费周期	电表表号	抄表周期	电表倍率	合同开始	合同结束	开户行	开户行名称	开户账号	经办人	经办人电话	对方经办人
      对方经办人电话	归属地市	归属区县	归属网格	局站属性	电表操作人	电表安装时间	电表启用时间	电表停用时间	线路台区
      电表箱位置	合同名称	包杆金额	合同单状态	局站类型 )
    </Paragraph>
    <Paragraph>
      <Text strong>注意</Text>：表头要在Excel的第一行方可正常录入。表头名称要与格式中的名称对应，顺序可以颠倒。
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
      title: '合同编号',
      dataIndex: 'contractId',
      key:'contractId',
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
      hideInSearch:currentUser.authority>=3,

      width:100,


    },
    {
      title: '供电单位名称',
      dataIndex: 'powerSupplyUinitName',
      key:'powerSupplyUinitName',
      hideInSearch:true,

      width:100,

    },
    {
      title: '供电所名称',
      dataIndex: 'powerSupplyBureauName',
      key:'powerSupplyBureauName',
      hideInSearch:true,

      width:100,

    },
    {
      title: '用电类型',
      dataIndex: 'electricityType',
      key:'electricityType',
      hideInSearch:true,

      width:100,

    },

    {
      title: '市电/农电',
      dataIndex: 'electricityLevel',
      width:100,
      hideInSearch:true,

      key:'electricityLevel',

    },
    {
      title: '电费单价',
      dataIndex: 'electricityUnitPrice',
      key:'electricityUnitPrice',
      hideInSearch:true,

      width:100,


    },
    {
      title: '付费周期',
      dataIndex: 'billingCycle',
      width:100,
      key:'billingCycle',
      hideInSearch:true,

    },
    {
      title: '抄表周期',
      dataIndex: 'meterCycle',
      width:100,
      key:'meterCycle',
      hideInSearch:true,

    },
    {
      title: '电表倍率',
      dataIndex: 'meterMagnification',
      key:'meterMagnification',
      width:100,
      hideInSearch:true,

    },
    {
      title: '合同开始',
      dataIndex: 'contractStart',
      width:100,
      valueType:'date',
      key:'contractStart',
      hideInSearch:true,
    },
    {
      title: '合同结束',
      dataIndex: 'contractEnd',
      width:100,
      valueType:'date',
      key:'contractEnd',
      hideInSearch:true,
    },
    {
      title: '开户行',
      dataIndex: 'accountBank',
      width:100,
      key:'accountBank',
      hideInSearch:true,
    },
    {
      title: '开户账号',
      dataIndex: 'accountId',
      width:100,
      key:'accountId',
      hideInSearch:true,
    },
    {
      title: '电表操作人',
      dataIndex: 'meterOpr',
      width:100,
      key:'meterOpr',
    },
    {
      title: '电表安装时间',
      dataIndex: 'meterInstallTime',
      width:100,
      valueType:'date',
      key:'meterInstallTime',
      hideInSearch:true,
    },
    {
      title: '电表启用时间',
      dataIndex: 'meterStartTime',
      width:100,
      valueType:'date',
      key:'meterStartTime',
      hideInSearch:true,
    },
    {
      title: '电表停用时间',
      dataIndex: 'meterEndTime',
      width:100,
      valueType:'date',
      key:'meterEndTime',
      hideInSearch:true,
    },
    {
      title: '线路台区',
      dataIndex: 'lineArea',
      width:100,
      key:'lineArea',
      hideInSearch:true,
    },

    {
      title: '电表箱位置',
      dataIndex: 'meterArea',
      width:100,
      key:'meterArea',
      hideInSearch:true,
    },
    {
      title: '合同名称',
      dataIndex: 'contractName',
      width:100,
      key:'contractName',
      hideInSearch:true,
    },
    {
      title: '包杆金额',
      dataIndex: 'wrapRodPrice',
      width:100,
      key:'wrapRodPrice',
      hideInSearch:true,
    },
    {
      title: '合同单状态',
      dataIndex: 'contractStatus',
      width:100,
      key:'contractStatus',
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
    <PageHeaderWrapper content={content}>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Tooltip placement="top" title={"生成Excel会生成权限范围内的所有数据，请谨慎使用"}>

          <Button danger icon={<PlusSquareOutlined />} type="primary" onClick={() => {
            let params:TableListParams={};
            if(currentUser.authority==1){
              params.homeCity=currentUser.city;
            }
            if(currentUser.authority==2){
              params.homeCity=currentUser.city;
              params.homeDistrict=currentUser.district;
            }
            if(currentUser.authority==3){
              params.homeCity=currentUser.city;
              params.homeDistrict=currentUser.district;
              params.homeGrid=currentUser.grid;
            }
            return   handleGenerateExcel(params);
          }}>
            生成Excel
          </Button>
          </Tooltip>,
          <Upload {...uploadProps}>
            <Tooltip placement="top" title={"上传Excel会自动执行Excel数据的录入工作，相同的合同单号新数据会覆盖旧数据，请谨慎使用"}>
            <Button danger type="primary">
              <CloudUploadOutlined />             上传Excel
            </Button>
            </Tooltip>
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
            params.homeCity=currentUser.city;
            params.homeDistrict=currentUser.district;
          }
          if(currentUser.authority==3){
            params.homeCity=currentUser.city;
            params.homeDistrict=currentUser.district;
            params.homeGrid=currentUser.grid;
          }
          return queryContract(params);
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
