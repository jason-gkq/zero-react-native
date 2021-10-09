import React from 'react';
import { Image } from 'react-native';

export default (props) => {
  const { src, ...restProps } = props;

  return <Image source={{ uri: src }} {...restProps} />;
};
