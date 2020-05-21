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
      title="新增转供电合同"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}

    >
      <Form form={form}>
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
          name="contractId"
          label="合同编号"
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
          name="meterId"
          label="电表表号"
          rules={[{ required: true, message: '请输入内容！' }]}

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
          name="powerSupplyUinitName"
          label="供电单位名称"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="powerSupplyBureauName"
          label="供电所名称"
        >
          <Input placeholder="请输入"  />
        </FormItem>


        <FormItem
          name="electricityType"
          label="用电类型"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="electricityLevel"
          label="市电/农电"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="electricityUnitPrice"
          label="电费单价"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="billingCycle"
          label="付费周期"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterCycle"
          label="抄表周期"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterMagnification"
          label="电表倍率"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="contractStart"
          label="合同开始"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="contractEnd"
          label="合同结束"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="accountBank"
          label="开户行"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="accountId"
          label="开户账号"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterOpr"
          label="电表操作人"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterInstallTime"
          label="电表安装时间"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterStartTime"
          label="电表启用时间"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterEndTime"
          label="电表停用时间"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="lineArea"
          label="线路台区"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="meterArea"
          label="电表箱位置"
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
          name="wrapRodPrice"
          label="包杆金额"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="contractStatus"
          label="合同单状态"
        >
          <Input placeholder="请输入"  />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
