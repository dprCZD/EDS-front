import {  Input, Form } from 'antd';
import { connect} from 'umi';
import React, { Component } from 'react';
import { CurrentUser } from '../../data';
import styles from './BaseView.less';


const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
  </>
);

const authorityMap = {
  0: '管理员',
  1: '地市权限用户',
  2: '区县权限用户',
  3: '网格权限用户',

};





interface BaseViewProps {
  currentUser?: CurrentUser;
}

class BaseView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;

  };



  render() {
    const { currentUser } = this.props;
    const authority  =authorityMap[currentUser.authority];
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            initialValues={currentUser,authority}
            hideRequiredMark
          >
            <Form.Item
              name="id"
              label="用户ID"
            >
            <Input placeholder={currentUser.id} maxLength={24} readOnly={true}/>
            </Form.Item>
            <Form.Item
              name="name"
              label="用户名称"
            >
            <Input placeholder={currentUser.name} maxLength={24} readOnly={true}/>
            </Form.Item>
            <Form.Item
              name="city"
              label="归属地市"
            >
              <Input placeholder={currentUser.city} maxLength={24} readOnly={true}/>
            </Form.Item>
            <Form.Item
              name="district"
              label="归属区县"
            >
              <Input placeholder={currentUser.district} maxLength={24} readOnly={true}/>
            </Form.Item>
            <Form.Item
              name="grid"
              label="归属网格"
            >
              <Input placeholder={currentUser.grid} maxLength={24} readOnly={true}/>
            </Form.Item>
            <p>用户权限</p>
              <Input  placeholder={authority} maxLength={24} readOnly={true}/>

          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({
     login,
  }: {
    login: {
      currentUser: CurrentUser;
    };
  }) => ({
    currentUser: login.currentUser,
  }),
)(BaseView);
