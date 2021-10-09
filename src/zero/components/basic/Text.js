import React from 'react';
import { Text } from 'react-native';
export default (props) => {
  const { children, ...restProps } = props;
  return <Text {...restProps}>{children}</Text>;
};
