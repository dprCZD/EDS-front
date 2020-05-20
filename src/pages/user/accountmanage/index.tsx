import { DownOutlined, PlusOutlined,CloudUploadOutlined,PlusSquareOutlined } from '@ant-design/icons';
import { Button, Upload, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import {CurrentUser} from '../data';
import {queryAccount, updateAccount, addAccount, removeAccount, generateAccount} from './service';
import {uploadUrl} from "../../../models/download";
import {connect} from "umi";


const authorityMap = {
  0: '管理员',
  1: '地市权限用户',
  2: '区县权限用户',
  3: '网格权限用户',

};
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addAccount(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
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
    await updateAccount(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

const TableList: React.FC<{}> = (props) => {

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<CurrentUser>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      width:100,
    },
    {
      title: '用户名称',
      dataIndex: 'name',
      key:'name',
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
      title: '手机号',
      dataIndex: 'phone',
      key:'phone',

      width:100,

    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key:'email',

      width:100,

    },
    {
      title: '归属地市',
      dataIndex: 'city',
      key:'city',
      width:100,


    },
    {
      title: '归属区县',
      dataIndex: 'district',
      key:'district',
      width:100,


    },
    {
      title: '归属网格',
      dataIndex: 'grid',
      key:'grid',
      width:100,


    },

    {
      title: '用户权限',
      dataIndex: 'authority',
      key:'authority',
      width:100,
      valueEnum: {
        0: { text: '管理员', status: '管理员' },
        1: { text: '地市权限用户', status: '地市权限用户' },
        2: { text: '区县权限用户', status: '区县权限用户' },
        3: { text: '网格权限用户', status: '网格权限用户' },
      },

    },
    {
      title: '用户状态',
      dataIndex: 'status',
      key:'status',
      width:100,
      valueEnum: {
        1: { text: '正常', status: '正常' },
        9: { text: '禁用', status: '禁用' },
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
      <ProTable<CurrentUser>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="bureauId"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新增用户
          </Button>,
        ]}
        request={(params) => {
          return queryAccount(params);
        }}
        columns={columns}
        scroll={{ x: 1000 }}
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
