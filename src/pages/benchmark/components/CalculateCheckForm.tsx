import React from 'react';
import {DatePicker, Form, Input, Modal} from 'antd';
import {connect} from "umi";
import {MarkConfigItem} from "../data";
import moment from "moment";


interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: MarkConfigItem) => void;
  onCancel: () => void;
}

const CalculateCheckForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const {markConfig}=props;
  const dateFormat="YYYY-MM-DD";


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
      <Form form={form}>
        <Form.Item
          name="name"
          initialValue={moment(markConfig.markTime)}
          label="标杆基准时间"
        >
          <DatePicker  format={dateFormat} disabled={true}/>
        </Form.Item>
        <Form.Item
          name="meterMarkFormula"
          initialValue={markConfig.meterMarkFormula}
          label="抄表标杆公式"
        >
          <Input placeholder="无数据"  readOnly={true}/>
        </Form.Item>
        <Form.Item
          name="meterMarkFormulaValue"
          initialValue={markConfig.meterMarkFormulaValue}

          label="抄表标杆公式值(不含变量)"
        >
          <Input placeholder="无数据"  readOnly={true}  />
        </Form.Item>
        <Form.Item
          name="dcMarkFormula"
          initialValue={markConfig.dcMarkFormula}

          label="直流标杆公式"
        >
          <Input placeholder="无数据"  readOnly={true}/>
        </Form.Item>
        <Form.Item
          name="dcMarkFormulaValue"
          initialValue={markConfig.dcMarkFormulaValue}

          label="直流标杆公式值(不含变量)"
        >
          <Input placeholder="无数据"  readOnly={true}  />
        </Form.Item>
        <Form.Item
          name="acMarkFormula"
          initialValue={markConfig.acMarkFormula}

          label="交流标杆公式"
        >
          <Input placeholder="无数据"  readOnly={true}/>
        </Form.Item>
        <Form.Item
          name="acMarkFormulaValue"
          initialValue={markConfig.acMarkFormulaValue}

          label="交流标杆公式值(不含变量)"
        >
          <Input placeholder="无数据"  readOnly={true}  />
        </Form.Item>
        <Form.Item
          name="outOfElecFee"
          label="电费(按月)超出标准（元）"
          initialValue={markConfig.outOfElecFee}
          >
          <Input readOnly={true} />
        </Form.Item>
        <Form.Item
          name="priceMark"
          label="电价标杆(适用转供电合同分析)"
          initialValue={markConfig.priceMark}
        >
          <Input readOnly={true} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ markConfig }) => ({
  markConfig: markConfig.markConfig,
}))(CalculateCheckForm) ;
