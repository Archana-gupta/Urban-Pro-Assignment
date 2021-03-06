import React from 'react';
import {Text} from 'react-native';
import styles from '../../styles';

export default props => <Text style={[styles.textStyle, props.style]}>{props.children}</Text>