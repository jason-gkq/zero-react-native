import React from 'react';
import { View } from 'react-native';

export default (props) => {
  const { children, ...restProps } = props;
  return <View {...restProps}>{children}</View>;
};
