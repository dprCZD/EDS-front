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
          name="siteId"
          label="局站编码"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入" readOnly={true} />
        </FormItem>
        <FormItem
          name="siteName"
          label="局站名称"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="customerId"
          label="客户编号"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="detailAddress"
          label="局站详细地址"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="siteType"
          label="局站类型"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="ironTowerCheck"
          label="是否转铁塔"
          rules={[{  message: '请输入内容！' }]}
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
          name="powerStationName"
          label="供电所名称"
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="year"
          label="年账期"
          rules={[{ required: true,
            message: '请输入数字！',
            pattern: new RegExp(/^[1-9]\d*$/, "g"),
          }]}

        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="liantongApportionmentRatio"
          label="联通分摊比"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount1"
          label="1月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee1"
          label="1月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount1"
          label="1月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee1"
          label="1月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount2"
          label="2月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee2"
          label="2月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount2"
          label="2月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee2"
          label="2月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount3"
          label="3月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee3"
          label="3月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount3"
          label="3月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee3"
          label="3月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount4"
          label="4月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee4"
          label="4月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount4"
          label="4月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee4"
          label="4月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount5"
          label="5月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee5"
          label="5月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount5"
          label="5月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee5"
          label="5月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount6"
          label="6月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee6"
          label="6月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount6"
          label="6月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee6"
          label="6月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount7"
          label="7月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee7"
          label="7月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount7"
          label="7月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee7"
          label="7月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount8"
          label="8月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee8"
          label="8月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount8"
          label="8月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee8"
          label="8月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount9"
          label="9月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee9"
          label="9月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount9"
          label="9月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee9"
          label="9月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount10"
          label="10月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee10"
          label="10月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount10"
          label="10月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee10"
          label="10月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount11"
          label="11月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee11"
          label="11月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount11"
          label="11月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee11"
          label="11月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeAmount12"
          label="12月电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeFee12"
          label="12月电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteAmount12"
          label="12月局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="monthlyElectricityFeeSiteFee12"
          label="12月局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="totalElectricityAmount"
          label="本年累计总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="totalElectricityFee"
          label="本年累计总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="totalSiteElectricityAmount"
          label="本年累计局站总电量"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="totalSiteElectricityFee"
          label="本年累计局站总电费"
          rules={[{
            message: '请输入数字！',
            pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/, "g"),
          }]}
        >
          <Input placeholder="请输入"  />
        </FormItem>
        <FormItem
          name="siteStatus"
          label="局站状态"
          rules={[{ required: true, message: '请选择' }]}
        >
          <Select style={{ width: 120 }}>
            <Option value={1}>现网运行</Option>
            <Option value={9}>停用</Option>
          </Select>
        </FormItem>
        <FormItem
          name="supplyType"
          label="转供/直供"
          rules={[{ required: true, message: '请选择' }]}
        >
          <Select style={{ width: 120 }}>
            <Option value={1}>直供</Option>
            <Option value={2}>转供</Option>
          </Select>
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
      title="电费电量更新"
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
