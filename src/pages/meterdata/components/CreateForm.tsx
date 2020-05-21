import React from 'react';
import {Form, Input, Modal, Select} from 'antd';

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="新增抄表信息"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}

    >
      <Form form={form}>
        <FormItem
          name="processId"
          label="流程单号"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="siteId"
          label="局站编码"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
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
      </Form>
    </Modal>
  );
};

export default CreateForm;
