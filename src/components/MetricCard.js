import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/components/MetricCardStyles';

const MetricCard = ({ label, value, accent }) => (
  <View style={[styles.card, accent ? { borderColor: accent } : null]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default MetricCard;
