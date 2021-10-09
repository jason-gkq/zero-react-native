import React from 'react';
import { View, Button, Text } from '../../../zero/components';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { goAction, goBackAction } = this.props;
    return (
      <View>
        <Text>homehomehomehomehomehome</Text>
        <Text>文案3333cccccccccccccc111</Text>
        <Text>文案3333cccccccccccccc111</Text>
        <Text>文案3333ccccccccccccccddd111</Text>
        <Button
          title={'返回'}
          onPress={() => {
            goBackAction();
          }}
        />
        <Button
          title={'跳转'}
          onPress={() => {
            goAction('lrn://10013');
            // Navigation.push('Component3', {
            //   component: {
            //     name: '10013', // Push the screen registered with the 'Settings' key
            //     passProps: {
            //       name: 'John Doe',
            //       status: 'online',
            //     },
            //   },
            // });
          }}
        />
      </View>
    );
  }
}
