import React from 'react';
import {Form, Input, Modal, Select} from 'antd';
import md5 from "md5"
const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.password=md5(fieldsValue.password);
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="新增用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
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
          name="password"
          label="密码"
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
      </Form>
    </Modal>
  );
};

export default CreateForm;
