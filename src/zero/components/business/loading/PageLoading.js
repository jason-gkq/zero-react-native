import React from 'react';
import { View } from '../../index';

export default (props) => {
  const { children, ...restProps } = props;
  return (
    <View>
      <View style={{ textAligh: 'center' }}>{children}</View>
    </View>
  );
};
