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
          name="bureauId"
          label="局站编码"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入" readOnly={true} />
        </FormItem>
        <FormItem
          name="bureauName"
          label="局站名称"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  readOnly={true}  />
        </FormItem>
        <FormItem
          name="dataId"
          label="数据编码"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="dataUsefull"
          label="数据有效性"
        >
          <Input placeholder="0无效，1有效"  />
        </FormItem>
        <FormItem
          name="systemMarkDl"
          label="系统标杆电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="systemMarkDf"
          label="系统标杆电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="invoiceMark"
          label="发票标杆"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterMark"
          label="抄表标杆"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="dcMark"
          label="直流标杆"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="acMark"
          label="交流标杆"
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
