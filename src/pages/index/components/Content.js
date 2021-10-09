import React from 'react';
import { View, Button, Text } from '../../../zero/components';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { goAction } = this.props;
    return (
      <View>
        <Text>文案3333cccccccddddccccccc111</Text>
        <Text>文案3333cccccccccccccc111</Text>
        <Text>文案3333cccccccccccccc111</Text>
        <Text>文案3333ccccccccccccccddd111</Text>
        <Button
          title={'点击'}
          // onPress={goAction('/pages/home/index')}
          onPress={() => {
            goAction('/pages/home/index');
          }}
        />
      </View>
    );
  }
}
