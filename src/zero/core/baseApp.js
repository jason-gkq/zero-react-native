import React, { Suspense } from 'react';
// import { StyleSheet } from 'react-native';
// import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { AppConfigContext } from './configureContext';
import { View, PageLoading, ErrorBoundary } from '../components';
import { store } from '../redux';
import appModel from '../../app.model';
// import { Layout as AppPage } from '../components/layout';
import AppPage from '../components/layout';
import { navigate } from '../api';

import { Navigation } from 'react-native-navigation';

export default ({ BasePageComponent, config }) => {
  class App extends React.Component {
    constructor(props) {
      super(props);
      console.log('props------->>>>', props);
      navigate.registerRoutes({
        pageId: config.pageId,
        componentId: props.componentId,
        rootTag: props.rootTag,
      });
      const {
        env: { status: initStatus },
      } = store.getState();

      this.state = {
        status: initStatus ? 'success' : 'loading',
      };

      /**
       * 运行app中 saga
       */
      if (!initStatus && appModel.initialize) {
        store.dispatch(appModel.actions.initState());
      }
      if (!initStatus) {
        appModel.runSaga();
      }
    }

    componentDidMount() {
      const { $onLunchPayload = {} } = this.props;
      const {
        env: { status: initStatus },
      } = store.getState();
      if (!initStatus) {
        const unsubscribe = store.subscribe(() => {
          const {
            env: { status },
          } = store.getState();
          if (status) {
            unsubscribe();
            store.dispatch(
              appModel.actions.didMount({
                ...$onLunchPayload,
                done: () => {
                  this.setState({
                    status: 'success',
                  });
                },
              })
            );
          }
        });
      }
    }

    renderContent() {
      const { status } = this.state;
      switch (status) {
        case 'loading':
          return <PageLoading />;
        case 'error':
          return <ErrorBoundary msg={'网络异常，请刷新重试'} />;
        default:
          return <BasePageComponent />;
      }
    }

    render() {
      return (
        <Provider store={store}>
          <AppConfigContext.Provider value={appModel.config}>
            <Suspense
              fallback={
                <View>
                  <PageLoading />
                </View>
              }
            >
              <AppPage>{this.renderContent()}</AppPage>
            </Suspense>
          </AppConfigContext.Provider>
        </Provider>
      );
    }
  }

  // AppRegistry.registerComponent(config.pageId, () => App);
  // Navigation.registerComponent(config.pageId, () => App);
  if (Number(config.pageId) === 10000) {
    Navigation.registerComponent('AwesomeProject', () => App);
    // Navigation.registerComponent(10000, () => App);
  } else {
    Navigation.registerComponent(config.pageId, () => App);
  }

  // Navigation.setDefaultOptions({
  //   statusBar: {
  //     visible: false,
  //     // backgroundColor: '#4d089a'
  //   },
  //   topBar: { visible: false },
  //   // bottomTab: {
  //   //   fontSize: 14,
  //   //   selectedFontSize: 14
  //   // }
  // });
  // Navigation.events().registerAppLaunchedListener(() => {
  //   Navigation.setRoot({
  //     root: {
  //       stack: {
  //         children: [
  //           {
  //             component: {
  //               name: 'AwesomeProject',
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  // });
  // Navigation.mergeOptions('Component1', {
  //   topBar: {
  //     visible: false,
  //   },
  // });
  return App;
};
