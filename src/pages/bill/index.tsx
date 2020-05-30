import { DownOutlined, PlusOutlined,CloudUploadOutlined,PlusSquareOutlined } from '@ant-design/icons';
import {Button, Upload, Dropdown, Menu, message, Tooltip, Typography} from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import {TableListItem, TableListParams} from './data.d';
import {queryBill, updateBill, addBill, removeBill, generateBill} from './service';
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
    const resp=await addBill(fields);
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

    const resp=await generateBill(params);
    if(!resp||!resp.success){
      return false;
    }
    message.success("生成[财务报账信息]Excel生成任务成功，请至系统任务下查看,任务ID："+resp.data.id);
    return  true;
  }catch (error) {
    return false;
  }

};

const uploadProps = {
  name: 'file',
  action: uploadUrl,
  data:{
    excelType:11,
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
const connectUploadProps = {
  name: 'file',
  action: uploadUrl,
  data:{
    excelType:12,
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
    const resp=await updateBill(fields);
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
    await removeBill({
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
      由财务报账.xls录入。用于生成数据总表进行财务筛查。需要录入关联表数据（财务报账-局站）才能进行分析页面的生成电费数据总表操作。
    </Paragraph>
    <Paragraph>
      <Text strong>Excel格式（财务报账）</Text>：(报账单编号	制单人	所属部门	报账申请日期	报账模板	业务大类	报账金额	申请付款金额	币种
      当前审批阶段	供应商名称	合同编号	合同名称	当前处理人	制单会计	附件张数	摘要	总账日期	报账类型	供应商类型
      收方户名	收方账号	收方开户行
      )
    </Paragraph>
    <Paragraph>
      <Text strong>Excel格式（关联表）</Text>：(ACCT_MONTH BUREAU_ID REIBURSE_ID )
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
      title: '报账单编号',
      dataIndex: 'billId',
      key: 'billId',
      fixed: 'left',
      width:100,
    },
    {
      title: '制单人',
      dataIndex: 'creator',
      key:'creator',
      width:100,

    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key:'department',
      width:100,

    },
    {

      title: '报账申请日期',
      dataIndex: 'billDate',
      key:'billDate',
      hideInSearch:true,
      valueType:'date',
      width:100,

    },
    {
      title: '报账模板',
      dataIndex: 'template',
      key:'template',
      width:100,
      hideInSearch:true,

    },
    {
      title: '业务大类',
      dataIndex: 'bizType',
      key:'bizType',
      width:100,

    },
    {
      title: '报账金额',
      dataIndex: 'billAmount',
      key:'billAmount',
      hideInSearch:true,

      width:100,


    },
    {
      title: '申请付款金额',
      dataIndex: 'applyAmount',
      key:'applyAmount',
      hideInSearch:true,

      width:100,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      key:'currency',
      hideInSearch:true,

      width:100,


    },
    {
      title: '当前审批阶段',
      dataIndex: 'approval',
      key:'approval',
      hideInSearch:true,

      width:100,

    },
    {
      title: '供应商名称',
      dataIndex: 'supplierName',
      key:'supplierName',
      hideInSearch:true,

      width:100,

    },
    {
      title: '合同编号',
      dataIndex: 'contractId',
      key:'contractId',
      hideInSearch:true,

      width:100,

    },

    {
      title: '合同名称',
      dataIndex: 'contractName',
      width:100,
      hideInSearch:true,

      key:'contractName',

    },
    {
      title: '当前处理人',
      dataIndex: 'operator',
      key:'operator',
      hideInSearch:true,

      width:100,


    },
    {
      title: '制单会计',
      dataIndex: 'accountant',
      width:100,
      key:'accountant',
      hideInSearch:true,

    },
    {
      title: '附件张数',
      dataIndex: 'annexNum',
      width:100,
      key:'annexNum',
      hideInSearch:true,

    },
    {
      title: '报销ID',
      dataIndex: 'reiburseId',
      key:'reiburseId',
      width:100,
      hideInSearch:true,

    },
    {
      title: '总账日期',
      dataIndex: 'totalAccountDate',
      width:100,
      valueType:'date',
      key:'totalAccountDate',
      hideInSearch:true,
    },
    {
      title: '报账类型',
      dataIndex: 'billType',
      width:100,
      key:'billType',
      hideInSearch:true,
    },
    {
      title: '供应商类型',
      dataIndex: 'supplierType',
      width:100,
      key:'supplierType',
      hideInSearch:true,
    },
    {
      title: '收方户名',
      dataIndex: 'receiverName',
      width:100,
      key:'receiverName',
      hideInSearch:true,
    },
    {
      title: '收方账号',
      dataIndex: 'receiverId',
      width:100,
      key:'receiverId',
      hideInSearch:true,

    },
    {
      title: '收方开户行',
      dataIndex: 'receiverBank',
      width:100,
      key:'receiverBank',
      hideInSearch:true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width:100,

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
          <Upload {...connectUploadProps}>
            <Tooltip placement="top" title={"上传Excel会自动执行Excel数据的录入工作，相同的合同单号新数据会覆盖旧数据，请谨慎使用"}>
              <Button danger type="primary">
                <CloudUploadOutlined />             上传财务报账-局站关联信息
              </Button>
            </Tooltip>
          </Upload>,
          <Upload {...uploadProps}>
            <Tooltip placement="top" title={"上传Excel会自动执行Excel数据的录入工作，相同的合同单号新数据会覆盖旧数据，请谨慎使用"}>
            <Button danger type="primary">
              <CloudUploadOutlined />             上传财务报账信息
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
          return queryBill(params);
        }}
        columns={columns}
        scroll={{ x: 1500 }}
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
