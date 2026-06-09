import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors } from '../styles/theme';
import styles from '../styles/components/LoadingStyles';

type LoadingProps = {
  message?: string;
};

const Loading = ({ message = 'Carregando dados...' }: LoadingProps) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={colors.primary} />
    <Text style={styles.text}>{message}</Text>
  </View>
);

export default Loading;