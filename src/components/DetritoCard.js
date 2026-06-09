import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import styles from '../styles/components/DetritoCardStyles';

const riskColor = {
  Baixo: '#22C55E',
  Médio: '#FBBF24',
  Alto: '#F97316',
  Crítico: '#EF4444',
};

const DetritoCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.spacer}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text style={styles.subtitle}>{item.tipo} • {item.regiaoOrbital}</Text>
    </View>
    <View style={styles.details}>
      <View style={[styles.badge, { backgroundColor: riskColor[item.riscoColisao] || colors.secondary }]}> 
        <Text style={styles.badgeText}>{item.riscoColisao}</Text>
      </View>
      <MaterialCommunityIcons name="radar" size={24} color={colors.primary} />
    </View>
    <View style={styles.footer}>
      <Text style={styles.info}>Alt: {item.altitude} km</Text>
      <Text style={styles.info}>Vel: {item.velocidade} km/s</Text>
    </View>
  </TouchableOpacity>
);

export default DetritoCard;
