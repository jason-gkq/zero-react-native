import React from 'react';
import { View, Text } from '../../index';

export default (props) => {
  const { children, text, ...restProps } = props;
  return (
    <View>
      <View>{children ? children : <Text>{text}</Text>}</View>
    </View>
  );
};
