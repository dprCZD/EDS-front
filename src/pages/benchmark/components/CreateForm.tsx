import React from 'react';
import {DatePicker, Form, Input, message, Modal, Select} from 'antd';
import {connect} from "umi";

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const {markConfig}=props;

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="标杆计算确认"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}

    >
      <Form form={form}
            initialValues={markConfig}>
        <FormItem
          label="标杆基准时间"
        >
          <Input defaultValue={new Date(markConfig.markTime)} readOnly={true}/>
        </FormItem>
        <FormItem
          name="meterMarkFormula"
          label="抄表标杆公式"
        >
          <Input placeholder="请输入"  readOnly={true}/>
        </FormItem>
        <FormItem
          name="meterMarkFormulaValue"
          label="抄表标杆公式值"
        >
          <Input placeholder="请输入"  readOnly={true}  />
        </FormItem>
        <FormItem
          name="dcMarkFormula"
          label="直流标杆公式"
        >
          <Input placeholder="请输入"  readOnly={true}/>
        </FormItem>
        <FormItem
          name="dcMarkFormulaValue"
          label="直流标杆公式值"
        >
          <Input placeholder="请输入"  readOnly={true}  />
        </FormItem>
        <FormItem
          name="acMarkFormula"
          label="交流标杆公式"
        >
          <Input placeholder="请输入"  readOnly={true}/>
        </FormItem>
        <FormItem
          name="acMarkFormulaValue"
          label="交流标杆公式值"
        >
          <Input placeholder="请输入"  readOnly={true}  />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default connect(({ markConfig }) => ({
  markConfig: markConfig.markConfig,
}))(CreateForm) ;
