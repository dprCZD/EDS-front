import React, { useState } from 'react';
import {Form, Button, Input, Modal, Cascader, Select} from 'antd';
import md5 from "md5"

import {CurrentUser} from "../../data";

export interface FormValueType extends Partial<CurrentUser> {
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<CurrentUser>;
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
    if(fieldsValue.pwd){
      fieldsValue.password=md5(fieldsValue.pwd);
    }
    handleUpdate(fieldsValue);

  };
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="用户ID"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入" readOnly={true} />
        </FormItem>
        <FormItem
          name="name"
          label="用户名称"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="phone"
          label="手机号"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="email"
          label="邮箱"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="city"
          label="归属地市"
          rules={[{ required: true, message: '请输入内容！' }]}

        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="district"
          label="归属区县"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="grid"
          label="归属网格"
          rules={[{ required: true, message: '请输入内容！' }]}

        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="authority"
          label="用户权限"
          rules={[{ required: true, message: '请选择' }]}
        >
          <Select style={{ width: 120 }}>
            <Option value={0}>管理员</Option>
            <Option value={1}>地市权限用户</Option>
            <Option value={2}>区县权限用户</Option>
            <Option value={3}>网格权限用户</Option>
          </Select>
        </FormItem>
        <FormItem
          name="status"
          label="用户状态"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Select style={{ width: 120 }}>
            <Option value={1}>正常</Option>
            <Option value={9}>禁用</Option>
          </Select>
        </FormItem>
        <FormItem
          name="pwd"
          label="用户密码"
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
      title="用户信息更新"
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
