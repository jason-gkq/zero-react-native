import React, { Component } from 'react';
import { BasePage } from '../../zero/core';
import model from './index.model';
import { Navigation } from 'react-native-navigation';
import Content from './containers/Content';

@BasePage(model)
class Index extends Component {
  constructor(props) {
    super(props);
    console.log('index-props----', props);
  }

  render() {
    const { $model, $globalActions, $globalSelectors } = this.props;
    return (
      <Content
        $model={$model}
        $globalActions={$globalActions}
        $globalSelectors={$globalSelectors}
      />
    );
  }
}

// Navigation.registerComponent('AwesomeProject', () => Index);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'MyStack',
        children: [
          {
            component: {
              name: 'AwesomeProject',
            },
          },
        ],
      },
    },
  });
});

export default Index;
