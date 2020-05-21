import React, { useState } from 'react';
import {Form, Button, Input, Modal, Select} from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;


const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>(props.values);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleFinish = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.id=formVals.id;
    handleUpdate(fieldsValue);

  };
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="processId"
          label="流程单号"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入" readOnly={true} />
        </FormItem>
        <FormItem
          name="siteId"
          label="局站编码"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入" readOnly={true} />
        </FormItem>
        <FormItem
          name="siteName"
          label="局站名称"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"    />
        </FormItem>
        <FormItem
          name="customerId"
          label="客户编号"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="billingPeriod"
          label="账期"
          rules={[{ required: true,
            message: '请输入数字！',
            pattern: new RegExp(/^[1-9]\d*$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterId"
          label="电表表号"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="homeCity"
          label="归属地市"
          rules={[{ required: true, message: '请输入内容！' }]}

        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="homeDistrict"
          label="归属区县"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="homeGrid"
          label="归属网格"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterDataPeak"
          label="表示数-峰"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterDataValley"
          label="表示数-谷"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterDataNomal"
          label="表示数-平"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterReader"
          label="抄表人员"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterReadDate"
          label="抄表日期"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterNumber"
          label="总计表示数"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterReadPeriod"
          label="抄表周期"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="siteType"
          label="局站类型"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="processCode"
          label="流程编码"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterReadWay"
          label="抄表方式"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="alternatingCurrentA"
          label="交流电流A"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="alternatingCurrentB"
          label="交流电流B"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="alternatingCurrentC"
          label="交流电流C"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="directCurrentTotal"
          label="直流总电流"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="electricCurrentLiantong"
          label="联通电流"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="electricCurrentYidong"
          label="移动电流"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="electricCurrentDianxing"
          label="电信电流"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>

      </>
    );
  };

  const renderFooter = () => {
      return (
        <>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleFinish()}>
            完成
          </Button>
        </>
      );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="抄表信息更新"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={formVals}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
