import React from 'react';
import { Form, Input, Modal } from 'antd';

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
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="新建局站基础信息"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          name="bureauId"
          label="局站编码"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="bureauName"
          label="局站名称"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="clientId"
          label="客户编号"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="bureauStatus"
          label="局站状态"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="bureauType"
          label="局站类型"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="supplyType"
          label="转供/直供"
          rules={[{  message: '直接输入转供/直供！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="bureauRight"
          label="局站产权性质"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="firstLevelNameOwn"
          label="归属地市"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="secondLevelNameOwn"
          label="归属区县"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="threeLevelNameOwn"
          label="归属网格"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="bureauAddr"
          label="局站详细地址"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="benchmarkType"
          label="对标类型(标杆)"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="benchmarkState"
          label="节能及标杆选定情况(标杆)"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="powerKw"
          label="交流额定功率"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="airPowerKw"
          label="空调额定功率(KW)"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="stationEqu"
          label="站内设备"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="zpNum"
          label="载频数"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="zsNum"
          label="载扇数"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="geographyJd"
          label="经度(地理坐标)"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="geographyWd"
          label="纬度(地理坐标)"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="areaPerson"
          label="区域负责人"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="logicNum"
          label="逻辑站数"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="bureauLevel"
          label="局站等级"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="baseLevel"
          label="基站等级"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="boardRoom"
          label="局房总建筑面积"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="engineRoom"
          label="机房已装机使用面积"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="buildingType"
          label="建筑类型"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="bureauEreWay"
          label="天馈架设方式"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="fixedLine"
          label="固网专业"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="mobile2g"
          label="移动专业2g"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="mobile3g"
          label="移动专业3g"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="mobile4g"
          label="移动专业4g"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="professWy"
          label="转铁塔"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="fiveLevelNameOwn"
          label="归属包区人"
        >
          <Input placeholder="请输入"  />
        </FormItem>        <FormItem
        name="remark4"
        label="电量标杆"
        rules={[{
          message: '请输入数字！',
          pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
        }]}
      >
        <Input placeholder="请输入"  />
      </FormItem>        <FormItem
        name="remark5"
        label="电费标杆"
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
