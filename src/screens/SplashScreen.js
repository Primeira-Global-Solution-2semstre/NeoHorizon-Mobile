import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styles from '../styles/screens/SplashScreenStyles';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => navigation.replace('Home'), 2200);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandBox}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoIcon}>NH</Text>
        </View>
        <Text style={styles.title}>NeoHorizon</Text>
        <Text style={styles.subtitle}>Monitoramento orbital e gestão de detritos espaciais</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Solução global para segurança orbital e sustentabilidade espacial</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
