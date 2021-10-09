import React from 'react';
import { View } from '../../basic';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <View>{this.props.children}</View>;
  }
}
