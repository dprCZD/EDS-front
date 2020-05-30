import { DownOutlined, PlusOutlined,CloudUploadOutlined,PlusSquareOutlined } from '@ant-design/icons';
import {Button, Upload, Dropdown, Menu, message, Tooltip, Typography} from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import {TableListItem, TableListParams} from './data.d';
import {querySite, updateRule, addSite, removeSite, generateSite} from './service';
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
    const resp=await addSite(fields);
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

  const resp=await generateSite(params);
    if(!resp||!resp.success){
      return false;
    }
    message.success("生成[电费电量]Excel生成任务成功，请至系统任务下查看,任务ID："+resp.data.id);
    return  true;
  }catch (error) {
    return false;
  }

};

const uploadProps = {
  name: 'file',
  action: uploadUrl,
  data:{
    excelType:3,
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
    const resp=await updateRule(fields);
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
    await removeSite({
      bureauIdList: selectedRows.map((row) => row.bureauId),
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
      由局站基础信息台账.xls录入。
    </Paragraph>
    <Paragraph>
      <Text strong>Excel格式</Text>：(局站编码	局站名称	建站时间	电业客户号	有效租赁合同	有效电费合同	局站状态	局站类型	直供/转供
        产权属性	归属地市	归属区县	归属网格 局站地址	对标类型	节能标杆	直流电流	交流额定功率	空调额定功率	站内设备	日均电量	载频数	载扇数
        经度	纬度	逻辑站数	区域负责人	局站等级	基站等级	局方总面积	设备面积	建筑类型	架设方式	固网专业	移动专业2g	移动专业3g	移动专业4g
        是否转铁塔公司	包区人	电量标杆	电费标杆 )
    </Paragraph>
    <Paragraph>
      <Text strong>注意</Text>：表头要在Excel的第三行方可正常录入。表头名称要与格式中的名称对应，顺序可以颠倒。
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
      dataIndex: 'createDate',
      key:'createDate',
      hideInSearch:true,
      valueType:'date',
      width:100,

    },
    {
      title: '归属地市',
      dataIndex: 'firstLevelNameOwn',
      key:'firstLevelNameOwn',
      hideInSearch:currentUser.authority>=1,

      width:100,


    },
    {
      title: '归属区县',
      dataIndex: 'secondLevelNameOwn',
      key:'secondLevelNameOwn',
      hideInSearch:currentUser.authority>=2,

      width:100,


    },
    {
      title: '归属网格',
      dataIndex: 'threeLevelNameOwn',
      key:'threeLevelNameOwn',
      hideInSearch:currentUser.authority>=3,
      width:100,


    },
    {
      title: '客户编号',
      dataIndex: 'clientId',
      key:'clientId',
      hideInSearch:true,

      width:100,

    },
    {
      title: '有效租赁合同',
      dataIndex: 'remark1',
      key:'remark1',
      hideInSearch:true,

      width:100,


    },
    {
      title: '有效电费合同',
      dataIndex: 'remark2',
      key:'remark2',
      hideInSearch:true,

      width:100,


    },
    {
      title: '局站状态',
      dataIndex: 'bureauStatus',
      width:100,
      key:'bureauStatus',



    },
    {
      title: '局站类型',
      dataIndex: 'bureauType',
      key:'bureauType',

      width:100,



    },
    {
      title: '转供/直供',
      dataIndex: 'supplyType',
      width:100,
      key:'supplyType',
      hideInSearch:true,



    },
    {
      title: '局站产权性质',
      dataIndex: 'bureauRight',
      width:100,
      key:'bureauRight',
      hideInSearch:true,


    },
    {
      title: '局站详细地址',
      dataIndex: 'bureauAddr',
      width:100,
      key:'bureauAddr',
      hideInSearch:true,


    },
    {
      title: '对标类型(标杆)',
      dataIndex: 'benchmarkType',
      width:100,
      key:'benchmarkType',
      hideInSearch:true,


    },
    {
      title: '节能及标杆选定情况(标杆)',
      dataIndex: 'benchmarkState',
      width:100,
      key:'benchmarkState',
      hideInSearch:true,


    },
    {
      title: '直流电流(A)',
      dataIndex: 'electricA',
      width:100,
      key:'electricA',
      hideInSearch:true,


    },
    {
      title: '交流额定功率(KW)',
      dataIndex: 'powerKw',
      width:100,
      hideInSearch:true,

      key:'powerKw',

    },
    {
      title: '空调额定功率(KW)',
      dataIndex: 'airPowerKw',
      width:100,
      key:'airPowerKw',
      hideInSearch:true,


    },
    {
      title: '交流额定功率(KW)',
      dataIndex: 'powerKw',
      width:100,
      key:'powerKw',
      hideInSearch:true,


    },
    {
      title: '站内设备',
      dataIndex: 'stationEqu',
      width:100,
      key:'stationEqu',
      hideInSearch:true,


    },
    {
      title: '日均电量(KWH)',
      dataIndex: 'dayAvg',
      width:100,
      key:'dayAvg',

      hideInSearch:true,

    },
    {
      title: '载频数',
      dataIndex: 'zpNum',
      width:100,
      key:'zpNum',
      hideInSearch:true,


    },
    {
      title: '载扇数',
      dataIndex: 'zsNum',
      width:100,
      key:'zsNum',

      hideInSearch:true,

    },
    {
      title: '经度(地理坐标)',
      dataIndex: 'geographyJd',
      width:100,
      key:'geographyJd',
      hideInSearch:true,


    },
    {
      title: '纬度(地理坐标)',
      dataIndex: 'geographyWd',
      width:100,
      key:'geographyWd',
      hideInSearch:true,


    },
    {
      title: '逻辑站数',
      dataIndex: 'logicNum',
      width:100,
      key:'logicNum',
      hideInSearch:true,

    },
    {
      title: '区域负责人',
      dataIndex: 'areaPerson',
      width:100,
      key:'areaPerson',
      hideInSearch:true,

    },
    {
      title: '局站等级',
      dataIndex: 'bureauLevel',
      width:100,
      key:'bureauLevel',
      hideInSearch:true,

    },
    {
      title: '基站等级',
      dataIndex: 'baseLevel',
      width:100,
      key:'baseLevel',
      hideInSearch:true,

    },
    {
      title: '局房总建筑面积',
      dataIndex: 'boardRoom',
      width:100,
      key:'boardRoom',
      hideInSearch:true,

    },
    {
      title: '机房已装机使用面积',
      dataIndex: 'engineRoom',
      width:100,
      key:'engineRoom',
      hideInSearch:true,

    },
    {
      title: '建筑类型',
      dataIndex: 'buildingType',
      width:100,
      key:'buildingType',
      hideInSearch:true,

    },
    {
      title: '天馈架设方式',
      dataIndex: 'bureauEreWay',
      width:100,
      key:'bureauEreWay',
      hideInSearch:true,

    },
    {
      title: '固网专业',
      dataIndex: 'fixedLine',
      width:100,
      key:'fixedLine',
      hideInSearch:true,

    },

    {
      title: '移动专业2g',
      dataIndex: 'mobile2g',
      width:100,
      key:'mobile2g',
      hideInSearch:true,

    },
    {
      title: '移动专业3g',
      dataIndex: 'mobile3g',
      width:100,
      key:'mobile3g',
      hideInSearch:true,

    },
    {
      title: '移动专业4g',
      dataIndex: 'mobile4g',
      width:100,
      key:'mobile4g',
      hideInSearch:true,

    },
    {
      title: '移动专业4g',
      dataIndex: 'mobile4g',
      width:100,
      key:'mobile4g',
      hideInSearch:true,

    },
    {
      title: '转铁塔',
      dataIndex: 'professWy',
      width:100,
      key:'professWy',
      hideInSearch:true,

    },
    {
      title: '归属包区人',
      dataIndex: 'fiveLevelNameOwn',
      width:100,
      key:'fiveLevelNameOwn',
      hideInSearch:true,

    },
    {
      title: '电量标杆',
      dataIndex: 'remark4',
      width:100,
      key:'remark4',
      hideInSearch:true,

    },
    {
      title: '电费标杆',
      dataIndex: 'remark5',
      width:100,
      key:'remark5',
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
    <PageHeaderWrapper content={content}>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="bureauId"
        toolBarRender={(action, { selectedRows }) => [
          <Tooltip placement="top" title={"生成Excel会生成权限范围内的所有数据，请谨慎使用"}>
          <Button danger icon={<PlusSquareOutlined />} type="primary" onClick={() => {
            let params:TableListParams={};
            if(currentUser.authority==1){

              params.firstLevelNameOwn=currentUser.city;
            }
            if(currentUser.authority==2){
              params.firstLevelNameOwn=currentUser.city;
              params.secondLevelNameOwn=currentUser.district;
            }
            if(currentUser.authority==3){
              params.firstLevelNameOwn=currentUser.city;
              params.secondLevelNameOwn=currentUser.district;
              params.threeLevelNameOwn=currentUser.grid;
            }
            return   handleGenerateExcel(params);
          }}>
            生成Excel
          </Button>
          </Tooltip>,
          <Upload {...uploadProps}>
            <Tooltip placement="top" title={"上传Excel会自动执行Excel数据的录入工作，相同的局站编码新数据会覆盖旧数据，请谨慎使用"}>
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
            params.firstLevelNameOwn=currentUser.city;
          }
          if(currentUser.authority==2){
            params.firstLevelNameOwn=currentUser.city;
            params.secondLevelNameOwn=currentUser.district;
          }
          if(currentUser.authority==3){
            params.firstLevelNameOwn=currentUser.city;
            params.secondLevelNameOwn=currentUser.district;
            params.threeLevelNameOwn=currentUser.grid;
          }
          return querySite(params);
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
