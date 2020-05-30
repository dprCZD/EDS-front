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
          name="billId"
          label="报账单编号"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入" readOnly={true} />
        </FormItem>
        <FormItem
          name="creator"
          label="制单人"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"    />
        </FormItem>
        <FormItem
          name="department"
          label="所属部门"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"    />
        </FormItem>
        <FormItem
          name="billDate"
          label="报账申请日期"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="template"
          label="报账模板"

        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="bizType"
          label="业务大类"
          rules={[{ required: true, message: '请输入内容！' }]}

        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="billAmount"
          label="报账金额"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="applyAmount"
          label="申请付款金额"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="currency"
          label="币种"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="approval"
          label="当前审批阶段"
        >
          <Input placeholder="请输入"  />
        </FormItem>


        <FormItem
          name="supplierName"
          label="供应商名称"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="contractId"
          label="合同编号"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="contractName"
          label="合同名称"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="contractName"
          label="合同名称"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="operator"
          label="当前处理人"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="accountant"
          label="制单会计"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="annexNum"
          label="附件张数"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="reiburseId"
          label="报销ID"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="totalAccountDate"
          label="总账日期"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="billType"
          label="报账类型"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="supplierType"
          label="供应商类型"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="receiverName"
          label="收方户名"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="receiverId"
          label="收方账号"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="receiverBank"
          label="收方开户行"
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
      title="转供电合同信息更新"
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
