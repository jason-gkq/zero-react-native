import React from 'react';
import { View, Button, Text } from '../../../zero/components';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { goBackAction } = this.props;
    return (
      <View>
        <Text>UserUserUserUserUserUserUser</Text>
        <Button
          title={'点击'}
          onPress={() => {
            goBackAction();
          }}
        />
      </View>
    );
  }
}
