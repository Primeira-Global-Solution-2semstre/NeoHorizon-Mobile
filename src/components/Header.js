import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import styles from '../styles/components/HeaderStyles';

const Header = ({ title, subtitle }) => (
  <LinearGradient colors={['#02040A', '#07111F', '#0B1F35']} style={styles.container}>
    <View style={styles.brandRow}>
      <View style={styles.logoMark}>
        <MaterialCommunityIcons name="orbit" size={26} color={colors.primary} />
      </View>
      <View style={styles.titleBlock}>
        <Text style={styles.eyebrow}>ORBITAL TRACKER</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    <View style={styles.scanLine} />
  </LinearGradient>
);

export default Header;
