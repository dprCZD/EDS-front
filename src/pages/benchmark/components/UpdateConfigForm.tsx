import React from 'react';
import {DatePicker, Form, Input, message, Modal, Select} from 'antd';
import {connect} from "umi";
import moment from 'moment';
import {MarkConfigItem} from "../data";


const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: MarkConfigItem) => void;
  onCancel: () => void;
}

const UpdateConfigForm: React.FC<CreateFormProps> = (props) => {
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
      title="更新标杆生成配置"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}

    >
      <Form form={form}>
        <FormItem
          name="markTime"
          label="标杆基准时间"
          rules={[{ required: true, message: '请输入内容！' }]}
          initialValue={moment(markConfig.markTime)}
        >
          <DatePicker defaultValue={moment(markConfig.markTime)} format={dateFormat} />
        </FormItem>
        <FormItem
          name="meterMarkFormula"
          label="抄表标杆公式"
          rules={[{required:true, message: '请输入文字描述！'}]}
          initialValue={markConfig.meterMarkFormula}

        >
          <Input placeholder="公式文字表述"  />
        </FormItem>
        <FormItem
          name="meterMarkFormulaValue"
          label="抄表标杆公式值(不含变量)"
          rules={[{
            required:true,
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
          initialValue={markConfig.meterMarkFormulaValue}

        >
          <Input placeholder="无数据"    />
        </FormItem>
        <FormItem
          name="dcMarkFormula"
          label="直流标杆公式"
          rules={[{required:true, message: '请输入文字描述！'}]}
          initialValue={markConfig.dcMarkFormula}


        >
          <Input placeholder="公式文字表述"  />
        </FormItem>
        <FormItem
          name="dcMarkFormulaValue"
          label="直流标杆公式值(不含变量)"
          rules={[{
            required:true,
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
          initialValue={markConfig.dcMarkFormulaValue}

        >
          <Input placeholder="无数据"    />
        </FormItem>
        <FormItem
          name="acMarkFormula"
          label="交流标杆公式"
          rules={[{required:true, message: '请输入文字描述！'}]}
          initialValue={markConfig.acMarkFormula}

        >
          <Input placeholder="公式文字表述"  />
        </FormItem>
        <FormItem
          name="acMarkFormulaValue"
          label="交流标杆公式值(不含变量)"
          rules={[{
            required:true,
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
          initialValue={markConfig.acMarkFormulaValue}

        >
          <Input placeholder="无数据"    />
        </FormItem>
        <FormItem
          name="outOfElecFee"
          label="电费(按月)超出标准（元）"
          rules={[{
            required:true,
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
          initialValue={markConfig.outOfElecFee}

        >
          <Input placeholder="公式文字表述"  />
        </FormItem>
        <FormItem
          name="priceMark"
          label="电价标杆(适用转供电合同分析)"
          rules={[{
            required:true,
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
          initialValue={markConfig.priceMark}

        >
          <Input placeholder="请输入数字"  />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default connect(({ markConfig }) => ({
  markConfig: markConfig.markConfig,
}))(UpdateConfigForm) ;
