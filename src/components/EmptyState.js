import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import styles from '../styles/components/EmptyStateStyles';

const EmptyState = ({ title, subtitle }) => (
  <View style={styles.container}>
    <MaterialCommunityIcons name="satellite-uplink" size={64} color={colors.primary} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

export default EmptyState;
