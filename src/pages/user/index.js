import React, { Component } from 'react';
import { BasePage } from '../../zero/core';
import model from './index.model';
import Content from './containers/Content';

@BasePage(model)
class User extends Component {
  constructor(props) {
    super(props);
    console.log('User-props----', props);
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

// Navigation.registerComponent('reactnative_multibundler2', () => Home);

export default User;
