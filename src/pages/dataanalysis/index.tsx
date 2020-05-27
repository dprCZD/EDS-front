import {Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Typography} from 'antd';
import React, { FC, } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './style.less';
import {CurrentUser} from "../user/data";
import {
  generateElecAnalysisTask,
  generateContractAnalysisTask,
  generateGridMarkAnalysisTask,
  generateFeeAnalysisTask, generateGridFeeAnalysisTask
} from "./service"
import {TableListParams} from "../eleccontract/data";
import {generateContract} from "../eleccontract/service";


type InternalNamePath = (string | number)[];
const { Option } = Select;
const {Paragraph}=Typography;
const { Text } = Typography;



interface DataanalysisProps {
  submitting: boolean;
  currentUser:CurrentUser;
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const Dataanalysis: FC<DataanalysisProps> = ({
  submitting,
  currentUser,
}) => {
  const [gridMarkForm] = Form.useForm();
  const [contractForm] = Form.useForm();
  const [elecForm] = Form.useForm();
  const [feeForm]=Form.useForm();
  const [gridFeeForm]=Form.useForm();

  const content = (
    <>
      <Paragraph>
        <Text strong>用电异常数据分析</Text>：根据系统标杆(电费，电量)，发票标杆，抄表标杆，直流标杆，交流标杆计算电费电费数据中超出的数据。
        输出格式：(局站编码	局站名称	电费	电量	数据统计时间	标杆基准时间	分析类型	分析标准	系统电量标杆	系统电量标杆差异值
        系统电量标杆差异比	系统电费标杆	系统电费标杆差异值	系统电费标杆差异比	发票标杆	发票标杆差异值	发票标杆差异比	抄表标杆
        抄表标杆差异值	抄表标杆差异比	直流标杆	直流标杆差异值	直流标杆差异比	交流标杆	交流标杆差异值	交流标杆差异比	备注)
      </Paragraph>
      <Paragraph>
        <Text strong>转供电异常数据分析</Text>：根据电价标杆计算转供电合同数据中超出的数据。
        输出格式：(局站编码	局站名称	合同编号	电表号	电费单价标准	数据电价 )
      </Paragraph>
      <Paragraph>
        <Text strong>网格维度异常用电数据统计</Text>：根据系统标杆(电费，电量)，发票标杆，抄表标杆，直流标杆，交流标杆计算电费电费数据中超出的数据,
        按照网格的维度输出超出异常的站点数量。
        输出格式：(归属地市	归属网格	数据基准时间	分析类型	系统电量差异率（30%≤X≤50%)
        系统电量差异率（50%≤X)	系统电费差异率（30%≤X≤50%)	系统电费差异率（50%≤X)
        发票标杆差异率（30%≤X≤50%)	发票标杆差异率（50%≤X)	交流标杆差异率（30%≤X≤50%)
        交流标杆差异率（50%≤X)	直流标杆差异率（30%≤X≤50%)	直流标杆差异率（50%≤X)
        抄表标杆差异率（30%≤X≤50%)	抄表标杆差异率（50%≤X)	备注
        )
      </Paragraph>
      <Paragraph>
        数据分析的进程会在系统任务中体现，在分析完成后可以下载分析结果。
      </Paragraph>
    </>
  );
  const onFinishElecAnalysis = async (values) => {
    const params=values;
    const hide = message.loading('正在生成计算任务');
    if(currentUser.authority==1){
      params.homeCity=currentUser.city;
    }
    if(currentUser.authority==2){
      params.homeCity=currentUser.city;
      params.homeDistrict=currentUser.district;
    }
    if(currentUser.authority==3){
      params.homeCity=currentUser.city;
      params.homeDistrict=currentUser.district;
      params.homeGrid=currentUser.grid;
    }
    params.analysisDate=new Date(params.analysisDate).toUTCString();
    try {
      const resp = await generateElecAnalysisTask(params)
      hide();
      message.success("生成[电费电量异常分析]计算任务成功，请至系统任务下查看,任务ID："+resp.data.id+"");
      return true;
    } catch (error) {
      hide();
      return false;
    }

  };

  const onFinishContractAnalysis = async (values) => {
    const params=values;
    const hide = message.loading('正在生成计算任务');
    if(currentUser.authority==1){
      params.homeCity=currentUser.city;
    }
    if(currentUser.authority==2){
      params.homeCity=currentUser.city;
      params.homeDistrict=currentUser.district;
    }
    if(currentUser.authority==3){
      params.homeCity=currentUser.city;
      params.homeDistrict=currentUser.district;
      params.homeGrid=currentUser.grid;
    }
    try {
      const resp =await generateContractAnalysisTask(params)
      hide();
      const msg="生成[用电异常数据分析]计算任务成功，请至系统任务下查看,任务ID："+resp.data.id;
      message.success(msg);
      return true;
    } catch (error) {
      hide();
      return false;
    }

  };

  const onFinishGridMarkAnalysis = async (values) => {
    const params=values;
    const hide = message.loading('正在生成计算任务');
    if(currentUser.authority==1){
      params.homeCity=currentUser.city;
    }
    if(currentUser.authority==2){
      params.homeCity=currentUser.city;
      params.homeDistrict=currentUser.district;
    }
    if(currentUser.authority==3){
      params.homeCity=currentUser.city;
      params.homeDistrict=currentUser.district;
      params.homeGrid=currentUser.grid;
    }
    params.analysisDate=new Date(params.analysisDate).toUTCString();
    try {
      const resp = await generateGridMarkAnalysisTask(params)
      hide();
      message.success("生成[网格维度异常用电数据统计]计算任务成功，请至系统任务下查看,任务ID："+resp.data.id+"");
      return true;
    } catch (error) {
      hide();
      return false;
    }

  };

  const onFinishFeeAnalysis = async (values) => {
    const params=values;
    const hide = message.loading('正在生成计算任务');
    if(currentUser.authority==1){
      params.homeCity=currentUser.city;
    }
    if(currentUser.authority==2){
      params.homeCity=currentUser.city;
      params.homeDistrict=currentUser.district;
    }
    if(currentUser.authority==3){
      params.homeCity=currentUser.city;
      params.homeDistrict=currentUser.district;
      params.homeGrid=currentUser.grid;
    }
    params.analysisDate=new Date(params.analysisDate).toUTCString();
    try {
      const resp = await generateFeeAnalysisTask(params)
      hide();
      message.success("生成[电费分析]计算任务成功，请至系统任务下查看,任务ID："+resp.data.id+"");
      return true;
    } catch (error) {
      hide();
      return false;
    }

  };

  const onFinishGridFeeAnalysis = async (values) => {
    const params=values;
    const hide = message.loading('正在生成计算任务');
    if(currentUser.authority==1){
      params.homeCity=currentUser.city;
    }
    if(currentUser.authority==2){
      params.homeCity=currentUser.city;
      params.homeDistrict=currentUser.district;
    }
    if(currentUser.authority==3){
      params.homeCity=currentUser.city;
      params.homeDistrict=currentUser.district;
      params.homeGrid=currentUser.grid;
    }
    params.analysisDate=new Date(params.analysisDate).toUTCString();
    try {
      const resp = await generateGridFeeAnalysisTask(params)
      hide();
      message.success("生成[电费承保统计]计算任务成功，请至系统任务下查看,任务ID："+resp.data.id+"");
      return true;
    } catch (error) {
      hide();
      return false;
    }

  };


  return (
      <PageHeaderWrapper content={content}>
        <Form
          form={elecForm}
          layout="vertical"
          hideRequiredMark
          onFinish={onFinishElecAnalysis}
        >
        <Card title="用电异常数据分析" className={styles.card} bordered={false}>
          <Row gutter={16} align="middle">
            <Col xl={{ span: 2}} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
            <Form.Item
              name="analysisDate"
              label="分析时间"
              rules={[{ required: true, message: '请输入内容！' }]}
            >
              <DatePicker picker="month"   />
            </Form.Item>
            </Col>
            <Col xl={{ span: 2, offset: 1 }} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
              <Form.Item
                name="analysisLevel"
                label="分析基准"
                rules={[{ required: true, message: '请输入内容！' }]}
              >
                <Select placeholder="请选择分析基准">
                  <Option value={1}>超出标杆30%-50%</Option>
                  <Option value={3}>超出标杆30%以上</Option>
                  <Option value={2}>超出标杆50%以上</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 2, offset: 1 }} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
              <Form.Item
                name="analysisType"
                label="分析类型"
                rules={[{ required: true, message: '请输入内容！' }]}
              >
                <Select placeholder="请选择分析类型">
                  <Option value={1}>月度</Option>
                  <Option value={2}>月均(一年内)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label="归属地市"
                name="homeCity"
              >
                <Input placeholder="地市，区县，网格均为空则全量分析数据" disabled={currentUser.authority>=1}/>
              </Form.Item>
            </Col>
            <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label="归属区县"
                name="homeDistrict"
              >
                <Input placeholder="区县，网格均为空则全量分析地市级数据" disabled={currentUser.authority>=2}/>
              </Form.Item>
            </Col>
            <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label="归属网格"
                name="homeGrid"
              >
                <Input placeholder="网格为空则全量分析区县级数据" disabled={currentUser.authority>=3}/>
              </Form.Item>
            </Col>
            <Col xl={{ span: 2, offset: 1 }} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
              <Button type="primary" onClick={() => elecForm?.submit()} loading={submitting}>
                提交
              </Button>
            </Col>
          </Row>
        </Card>

      </Form>
        <Form
          form={contractForm}
          layout="vertical"
          hideRequiredMark
          onFinish={onFinishContractAnalysis}
        >
          <Card title="转供电异常数据分析" className={styles.card} bordered={false}>
            <Row gutter={16} align="middle">
              <Col xl={{ span: 3}} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label="归属地市"
                  name="homeCity"
                >
                  <Input placeholder="地市，区县，网格均为空则全量分析数据" disabled={currentUser.authority>=1}/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label="归属区县"
                  name="homeDistrict"
                >
                  <Input placeholder="区县，网格均为空则全量分析地市级数据" disabled={currentUser.authority>=2}/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label="归属网格"
                  name="homeGrid"
                >
                  <Input placeholder="网格为空则全量分析区县级数据" disabled={currentUser.authority>=3}/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 2, offset: 10 }} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
                <Button type="primary" onClick={() => contractForm?.submit()} loading={submitting}>
                  提交
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>

        <Form
          form={gridMarkForm}
          layout="vertical"
          hideRequiredMark
          onFinish={onFinishGridMarkAnalysis}
        >
          <Card title="网格维度异常用电数据统计" className={styles.card} bordered={false}>
            <Row gutter={16} align="middle">
              <Col xl={{ span: 3}} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
                <Form.Item
                  name="analysisDate"
                  label="分析时间"
                  rules={[{ required: true, message: '请输入内容！' }]}
                >
                  <DatePicker picker="month"   />
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 1 }} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
                <Form.Item
                  name="analysisType"
                  label="分析类型"
                  rules={[{ required: true, message: '请输入内容！' }]}
                >
                  <Select placeholder="请选择分析类型">
                    <Option value={1}>月度</Option>
                    <Option value={2}>月均(一年内)</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label="归属地市"
                  name="homeCity"
                >
                  <Input placeholder="地市，区县，网格均为空则全量分析数据" disabled={currentUser.authority>=1}/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label="归属区县"
                  name="homeDistrict"
                >
                  <Input placeholder="区县，网格均为空则全量分析地市级数据" disabled={currentUser.authority>=2}/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label="归属网格"
                  name="homeGrid"
                >
                  <Input placeholder="网格为空则全量分析区县级数据" disabled={currentUser.authority>=3}/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 2 }} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
                <Button type="primary" onClick={() => gridMarkForm?.submit()} loading={submitting}>
                  提交
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>
        <Form
          form={feeForm}
          layout="vertical"
          hideRequiredMark
          onFinish={onFinishFeeAnalysis}
        >
          <Card title="区县维度电费分析统计" className={styles.card} bordered={false}>
            <Row gutter={16} align="middle">
              <Col xl={{ span: 3}} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
                <Form.Item
                  name="analysisDate"
                  label="分析时间"
                  rules={[{ required: true, message: '请输入内容！' }]}
                >
                  <DatePicker picker="month"   />
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label="归属地市"
                  name="homeCity"
                >
                  <Input placeholder="地市，区县，网格均为空则全量分析数据" disabled={currentUser.authority>=1}/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label="归属区县"
                  name="homeDistrict"
                >
                  <Input placeholder="区县，网格均为空则全量分析地市级数据" disabled={currentUser.authority>=2}/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 2 }} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
                <Button type="primary" onClick={() => feeForm?.submit()} loading={submitting}>
                  提交
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>

        <Form
          form={gridFeeForm}
          layout="vertical"
          hideRequiredMark
          onFinish={onFinishGridFeeAnalysis}
        >
          <Card title="电费承包数据统计" className={styles.card} bordered={false} hidden={currentUser.authority>=3}>
            <Row gutter={16} align="middle">
              <Col xl={{ span: 3}} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
                <Form.Item
                  name="analysisDate"
                  label="分析时间"
                  rules={[{ required: true, message: '请输入内容！' }]}
                >
                  <DatePicker picker="month"   />
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label="归属地市"
                  name="homeCity"
                >
                  <Input placeholder="地市，区县，网格均为空则全量分析数据" disabled={currentUser.authority>=1}/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label="归属区县"
                  name="homeDistrict"
                >
                  <Input placeholder="区县，网格均为空则全量分析地市级数据" disabled={currentUser.authority>=2}/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 1 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label="归属网格"
                  name="homeGrid"
                >
                  <Input placeholder="网格为空则全量分析区县级数据" disabled={currentUser.authority>=3}/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 3, offset: 2 }} lg={{ span: 4 }} md={{ span: 8 }} sm={16}>
                <Button type="primary" onClick={() => gridFeeForm?.submit()} loading={submitting}>
                  提交
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>
    </PageHeaderWrapper>

  );
};

export default connect(({ login,loading }: { loading: { effects: { [key: string]: boolean } };login: {
    currentUser: CurrentUser;
  }; }) => ({
  currentUser:login.currentUser,
  submitting: loading.effects['dataanalysis/submitAdvancedForm'],
}))(Dataanalysis);
