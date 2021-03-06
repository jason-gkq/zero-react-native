import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { globalActions, globalSelectors } from '../redux';
import { AppConfigContext } from './configureContext';

export default (pageModel) => (WrappedComponent) => {
  const mapStateToProps = (state) => {
    const { pageStatus } = pageModel.selectors.getState(state);
    const { isLogin: $isLogin } = globalSelectors.getUser(state);
    const { appName } = globalSelectors.getEnv(state);
    const { pathname: $route = '', state: $payload = {} } = {};

    return {
      pageStatus,
      $route,
      $payload,
      $isLogin,
      appName,
    };
  };

  class RegisterPageComponent extends PureComponent {
    constructor(props, context) {
      super(props);

      const { dispatch, $route, $payload, $isLogin, appName } = this.props;

      this.state = {
        hasError: false,
      };

      let { isNeedLogin, title, tabBar } = context;

      if (pageModel.config && Reflect.has(pageModel.config, 'isNeedLogin')) {
        isNeedLogin = pageModel.config.isNeedLogin;
      }
      if (pageModel.config && Reflect.has(pageModel.config, 'title')) {
        title = pageModel.config.title;
      }

      const {
        hideHeader = false,
        barSettings = null,
        pageId,
      } = pageModel.config || {};

      let isTabBar = this.getIsTabBar(tabBar, $route);
      let currentTabBarList = tabBar.list.find((item) => {
        return item.pagePath === $route;
      });
      if (!pageId) {
        console.warn(`页面 ${$route} 未配置 pageId，请找数据组申请pageId`);
      }
      dispatch(
        globalActions.route.currentPage({
          pageId,
          title,
          route: $route,
          payload: $payload,
          hideHeader,
          barSettings,
          isTabBar,
          selectedTabBarKey: (currentTabBarList && currentTabBarList.key) || '',
        })
      );
      /* 判断登录跳转 */
      if (isNeedLogin && !$isLogin) {
        //   dispatch(
        //     globalActions.navigate.redirect({
        //       url: $route.endsWith('/login/index')
        //         ? `/${appName}/common/login/index?to=${encodeURIComponent(
        //             `/${appName}/index/index`
        //           )}`
        //         : `/${appName}/common/login/index?to=${encodeURIComponent(
        //             $route
        //           )}`,
        //       payload: $payload,
        //     })
        //   );
        return;
      }
      if (!pageModel) {
        return;
      }

      if (pageModel.initialize) {
        dispatch(pageModel.actions.initState());
      }

      pageModel.runSaga();
    }

    getIsTabBar(tabBar, $route) {
      let arr = [];
      ((tabBar && tabBar.list) || []).map((item) => {
        arr.push(item.pagePath);
      });
      return arr.includes($route);
    }

    componentDidMount() {
      if (!pageModel) {
        return;
      }
    }

    static getDerivedStateFromError(error) {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // 你同样可以将错误日志上报给服务器
      console.warn('error, errorInfo>>>>', error, errorInfo);
    }

    componentWillUnmount() {
      if (!pageModel) {
        return;
      }
      const { dispatch } = this.props;
      if (pageModel.cache === false) {
        pageModel.removeReducer();
      }
      if (pageModel.actions.willUnmount) {
        dispatch(
          pageModel.actions.willUnmount({
            done: () => {
              pageModel.cancelSaga();
            },
          })
        );
      } else {
        pageModel.cancelSaga();
      }
    }

    render() {
      const { pageStatus, appName, ...restProps } = this.props;
      const { hasError } = this.state;
      const $pageStatus = hasError ? 'error' : pageStatus;
      return (
        <WrappedComponent
          {...restProps}
          $pageStatus={$pageStatus}
          $model={pageModel}
          $globalActions={globalActions}
          $globalSelectors={globalSelectors}
        />
      );
    }
  }

  RegisterPageComponent.contextType = AppConfigContext;
  return connect(mapStateToProps)(RegisterPageComponent);
};
