import React, { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';

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
      >
        <Input placeholder="请输入"  />
      </FormItem>        <FormItem
        name="remark5"
        label="电费标杆"
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
      title="局站信息更新"
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
