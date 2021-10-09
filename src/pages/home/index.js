import React, { Component } from 'react';
import { BasePage } from '../../zero/core';
import model from './index.model';
import { View, Button, Text } from '../../zero/components';
import Content from './containers/Content';
import { Navigation } from 'react-native-navigation';

@BasePage(model)
class Home extends Component {
  constructor(props) {
    super(props);
    console.log('home-props----', props);
  }

  render() {
    const { $model, $globalActions, $globalSelectors } = this.props;
    return (
      // <Text>ddd</Text>
      <Content
        $model={$model}
        $globalActions={$globalActions}
        $globalSelectors={$globalSelectors}
      />
    );
  }
}

// Navigation.registerComponent('reactnative_multibundler2', () => Home);

export default Home;
