import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import { userId } from '@/models/consts';


class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };
  componentWillMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'login/queryCurrent',
      });
      dispatch({
        type: 'markConfig/markConfig',
      });
    }

  }
  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const accountId=sessionStorage.getItem(userId);
    const isLogin = accountId;
    const queryString = stringify({
      redirect: window.location.href,
    });
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }

    return children;
  }
}

export default connect(({ login, loading }) => ({
  currentUser: login.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
